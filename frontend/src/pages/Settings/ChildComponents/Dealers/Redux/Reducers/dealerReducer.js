import {createSlice} from "@reduxjs/toolkit";

const dealerReducer = createSlice({
    initialState: {
        openModal: false,
        openAgentModal: false,
        template: null,
        fullName: "",
        password: "",
        phone: "998",
        address: "",
        company: "",
        agents: [],
        selectedAgents: [],
        dealers: [],
        dealerAgents: [],
        ownAgents: false,
        partnership: false,
        itemForDealerEdit: "",
        itemForAgents: "",
        error: "",
        optionsActive: [
            {value: "", label: "All"},
            {value: "true", label: "Active"},
            {value: "false", label: "Inactive"},
        ],
    },
    name: "dealer",
    reducers: {
        handleOpen: (state, action) => {
            state.openModal = true;
        },
        handleOpenAgents: (state, action) => {
            state.openAgentModal = true
        },
        handleClose: (state, action) => {
            state.openModal = false;
            state.openAgentModal = false;
            state.fullName = "";
            state.phone = "998";
            state.address = "";
            state.company = "";
            state.itemForDealerEdit = ""
            state.selectedAgents = [];
            state.ownAgents = false;
            state.partnership = false;
            state.password = "";
        },
        getDealer: (state, action) => {
        },
        getDealersSuccess: (state, action) => {
            state.dealers = action.payload.res;
        },
        yourActionFailureDealers: (state, action) => {
            state.error = action.payload
        },
        handleFullname: (state, action) => {
            state.fullName = action.payload
        },
        handlePassword: (state, action) => {
            state.password = action.payload
        },
        handlePhone: (state, action) => {
            state.phone = action.payload
        },
        handleAddress: (state, action) => {
            state.address = action.payload
        },
        handleCompany: (state, action) => {
            state.company = action.payload
        },
        handleOwnAgents: (state, action) => {
            state.ownAgents = action.payload
            state.selectedAgents = []
        },
        handlePartnership: (state, action) => {
            state.partnership = action.payload
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllDealerData: (state, action) => {
            state.fullName = "";
            state.phone = "998";
            state.address = "";
            state.company = "";
            state.password = "";
            state.itemForDealerEdit = ""
            state.selectedAgents = [];
            state.ownAgents = false;
            state.partnership = false;
        },
        saveDealer: (state, action) => {
            action.payload = {
                data: {
                    fullName: state.fullName,
                    phoneNumber: state.phone,
                    password: state.password,
                    address: state.address,
                    company: state.company,
                    agentsId: state.selectedAgents.join(","),
                    ownAgents: state.ownAgents,
                    partnership: state.partnership
                },
                loadingButton: action.payload
            }
        },
        editDealer: (state, action) => {
            state.itemForDealerEdit = action.payload
            state.openModal = true;
            state.fullName = action.payload.fullName;
            state.phone = action.payload.phone;
            state.address = action.payload.address;
            state.company = action.payload.company;
            state.ownAgents = action.payload.ownAgents;
            state.partnership = action.payload.partnership;
            const arr = JSON.parse(action.payload.agents)
            console.log(action.payload)
            arr.map(item=>state.selectedAgents.push(item.id))
        },
        getAgents: (state, action) => {
        },
        getAgentsSuccess: (state, action) => {
            state.agents = action.payload.res.body
        },
        getDealerAgents: (state, action) => {
            state.openAgentModal = true;
            state.itemForAgents = action.payload
        },
        getDealerAgentsSuccess: (state, action) => {
            console.log(action.payload.res)
            state.dealerAgents = action.payload.res
        },
        setSelectedAgents: (state, action) => {
            state.selectedAgents = action.payload;
        },
    },
});

export const dealerAction = {...dealerReducer.actions};
export default dealerReducer.reducer;
