import React, {useContext, useEffect} from 'react';
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../../Telegram/ClientsOnTheMapTelegram/clients.css"
import LanguageContext from "../../../../Languages/Contex/Language";
import langData from "../../../../Languages/Language.json"
import '../../clients.css'

function HeaderForClient(props) {
    const {langIndex} = useContext(LanguageContext)
    const { clients } = props;
    useEffect(()=>{
        props.getNotification()
    },[])
    return (
        <div>
            <div style={{display: clients?.notificationStatus ? "flex" : "none"}} id={'notification'}>
                <b>{langData[langIndex]?.clientPage?.notificationTitle}</b>
                <button onClick={()=>props.goNextPlanAdd(true)} className={'my_confirm_btn'}>{langData[langIndex]?.clientPage?.notificationConfirm}</button>
            </div>
            <div id={"headerForClient"}>
                <p id={'titleForClient'}>{langData[langIndex]?.clientPage?.title}</p>
                <button id={"saveBtnForClient"} onClick={() => props.openModal()}>
                    {langData[langIndex]?.clientPage?.addBtn}
                </button>
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(HeaderForClient);
