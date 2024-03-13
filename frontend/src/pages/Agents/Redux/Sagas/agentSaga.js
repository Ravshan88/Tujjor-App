import {call, put, select, takeEvery} from "redux-saga/effects"
import {agentActions} from "../Reducers/agentReducer"
import apiCall from "Config/apiCall"
import {ErrorNotify, SuccessNotify} from "tools/Alerts"

function* getAllAgents(action) {
    try {
        const agentRes = yield apiCall("/agent", "GET", null)
        const dealerRes = yield apiCall("/dealer", "GET", null)
        yield put(agentActions.getAgentsSuccess(agentRes.data.content))
        yield put(agentActions.getDealersSuccess(dealerRes.data))
    } catch (err) {
        console.log("Mistake", err);
    }
}

function* addAgent(action) {
    console.log(action.payload)
    yield action.payload.loadingButton(true);
    console.log(action.payload.data.username.replaceAll(" ", "") === "" || action.payload.data.phone === "" || action.payload.data.password.replaceAll(" ", "") === "")
    if (action.payload.data.username.replaceAll(" ", "") === "" || action.payload.data.phone === "" || action.payload.data.password.replaceAll(" ", "") === "") {
        ErrorNotify("Please fill all fields!")
    } else {
        const currentState = yield select((state) => state.agents);
        if (currentState.editingItem !== "") {
            yield apiCall("/agent/" + currentState.editingItem.agentId, "PUT", action.payload.data)
            SuccessNotify("Agent edited successfully")
        } else {
            if (action.payload.data.selectedDealer !== '' && action.payload.data.selectedDealer!==null) {
                yield apiCall("/agent/" + action.payload.data.selectedDealer, "POST", action.payload.data)
            } else {
                yield apiCall("/agent", "POST", action.payload.data)
            }
            SuccessNotify("Agent added Successfully!")
        }
        yield action.payload.loadingButton(true);
        yield put(agentActions.resetModal())
        yield call(getAllAgents)
    }
    yield action.payload.loadingButton(false);
}

export function* agentSaga() {
    yield takeEvery("agent/getAgents", getAllAgents) //Agents should be ordered
    yield takeEvery("agent/saveAgent", addAgent)
}