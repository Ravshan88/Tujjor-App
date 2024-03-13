import React, {useContext} from 'react';
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {currierAction} from "../../Redux/Reducers/CurrierReducers";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function CurrierHeader(props) {
    const {langIndex} = useContext(LanguageContext)

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                {langData[langIndex]?.currierPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {langData[langIndex]?.currierPage?.addBtn}
            </div>
        </div>
    );
}
export default connect((state) => state, currierAction)(CurrierHeader);