import {toast} from "react-toastify"

export const ErrorNotify = (msg)=>toast.error(msg);
export const SuccessNotify = (msg)=>toast.success(msg);
export const WarningNotify = (msg)=>toast.warning(msg);