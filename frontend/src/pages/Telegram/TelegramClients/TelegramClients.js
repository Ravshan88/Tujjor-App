import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import './style.css'
import {connect} from "react-redux";
import {clientsTelegramModel} from "./Redux/Reducers/clientsTelegramReducer";
import UpdateClientsTelegram from "./UpdateClientsTelegram";
import TelegramClientsDataMap from "./TelegramClientsDataMap";

function TelegramClients(props) {
    const {token} = useParams();
    useEffect(() => {
        localStorage.setItem("access_token", token)
    }, [token]);
    return (
        <div className={'telegram-clients'}>
            {props.updateBox ? <UpdateClientsTelegram/> : <TelegramClientsDataMap/>}
        </div>
    );
}

export default connect(state => state.clientsTelegram, clientsTelegramModel)(TelegramClients);