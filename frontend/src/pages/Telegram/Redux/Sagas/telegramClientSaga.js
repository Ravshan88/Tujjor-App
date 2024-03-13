import {put, takeEvery} from "redux-saga/effects"
import apiCall from "../../../../Config/apiCall";
import {telegramClientModel} from "../Reducers/telegramClientReducer";

function* getDataForTelegramClients() {
    const resOfTerritories = yield apiCall("/territory/telegram", "GET");
    const resOfCategories = yield apiCall("/customer-category/telegram", "GET");
    yield put({
        type:telegramClientModel.claimDataSuccess.type,
        payload:{
            territories:resOfTerritories.data,
            categories:resOfCategories.data
        }
    })
}

export function* telegramClientsSaga() {
    yield takeEvery(telegramClientModel.claimData.type, getDataForTelegramClients)
}