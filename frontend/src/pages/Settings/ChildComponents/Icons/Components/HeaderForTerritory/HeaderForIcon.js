import React, {useContext} from 'react';
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {iconAction, teritoryAction} from "../../Redux/Reducers/IconReducer";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function HeaderForIcon(props) {
    const {langIndex} = useContext(LanguageContext)

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                {langData[langIndex]?.iconPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {langData[langIndex]?.iconPage?.addBtn}
            </div>
        </div>
    );
}
export default connect((state) => state, iconAction)(HeaderForIcon);