import React, {useContext} from 'react';
import JsxContentForAddClientModal from "./JsxContentForClientModal/JsxContentForAddClientModal";
import UniversalModal from "../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../../Telegram/ClientsOnTheMapTelegram/clients.css";
import langData from "../../../../Languages/Language.json"
import LanguageContext from "../../../../Languages/Contex/Language";

function ModalForClient(props) {
    const {langIndex} = useContext(LanguageContext)
    const {clients} = props;
    function checkInpValue() {
        return !!(clients.teritoryId
            || clients.name
            || clients.address
            || clients.telephone !== "998"
            || clients.tin !== ""
            || clients.active !== false
            || clients.categoryId !== ""
            || clients.companyName !== ""
            || clients.longitute !== ""
            || clients.latitute !== ""
            || clients.password !== "");
    }
    return (
        <UniversalModal
            checkPage={checkInpValue()}
            modalTitle={clients.editeClient === "" ? (langData[langIndex]?.clientPage?.modal?.addTitle) : (langData[langIndex]?.clientPage?.modal?.editTitle)}
            isOpen={clients.openModal}
            closeFunction={() => props.closeModal()}
            width={70}
            functionforSaveBtn={(modalButton) => props.saveClients(modalButton)}
            height={200}
            JsxData={
                <JsxContentForAddClientModal/>
            }
        />
    );
}
export default connect((state) => state, clientsAction)(ModalForClient);
