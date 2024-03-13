import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const slice = createSlice({
    name:"login",
    initialState:{
        phone:"",
        password:"",
        loading:false,
        mainPhoneNumber: "+998 99 125 08 05",
        remember: false,
        navigateTo:"",
        showPassword: false
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        handleCopyPhoneNumber: (state, action) => {
            const textArea = document.createElement('textarea');
            textArea.value = "+" + state.mainPhoneNumber;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast.success('Successfully Copied!')
        },
        setShowPassword:(state,action)=>{
            state.showPassword = !state.showPassword;
        },
        changePhone:(state, action)=>{
            state.phone = action.payload
        },
        changePassword:(state, action)=>{
            state.password = action.payload
        },
        rememberMe:(state, action)=>{
            state.remember = action.payload
        },
        changeLoading:(state, action)=>{
            state.loading = action.payload
        },
        loginHere:(state, action)=>{
            action.payload.preventDefault();
            if (!state.loading){
                action.payload = {
                    phone: "+"+state.phone,
                    password: state.password,
                    rememberMe: state.remember,
                }
            }
        },
        hasPermissionRoleSuperVisor:(state, action)=>{}
    }
})

export const loginModel = slice.actions;

export default slice.reducer;