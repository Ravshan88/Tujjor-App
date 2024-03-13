import React from 'react';
import {connect} from "react-redux";
import {customerCategoryActions} from "../../Redux/Reducers/customerCategoryReducer";
import "../../CustomerCategory.css"

function HeaderForCustomerCategory(props) {
    return (
        <div className="d-flex flex-column align-items-start">
            <div className="title mb-3">Customer Category</div>
            <div
                className="custom_add_btn"
                style={{cursor: "pointer"}}
                onClick={() => props.handleOpen()}
            >
                <i style={{fontSize: "20px"}} className="fa fa-plus"></i>
                Add Category
            </div>
        </div>
    );
}
export default connect(
    (state) => state,
    customerCategoryActions
)(HeaderForCustomerCategory);