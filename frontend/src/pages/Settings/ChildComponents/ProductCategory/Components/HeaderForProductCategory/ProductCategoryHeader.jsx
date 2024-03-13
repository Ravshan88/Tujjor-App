import React, {useContext, useEffect} from 'react';
import "../../ProductCategory.css"
import {connect} from "react-redux";
import {productCategoryActions} from "../../Redux/Reducers/productCategoryReducer";
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function ProductCategoryHeader(props) {
    const {langIndex} = useContext(LanguageContext)
    const {productCategory} = props

    return (
        <div id={"topChildForTerritory"}>
            <b className="title">
                    {langData[langIndex]?.productCategoryPage?.title}
            </b>
            <div className="custom_add_btn" onClick={() => props.handleOpen()}>
                <i id={"titleForTerritory"} className="fa fa-plus"></i>
                {productCategory.itemForProductCategoryEdit === ""
                    ? `${langData[langIndex]?.productCategoryPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.productCategoryPage?.modal?.editeTitle}`}
            </div>
        </div>
    );
}
export default connect((state) => state, productCategoryActions)(ProductCategoryHeader);