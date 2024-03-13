import React, {useEffect} from 'react';
import Table from "../../../../../universal/Table/Table";
import "../../../Teritory/Teritory.css"
import {connect} from "react-redux";
import {iconAction} from "../../Redux/Reducers/IconReducer";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {domen} from "../../../../../../Config/apiCall";
import {FloatButton} from 'antd';
import {CancelPresentation, RestoreFromTrashOutlined} from "@mui/icons-material";

function TableForIcon(props) {
    const {icons} = props;
    useEffect(() => {
        iconAction.getIcons()
    }, [icons.icons])
    const columns = [
        {
            id: 0, title: "№", key: "index", type: "index", show: true,
        },
        {
            id: 1,
            title: "Photo",
            key: "attachment.id",
            type: "jsx",
            show: true,
            data: (item) => {
                const api = domen + "/file/getFile/" + item.attachment.id
                return <div className={"rounded  py-2"}>
                    <LazyLoadImage width={60} height={60} effect={"blur"}
                                   src={api}
                                   alt=""/>
                </div>
            },
        },
        {
            id: 2, title: "Name", key: "name", type: "text", show: true,
        },
        {
            id: 3, title: "Update", key: "button", type: "jsx", show: true, data: (item) => (<button
                className="custom_edit_btn"
                onClick={() => {
                    props.editeIcon(item);
                }}
            >
                <i className="fa fa-edit"></i>
            </button>),
        },
    ];
    return (
        <div id={"forTable"}>
            <Table
                pagination={true}
                changeSizeMode={true}
                archive={true}
                tableHeader={true}
                paginationApi={"/icons/pagination?page={page}&limit={limit}"}
                dataProps={icons.icons}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 10, 20, 30, 40, 50]}
                columnsProps={columns}
            />
        </div>
    );
}

export default connect((state) => state, iconAction)(TableForIcon);