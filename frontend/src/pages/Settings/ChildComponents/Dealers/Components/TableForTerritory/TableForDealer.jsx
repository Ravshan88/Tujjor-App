import React from 'react';
import Table from "../../../../../universal/Table/Table";
import "../../Dealer.css"
import {connect} from "react-redux";
import {dealerAction} from "../../Redux/Reducers/dealerReducer";

function TableForDealer(props) {
    const { dealer } = props;
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
            title: "Full Name",
            key: "fullName",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Address",
            key: "address",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Company",
            key: "company",
            type: "text",
            show: true,
        },
        {
            id: 5,
            title: "Phone",
            key: "phone",
            type: "text",
            show: true,
        },
        {
            id: 6,
            title: "Agents",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.getDealerAgents(item);
                    }}
                >
                    <i className="fa fa-users"></i>
                </button>
            ),
        },
        {
            id: 7,
            title: "Own Agents",
            key: "ownAgents",
            type: "boolean",
            show: true,
        },
        {
            id: 8,
            title: "Partnership",
            key: "partnership",
            type: "boolean",
            show: true,
        },
        {
            id: 9,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editDealer(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
        {
            id: 11,
            title: "Bot Active",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <i style={{fontSize:"30px",color:item.botActive?"green":"red"}} class="bi bi-robot"></i>
            ),
        },
    ];

    return (
        <div id={"forTable"}>
            <Table
                pagination={true}
                changeSizeMode={true}
                excelPath={"/excel?component=dealer&"}
                fileName={"dealers"}
                excel={true}
                localStoragePath="dealerColumns"
                excelWithoutSearch={false}
                paginationApi={"/dealer/pagination?page={page}&limit={limit}"}
                dataProps={dealer.dealers}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 10, 20, 30, 40, 50]}
                columnsProps={columns}
            />
        </div>
    );
}

export default connect((state) => state, dealerAction)(TableForDealer);