import React from 'react';
import Table from "../../../../../universal/Table/Table";
import {connect} from "react-redux";
import {customerCategoryActions} from "../../Redux/Reducers/customerCategoryReducer";
import "../../CustomerCategory.css"

function TableForCustomerCategory(props) {
    const {customerCategory} = props;

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
            title: "Region",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Code",
            key: "code",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Active",
            key: "active",
            type: "boolean",
            show: true,
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
                        props.setAttachmentId(item.attachmentId)
                        props.editeCategory(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },{
            id: 6,
            title: "Archive",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button onClick={()=>{props.archiveElement(item)}} className={"custom_archive_btn"}>
                    archive
                </button>
            ),
        },
    ];
    return (
        <Table
            localStoragePath="customer_category"
            filterActive={true}
            columnOrderMode={true}
            excel={true}
            dataProps={customerCategory.categories}
            changeSizeModeOptions={["All", 10, 20, 50, 100, 200]}
            pagination={true}
            paginationApi={
                "/customer-category/pagination?page={page}&limit={limit}"
            }
            changeSizeMode={true}
            fileName={"categories"}
            excelPath={"/excel?component=customer-category&"}
            columnsProps={columns}
            archiveVisibility={true}
            handleArchiveDataVisibility={()=>props.handleArchiveModalVisibility()}
        />
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(TableForCustomerCategory);