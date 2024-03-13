import {all, fork} from "redux-saga/effects"
import dashboardDataSaga from "../../pages/Admin/Redux/Sagas/dashboardDataSaga";
import settingsSaga from "../../pages/Settings/Redux/Sagas/settingsSaga";
import {territorySaga} from "../../pages/Settings/ChildComponents/Teritory/Redux/Sagas/teritorySaga";
import tableSaga from "../../pages/universal/Table/Redux/Sagas/tableSaga";
import {
    customerCategorySaga
} from "../../pages/Settings/ChildComponents/CustomerCategory/Redux/Sagas/customerCategorySaga";
import companyProfileSaga from "../../pages/Settings/ChildComponents/Company/Redux/Sagas/companyProfileSaga";
import {clientsSaga} from "../../pages/Clients/Redux/Sagas/clientsSaga";
import {loginSaga} from "../../pages/Login/Redux/Sagas/loginSaga";
import {agentSaga} from "pages/Agents/Redux/Sagas/agentSaga";
import {telegramClientsSaga} from "../../pages/Telegram/Redux/Sagas/telegramClientSaga";
import {clientsTelegramSaga} from "../../pages/Telegram/TelegramClients/Redux/Sagas/clientsTelegramSaga";
import {telegramProductsSaga} from "../../pages/Telegram/Redux/Sagas/telegramProductsSaga";
import {currierSaga} from "../../pages/Settings/ChildComponents/Currier/Redux/Sagas/CurrierSaga";
import {dealerSaga} from "../../pages/Settings/ChildComponents/Dealers/Redux/Sagas/dealerSaga";
import {iconSaga} from "pages/Settings/ChildComponents/Icons/Redux/Sagas/IconSaga";
import {productCategorySaga} from "pages/Settings/ChildComponents/ProductCategory/Redux/Sagas/productCategorySaga";
import {telegramOrderSaga} from "pages/Telegram/Redux/Sagas/telegramOrderSaga";
import {catalogSaga} from "pages/Telegram/Catalog/Redux/catalogSaga";
import {productSaga} from "pages/Settings/ChildComponents/Product/Redux/Sagas/ProductSaga";
import SmsSaga from "pages/SMSService/Redux/SmsSaga";
import {TelegramOrderSaga} from "pages/Telegram/TelegramOrder/Redux/saga/TelegramOrderSaga";


export function* rootSaga() {
    try {
        yield all([
            fork(tableSaga),
            fork(settingsSaga),
            fork(dashboardDataSaga),
            fork(territorySaga),
            fork(customerCategorySaga),
            fork(companyProfileSaga),
            fork(clientsSaga),
            fork(loginSaga),
            fork(agentSaga),
            fork(telegramClientsSaga),
            fork(clientsTelegramSaga),
            fork(telegramProductsSaga),
            fork(currierSaga),
            fork(dealerSaga),
            fork(iconSaga),
            fork(productSaga),
            fork(productCategorySaga),
            fork(telegramOrderSaga),
            fork(TelegramOrderSaga),
            fork(catalogSaga),
            fork(SmsSaga)
        ])
    } catch (error) {
        console.log(error)
    }
}