import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: true,
  title: "",
  description: "",
  file:null,
  base64:"",
  video:"",
  smsView:false,
  smsViewAnimation:true
};
const SmsReducer = createSlice({
  name: "SmsReducer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSmsViewAnimation:(state,action)=>{
      state.smsViewAnimation = action.payload;
    },
    setSmsView:(state,action)=>{
      state.smsView = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setFile:(state,action)=>{
      state.file = action.payload;
    },
    setBase64:(state,action)=>{
      state.base64 = action.payload;
    },
    setVideo:(state,action)=>{
      state.video = action.payload;
    },
    sendSms: (state, action) => {},
  },
});
export const SmsActions = { ...SmsReducer.actions };
export default SmsReducer.reducer;
