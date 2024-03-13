import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../ConnectionSagas/rootSaga";
import clientsReducer from 'pages/Clients/Redux/Reducers/clientsReducer';
import loginReducer from 'pages/Login/Redux/Reducers/loginReducer';
import AgentReducer from 'pages/Agents/Redux/Reducers/agentReducer';
import teritoryReducer from 'pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer';
import dashboardDataReducer from 'pages/Admin/Redux/Reducers/dashboardDataReducer';
import tableReducer from 'pages/universal/Table/Redux/Reducers/tableReducer';
import settingsReducer from 'pages/Settings/Redux/Reducers/settingsReducer';
import dropdownReducer from 'pages/Admin/Redux/Reducers/dropdownReducer';
import customerCategoryReducer
    from 'pages/Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer';

import companyProfileReducer from 'pages/Settings/ChildComponents/Company/Redux/Reducers/companyProfileReducer';
import telegramClientReducer from "../../pages/Telegram/Redux/Reducers/telegramClientReducer";
import clientsTelegramReducer from "../../pages/Telegram/TelegramClients/Redux/Reducers/clientsTelegramReducer";
import currierReducer from "../../pages/Settings/ChildComponents/Currier/Redux/Reducers/CurrierReducers"
import dealerReducer from "../../pages/Settings/ChildComponents/Dealers/Redux/Reducers/dealerReducer";
import iconReducer from "pages/Settings/ChildComponents/Icons/Redux/Reducers/IconReducer";
import productReducer from "pages/Settings/ChildComponents/Product/Redux/Reducers/ProductReducer";
import productCategoryReducer
    from "pages/Settings/ChildComponents/ProductCategory/Redux/Reducers/productCategoryReducer";
import telegramProductReducer from "pages/Telegram/Redux/Reducers/telegramProductReducer";
import telegramOrderReducer from 'pages/Telegram/Redux/Reducers/telegramOrderReducer';
import catalogReducer from "pages/Telegram/Catalog/Redux/catalogReducer";
import SmsReducer from 'pages/SMSService/Redux/SmsReducer';
import telegramOrderSlice from 'pages/Telegram/TelegramOrder/Redux/reducer/TelegramOrderReducer'

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        loginReducer,
        dashboardDataReducer,
        table: tableReducer,
        settings: settingsReducer,
        teritory: teritoryReducer,
        dealer: dealerReducer,
        dropdown: dropdownReducer,
        customerCategory: customerCategoryReducer,
        companyProfile: companyProfileReducer,
        clients: clientsReducer,
        agents: AgentReducer,
        telegramClients: telegramClientReducer,
        clientsTelegram: clientsTelegramReducer,
        currier: currierReducer,
        icons: iconReducer,
        products: productReducer,
        productCategory: productCategoryReducer,
        telegramProducts: telegramProductReducer,
        telegramOrder: telegramOrderReducer,
        catalog: catalogReducer,
        telegramOrderSlice: telegramOrderSlice,
        sms: SmsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

