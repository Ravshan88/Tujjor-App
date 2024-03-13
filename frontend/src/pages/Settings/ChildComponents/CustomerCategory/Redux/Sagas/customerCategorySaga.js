import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall, {domen} from "../../../../../../Config/apiCall";
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {customerCategoryActions,} from "../Reducers/customerCategoryReducer";
import axios from "axios";
import store from "../../../../../../Redux/store/store";

function* addCategory(action) {
    const currentState = yield select((state) => state.customerCategory);
    const formData = new FormData()
    formData.append("data", JSON.stringify(action.payload.data))

    formData.append("prefix", "/categoryIcons")
    formData.append("photo", currentState.imgFileForBackend)
    if (
        action.payload.data.name.replaceAll(" ","") === "" ||
        action.payload.data.region.replaceAll(" ","") === "" ||
        action.payload.data.code === "" ||
        action.payload.data.description.replaceAll(" ","") === ""
    ) {
        ErrorNotify("Please fill all fields!");
    } else {
        if (currentState.imgFileForBackend === null && action.payload.data.attachmentId==="") {
            ErrorNotify("Img Is Missing!");
            return;
        } else {
            formData.append("photo", currentState.imgFileForBackend)
        }
        yield action.payload.loadingButton(true);
        if (currentState.itemForCustomerCategoryEdite !== "") {
            yield apiCall(
                `/customer-category/${currentState.itemForCustomerCategoryEdite.id}`,
                "PUT",
                formData
            );
            SuccessNotify("Category updated Successfully!");
        } else {
            const res = yield apiCall("/customer-category", "POST", formData);
            SuccessNotify("Category added Successfully!");
        }
        yield action.payload.loadingButton(false);
        yield getCategories();
        yield put(customerCategoryActions.changeModal(false));
        yield put(customerCategoryActions.resetAllCategoryData());
    }
}
function* archiveElement(action){
    try {
        console.log(action)
        yield apiCall(
            `/customer-category/archive/${action.payload.id}`,
            "PUT",

        );
        yield getCategories();
        yield getArchives()
        SuccessNotify("Archived Successfully!");
    }catch (e){
        ErrorNotify("Oops error occured")
    }

}
function* getCategories() {
    try {
        const res = yield apiCall("/customer-category", "GET", null);
        yield put(customerCategoryActions.getCategoriesSuccess({res: res.data}));
        yield getArchives()
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}
function* getArchives(){
    try {
        const archive=yield apiCall("/customer-category/getArchives","GET",null)
        yield put(customerCategoryActions.setArchivedData(archive.data))
    }catch (err){
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}
function* getIcons(action) {
    try {
        const response = yield apiCall("/icons", "GET", null);
        const data = response.data;
        const requests = response.data.map((id) => {
            return axios.get(domen + `/file/getFile/${id.id}`, {
                responseType: "blob",
                headers: {
                    "token": localStorage.getItem("access_token")
                }
            });
        });

        Promise.all(requests)
            .then((responses) => {
                const imageUrls = [];
                responses.forEach((response, index) => {
                    if (response.status === 200) {
                        const objectURL = URL.createObjectURL(response.data);
                        const item = data[index];
                        imageUrls.push({attachmentId: item.id, name: item.name, url: objectURL});
                    } else {
                        console.error('Failed to fetch image:', response);
                    }
                });
                store.dispatch(customerCategoryActions.setImgUrls(imageUrls));
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
        yield put(customerCategoryActions.getIconsSuccess(response.data));
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}
function* deleteItem(action){
    yield apiCall("/customer-category/"+action.payload,"DELETE",null)
    yield getArchives();
     SuccessNotify("Successfully deleted!")
}

export function* customerCategorySaga() {
    yield takeLatest("customerCategory/saveCategory", addCategory);
    yield takeEvery("customerCategory/getCategory", getCategories);
    yield takeLatest("customerCategory/getIcons", getIcons);
    yield takeLatest("customerCategory/archiveElement",archiveElement)
    yield takeLatest("customerCategory/getArchives",getArchives)
    yield takeLatest("customerCategory/deleteItem",deleteItem)
}
