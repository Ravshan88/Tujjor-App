import React, {useContext, useEffect} from 'react';
import "../../Dealer.css"
import {connect} from "react-redux";
import {dealerAction} from "../../Redux/Reducers/dealerReducer";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function DealerHeader(props) {
    const {langIndex} = useContext(LanguageContext)

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                {langData[langIndex]?.dealerPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {langData[langIndex]?.dealerPage?.addBtn}
            </div>
        </div>
    );
}
export default connect((state) => state, dealerAction)(DealerHeader);