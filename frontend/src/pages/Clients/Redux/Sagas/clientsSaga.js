import {call, delay, put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall from "../../../../Config/apiCall";
import {clientsAction} from "../Reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../../../tools/Alerts";

function* getClients() {
    try {
        const clientRes = yield apiCall("/client", "GET", null);
        const currierRes = yield apiCall("/currier", "GET", null);
        yield put(clientsAction.getClientsSuccess(clientRes.data));
        yield put(clientsAction.getCouriersSuccess(currierRes.data));
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

function* getClientCouriers() {
    const currentState = yield select((state) => state.clients);
    try {
        const clientCouriersRes = yield apiCall("/client/courier/"+currentState.itemForClientCouriers.id, "GET", null);
        yield put(clientsAction.getClientCouriersSuccess(clientCouriersRes.data));
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

function validatePhone(phone) {
    let alteredPhone = phone.replaceAll(" ", "");
    if (alteredPhone.startsWith("+")) {
        return phone.substring(alteredPhone.lastIndexOf("+") + 1).startsWith("998");
    } else {
        return alteredPhone.startsWith("998")
    }
};

function* saveClients(action) {
    const currentState = yield select((state) => state.clients);
    const inputsData = action.payload.data;
    if (
        inputsData?.name?.replaceAll(" ", "") === "" ||
        inputsData.territoryId === "" ||
        inputsData?.address?.replaceAll(" ", "") === "" ||
        inputsData?.phone?.replaceAll(" ", "") === "" ||
        inputsData?.companyName?.replaceAll(" ", "") === "" ||
        inputsData?.password?.replaceAll(" ", "") === "" ||
        inputsData.categoryId === "" ||
        inputsData.longitude === "" ||
        inputsData.latitude === "" ||
        currentState.selectedCouriers.length===0

    ) {
        if (!validatePhone(inputsData.phone) || inputsData.phone.replaceAll("+", "").length < 12) {
            ErrorNotify("Invalid phone number!")
        } else {
            ErrorNotify("Please fill all fields!");
        }
    } else {
        if (!validatePhone(inputsData.phone) || inputsData.phone.replaceAll("+", "").length < 12) {
            ErrorNotify("Invalid Phone Format!")
        } else {
            inputsData.phone = inputsData.phone.substring(inputsData.phone.lastIndexOf("+"));
            yield action.payload.loadingButton(true);
            yield delay(400);
            if (currentState.editeClient !== "") {
                yield apiCall(
                    "/client?clientId=" + currentState.editeClient.id,
                    "PUT",
                    inputsData
                );
                yield put(clientsAction.resetAllClientsData());
                SuccessNotify("Client updated Successfully!");
            } else {
                const res = yield apiCall("/client", "POST", inputsData);
                if (res) {
                    yield put(clientsAction.resetAllClientsData());
                    SuccessNotify("Client added Successfully!");
                }
            }
            yield action.payload.loadingButton(false);
            yield put(clientsAction.closeModal());
            yield call(getClients);
        }
    }
}

function* getClientsPlans(action) {
    try {
        const res = yield apiCall("/plane?clientId=" + action.payload, "GET", null);
        yield put(clientsAction.getSuccessPlans(res.data));
    } catch (err) {
        yield put(clientsAction.getFailurePlans(err.message));
    }
}

function* getNotification(action) {
    try {
        const notification = yield apiCall("/plane/notificationPlane", "GET", null);
        const clients = yield apiCall("/client", "GET", null);
        yield put(clientsAction.changeNotificationStatus(clients.data.length === 0 ? false : notification.data >= Math.ceil(clients.data.length / 2)))
    } catch (err) {
        yield put(clientsAction.getFailurePlans(err.message));
    }
}

function* getClientsForMap(action) {
    let obj = {
        cities: [],
        search: "",
        allCity: true,
    }
    try {
        const res = yield apiCall("/client/map", "GET", null, JSON.stringify(obj));
        yield put(clientsAction.getSuccessClientsForMap(res.data))
    } catch (err) {
        yield put(clientsAction.getFailurePlans(err.message));
    }
}

function* addNewClientPlane(action) {
    const currentState = yield select((state) => state.clients);

    if (action.payload.date === null || action.payload.amount === "") {
        ErrorNotify("Enter the details completely")
    } else {
        let p = action.payload.date;
        if (isNaN(p.$D) || isNaN(p.$y) || isNaN(p.$M)) {
            ErrorNotify("Enter valid Date!")
            return;
        }
        if (action.payload.amount <= 999999999) {
            yield put(clientsAction.resetDataForPlansMap());
            if (currentState.currentPlane === "") {
                const res = yield apiCall("/plane", "POST", action.payload);
                if (res.data === "DATE_IS_NOT_AVAILABLE") {
                    ErrorNotify("This Month is not Available!");
                } else {
                    SuccessNotify("New Plan added Successfully!");
                }
            } else {
                const res = yield apiCall("/plane?planeId=" + currentState.currentPlane.id, "PUT", action.payload);
                if (res.data === "DATE_IS_NOT_AVAILABLE") {
                    ErrorNotify("This Month is not Available!");
                } else {
                    SuccessNotify("Plan Updated Successfully!");
                }
            }
            const res = yield apiCall("/plane?clientId=" + currentState.currentClientId, "GET", null);
            yield put(clientsAction.getSuccessPlans(res.data));
        } else {
            ErrorNotify("Reached Maximum Size of Amount")
        }
    }
}

function* filterByTerritory(action) {
    try {
        let obj = {
            cities: action.payload.cities,
            search: action.payload.search,
            allCity: !action.payload.cities.length,
        }

        console.log(obj)

        let arr = [];
        arr = yield apiCall(`/client/map`, "GET", null, JSON.stringify(obj));
        yield put(clientsAction.getSuccessClientsForMap(arr.data));
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

function* getPlanForMap(action) {
    try {
        const res = yield apiCall("/plane/forMap?clientId=" + action.payload, "GET", null);
        yield put(clientsAction.getPlanForMapSuccess(res.data));
    } catch (err) {
        yield put(clientsAction.getPlanForMapFailure(err.message));
    }
}

function* goNextPlanAdd(action) {
    try {
        yield apiCall("/plane/goNextPlansAdd?confirm=" + action.payload, "POST", null);
        yield call(getNotification)
        yield SuccessNotify("Moving plans to the next month has been successfully completed")
    } catch (err) {
        yield ErrorNotify("Something went wrong with the system!")
    }
}

function* filterByName(action) {
    try {
        let obj = {
            search: action.payload.search,
            cities: action.payload.cities,
            allCity: !action.payload.cities.length,
        }
        let arr = [];
        arr = yield apiCall(`/client/map`, "GET", null, JSON.stringify(obj));
        yield put(clientsAction.getSuccessClientsForMap(arr.data));
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

export function* clientsSaga() {
    yield takeLatest("clients/saveClients", saveClients);
    yield takeEvery("clients/getClients", getClients);
    yield takeLatest("clients/savePlane", addNewClientPlane);
    yield takeEvery("clients/getPlans", getClientsPlans);
    yield takeEvery("clients/openModalForPlan", getClientsPlans);
    yield takeEvery("clients/filterByTerritory", filterByTerritory);
    yield takeEvery("clients/getPlanForMap", getPlanForMap);
    yield takeEvery("clients/getNotification", getNotification);
    yield takeLatest("clients/goNextPlanAdd", goNextPlanAdd);
    yield takeLatest("clients/getClientsForMap", getClientsForMap);
    yield takeLatest("clients/getClientCouriers", getClientCouriers);
    yield takeEvery(clientsAction.filterByName.type, filterByName)
}
