import React from 'react';
import Table from "../../../../../universal/Table/Table";
import {connect} from "react-redux";
import {
    productCategoryActions
} from "pages/Settings/ChildComponents/ProductCategory/Redux/Reducers/productCategoryReducer";

function TableForDealer(props) {
    const { productCategory } = props;
    console.log(productCategory.productCategories)

    const columns = [
        {
            id: 0,
            title: "№",
            key: "index",
            type: "index",
            show: true,
        },
        {
            id: 1,
            title: "Name",
            key: "name",
            type: "text",
            show: true,
        },

        {
            id: 2,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editProductCategory(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
    ];
    return (
        <div id={"forTable"}>
            <Table
                pagination={true}
                changeSizeMode={true}
                excelPath={"/excel?component=product-category&"}
                fileName={"productCategories"}
                localStoragePath="productCategoryColumns"
                excelWithoutSearch={false}
                paginationApi={"/product-category/pagination?page={page}&limit={limit}"}
                dataProps={productCategory.productCategories}
                columnOrderMode={true}
                changeSizeModeOptions={["All",10,20,30,40,50]}
                columnsProps={columns}
            />
        </div>
    );
}
export default connect((state) => state, productCategoryActions)(TableForDealer);