import {put, select, takeEvery} from "redux-saga/effects"
import {clientsTelegramModel} from "../Reducers/clientsTelegramReducer";
import apiCall from "../../../../../Config/apiCall";


function* claimDatForTelegramClients() {
    const response = yield apiCall("/client", "GET");
    const resOfTerritories = yield apiCall("/territory/telegram", "GET");
    const resOfCategories = yield apiCall("/customer-category/telegram", "GET");
    yield put(clientsTelegramModel.claimDataSuccess({
        clients: response.data,
        territories: resOfTerritories.data,
        categories: resOfCategories.data
    }))
}

function* updateClient() {
    const currentState = yield select((state) => state.clientsTelegram);
    yield apiCall(`/client?clientId=${currentState?.clientId}`, "PUT", currentState?.initData)
    claimDatForTelegramClients()
    yield put(clientsTelegramModel.updateClientSuccess())
}

export function* clientsTelegramSaga() {
    yield takeEvery(clientsTelegramModel.claimData.type, claimDatForTelegramClients)
    yield takeEvery(clientsTelegramModel.updateClient.type, updateClient)
}