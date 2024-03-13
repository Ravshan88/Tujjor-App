import React, {useContext} from 'react';
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {customerCategoryActions} from "../../Redux/Reducers/customerCategoryReducer";
import "../../CustomerCategory.css"
import langData from "../../../../../../Languages/Language.json"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import JsxContentForCategory from "./ModalJsx/JsxContentForCategory";

function ModalForCustomerCategory(props) {
    const {langIndex} = useContext(LanguageContext)
    const {customerCategory} = props;

    function getCheckPage() {
        if (customerCategory.region !== "" || customerCategory.code !== "" || customerCategory.name !== "" || customerCategory.active !== false
            || customerCategory.description !== "") return true;
        return false;
    }

    return (
        <UniversalModal
            modalTitle={customerCategory.itemForCustomerCategoryEdite === "" ? `${langData[langIndex]?.customerCategory?.modal?.addTitle}` : `${langData[langIndex]?.customerCategory?.modal?.editeTitle}`}
            isOpen={customerCategory.openModal}
            closeFunction={() => props.handleClose()}
            width={60}
            checkPage={getCheckPage()}
            functionforSaveBtn={(loadingButton) => props.saveCategory(loadingButton)}
            inpData={[
                {
                    id: 1,
                    title: `${langData[langIndex]?.customerCategory?.modal?.inp1}`,
                    value: customerCategory.region,
                    onChange: (e) => props.handleRegion(e.target.value),
                    type: "text",
                },
                {
                    id: 2,
                    title: `${langData[langIndex]?.customerCategory?.modal?.inp2}`,
                    value: customerCategory.code,
                    onChange: (e) => props.handleCode(e.target.value),
                    type: "number",
                },
                {
                    id: 3,
                    title: `${langData[langIndex]?.customerCategory?.modal?.inp3}`,
                    value: customerCategory.name,
                    onChange: (e) => props.handleName(e.target.value),
                    type: "text",
                },
                {
                    id: 4,
                    title: `${langData[langIndex]?.customerCategory?.modal?.inp4}`,
                    value: customerCategory.description,
                    onChange: (e) => props.handleDescription(e.target.value),
                    type: "text",
                },
                {
                    id: 5,
                    title: `${langData[langIndex]?.customerCategory?.modal?.inp5}`,
                    value: customerCategory.active,
                    onChange: (e) => props.handleActive(e.target.checked),
                    type: "checkbox",
                },

            ]}
            JsxData={
                <JsxContentForCategory/>
            }
        />
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(ModalForCustomerCategory);