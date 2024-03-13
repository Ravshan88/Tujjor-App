import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import {dealerAction} from "../Reducers/dealerReducer"
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {currierAction} from "pages/Settings/ChildComponents/Currier/Redux/Reducers/CurrierReducers";

function* addDealer(action) {
    const currentState = yield select((state) => state.dealer);
    console.log(action.payload.data)
    if (action.payload.data.fullName.replaceAll(" ", "") === "" || action.payload.data.phoneNumber.replaceAll(" ", "") === "" || action.payload.data.address.replaceAll(" ", "") === "" || action.payload.data.company.replaceAll(" ", "") === "" || action.payload.data.selectedAgents===[]) {
        ErrorNotify("Please fill all fields!")
    } else {
        yield action.payload.loadingButton(true);
        yield put(dealerAction.changeModal(false))

        if (currentState.itemForDealerEdit !== "") {
            const res = yield apiCall(`/dealer/${currentState.itemForDealerEdit.id}`, "PUT", action.payload.data)
            yield put(dealerAction.resetAllDealerData())
            SuccessNotify("Dealer updated Successfully!")
        } else {
            const res = yield apiCall("/dealer", "POST", action.payload.data)
            if(res.data==="ERR_SAME_PHONE") {
                ErrorNotify("The Phone Number Already Used!")
            }else {
                SuccessNotify("Dealer added Successfully!")
            }
            yield put(dealerAction.resetAllDealerData())
        }
        yield action.payload.loadingButton(false);
        yield call(getDealers)
    }
}

function* getDealers(action) {
    try {
        const dealerRes = yield apiCall("/dealer", "GET", null)
        const agentRes = yield apiCall("/agent/all", "GET", null)
        yield put(dealerAction.getDealersSuccess({res: dealerRes.data}))
        yield put(dealerAction.getAgentsSuccess({res: agentRes.data}))
        yield call(getDealerAgents)
    } catch (err) {
        yield put(dealerAction.yourActionFailureDealers(err.message));
    }
}

function* getDealerAgents(action) {
    const currentState = yield select((state) => state.dealer);
    try {
        if (currentState.itemForAgents.id !== undefined) {
            const res = yield apiCall(`/agent/${currentState.itemForAgents.id}`, "GET", null)
            yield put(dealerAction.getDealerAgentsSuccess({res: res.data.body}))
        }
    } catch (err) {
        yield put(dealerAction.yourActionFailureDealers(err.message));
    }
}

export function* dealerSaga() {
    yield takeEvery("dealer/saveDealer", addDealer)
    yield takeEvery("dealer/getDealer", getDealers)
    yield takeEvery("dealer/getDealerAgents", getDealerAgents)
}