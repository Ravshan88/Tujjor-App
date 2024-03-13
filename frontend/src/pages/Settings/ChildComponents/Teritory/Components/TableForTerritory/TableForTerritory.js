import React from 'react';
import Table from "../../../../../universal/Table/Table";
import "../../Teritory.css"
import {connect} from "react-redux";
import {teritoryAction} from "../../Redux/Reducers/teritoryReducer";

function TableForTerritory(props) {
    const { teritory } = props;
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
                        props.editeTeritory(item);
                    }}
                >
                    <i className="fa fa-edit"></i>
                </button>
            ),
        },
        {
            id: 6,
            title: "Archive",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button onClick={()=>{props.archiveTerritory(item.id)}} className={"custom_archive_btn"}>
                    archive
                </button>
            ),
        },
    ];
    return (
        <div id={"forTable"}>
            <Table
                pagination={true}
                changeSizeMode={true}
                excelPath={"/excel?component=territory&"}
                fileName={"territories"}
                excel={true}
                localStoragePath="territoryColumns"
                excelWithoutSearch={false}
                paginationApi={"/territory/pagination?page={page}&limit={limit}"}
                dataProps={teritory.teritories}
                columnOrderMode={true}
                changeSizeModeOptions={["All",10,20,30,40,50]}
                columnsProps={columns}
                archiveVisibility={true}
                handleArchiveDataVisibility={()=>props.handleTerritoryVisibility()}
            />
        </div>
    );
}
export default connect((state) => state, teritoryAction)(TableForTerritory);