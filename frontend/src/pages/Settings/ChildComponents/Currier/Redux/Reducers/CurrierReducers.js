import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    openModal: false,
    template: null,
    mapState: {center: ["", ""], zoom: 10},
    defaultCenter: [39.7756, 64.4253],
    longitute: "",
    latitute: "",
    firstname: "",
    lastname: "",
    active: false,
    phone: "998",
    password: "",
    username: "",
    carriers: [],
    error: "",
    itemForTeritoryEdite: "",
    territories: [],
    selectedTerritory: [],
    optionsActive: [
        {value: "", label: "All"},
        {value: "true", label: "Active"},
        {value: "false", label: "Inactive"},
    ],
}
const currierReducer = createSlice({
    name: "currier",
    initialState,
    reducers: {
        setSelectedTerritory(state, action) {
            state.selectedTerritory = action.payload
        },
        getCurrier() {
        },
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.longitute = "";
            state.latitute = "";
            state.firstname = "";
            state.lastname = "";
            state.password = "";
            state.username = ""
            state.isLoading = false
            state.phone = "998";
            state.selectedTerritory = [];
            state.active = false;
            state.mapState = {center: ["", ""], zoom: 10};
            state.itemForTeritoryEdite = "";
            state.defaultCenter = [39.7756, 64.4253];
        },
        getCarriersSuccess: (state, action) => {
            state.carriers = action.payload.res;
        },
        yourActionFailureCarriers: (state, action) => {
            state.error = action.payload
        },
        handleTemplate: (state, action) => {
            state.template = action.payload
            state.longitute = state.template[0]
            state.latitute = state.template[1]
        },
        handleMapState: (state, action) => {
            state.mapState = action.payload
        },
        handleFirstName: (state, action) => {
            state.firstname = action.payload
        },
        handleLastName: (state, action) => {
            state.lastname = action.payload
        },
        handleUserName: (state, action) => {
            state.username = action.payload
        },
        handlePassword: (state, action) => {
            state.password = action.payload
        },
        handleActive: (state, action) => {
            state.active = action.payload
        },
        handlePhone: (state, action) => {
            state.phone = action.payload
        },
        clearAllTeritory: (state, action) => {
            state.longitute = "";
            state.latitute = "";
            state.mapState = {center: ["", ""], zoom: 10};
            state.defaultCenter = [39.7756, 64.4253];
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllTeritoryData: (state, action) => {
            state.longitute = "";
            state.latitute = "";
            state.firstname = "";
            state.lastname = "";
            state.phone = "998";
            state.password = "";
            state.username = ""
            state.isLoading = false
            state.active = false;
            state.mapState = {center: ["", ""], zoom: 10};
            state.itemForTeritoryEdite = "";
            state.selectedTerritory = [];
            state.defaultCenter = [39.7756, 64.4253];
        },
        saveCurrier: (state, action) => {
            action.payload = {
                data: {
                    firstname: state.firstname,
                    lastname: state.lastname,
                    phone: state.phone,
                    active: state.active,
                    password: state.password,
                    username: state.username,
                    territoryIds: state.selectedTerritory.join(","),
                    longitude: state.longitute,
                    latitude: state.latitute
                },
                loadingButton: action.payload
            }
        },
        editeCurrier: (state, action) => {
            state.itemForTeritoryEdite = action.payload
            state.openModal = true;
            state.longitute = action.payload.latitude;
            state.latitute = action.payload.longitude;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.phone = action.payload.phone;
            state.password = action.payload.show_Password;
            state.username = action.payload.username
            state.active = action.payload.active;
            state.selectedTerritory = action.payload.territory.map(item => item.id)
            state.defaultCenter = [action.payload.latitude, action.payload.longitude];
            state.mapState = {center: [action.payload.latitude, action.payload.longitude], zoom: 10};
        },
        getTerritories: (state, action) => {
        },
        getTerritoriesSuccess: (state, action) => {
            state.territories = action.payload
        }
    }
})
export const currierAction = {...currierReducer.actions}
export default currierReducer.reducer