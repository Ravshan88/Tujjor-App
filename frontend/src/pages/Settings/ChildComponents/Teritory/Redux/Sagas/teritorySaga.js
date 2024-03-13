import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import {teritoryAction} from "../Reducers/teritoryReducer"
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";

function* addTeritory(action) {
    const currentState = yield select((state) => state.teritory);
    if (action.payload.data.name.replaceAll(" ", "") === "" || action.payload.data.region.replaceAll(" ", "") === "" || action.payload.data.code.replaceAll(" ", "") === "" || action.payload.data.longitude === "" || action.payload.data.latitude === "") {
        ErrorNotify("Please fill all fields!")
    } else {
        yield action.payload.loadingButton(true);
        yield put(teritoryAction.changeModal(false))
        if (currentState.itemForTeritoryEdite !== "") {
            SuccessNotify("Teritory updated Successfully!")
            const res = yield apiCall(`/territory/${currentState.itemForTeritoryEdite.id}`, "PUT", action.payload.data)
            yield put(teritoryAction.resetAllTeritoryData())
        } else {
            const res = yield apiCall("/territory", "POST", action.payload.data)
            SuccessNotify("Teritory added Successfully!")
            yield put(teritoryAction.resetAllTeritoryData())
        }
        yield action.payload.loadingButton(false);
        yield call(getTeritory)
    }
}

function* getTeritory(action) {
    try {
        const res = yield apiCall("/territory", "GET", null)
        yield put(teritoryAction.getteritoriesSuccess({res: res.data}))
        yield getArchivedData()
    } catch (err) {
        yield put(teritoryAction.yourActionFailureTeritories(err.message));
    }
}

function* getCities(action) {
    try {
        const res = yield apiCall("/territory/telegram", "GET", null)
        yield put(teritoryAction.getCitiesSuccess({res: res.data}))

    } catch (err) {
        yield put(teritoryAction.yourActionFailureTeritories(err.message));
    }
}
function* archiveTerritory(action){
    yield apiCall("/territory/archive/"+action.payload,"PUT",null)
    yield getTeritory()
    yield getArchivedData()
     SuccessNotify("Successfully Archived")

}
function* getArchivedData(){
    try {
       const res=yield apiCall("/territory/getArchive","GET")
        yield put(teritoryAction.setArchivedData(res.data))
    }catch (e){
        ErrorNotify("Oops🤭 Error Occured")
    }
}
function* deleteArchivedTerritory(action){
    yield apiCall("/territory/"+action.payload,"DELETE",null)
    SuccessNotify("Successfully deleted")
    yield getArchivedData()
}
export function* territorySaga() {
    yield takeLatest("teritory/saveTeritory", addTeritory)
    yield takeEvery("teritory/getTeritory", getTeritory)
    yield takeEvery("teritory/getCities", getCities)
    yield takeEvery("teritory/archiveTerritory",archiveTerritory)
    yield takeEvery("teritory/getArchivedData",getArchivedData)
    yield takeEvery("teritory/deleteArchivedTerritory",deleteArchivedTerritory)
}