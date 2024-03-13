import React, {useEffect} from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {
    customerCategoryActions
} from "pages/Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer";
import Table from "pages/universal/Table/Table";
import LangData from "../../../../../../Languages/Language.json";
import UniversalArchiveModal from "pages/universal/UniversalArchiveModal/UniversalArchiveModal";

function ModalForArchivedData(props) {
    const {customerCategory} = props;
    useEffect(() => {
       props.getArchives()
    }, [])
    const style = {
        position: "absolute",
        top: "48%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "none",
        boxShadow: 24,
        borderRadius: "10px",
        width: "50%",
        overflow: "auto",
        maxHeight: '655px',
    };

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
            title: "Delete",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    style={{backgroundColor:"red",borderRadius:"10px",border:"1px solid white",width:"40px",height:"30px"}}
                    className="custom_delete_btn"
                    onClick={() => props.deleteItem(item.id)}
                >
                    <i className="fa fa-delete" style={{color:"white"}}>X</i>
                </button>
            ),
        }
    ];
    // console.log(customerCategory.archivedData)
    return (
        <div>
            <UniversalArchiveModal visibility={customerCategory.visibility} style={style} handleArchiveModalVisibility={props.handleArchiveModalVisibility} data={customerCategory.archivedData} columns={columns}/>

        </div>
    );
}

export default connect(
    (state) => state,
    customerCategoryActions
)(ModalForArchivedData);