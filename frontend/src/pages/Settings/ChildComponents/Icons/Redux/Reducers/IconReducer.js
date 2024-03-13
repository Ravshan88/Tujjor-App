import {createSlice} from "@reduxjs/toolkit";

const iconReducer = createSlice({
    initialState: {
        openModal: false,
        icons: [],
        name: "",
        error: "",
        base64Img: "",
        imgFileForBackend: null,
        attachmentId: "",
        itemForIconEdite: "",
        isEditing: false,
        attachmentIdToSend: "",
        editingId: "",
        attachmentName: "",
        isDeletePhoto: false,
        optionsActive: [
            {value: "", label: "All"},
            {value: "true", label: "Active"},
            {value: "false", label: "Inactive"},
        ],
    },
    name: "icons",
    reducers: {
        changeStatus(state, action) {
        },
        setAttachmentId(state, action) {
            state.attachmentId = action.payload
        },
        setImgFileForBackend(state, action) {
            state.imgFileForBackend = action.payload
            // state.attachmentId = ""
            if (state.imgFileForBackend) {
                state.isDeletePhoto = true
            }
        },
        setBase64Img(state, action) {
            state.base64Img = action.payload
        },
        handleName(state, action) {
            state.name = action.payload
        },
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.name = "";
            state.attachmentId = ""
            state.imgFileForBackend = null
            state.base64Img = ""
            state.itemForIconEdite = "";
            state.isDeletePhoto = false
            state.attachmentName = ""
            state.isEditing = false
        },
        getIcons: (state, action) => {
        },
        getIconsSuccess: (state, action) => {
            state.icons = action.payload.res;
        },
        yourActionFailureIcons: (state, action) => {
            state.error = action.payload
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllIconsData: (state, action) => {
            state.name = "";
            state.imgFileForBackend = null
            state.itemForIconEdite = "";
            state.base64Img = ""
            state.attachmentId = ""

        },
        saveIcon: (state, action) => {
            action.payload = {
                data: {
                    name: state.name,
                    attachmentIdToSend: state.attachmentIdToSend,
                    editingId: state.editingId,
                    imgFileForBackend: state.imgFileForBackend,
                    attachmentId: state.attachmentId,
                    isEditing: state.isEditing,
                    isDeletePhoto: state.isDeletePhoto,
                    attachmentName: state.attachmentName
                },
                loadingButton: action.payload
            }
        },
        editeIcon: (state, action) => {
            state.isEditing = true
            state.openModal = true;
            state.imgFileForBackend = null
            state.name = action.payload.name;
            state.attachmentId = action.payload.attachment.id
            state.editingId = action.payload.id
            state.attachmentIdToSend = action.payload.attachment.id
            state.attachmentName = action.payload.attachment.name

        }
    },
});

export const iconAction = {...iconReducer.actions};
export default iconReducer.reducer;
