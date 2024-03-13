import {createSlice} from "@reduxjs/toolkit";

const agentReducer = createSlice({
    name: "agent",
    initialState: {
        agents: [],
        dealers: [],
        selectedDealer: "",
        username: "",
        phone: "998",
        password: "",
        ownAgents: false,
        editingItem: "",
        modalVisibility: false
    },
    reducers: {
        getAgents: (state, action) => {
        },
        getAgentsSuccess: (state, action) => {
            state.agents = action.payload;
        },
        getDealers: (state, action) => {
        },
        getDealersSuccess: (state, action) => {
            state.dealers = action.payload;
        },
        setUserName: (state, action) => {
            state.username = action.payload
        },
        setPhone: (state, action) => {
            state.phone = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setOwnAgents: (state, action) => {
            state.ownAgents = action.payload
            state.selectedDealer = null
        },
        saveAgent: (state, action) => {
            action.payload = {
                data: {
                    username: state.username,
                    phone: state.phone,
                    password: state.password,
                    ownDealer: state.ownAgents,
                    selectedDealer: state.selectedDealer,
                },
                loadingButton: action.payload
            }
        },
        openModal: (state, action) => {
            state.modalVisibility = true
        },
        resetModal: (state, action) => {
            state.username = ""
            state.phone = "998"
            state.password = ""
            state.ownAgents = false
            state.selectedDealer = ""
            state.editingItem = ""
            state.modalVisibility = false
        },
        editAgent: (state, action) => {
            console.log(action.payload)
            state.username = action.payload.username
            state.phone = action.payload.phone
            state.password = action.payload.password
            const itemDealer = JSON.parse(action.payload.dealer)
            state.selectedDealer = itemDealer[0].id
            state.editingItem = action.payload
            state.modalVisibility = true
        },
        setSelectedDealer: (state, action) => {
            console.log(action.payload)
            state.selectedDealer = action.payload;
        },
    },
});
export const agentActions = {...agentReducer.actions};
export default agentReducer.reducer;
