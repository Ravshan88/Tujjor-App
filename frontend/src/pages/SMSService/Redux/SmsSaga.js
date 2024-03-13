import apiCall from "../../../Config/apiCall";
import { SmsActions } from "./SmsReducer";
import { takeEvery } from "redux-saga/effects";
import { SuccessNotify } from "tools/Alerts";
import { select } from "redux-saga/effects";
function* sendSms(action) {
  const smsReducer = yield select((state) => state.sms);
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs;
  let filters = {
      city: x.city,
      customerCategories: x.customerCategories,
  };
  const obj = { title: smsReducer.title, description: smsReducer.description };
  let formData = new FormData();
  formData.append("form", JSON.stringify(obj));
  formData.append("file", smsReducer.file);
  formData.append("filters",JSON.stringify(filters));
  const res = yield apiCall(`/sms/send`, "POST", formData);
  if (res.data === "SUCCESSFULLY_SEND") {
    SuccessNotify("Successfully send!");
  }
}

function* SmsSaga() {
  yield takeEvery(SmsActions.sendSms.type, sendSms);
}
export default SmsSaga;
