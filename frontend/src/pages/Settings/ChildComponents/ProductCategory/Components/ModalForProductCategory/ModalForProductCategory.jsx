import React, {useContext, useState} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {productCategoryActions} from "../../Redux/Reducers/productCategoryReducer";
import "../../ProductCategory.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

function ModalForProductCategory(props) {
    const {langIndex} = useContext(LanguageContext)
    const {productCategory} = props;

    function checkInpValue() {
        return !!(productCategory.name);
    }
    return (
        <UniversalModal
            modalTitle={
                productCategory.itemForProductCategoryEdit === ""
                        ? langData[langIndex]?.productCategoryPage?.modal?.addTitle
                        : langData[langIndex]?.productCategoryPage?.modal?.editeTitle
            }
            checkPage={checkInpValue()}
            isOpen={productCategory.openModal}
            closeFunction={() => props.handleClose()}
            width={60}
            functionforSaveBtn={(modalButton) => props.saveProductCategory(modalButton)}
            inpData={[
                {
                    id: 1,
                    title: `${langData[langIndex]?.productCategoryPage?.modal?.name}*`,
                    value: productCategory.name,
                    onChange: (e) => props.handleName(e.target.value),
                    type: "text",
                },

            ]}
        />
    );
}

export default connect((state) => state, productCategoryActions)(ModalForProductCategory);