import React from 'react';
import Table from "../../../universal/Table/Table";
import {connect} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import "../../../Telegram/ClientsOnTheMapTelegram/clients.css";
import ClientPlan from "../ClientPlan/ClientPlan";
import {WarningNotify} from "../../../../tools/Alerts";

function TableForClient(props) {
    const {clients} = props;


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
            title: "Client name",
            key: "clientName",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Company name",
            key: "companyName",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Telephone",
            key: "telephone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Region",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 5,
            title: "Address",
            key: "address",
            type: "text",
            show: true,
        },
        {
            id: 6,
            title: "Category",
            key: "categoryName",
            type: "text",
            show: true,
        },
        {
            id: 7,
            title: "Activity",
            key: "active",
            type: "boolean",
            show: true,
        },
        {
            id: 8,
            title: "Registration Date",
            key: "registrationDate",
            type: "date",
            show: true,
        },
        {
            id: 9,
            title: "Couriers",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button onClick={() => {
                    props.getClientCouriers(item)
                }} className="custom_edit_btn">
                    <i className="fa-solid fa-truck"></i>
                </button>
            ),
        },
        {
            id: 10,
            title: "AddPlan",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                (item.active) ?
                    <button onClick={() => props.openModalForPlan(item)} className="custom_edit_btn">
                        <i className="fa-regular fa-calendar-plus"></i>
                    </button> :
                    <button onClick={() => {
                        WarningNotify("This Client no active !!!")
                    }} className="custom_edit_btn">
                        <i className="fa-regular fa-calendar-xmark"></i>
                    </button>
            ),
        },
        {
            id: 11,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => {
                        props.editeClients(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
        {
            id: 12,
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
        <div>
            <Table
                localStoragePath="clients"
                pagination={true}
                excel={true}
                changeSizeMode={true}
                paginationApi={"/client/pagination?page={page}&limit={limit}"}
                dataProps={clients.clients}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
                columnsProps={columns}
                fileName={"clients"}
                excelPath={"/excel?component=clients&"}
            />
            <ClientPlan/>
        </div>
    );
}

export default connect((state) => state, clientsAction)(TableForClient);
