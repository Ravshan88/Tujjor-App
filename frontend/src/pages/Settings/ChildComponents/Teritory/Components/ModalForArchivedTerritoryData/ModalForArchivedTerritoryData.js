import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {teritoryAction} from "pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import UniversalArchiveModal from "pages/universal/UniversalArchiveModal/UniversalArchiveModal";

function ModalForArchivedTerritoryData(props) {
    useEffect(()=>{
        props.getArchivedData()
    },[])
    const { teritory } = props;
    console.log(teritory.archivedData)
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
            title: "Delete",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    style={{backgroundColor:"red",borderRadius:"10px",border:"1px solid white",width:"40px",height:"30px"}}
                    className="custom_delete_btn"
                    onClick={() => props.deleteArchivedTerritory(item.id)}
                >
                    <i className="fa fa-delete" style={{color:"white"}}>X</i>
                </button>
            ),
        }
    ];
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
    return (
        <div>
            <UniversalArchiveModal visibility={teritory.visibility} style={style} handleArchiveModalVisibility={props.handleTerritoryVisibility} data={teritory.archivedData}/>
        </div>
    );
}

export default connect((state) => state, teritoryAction)(ModalForArchivedTerritoryData);