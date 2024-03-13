import React from 'react';
import Filter from "../../../../../universal/Filter/Filter";
import {connect} from "react-redux";
import {currierAction} from "../../Redux/Reducers/CurrierReducers";

function FilterForCurrier(props) {
    const {currier} = props;
    return (
        <Filter search={[
            {
                name: "active",
                multi: false,
                options: currier.optionsActive,
                defaultValue: {value: "", label: "All"},
                placeholder: "Active",
                selfEmployer: true,
                filterApi: "/currier/pagination?page={page}&limit={limit}"
            },
        ]}/>
    );
}

export default connect((state) => state, currierAction)(FilterForCurrier);