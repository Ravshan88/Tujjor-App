import React, {useState} from "react";
import Select from "react-select";
import {connect} from "react-redux";
import {MultiSelect} from "react-multi-select-component";

import {tableActions,} from "../Table/Redux/Reducers/tableReducer";
import './Filter.css'

function Filter(props) {
    const [options] = useState([
        {value: "10", label: "Option"},
        {value: "20", label: "Option"},
        {value: "30", label: "Option"},
        {value: "40", label: "Option"},
    ]);
    const [optionsActive] = useState([
        {value: "", label: "All"},
        {value: "true", label: "Active"},
        {value: "false", label: "Inactive"},
    ]);
    const [optionsWeeks] = useState([
        {value: "1", label: "All weeks"},
        {value: "2", label: "Every weeks"},
        {value: "3", label: "Odd weeks"},
    ]);
    const [optionsTin] = useState([
        {value: "1", label: "All"},
        {value: "2", label: "With TIN"},
        {value: "3", label: "Without TIN"},
    ]);
    const [optionsDay] = useState([
        {value: "1", label: "Monday"},
        {value: "2", label: "Tuesday"},
        {value: "3", label: "Wednesday"},
        {value: "4", label: "Thursday"},
        {value: "5", label: "Friday"},
        {value: "6", label: "Saturday"},
        {value: "6", label: "Sunday"},
    ]);
    const formInputsProps = props.table.formInputs;

    const customStyles = {
        control: (provided) => ({
            ...provided,
            minHeight: 34,
            border: "1px solid #d1d1d1",
        }),
    };


    function handleChangeActive(obj) {
        const {name, value} = obj;
        props.changeInputForms({...formInputsProps, [name]: value.value});
        if (!props.paginationApi) {
            props.changePaginationApi(obj.api)
        }
        props.getActiveData(props.paginationApi);
    }

    function handleChangeSearch(val) {
        props.changeQuickSearch(val);
        props.getQuickSearchData(props.paginationApi);
    }

    function selfEmployerMultiSelect(obj) {
        const myArr = []
        props.changeSelectedForms({...props.table.selectedForms, [obj.name]: obj.value})
        obj.value.map((item, index) => {
            myArr.push(item.value)
        })
        props.changePaginationApi(obj.api)
        props.changeInputForms({...formInputsProps, [obj.name]: myArr});
        props.getFilteredData(props.paginationApi)
    }

    function handleFilter(obj) {
        const {name, value} = obj;
        const myArr = []
        props.changePaginationApi(obj.api)
        if (Array.isArray(value)) {
            obj.value.map((item, index) => {
                myArr.push(item.value)
            })
            props.changeInputForms({...formInputsProps, [name]: myArr});
        } else {
            props.changeInputForms({...formInputsProps, [name]: value.value});
        }
    }


    function handleMultiSelect(obj) {
        const myArr = []
        props.changeSelectedForms({...props.table.selectedForms, [obj.name]: obj.value})
        obj.value.map((item, index) => {
            myArr.push(item.value)
        })
        if (!props.paginationApi) {
            props.changePaginationApi(obj.api)
        }
        props.changeInputForms({...formInputsProps, [obj.name]: myArr});
    }


    return (
        <div>
            <div className="row">
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "end",
                        gap:10
                    }}
                >
                    {props.search
                        ?
                        props.search.map((item, index) => {
                            if (item.selfEmployer) {
                                if (item.multi) {
                                    return (
                                        <div className={"my-2 filter_input"}>
                                            <MultiSelect
                                                options={item.options}
                                                value={props.table.selectedForms[item.name]}
                                                styles={customStyles}
                                                onChange={(e) => selfEmployerMultiSelect({
                                                    name: item.name,
                                                    value: e,
                                                    api: item.filterApi
                                                })}
                                                optionLabel="name"
                                                valueRenderer={(selected) => {
                                                    return selected.length
                                                        ? selected.map(({label}) => label)
                                                            ? selected.length === item.length : "All items are selected."
                                                        : item.placeholder;
                                                }}
                                                labelledBy={"select"}/>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className={"my-2 filter_input"}>
                                            <Select
                                                key={index}
                                                options={item.options}
                                                styles={customStyles}
                                                isMulti={item.multi}
                                                onChange={(e) =>
                                                    handleChangeActive({name: item.name, value: e, api: item.filterApi})
                                                }
                                                placeholder={item.placeholder}
                                            />
                                        </div>
                                    );
                                }

                            } else {
                                if (item.multi) {
                                    return (
                                        <div className={"my-2 filter_input"}>
                                            <MultiSelect
                                                options={item.options}
                                                value={props.table.selectedForms[item.name]}
                                                styles={customStyles}
                                                onChange={(e) => handleMultiSelect({
                                                    name: item.name,
                                                    value: e,
                                                    api: item.filterApi
                                                })}
                                                optionLabel="name"
                                                valueRenderer={(selected) => {
                                                    return selected.length
                                                        ? selected.map(({label}) => label)
                                                            ? selected.length === item.length : "All items are selected."
                                                        : item.placeholder;
                                                }}
                                                labelledBy={"select"}/>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className={"my-2 filter_input"}>
                                            <Select
                                                key={index}
                                                options={item.options}
                                                styles={customStyles}
                                                isMulti={item.multi}
                                                onChange={(e) =>
                                                    handleFilter({name: item.name, value: e, api: item.filterApi})}
                                                placeholder={item.placeholder}
                                            />
                                        </div>
                                    );
                                }
                            }
                        })
                        : ""}
                    {props.quickSearch ? (
                        <label className="" style={{height: 30}}>
                            <span style={{width: 60, height: 30}} className="text-white">Quick search:</span>
                            <input
                                value={formInputsProps.quickSearch}
                                onChange={(e) => handleChangeSearch(e.target.value)}
                                type="search"
                                style={{width: 180, height: 30}}
                                className="my-1 quickSearch"
                                placeholder=""
                            />
                        </label>
                    ) : (
                        ""
                    )}
                    {

                        props.filterButton
                            ?
                            <button
                                onClick={() => props.getFilteredData(props.paginationApi)}
                                className={"btn"}
                                style={{display: "inline-block", height: 40,backgroundColor:"#F5B301"}}
                            >
                                Filter
                            </button>
                            : (
                                ""
                            )}
                </div>
            </div>
        </div>
    );
}

export default connect((state) => state, tableActions)(Filter);