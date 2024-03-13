import {createSlice} from "@reduxjs/toolkit";

const tompanyProfileReducer = createSlice({
    initialState: {
        companies: [],
        error: "",
    },
    name: "companyProfile",
    reducers: {
        getCompanies: (state, action) => {

        },
        getCompaniesSuccess: (state, action) => {
            state.companies = action.payload;
        },
        yourActionFailureCompanies: (state, action) => {
            state.error = action.payload
        },
    },
});

export const companyProfileActions = {...tompanyProfileReducer.actions};
export default tompanyProfileReducer.reducer;