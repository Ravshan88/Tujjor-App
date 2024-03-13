import React, {useEffect} from "react";
import {connect} from "react-redux";
import {productCategoryActions} from "./Redux/Reducers/productCategoryReducer";
import "./ProductCategory.css";
import DealerHeader from "pages/Settings/ChildComponents/ProductCategory/Components/HeaderForProductCategory/ProductCategoryHeader";
import TableForDealer from "pages/Settings/ChildComponents/ProductCategory/Components/TableForProductCategory/TableForProductCategory";
import ModalForDealer from "pages/Settings/ChildComponents/ProductCategory/Components/ModalForProductCategory/ModalForProductCategory";



function ProductCategory(props) {

  useEffect(() => {
    props.getProductCategories();
  }, []);

  return (
    <div id={"fatherDivForTerritory"}>
      <DealerHeader/>
      <TableForDealer/>
      <ModalForDealer/>
    </div>
  );
}

export default connect((state) => state, productCategoryActions)(ProductCategory);