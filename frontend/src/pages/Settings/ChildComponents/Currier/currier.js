import React, {useEffect} from 'react';
import {connect} from "react-redux"
import {currierAction} from "./Redux/Reducers/CurrierReducers";
import CurrierHeader from "./Components/HeaderForCurrier/CurrierHeader";
import ModalForCurrier from "./Components/ModalForTerritory/ModalForCurrier";
import TableForCurrier from "./Components/TableForCurrier/TableForCurrier";
import FilterForCurrier from "./Components/FilterForCurrier/FilterForCurrier";

function Currier(props) {

    useEffect(() => {
        props.getCurrier()
    }, [])

    return (
        <div id={"fatherDivForTerritory"}>
            <CurrierHeader/>
            <FilterForCurrier/>
            <ModalForCurrier/>
            <TableForCurrier/>
        </div>
    );
}

export default connect((state) => state, currierAction)(Currier);