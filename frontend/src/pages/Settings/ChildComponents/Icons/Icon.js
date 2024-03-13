import React, {useEffect} from "react";
import {connect} from "react-redux";
import "../Teritory/Teritory.css"
import HeaderForIcon from "pages/Settings/ChildComponents/Icons/Components/HeaderForTerritory/HeaderForIcon";
import TableForIcon from "pages/Settings/ChildComponents/Icons/Components/TableForTerritory/TableForIcon";
import ModalForIcon from "pages/Settings/ChildComponents/Icons/Components/ModalForTerritory/ModalForIcon";
import {iconAction} from "pages/Settings/ChildComponents/Icons/Redux/Reducers/IconReducer";

function Icon(props) {

    useEffect(() => {
        props.getIcons();
    }, []);

    return (
        <div id={"fatherDivForTerritory"}>
            <HeaderForIcon/>
            <TableForIcon/>
            <ModalForIcon/>
        </div>
    );
}

export default connect((state) => state, iconAction)(Icon);