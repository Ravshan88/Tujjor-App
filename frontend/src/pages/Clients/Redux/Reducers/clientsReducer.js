import {createSlice} from "@reduxjs/toolkit";

const clientsReducer = createSlice({
    name: "clients",
    initialState: {
        clients: [],
        openModal: false,
        template: "",
        mapState: {center: ["", ""], zoom: 10},
        defaultCenter: [39.7756, 64.4253],
        longitute: "",
        latitute: "",
        regions: [],
        teritories: [],
        customCategories: [],
        errMessage: "",
        teritoryId: "",
        name: "",
        address: "",
        telephone: "998",
        tin: "",
        active: false,
        isLoading: false,
        categoriesId: 0,
        categoryId: "",
        companyName: "",
        referencePoint: "",
        error: "",
        editeClient: "",
        allDataForClientOnTheMap: [],
        showActiveClient: true,
        showUnActiveClient: true,
        showTerritory: true,
        modalForAddPlan: false,
        datePlane: null,
        amountPlane: "",
        currentClientId: "",
        plans: [],
        currentPlane: "",
        filterByTerritoryState: "All",
        addPlaneForThisMonth: "",
        currentIdForMap: "",
        planForMap: [],
        clientsForMap: [],
        couriers: [],
        selectedCouriers: [],
        notificationStatus: false,
        courierModalVisible: false,
        itemForClientCouriers: [],
        clientCouriers: [],
        password: ""
    },
    reducers: {
        openModal: (state) => {
            state.openModal = true
        },
        getClientCouriers: (state, action) => {
            state.itemForClientCouriers = action.payload
            state.courierModalVisible = true
        },
        getClientCouriersSuccess: (state, action)=>{
          state.clientCouriers = action.payload
        },
        closeModal: (state) => {
            state.openModal = false;
            state.courierModalVisible = false;
            state.teritoryId = "";
            state.name = "";
            state.address = "";
            state.categoryId = "";
            state.telephone = "998";
            state.tin = "";
            state.active = false;
            state.categoryId = "";
            state.companyName = "";
            state.password = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
            state.mapState = {center: ["", ""], zoom: 10};
            state.defaultCenter = [39.7756, 64.4253];
            state.selectedCouriers = []
        },
        handleTemplate: (state, action) => {
            state.template = action.payload
            state.longitute = state.template[0]
            state.latitute = state.template[1]
            // console.log("longitute: "+ state.longitute, "latitute"+ state.latitute)
        },
        handleMapState: (state, action) => {
            state.mapState = action.payload
        },
        clearAllclients: (state) => {
            state.longitute = "";
            state.latitute = "";
            state.mapState = {center: ["", ""], zoom: 10};
        },
        getClients: () => {

        },
        getClientsSuccess: (state, action) => {
            state.clients = action.payload
        },
        getCouriers: () => {

        },
        getCouriersSuccess: (state, action) => {
            state.couriers = action.payload
        },
        yourActionFailureClients: (state, action) => {
            state.error = action.payload
        },
        yourActionFailureTeritories: (state, action) => {
            state.errMessage = action.payload
        },
        changeTeritoryId: (state, action) => {
            state.teritoryId = action.payload;
        },
        changeRegions(state, action) {

        },
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeAddress: (state, action) => {
            state.address = action.payload;
        },
        changeTelephone: (state, action) => {
            state.telephone = action.payload;
        },
        changeCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        changeTin: (state, action) => {
            state.tin = action.payload;
        },
        changeActive: (state, action) => {
            state.active = action.payload;
        },
        changeCompanyName: (state, action) => {
            state.companyName = action.payload;
        },
        changePassword: (state, action) => {
            state.password = action.payload;
        },
        changeReferencePoint: (state, action) => {
            state.referencePoint = action.payload;
        },
        getCustomCategory: () => {

        },
        getCustomCategorySuccess: (state, action) => {
            state.customCategories = action.payload;
        },
        yourActionFailureCustomCategory: (state, action) => {
            state.error = action.payload;
        },
        resetAllClientsData: (state) => {
            state.teritoryId = "";
            state.name = "";
            state.address = "";
            state.telephone = "998";
            state.tin = "";
            state.active = false;
            state.categoryId = "";
            state.companyName = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
            state.defaultCenter = [39.7756, 64.4253];
            state.mapState = {center: ["", ""], zoom: 10};
            state.selectedCouriers = [];
        },
        saveClients: (state, action) => {
            action.payload = {
                data: {
                    territoryId: state.teritoryId,
                    name: state.name,
                    address: state.address,
                    phone: "+" + state.telephone,
                    tin: state.tin,
                    active: state.active,
                    categoryId: state.categoryId,
                    couriersId: state.selectedCouriers.join(","),
                    companyName: state.companyName,
                    referencePoint: state.referencePoint,
                    longitude: state.longitute,
                    latitude: state.latitute,
                    password: state.password
                },
                loadingButton: action.payload
            }
        },
        editeClients: (state, action) => {
            console.log(action.payload);
            state.editeClient = action.payload
            state.openModal = true;
            state.teritoryId = action.payload.territoryId;
            state.name = action.payload.clientName;
            state.address = action.payload.address;
            state.telephone = action.payload.telephone;
            state.tin = action.payload.tin;
            state.active = action.payload.active;
            state.categoryId = action.payload.categoryId;
            state.companyName = action.payload.companyName;
            state.longitute = action.payload.longitude;
            state.latitute = action.payload.latitude;
            state.defaultCenter = [action.payload.latitude, action.payload.longitude]
            state.mapState = {center: [action.payload.latitude, action.payload.longitude], zoom: 10}
            const arr = JSON.parse(action.payload.couriers)
            arr.map(item => state.selectedCouriers.push(item.id))
        },
        changeLoadingActive: (state, action) => {
            state.isLoading = action.payload
        },
        changeShowActiveClient: (state) => {
            state.showActiveClient = true;
            state.showUnActiveClient = false;
            state.showTerritory = false;
        },
        changeShowUnActiveClient: (state) => {
            state.showActiveClient = false;
            state.showUnActiveClient = true;
            state.showTerritory = false;
        },
        changeShowTerritory: (state) => {
            state.showActiveClient = false;
            state.showUnActiveClient = false;
            state.showTerritory = true;
        },
        changeAllLocation: (state) => {
            state.showActiveClient = true;
            state.showUnActiveClient = true;
            state.showTerritory = true;
        },
        openModalForPlan: (state, action) => {
            state.modalForAddPlan = true
            state.currentClientId = action.payload.id;
            action.payload = state.currentClientId;
        },
        closeModalForPlan: (state) => {
            state.modalForAddPlan = false
            state.datePlane = null;
            state.amountPlane = "";
            state.currentPlane = "";
        },
        changeDatePlane: (state, action) => {
            state.datePlane = action.payload
        },
        changeAmountPlane: (state, action) => {
            state.amountPlane = action.payload
        },
        savePlane: (state, action) => {
            action.payload = {
                clientId: state.currentClientId,
                date: state.datePlane,
                amount: state.amountPlane
            }
        },
        getPlans: (state, action) => {
            state.currentClientId = action.payload
            action.payload = state.currentClientId;
        },
        getSuccessPlans: (state, action) => {
            state.plans = action.payload
        },
        getFailurePlans: (state, action) => {
            state.errMessage = action.payload
        },
        editPlan: (state, action) => {
            if (state.currentPlane === "") {
                state.currentPlane = action.payload;
                state.amountPlane = action.payload.amount;
                state.datePlane = action.payload.date;
            } else {
                if (state.currentPlane.id === action.payload.id) {
                    state.currentPlane = "";
                    state.amountPlane = "";
                    state.datePlane = null;
                } else {
                    state.currentPlane = action.payload;
                    state.amountPlane = action.payload.amount;
                    state.datePlane = action.payload.date;
                }
            }
        },
        resetDataForPlansMap: (state) => {
            state.datePlane = null;
            state.amountPlane = "";
            state.currentPlane = "";
        },
        filterByTerritory: (state, action) => {
        },
        filterByName() {

        },
        changeAddPlaneForThisMonth: (state, action) => {
            state.addPlaneForThisMonth = action.payload
        },
        getPlanForMap: (state, action) => {
            state.currentIdForMap = action.payload
            action.payload = state.currentIdForMap;
        },
        getPlanForMapSuccess: (state, action) => {
            state.planForMap = action.payload
        },
        getPlanForMapFailure: (state, action) => {
            state.errMessage = action.payload
        },
        changeNotificationStatus: (state, action) => {
            state.notificationStatus = action.payload
        },
        getNotification: () => {

        },
        goNextPlanAdd: () => {

        },
        getClientsForMap: () => {

        },
        getSuccessClientsForMap: (state, action) => {
            state.clientsForMap = action.payload
        },
        setSelectedCouriers: (state, action) => {
            state.selectedCouriers = action.payload;
        },
    }
})
export const clientsAction = {...clientsReducer.actions};

export default clientsReducer.reducer