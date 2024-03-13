import React from 'react';
import Table from "../../../../../universal/Table/Table";
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {productAction} from "pages/Settings/ChildComponents/Product/Redux/Reducers/ProductReducer";

function TableForProduct(props) {
    const {products} = props;

    console.log(products)

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
            title: "Title",
            key: "title",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Price",
            key: "price",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Count",
            key: "count",
            type: "text",
            show: true,
        }, {
            id: 4,
            title: "Free",
            key: "free",
            type: "jsx",
            show: true,
            data: (item) => (
                <p className={`${item.free ? "text-success" : "text-danger"}`}>{item.free ? "free" : 'unfree'}</p>
            )
        },
        {
            id: 5,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeProduct(item);
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
                excelPath={"/excel?component=product&"}
                fileName={"products"}
                excel={true}
                localStoragePath="ProductColumns"
                excelWithoutSearch={false}
                paginationApi={"/product/pagination?page={page}&limit={limit}"}
                dataProps={products.products}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 10, 20, 30, 40, 50]}
                columnsProps={columns}
            />
        </div>
    );
}

export default connect((state) => state, productAction)(TableForProduct);