import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "telegramClients",
    initialState: {
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
        territories: [],
        categories: []
    },
    reducers: {
        claimData: (state, action) => {

        },
        claimDataSuccess: (state, action) => {
            state.territories = action.payload.territories;
            state.categories = action.payload.categories;
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
        }
    }
})
export const telegramClientModel = slice.actions

export default slice.reducer