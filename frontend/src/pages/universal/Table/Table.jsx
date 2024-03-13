import React, {useEffect} from "react";
import {connect} from "react-redux";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {tableActions} from "./Redux/Reducers/tableReducer";
import Pagination from "@mui/material/Pagination";
import Filter from "../Filter/Filter";
import Dropdown from "../Dropdown/Dropdown";
import UniversalModal from "../Modal/UniverModal";

import "./Table.css";
import Loading from "../../Loading/Loading";
import {convertToTitleFromDate} from "tools/utils";
import {Spin} from "antd";


const Table = (props) => {
    useEffect(() => {

        let storedColumns = JSON.parse(
            localStorage.getItem(props.localStoragePath)
        );
        if (props.paginationApi) {
            props.changePaginationApi(props.paginationApi);
        }

        if (storedColumns === null) storedColumns = props.columnsProps;
        else {
            if (storedColumns.length === 0) storedColumns = props.columnsProps;
        }

        const modifiedColumns = storedColumns.map((item) => {
            if (props.columnsProps[item.id] === undefined) {
                localStorage.removeItem(props.localStoragePath);
                return;
            }
            return {...props.columnsProps[item.id], show: item.show};
        });

        try {
            props.claimData({
                columns: modifiedColumns,
                data: props.dataProps,
                localPath: props.localStoragePath,
            });
        } catch (e) {
            props.claimData({
                columns: props.columnsProps,
                data: props.dataProps,
                localPath: props.localStoragePath,
            });
            localStorage.removeItem(props.localStoragePath);
        }
        if (props.pagination === true && !props.paginationApi)
            alert("Pagination API is required!"); // Case When Pagination true Pagination Api Is null

        if (props.changeSizeMode && props.paginationApi) {
            if (!props.firstRequest) {
                props.setFirstRequest(true);
                props.changePaginationTo({
                    size: props.changeSizeModeOptions[1],
                    page: 1,
                });
            } else {
                props.changePaginationTo({
                    size: props.limit,
                    page: props.currentPage,
                });
            }

            if (props.limit === "All") {
                props.changeTotalPages(-1);
            }
        }
    }, [props.dataProps]);


    const getValueByKeys = (obj, keys) => {
        const keysArray = keys.split("+").map((key) => key.trim());
        const values = keysArray.map((key) =>
            key.split(".").reduce((acc, k) => (acc && acc[k]) || "", obj)
        );
        return values.join(" ");
    };


    function handleDragEnd(result) {
        if (!result.destination) return;
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        props.reorderColumns({sourceIndex, destinationIndex});
    }

    useEffect(() => {
        props.loading();
        return () => {
            props.emptyFilters();
        };
    }, []);

    function getCheckPage() {
        return !(JSON.stringify(props.columns) === JSON.stringify(props.modalColumns));
    }


    function numbering(index) {
        return props.limit === "All"
            ? index + 1 + 0 * (props.currentPage - 1)
            : index +
            1 +
            props.limit * (props.currentPage - 1);
    }

    return (
        <div className="universal_table">
            {props.isLoading ? (
                <Spin size={"large"} className={"p-2"}/>
            ) : (
                <>
                    <div className="d-flex flex-column gap-2 p-2">
                        <div className="d-flex flex-column">
                            {props.tableHeader === false ? "" :
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    <div className="d-flex  flex-wrap align-items-center">
                                        {props.changeSizeMode ? (
                                            <Dropdown
                                                multiSelect={false}
                                                customTitle={
                                                    props.limit
                                                        ? "By " + props.limit
                                                        : "By " + props.changeSizeModeOptions[1]
                                                }
                                                dropdownId="1"
                                                body={props.changeSizeModeOptions.map((item) => ({
                                                    title: item,
                                                }))}
                                                onItemClick={(item) => {
                                                    props.handlePageChange(1);
                                                    props.changePaginationTo({
                                                        size: item,
                                                        page: 1,
                                                    });
                                                }}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        <Dropdown
                                            customTitle="Table Setup"
                                            multiSelect={true}
                                            dropdownId="2"
                                            body={(props.columns.length != 0
                                                    ? props.columns
                                                    : props.copyOfColumns
                                            ).map((item) => ({
                                                title: item.title,
                                                show: item.show,
                                            }))}
                                            onItemClick={(item) => {
                                                props.filterVisibility(item);
                                            }}
                                        />
                                        {props.excel ? <button
                                            style={{width: "100px"}}
                                            className="custom_btn"
                                            download
                                            onClick={() => {
                                                props.getExcelFile({
                                                    excelWithoutSearch: props.excelWithoutSearch,
                                                    path: props.excelPath,
                                                    fileName: props.fileName,
                                                });
                                            }}
                                        >
                                            Excel
                                        </button> : ""}
                                        <button
                                            className="custom_btn"
                                            onClick={() => props.setColumnModalVisibility(true)}
                                        >
                                            Column Order
                                        </button>
                                        {props.archiveVisibility === false ? "Not Archive Yet" : <button
                                            className="custom_btn"
                                            onClick={() => props.handleArchiveDataVisibility()}
                                        >
                                            Archived data
                                        </button>}
                                    </div>
                                    {props.columnOrderMode && props.columns.length ? (
                                        <Filter quickSearch></Filter>
                                    ) : (
                                        ""
                                    )}
                                </div>}
                        </div>
                        <UniversalModal
                            modalTitle={"Columns order"}
                            height="300px"
                            isOpen={props.columnOrderModalVisibility}
                            checkPage={getCheckPage()}
                            closeFunction={() =>
                                props.setColumnModalVisibility(false) &
                                props.setModalColumns(props.columns)
                            }
                            width={33}
                            functionforSaveBtn={() => props.saveColumnOrder()}
                            JsxData={
                                <div className="modal-body d-flex flex-column gap-1">
                                    <DragDropContext onDragEnd={handleDragEnd}>
                                        <Droppable droppableId="columnList" direction="vertical">
                                            {(provided) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {props.modalColumns.map((item, index) =>
                                                        item.show ? (
                                                            <Draggable
                                                                key={item.id.toString()}
                                                                draggableId={item.id.toString()}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={
                                                                            "w-100 d-flex bg-secondary text-white p-2" +
                                                                            (item.show ? "" : " hidden")
                                                                        }
                                                                        style={{
                                                                            ...provided.draggableProps.style,
                                                                            left: 0,
                                                                            top: 0,
                                                                            position: "relative",
                                                                        }}
                                                                    >
                                                                        {item.title}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ) : (
                                                            ""
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            }
                        />
                        <div style={{height: "380px", overflow: "auto"}}>
                            <table className="table mytable">
                                <thead className={"table_thead"}>
                                <tr>
                                    {(props.columns.length === 0
                                            ? props.columnsProps
                                            : props.columns
                                    ).map((item) => (
                                        <th className={item.show ? "" : "hidden"}>
                                            {item.title}
                                        </th>
                                    ))}
                                    {props.additionalColumns ? <th>More</th> : ""}
                                </tr>
                                </thead>
                                <tbody>
                                {props.columns.length === 0 || props.data.length === 0 ? (
                                    <tr>
                                        <th colSpan={props.columns.length} className="text-center">
                                            No Data
                                        </th>
                                    </tr>
                                ) : (
                                    ""
                                )}
                                {props.columns.length !== 0 &&
                                    props.data.map((item, index) => (
                                        <tr key={item.id}>
                                            {props.columns.map((col) =>
                                                col.type === "jsx" ? (
                                                    <td width="20" className={col.show ? "" : "hidden"}>
                                                        {col.data(item)}
                                                    </td>
                                                ) : col.type === "index" ? (
                                                    <td className={col.show ? "" : "hidden"}>
                                                        {numbering(index)}
                                                    </td>
                                                ) : col.type === 'date' ? <td className={col.show ? "" : "hidden"}>
                                                    {convertToTitleFromDate(item[col.key])}
                                                </td> : col.type === "boolean" && (col.key === "active" || col.key === "telegram_Id" || col.key === "ownAgents" || col.key === "partnership") ? (
                                                    <td
                                                        className={
                                                            item[col.key]
                                                                ? "text-success" + (col.show ? "" : " hidden")
                                                                : "text-danger" + (col.show ? "" : " hidden")
                                                        }
                                                    >
                                                        {(item[col.key] && item[col.key] !== null) ? "active" : "unactive"}
                                                    </td>
                                                ) : col.type !== "jsx" ? (
                                                    <td className={col.show ? "" : "hidden"}>
                                                        {getValueByKeys(item, col.key)}
                                                    </td>
                                                ) : (
                                                    ""
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {props.totalPages !== "" &&
                        props.pagination &&
                        props.data.length ? (
                            <div className="d-flex justify-content-end pt-2">
                                <Pagination
                                    onChange={(e, page) => {
                                        props.handlePageChange(page);
                                        props.changePaginationTo({
                                            size: props.limit,
                                            page,
                                        });
                                    }}
                                    page={props.currentPage}
                                    count={props.totalPages}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default connect((state) => state.table, tableActions)(Table);
