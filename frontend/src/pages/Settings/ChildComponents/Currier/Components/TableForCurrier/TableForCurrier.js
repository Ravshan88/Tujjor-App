import React from 'react';
import Table from "../../../../../universal/Table/Table";
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {currierAction} from "../../Redux/Reducers/CurrierReducers";

function TableForCurrier(props) {
    const {currier} = props;
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
            title: "FirstName",
            key: "firstname",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "LastName",
            key: "lastname",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Phone",
            key: "phone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Activity",
            key: "active",
            type: "boolean",
            show: true,
        },
        {
            id: 5,
            title: "Bot Active",
            key: "telegram_id",
            type: "jsx",
            show: true,
            data: (item) => (
                <i className="bi bi-robot" style={{color: item?.telegram_Id ? "green" : "red", fontSize: "35px"}}></i>
            )
        },
        {
            id: 6,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeCurrier(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        }
    ];
    return (
        <div id={"forTable"}>
            <Table
                pagination={true}
                changeSizeMode={true}
                excel={true}
                excelPath={"/excel?component=currier&"}
                fileName={"carriers"}
                localStoragePath="currierColumns"
                excelWithoutSearch={false}
                paginationApi={"/currier/pagination?page={page}&limit={limit}"}
                dataProps={currier.carriers}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 10, 20, 30, 40, 50]}
                columnsProps={columns}
            />
        </div>
    );
}

export default connect((state) => state, currierAction)(TableForCurrier);