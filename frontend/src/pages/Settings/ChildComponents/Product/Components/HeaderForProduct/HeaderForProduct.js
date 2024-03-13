import React, {useContext} from 'react';
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {productAction} from "../../Redux/Reducers/ProductReducer";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function HeaderForProduct(props) {
    const {langIndex} = useContext(LanguageContext)

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                {langData[langIndex]?.productPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {langData[langIndex]?.productPage?.addBtn}
            </div>
        </div>
    );
}
export default connect((state) => state, productAction)(HeaderForProduct);