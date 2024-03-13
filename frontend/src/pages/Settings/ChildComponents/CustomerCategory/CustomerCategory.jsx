import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {customerCategoryActions} from "./Redux/Reducers/customerCategoryReducer";
import "./CustomerCategory.css";
import Header from "./Header/Header";
import FilterForCustomerCategory from "./Components/FilterForCustomerCategory/FilterForCustomerCategory";
import TableForCustomerCategory from "./Components/TableForCustomerCategory/TableForCustomerCategory";
import ModalForCustomerCategory from "./Components/ModalForCustomerCategory/ModalForCustomerCategory";
import ModalForArchivedData
    from "pages/Settings/ChildComponents/CustomerCategory/Components/ModalForArchivedData/ModalForArchivedData";

function CustomerCategory(props) {

    useEffect(() => {
        props.getCategory();
    }, [])



    return (
        <div style={{width: "100%"}}>
            <Header/>
            <FilterForCustomerCategory/>
            <TableForCustomerCategory/>
            <ModalForCustomerCategory/>
            <ModalForArchivedData/>
        </div>
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(CustomerCategory);
