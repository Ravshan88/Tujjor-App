import React, {useEffect} from "react";
import {connect} from "react-redux";
import "../Teritory/Teritory.css"
import {productAction} from "pages/Settings/ChildComponents/Product/Redux/Reducers/ProductReducer";
import HeaderForProduct from "pages/Settings/ChildComponents/Product/Components/HeaderForProduct/HeaderForProduct";
import TableForProduct from "pages/Settings/ChildComponents/Product/Components/TableForProduct/TableForProduct";
import ModalForProduct from "pages/Settings/ChildComponents/Product/Components/ModalForProduct/ModalForProduct";

function Product(props) {

    useEffect(() => {
        props.getProducts();
    }, []);

    return (
        <div id={"fatherDivForTerritory"}>
            <HeaderForProduct/>
            <TableForProduct/>
            <ModalForProduct/>
        </div>
    );
}

export default connect((state) => state, productAction)(Product);