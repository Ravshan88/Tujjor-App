import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import {iconAction} from "../Reducers/IconReducer"
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";

function* addIcon(action) {
    // const currentState = yield select((state) => state.icons);
    const {
        name,
        isDeletePhoto,
        imgFileForBackend,
        isEditing,
        editingId,
        attachmentId,
        attachmentName,
        attachmentIdToSend
    } = action.payload.data
    console.log(action.payload)
    const formData = new FormData();
    formData.append("photo", imgFileForBackend)
    formData.append("prefix", "/defaultCategoryIcons")
    // formData.append("attachmentId", attachmentIdToSend)
    formData.append("data", JSON.stringify({
        name, attachmentId: attachmentIdToSend, id: editingId, deletePhoto: isDeletePhoto, attachmentName
    }))
    if (isEditing) {
        if (
            (name && attachmentId)
            ||
            (name && imgFileForBackend)
        ) {
            // if (!attachmentId) {
            //     formData.append("attachmentId", "")
            // } else {
            // }
            yield action.payload.loadingButton(true);
            formData.append("name", name)
            SuccessNotify("Icon updated Successfully!")
            yield apiCall(`/icons`, "PUT", formData)
            yield put(iconAction.handleClose())
            yield action.payload.loadingButton(false);
            yield call(getIcons)
        } else {
            ErrorNotify("Please fill all fields!")
        }
    } else {
        if (name && imgFileForBackend) {
            yield apiCall("/icons", "POST", formData)
            SuccessNotify("Icon successfully added")
            yield put(iconAction.handleClose())
            yield action.payload.loadingButton(false);
            yield call(getIcons)
        } else {
            ErrorNotify("Please fill all fields!")
        }
    }
}

function* getIcons(action) {
    try {
        const res = yield apiCall("/icons/table", "GET", null)
        yield put(iconAction.getIconsSuccess({res: res.data}))
    } catch (err) {
        yield put(iconAction.yourActionFailureIcons(err.message));
    }
}

function* changeStatus(action) {
    try {
        yield apiCall(`/icons/${action.payload}`, "PATCH", null)
        yield put(iconAction.getIcons())
    } catch (err) {
        yield put(iconAction.yourActionFailureIcons(err.message));
    }
}

export function* iconSaga() {
    yield takeLatest(iconAction.getIcons.type, getIcons)
    yield takeLatest(iconAction.saveIcon.type, addIcon)
    yield takeLatest(iconAction.changeStatus.type, changeStatus)
}