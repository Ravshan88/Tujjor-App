import React, {useContext} from 'react';
import {connect} from "react-redux";
import {customerCategoryActions} from "../Redux/Reducers/customerCategoryReducer";
import "./header.css"
import LanguageContext from "../../../../../Languages/Contex/Language";
import langData from "../../../../../Languages/Language.json"

function Header(props) {
    const {langIndex} = useContext(LanguageContext)
    return (
        <div className="d-flex flex-column align-items-start">
            <div className="title">{langData[langIndex]?.customerCategory?.title}</div>
            <div
                className="custom_add_btn"
                onClick={() => props.handleOpen()}
            >
                <i  style={{}} className="fa fa-plus btn-text"></i>
                {langData[langIndex]?.customerCategory?.addBtn}
            </div>
        </div>
    );
}

export default connect((state) => state, customerCategoryActions)(Header);