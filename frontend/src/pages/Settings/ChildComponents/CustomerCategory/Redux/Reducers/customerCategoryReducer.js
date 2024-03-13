import {createSlice} from "@reduxjs/toolkit";

const customerCategoryReducer = createSlice({
        initialState: {
            openModal: false,
            code: "",
            name: "",
            active: false,
            region: "",
            categories: [],
            error: "",
            description: "",
            itemForCustomerCategoryEdite: "",
            image: "",
            fileVal: "",
            icons: [],
            base64Img: "",
            attachmentId: "",
            imgFileForBackend: null,
            selectedImage: "",
            imageUrls: [],
            isLoading: false,
            archive: "",
            visibility: false,
            archivedData: []
        },
        name: "customerCategory",
        reducers: {
            setAttachmentIdToSend(state, action) {
                state.attachmentIdToSend = action.payload
            },
            handleArchiveModalVisibility(state, action) {
                state.visibility = !state.visibility
            },
            setImgUrls(state, action) {
                state.imageUrls = action.payload
            },
            setSelectedImage(state, action) {
                state.selectedImage = action.payload
            },
            setImgFileForBackend(state, action) {
                state.imgFileForBackend = action.payload
            },
            setBase64Img(state, action) {
                state.base64Img = action.payload
            },
            setAttachmentId(state, action) {
                state.attachmentId = action.payload
            },
            getIconsSuccess(state, action) {
                state.icons = action.payload
                state.isLoading = false
            },
            getIcons(state) {
                state.isLoading = true
            }
            ,
            handleOpen: (state, action) => {
                state.openModal = true
            },
            handleName: (state, action) => {
                state.name = action.payload;
            },
            handleDescription: (state, action) => {
                state.description = action.payload;
            },
            handleClose: (state, action) => {
                state.openModal = false
                state.code = ""
                state.region = ""
                state.name = "";
                state.fileVal = "";
                state.image = "";
                state.hasImage = "";
                state.description = "";
                state.active = false
                state.itemForCustomerCategoryEdite = ""
                state.selectedImage = ""
                state.base64Img = ""
                state.attachmentId = ""
            },
            getCategory: (state, action) => {

            },
            getCategoriesSuccess: (state, action) => {
                state.categories = action.payload.res;
            },
            yourActionFailureCategories: (state, action) => {
                state.error = action.payload
            },
            handleTitle: (state, action) => {
                state.title = action.payload
            },
            handleCode: (state, action) => {
                state.code = action.payload
            },
            handleActive: (state, action) => {
                state.active = action.payload
            },
            handleRegion: (state, action) => {
                state.region = action.payload
            },
            changeModal: (state, action) => {
                state.openModal = action.payload
            },
            resetAllCategoryData: (state, action) => {
                state.title = ""
                state.code = ""
                state.region = ""
                state.name = "";
                state.description = "";
                state.image = "";
                state.fileVal = "";
                state.active = false;
                state.selectedImage = "";
                state.base64Img = "";
                state.itemForCustomerCategoryEdite = "";
                state.archive = ""

            },
            saveCategory: (state, action) => {
                action.payload = {
                    data: {
                        name: state.name,
                        description: state.description,
                        region: state.region,
                        code: state.code,
                        active: state.active,
                        attachmentId: state.attachmentId
                    },
                    loadingButton: action.payload
                }
            },
            editeCategory: (state, action) => {
                state.itemForCustomerCategoryEdite = action.payload
                state.openModal = true
                state.name = action.payload.name
                state.code = action.payload.code
                state.description = action.payload.description;
                state.region = action.payload.region
                state.active = action.payload.active
                state.attachmentId = action.payload.attachment.id
                state.attachmentIdToSend = action.payload.attachment.id
                state.attachmentName = action.payload.attachment.name
                state.image = action.payload.photoId
            },
            handlePhoto: (state, action) => {
                state.fileVal = action.payload
            },
            saveOptionPhoto: (state, action) => {
                state.selectedOption = action.payload
            },
            changeImage: (state, action) => {
                state.image = action.payload
            },
            changeSelectedOption: (state, action) => {
                state.selectedOption = action.payload
            },
            getPhoto: (state, action) => {

            },
            archiveElement: (state, action) => {

            },
            closeFunctionCheck: (state, action) => {
                state.visibility = false
            },
            setArchivedData: (state, action) => {
                state.archivedData = action.payload
                state.isLoading = false
            },
            getArchives: (state, action) => {
                state.isLoading = true
            },
            deleteItem: (state, action) => {
            }
        },
    })

export const customerCategoryActions = {...customerCategoryReducer.actions};
export default customerCategoryReducer.reducer;
