import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import {currierAction} from "../Reducers/CurrierReducers";
import apiCall from "../../../../../../Config/apiCall";
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";

function* workGetCurrier(action) {
    try {
        const res = yield apiCall("/currier", "GET", null)
        yield put(currierAction.getCarriersSuccess({res: res.data}))
    } catch (err) {
        yield put(currierAction.yourActionFailureCarriers(err.message));
    }
}


function* workAddCurrier(action) {
    try {
        const currentState = yield select((state) => state.currier);
        if (action.payload.data.firstname.replaceAll(" ", "") === "" || action.payload.data.lastname.replaceAll(" ", "") === "" || action.payload.data.phone.replaceAll(" ", "") === "" || action.payload.data.longitude === "" || action.payload.data.latitude === "") {
            ErrorNotify("Please fill all fields!")
        } else {
            yield action.payload.loadingButton(true);
            yield put(currierAction.changeModal(false))
            if (currentState.itemForTeritoryEdite !== "") {
                const res = yield apiCall(`/currier/${currentState.itemForTeritoryEdite.id}`, "PUT", action.payload.data)
                console.log(res)
                SuccessNotify("Currier updated Successfully!")
                yield put(currierAction.resetAllTeritoryData())
            } else {
                const res = yield apiCall("/currier", "POST", action.payload.data)
                yield put(currierAction.resetAllTeritoryData())
                if (res.data !== "saved") {
                    ErrorNotify(res.data)
                } else {
                    SuccessNotify("Currier added Successfully!")
                }
            }
            yield action.payload.loadingButton(false);
            yield call(workGetCurrier)
        }
    } catch (err) {
        console.log(err)
    }
}

function* workGetTerritory(action) {
    try {
        const res = yield apiCall("/territory/telegram", "GET", null)
        yield put(currierAction.getTerritoriesSuccess(res.data))
    } catch (err) {
        yield put(currierAction.yourActionFailureCarriers(err.message));
    }
}

export function* currierSaga() {
    yield takeLatest(currierAction.getCurrier.type, workGetCurrier)
    yield takeLatest(currierAction.getTerritories.type, workGetTerritory)
    yield takeLatest(currierAction.saveCurrier.type, workAddCurrier)
}