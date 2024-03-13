import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {
    productCategoryActions
} from "pages/Settings/ChildComponents/ProductCategory/Redux/Reducers/productCategoryReducer";

function* addProductCategory(action){
    const currentState = yield select((state) => state.productCategory);
    console.log(currentState)
    if (action.payload.data.name.replaceAll(" ","") === ""){
        ErrorNotify("Please fill all fields!")
    }else {
        yield action.payload.loadingButton(true);
        yield put(productCategoryActions.changeModal(false))

        if (currentState.itemForProductCategoryEdit !== ""){
            const res = yield apiCall(`/product-category/${currentState.itemForProductCategoryEdit.id}`, "PUT", action.payload.data)
            yield put(productCategoryActions.resetAllProductCategoryData())
            SuccessNotify("Product Category updated Successfully!")
        }else {
            const res = yield apiCall("/product-category", "POST", action.payload.data)
            SuccessNotify("Product Category added Successfully!")
            console.log(action.payload.data)
            yield put(productCategoryActions.resetAllProductCategoryData())
        }
        yield action.payload.loadingButton(false);
        yield call(getProductCategory)
    }
}

function* getProductCategory(action){
    try {
        const productCategoryRes = yield apiCall("/product-category", "GET", null)
        yield put(productCategoryActions.getProductCategoriesSuccess({res: productCategoryRes.data}))
    } catch (err) {
        yield put(productCategoryActions.yourActionFailureDealers(err.message));
    }
}


export function* productCategorySaga() {
    yield takeLatest("productCategory/saveProductCategory", addProductCategory)
    yield takeEvery("productCategory/getProductCategories", getProductCategory)
}