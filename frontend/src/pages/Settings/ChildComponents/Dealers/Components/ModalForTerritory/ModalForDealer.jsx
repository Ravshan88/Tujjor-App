import React, {useContext, useEffect, useState} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {dealerAction} from "../../Redux/Reducers/dealerReducer";
import "../../Dealer.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"
import Select from "react-select";
import PhoneInput from "react-phone-input-2";

function ModalForDealer(props) {
    const {langIndex} = useContext(LanguageContext)
    const {dealer} = props;

    function checkInpValue() {
        return dealer.fullName ||
            dealer.address ||
            dealer.company ||
            dealer.password ||
            dealer.agents.length ||
            dealer.phone !== "998" ||
            dealer.ownAgents ||
            dealer.partnership;

    }

    function generateOptionsOfDealer() {
        const optionsDealer = [];
        dealer.agents.map((item) => {
            optionsDealer.push({
                value: item.id,
                label: item.username,
            });
        });
        return optionsDealer;
    }

    function handleSelect(selectedItems) {
        props.setSelectedAgents(selectedItems.map(item => item.value))
    }

    return (
        <UniversalModal
            modalTitle={
                dealer.itemForDealerEdit === ""
                    ? `${langData[langIndex]?.dealerPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.dealerPage?.modal?.editeTitle}`
            }
            checkPage={checkInpValue()}
            isOpen={dealer.openModal}
            closeFunction={() => props.handleClose()}
            width={60}
            functionforSaveBtn={(modalButton) => props.saveDealer(modalButton)}
            JsxData={
                <div className={"w-100"}>
                    <label className={"w-100"}>
                        <span className={"d-block"}>Agents*</span>
                        <Select
                            isDisabled={dealer.ownAgents}
                            options={generateOptionsOfDealer()}
                            isDisabled={dealer.ownAgents}
                            isMulti={true}
                            value={generateOptionsOfDealer().filter(item => dealer.selectedAgents.includes(item.value))}
                            onChange={handleSelect}
                            placeholder={langData[langIndex]?.dealerPage?.modal?.selectOptions}
                        />
                    </label>

                    <label className={"w-100 mt-3"}>
                        <span className={"d-block"}>{langData[langIndex]?.dealerPage?.modal?.phoneNumber}</span>
                        <PhoneInput
                            inputStyle={{width: "100%"}}
                            value={dealer.phone}
                            onChange={(e) => props.handlePhone(e)}
                        />
                    </label>
                </div>
            }
            inpData={[
                {
                    id: 1,
                    title: `${langData[langIndex]?.dealerPage?.modal?.fullName}`,
                    value: dealer.fullName,
                    onChange: (e) => props.handleFullname(e.target.value),
                    type: "text",
                },

                {
                    id: 2,
                    title: `${langData[langIndex]?.dealerPage?.modal?.address}`,
                    value: dealer.address,
                    onChange: (e) => props.handleAddress(e.target.value),
                    type: "text",
                },
                {
                    id: 3,
                    title: `${langData[langIndex]?.dealerPage?.modal?.company}`,
                    value: dealer.company,
                    onChange: (e) => props.handleCompany(e.target.value),
                    type: "text",
                },
                {
                    id: 4,
                    title: `${langData[langIndex]?.dealerPage?.modal?.password}`,
                    value: dealer.password,
                    onChange: (e) => props.handlePassword(e.target.value),
                    type: "text",
                },
                {
                    id: 5,
                    title: `${langData[langIndex]?.dealerPage?.modal?.ownAgents}`,
                    value: dealer.ownAgents,
                    onChange: (e) => props.handleOwnAgents(e.target.checked),
                    type: "checkbox",
                },
                {
                    id: 6,
                    title: `${langData[langIndex]?.dealerPage?.modal?.partnership}`,
                    value: dealer.partnership,
                    onChange: (e) => props.handlePartnership(e.target.checked),
                    type: "checkbox",
                },
            ]}
        />
    );
}

export default connect((state) => state, dealerAction)(ModalForDealer);