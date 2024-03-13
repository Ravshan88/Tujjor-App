import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "clientsTelegram",
    initialState: {
        clients: [],
        territories: [],
        categories: [],
        updateBox: false,
        disabled: true,
        clientId: "",
        initData: {
            territoryId: "",
            categoryId: "",
            name: "",
            companyName: "",
            referencePoint: "",
            address: "",
            phone: "",
            active: false,
            tin: "",
            longitude: "",
            latitude: ""
        },
    },
    reducers: {
        claimData: (state, action) => {
        },
        claimDataSuccess: (state, action) => {
            state.clients = action.payload.clients
            state.territories = action.payload.territories
            state.categories = action.payload.categories
        },
        changeClients: (state, action) => {
            state.clients = action.payload;
        },
        editClient: (state, action) => {
            state.clientId = action.payload.id
            state.initData.territoryId = action.payload.territoryId
            state.initData.categoryId = action.payload.categoryId
            state.initData.name = action.payload.clientName
            state.initData.companyName = action.payload.companyName
            state.initData.address = action.payload.address
            state.initData.tin = action.payload.tin
            state.initData.phone = action.payload.telephone
            state.initData.active = action.payload.active
            state.initData.latitude = action.payload.latitude
            state.initData.longitude = action.payload.longitude
            state.updateBox = true
        },
        updateClient: (state, action) => {

        },
        updateClientSuccess: (state, action) => {
            state.updateBox = false;
        },
        changeTerritoryId: (state, action) => {
            state.initData.territoryId = action.payload
        },
        changeCategoryId: (state, action) => {
            state.initData.categoryId = action.payload
        },
        changePhone: (state, action) => {
            state.initData.phone = action.payload
        },
        changeName: (state, action) => {
            state.initData.name = action.payload
        },
        changeCompanyName: (state, action) => {
            state.initData.companyName = action.payload
        },
        changeAddress: (state, action) => {
            state.initData.address = action.payload
        },
        changeTin: (state, action) => {
            state.initData.tin = action.payload
        },
        changeReferencePoint: (state, action) => {
            state.initData.referencePoint = action.payload
        },
        changeActive: (state, action) => {
            state.initData.active = action.payload
        },
        changeLongitude: (state, action) => {
            state.initData.longitude = action.payload
        },
        changeLatitude: (state, action) => {
            state.initData.latitude = action.payload
        },
        changeUpdateBox: (state, action) => {
            state.updateBox = !state.updateBox
        },
        changeDisable: (state, action) => {
            state.disabled = action.payload
        }
    }
})

export const clientsTelegramModel = slice.actions
export default slice.reducer