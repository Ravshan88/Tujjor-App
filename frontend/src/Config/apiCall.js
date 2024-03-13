import {ErrorNotify} from "../tools/Alerts";
import axiosInterceptor from "./axiosInterceptor";

export const domen = process.env.REACT_APP_API_DOMAIN;

export default function apiCall(url, method, data, searchParam = "", header) {
    let item = localStorage.getItem("access_token");
    return axiosInterceptor({
        baseURL: domen,
        url,
        method: method,
        data,
        headers: {
            "token": item,
            "searchParam": searchParam,
            ...(header ? {"Content-Type": "multipart/form-data"} : {}),
        },
    }).catch((err) => {
        if (err.response && err.response.status === 401) {
            return axiosInterceptor({
                url: domen + "/auth/refresh?refreshToken=" + localStorage.getItem("refresh_token"),
                method: "POST"
            }).then((res) => {
                localStorage.setItem("access_token", res.data);
                // Retry the original request with the new access token
                return axiosInterceptor({
                    baseURL: domen,
                    url,
                    method: method,
                    data,
                    headers: {
                        "token": localStorage.getItem("access_token"),
                        "searchParam": searchParam
                    },
                });
            }).catch((refreshErr) => {
                window.location = "/login";
                localStorage.clear();
                throw refreshErr;
            });
        } else if (err.response && (err.response.status === 404 || err.response.status === 500)) {
            ErrorNotify(err.response.data);
        }
    });
}
