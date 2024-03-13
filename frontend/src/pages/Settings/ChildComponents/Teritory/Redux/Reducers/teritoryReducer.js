import {createSlice} from "@reduxjs/toolkit";

const teritoryReducer = createSlice({
    initialState: {
        visibility:false,
        openModal: false,
        template: null,
        mapState: {center: ["", ""], zoom: 10},
        defaultCenter: [39.7756, 64.4253],
        longitute: "",
        latitute: "",
        title: "",
        code: "",
        active: false,
        region: "",
        teritories: [],
        error: "",
        itemForTeritoryEdite: "",
        regions: [],
        optionsActive: [
            {value: "", label: "All"},
            {value: "true", label: "Active"},
            {value: "false", label: "Inactive"},
        ],
        archivedData:[]
    },
    name: "teritory",
    reducers: {
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleTerritoryVisibility:(state, action)=>{
          state.visibility=!state.visibility

        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.longitute = "";
            state.latitute = "";
            state.title = "";
            state.code = "";
            state.region = "";
            state.active = false;
            state.mapState = {center: ["", ""], zoom: 10};
            state.itemForTeritoryEdite = "";
            state.defaultCenter = [39.7756, 64.4253];
        },
        getTeritory: (state, action) => {
        },
        getteritoriesSuccess: (state, action) => {
            state.teritories = action.payload.res;
        },
        yourActionFailureTeritories: (state, action) => {
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
            state.title = "";
            state.code = "";
            state.region = "";
            state.active = false;
            state.mapState = {center: ["", ""], zoom: 10};
            state.itemForTeritoryEdite = "";
            state.defaultCenter = [39.7756, 64.4253];
        },
        saveTeritory: (state, action) => {
            action.payload = {
                data: {
                    name: state.title,
                    region: state.region,
                    code: state.code,
                    active: state.active,
                    longitude: state.longitute,
                    latitude: state.latitute
                },
                loadingButton: action.payload
            }
        },
        editeTeritory: (state, action) => {
            state.itemForTeritoryEdite = action.payload
            state.openModal = true;
            state.longitute = action.payload.latitude;
            state.latitute = action.payload.longitude;
            state.title = action.payload.name;
            state.code = action.payload.code;
            state.region = action.payload.region;
            state.active = action.payload.active;
            state.defaultCenter = [action.payload.latitude, action.payload.longitude];
            state.mapState = {center: [action.payload.latitude, action.payload.longitude], zoom: 10};
        },
        getCities: (state, action) => {
        },
        getCitiesSuccess: (state, action) => {
            state.regions = action.payload.res
        },
        archiveTerritory:(state, action)=>{

        },
        getArchivedData:(state, action)=>{

        },
        setArchivedData:(state, action)=>{
            state.archivedData=action.payload
        },
        deleteArchivedTerritory:(state, action)=>{

        }
    },
});

export const teritoryAction = {...teritoryReducer.actions};
export default teritoryReducer.reducer;
