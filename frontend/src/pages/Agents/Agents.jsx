import {connect} from 'react-redux';
import {agentActions} from './Redux/Reducers/agentReducer';
import React, {useContext, useEffect} from 'react';
import Table from 'pages/universal/Table/Table';
import UniversalModal from 'pages/universal/Modal/UniverModal';
import "./agents.css"
import "bootstrap/dist/css/bootstrap.min.css"
import langData from "../../Languages/Language.json"
import LanguageContext from "../../Languages/Contex/Language";
import Select from "react-select";

function Agents(props) {
    const {langIndex} = useContext(LanguageContext)

    useEffect(() => {
        props.getAgents()
    },[])


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
            title: "Telephone",
            key: "phone",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Username",
            key: "username",
            type: "text",
            show: true,
        },
    
       
        {
            id: 3,
            title: "Dealer",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <div
                >
                    {
                        JSON.parse(item.dealer)[0].fullname ? <p>{JSON.parse(item.dealer)[0].fullname}</p> :
                            <p className={"text-danger  "}>Not Exist </p>
                    }
                </div>
            ),
        },
        {
            id: 4,
            title: "Update",
            key: "button",
            type: "jsx",
            show: true,
            data: (item) => (
                <button
                    className="custom_edit_btn"
                    onClick={() => props.editAgent(item)}>
                    <i className="fa fa-edit"></i>
                </button>
            ),
        }
    ]

    function getCheckPage() {
        if (props.username !== "" || props.phone !== "998" || props.password !== "") return true;
        return false;
    }


    function generateOptionsOfDealers() {
        const optionsDealer = [];
        props.dealers.map((item) => {
            optionsDealer.push({
                value: item.id,
                label: item.fullName,
            });
        });
        return optionsDealer;
    }

    function handleSelect(selectedItem) {
        props.setSelectedDealer(selectedItem ? selectedItem.value : "");
    }


    return (
        <div id={"bigFatherForAgents"}>
            <div id={"header"}>
                <span className='text-white'>{langData[langIndex]?.agentsPage?.title}</span>
                <button onClick={props.openModal}> + {langData[langIndex]?.agentsPage?.addBtn}</button>
            </div>
            <UniversalModal
                modalTitle={props.editingItem === "" ? `${langData[langIndex]?.agentsPage?.modal?.addTitle}` : `${langData[langIndex]?.agentsPage?.modal?.editeTitle}`}
                isOpen={props.modalVisibility}
                closeFunction={() => props.resetModal()}
                width={53}
                checkPage={getCheckPage()}
                functionforSaveBtn={(e) => props.saveAgent(e)}
                JsxData={
                    <div className={"w-100"}>
                        <label className={"w-100"}>
                            <span className={"d-block"}>Dealers*</span>
                            <Select
                                isDisabled={props.ownAgents}
                                options={generateOptionsOfDealers()}
                                value={generateOptionsOfDealers().find(item => item.value === props.selectedDealer)}
                                onChange={handleSelect}
                                placeholder={langData[langIndex]?.agentsPage?.modal?.selectDealers}
                            />

                        </label>

                    </div>
                }
                inpData={[
                    {
                        id: 1,
                        title: `${langData[langIndex]?.agentsPage?.modal?.userName}`,
                        value: props.username,
                        onChange: (e) => props.setUserName(e.target.value),
                        type: "text",
                    },
                    {
                        id: 2,
                        title: `${langData[langIndex]?.agentsPage?.modal?.phone}`,
                        value: props.phone,
                        onChange: (e) => props.setPhone(e),
                        type: "number",
                        phone: true
                    },
                    {
                        id: 3,
                        title: `${langData[langIndex]?.agentsPage?.modal?.password}`,
                        value: props.password,
                        onChange: (e) => props.setPassword(e.target.value),
                        type: "text",
                    },
                    {
                        id: 4,
                        title: `${langData[langIndex]?.agentsPage?.modal?.ownAgents}`,
                        value: props.ownAgents,
                        onChange: (e) => props.setOwnAgents(e.target.checked),
                        type: "checkbox",
                    }
                ]}
            />
            <Table
                localStoragePath="agents"
                pagination={true}
                changeSizeMode={true}
                paginationApi={"/agent/pagination?page={page}&limit={limit}"}
                dataProps={props.agents}
                columnOrderMode={true}
                changeSizeModeOptions={["All", 10, 20, 50, 100, 200]}
                columnsProps={columns}
                fileName={"agents"}
                excelPath={"/excel?component=agent&"}
            />
        </div>
    );
}

export default connect((state => state.agents), agentActions)(Agents);