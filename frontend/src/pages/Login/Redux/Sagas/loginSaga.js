import {delay, put, takeLatest} from "redux-saga/effects"
import {domen} from "../../../../Config/apiCall";
import {loginModel} from "../Reducers/loginReducer";
import {ErrorNotify, SuccessNotify, WarningNotify} from "../../../../tools/Alerts";
import axios from "axios";
import axiosInterceptor from "../../../../Config/axiosInterceptor";

function* loginHere(action){
    if (action.payload.phone === "" || action.payload.password === "") {
        WarningNotify("Enter the details completely");
        yield put(loginModel.changeLoading(false))
    }else {
        try {
            yield put(loginModel.changeLoading(true))
            const res = yield axios({url: domen+"/auth/login", method: "POST", data: action.payload})
            localStorage.setItem("access_token", res.data.access_token);
            if (res.data.refresh_token !== "" && action.payload.rememberMe === true){
                localStorage.setItem("refresh_token", res.data.refresh_token);
                localStorage.setItem("no_token", "success");
            }else {
                localStorage.setItem("no_token", "sorry");
                localStorage.removeItem("refresh_token");
            }
            yield put(loginModel.changePhone(""));
            yield put(loginModel.changePassword(""));
            yield put(loginModel.rememberMe(false));
            SuccessNotify("Logined Successfully!");
            yield delay(1000)
            window.location = "/admin"
        }catch (err){
            yield put(loginModel.changeLoading(false))
            ErrorNotify("Password Or Username Is Wrong!");
            localStorage.clear();
        }
    }
}
function* hasPermissionRoleSuperVisor(){
    if (localStorage.getItem("access_token") !== null){
        try {
            yield axiosInterceptor({url: domen+"/users/me", method: "GET",
                headers: {
                    token: localStorage.getItem("access_token"),
                },
            });
            window.location = "/admin"
        }catch (err){
            if (err.response.status === 401) {
                if(localStorage.getItem("refresh_token")!==null){
                    try {
                        yield axiosInterceptor({url: domen+"/auth/refresh?refreshToken=" + localStorage.getItem("refresh_token"), method: "POST"});
                        window.location = "/admin"
                    }catch (err2){
                        localStorage.clear()
                    }
                }
            }else {
                localStorage.clear()
            }
        }
    }
}

export function* loginSaga() {
    yield takeLatest("login/loginHere", loginHere)
    yield takeLatest("login/hasPermissionRoleSuperVisor", hasPermissionRoleSuperVisor)
}