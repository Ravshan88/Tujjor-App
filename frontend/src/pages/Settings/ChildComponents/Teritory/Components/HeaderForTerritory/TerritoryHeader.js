import React, {useContext} from 'react';
import "../../Teritory.css"
import {connect} from "react-redux";
import {teritoryAction} from "../../Redux/Reducers/teritoryReducer";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function TerritoryHeader(props) {
    const {langIndex} = useContext(LanguageContext)

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                {langData[langIndex]?.territoryPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {langData[langIndex]?.territoryPage?.addBtn}
            </div>
        </div>
    );
}
export default connect((state) => state, teritoryAction)(TerritoryHeader);