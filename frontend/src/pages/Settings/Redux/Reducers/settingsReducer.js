import {createSlice} from "@reduxjs/toolkit";

const settingsReducer = createSlice({
    name:"settings",
    initialState:{
        data:[],
        activeButtonIndex:localStorage.getItem("selectedSettingsButton")?JSON.parse(localStorage.getItem("selectedSettingsButton")):0,
    },
    reducers:{
        getData:(state,action)=>{},
        exchangeData:(state,action)=>{
            state.data = action.payload.data;
        },
        setCurrentIndex:(state,action)=>{
            state.activeButtonIndex = action.payload;
        }
    }
});

export const settingsActions = {...settingsReducer.actions};
export default settingsReducer.reducer;