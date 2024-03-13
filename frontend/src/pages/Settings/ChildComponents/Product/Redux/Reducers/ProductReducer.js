import {createSlice} from "@reduxjs/toolkit";

const productReducer = createSlice({
    initialState: {
        openModal: false,
        products: [],
        title: "",
        price: "",
        count: "",
        free: false,
        categoryId: "",
        categories: [],
        error: "",
        isEditing: false,
        editingId: "",
        base64Img: "",
        attachmentId: "",
        attachmentIdToSend: "",
        attachmentName: "",
        deletePhoto: false,
        dealerId: null,
        dealers: [],
        company: false,
        optionsActive: [
            {value: "", label: "All"},
            {value: "true", label: "Active"},
            {value: "false", label: "Inactive"},
        ],
    },
    name: "product",
    reducers: {
        getDealerStart: (state, action) => {
        },
        getDealersSuccess: (state, action) => {
            state.dealers = action.payload;
        },
        handleDealerId(state, action) {
            state.dealerId = action.payload
        },
        handleCompany(state, action) {
            state.dealerId = null
            state.company = action.payload
        },
        setAttachmentId(state, action) {
            state.attachmentId = action.payload
        },
        setBase64Img(state, action) {
            state.base64Img = action.payload
            if (state.base64Img) {
                state.deletePhoto = true
            }
        },
        handleTitle(state, action) {
            state.title = action.payload
        },
        handlePrice(state, action) {
            if (action.payload > 0) {
                state.price = action.payload
            }
        }, handleCount(state, action) {
            if (action.payload >= 0) {
                state.count = action.payload
            }
        },
        handleFree(state, action) {
            state.free = action.payload
        }, handleCategoryId(state, action) {
            state.categoryId = action.payload
        },
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.title = "";
            state.price = "";
            state.count = "";
            state.categoryId = "";
            state.free = "";
            state.isEditing = false
            state.base64Img = ""
            state.attachmentId = ""
            state.attachmentIdToSend = ""
            state.deletePhoto = false
            state.dealerId = ""
            state.company = false
        },
        getCategory() {
        },
        getCategorySuccess(state, action) {
            state.categories = action.payload
        },
        getProducts: (state, action) => {
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload.res;
        },
        yourActionFailureIcons: (state, action) => {
            state.error = action.payload
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllIconsData: (state, action) => {
            state.name = "";

        },
        saveProduct: (state, action) => {
            action.payload = {
                data: {
                    title: state.title,
                    price: state.price,
                    free: state.free,
                    count: state.count,
                    categoryId: state.categoryId,
                    deletePhoto: state.deletePhoto,
                    attachmentId: state.attachmentId,
                    attachmentName: state.attachmentName,
                    dealerId: state.dealerId
                },
                company: state.company,
                loadingButton: action.payload,
                editingId: state.editingId,
                imgFileForBackend: state.base64Img,
                isEditing: state.isEditing,
            }
        },
        editeProduct: (state, action) => {
            state.isEditing = true
            state.openModal = true;
            state.title = action.payload.title;
            state.price = action.payload.price;
            state.count = action.payload.count;
            state.categoryId = action.payload.category.id;
            state.free = action.payload.free;
            state.editingId = action.payload.id
            state.attachmentId = action.payload.attachment.id
            state.attachmentIdToSend = action.payload.attachment.id
            state.attachmentName = action.payload.attachment.name
            state.dealerId = action.payload.dealer?.id
            state.company = action.payload.dealer?.id == null
        }
    },
});

export const productAction = {...productReducer.actions};
export default productReducer.reducer;
