import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {clientsTelegramModel} from "./Redux/Reducers/clientsTelegramReducer";
import PhoneInput from "react-phone-input-2";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import logo from "../../../images/logo.jpg";

function UpdateClientsTelegram(props) {
    function handleMapClick(event) {
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.changeLatitude(latitude)
        props.changeLongitude(longitude)
    }

    useEffect(() => {
        if ((props.initData.territoryId !== "" && props.initData.categoryId !== "" && props.initData.phone !== "" && props.initData.name.replaceAll(" ", "") !== "" && props.initData.companyName.replaceAll(" ", "") !== "" && props.initData.address.replaceAll(" ", "") !== "" && props.initData.latitude !== "" && props.initData.longitude !== "") && (props.initData.phone.length === 13 || props.initData.length === 12) && (props.initData.phone.startsWith("998") || props.initData.phone.startsWith("+998"))) {
            props.changeDisable(false)
        } else {
            props.changeDisable(true)
        }
    }, [props.initData]);

    return (
        <div style={{padding: 10}}>
            <select value={props?.initData.territoryId} className={"form-control mb-3"}
                    onChange={(e) => props.changeTerritoryId(e.target.value)}
            >
                <option value="" disabled={true} selected={true}>Select Territory</option>
                {props?.territories?.map((i) => <option value={i.id}>{i?.name}</option>)}
            </select>
            <select value={props?.initData.categoryId} className={"form-control mb-3"}
                    onChange={(e) => props.changeCategoryId(e.target.value)}
            >
                <option value="" disabled={true} selected={true}>Select Category</option>
                {props?.categories?.map((i) => <option value={i.id}>{i?.name}</option>)}
            </select>
            <PhoneInput
                value={props?.initData.phone}
                onChange={(e) => props.changePhone(e)}
                inputClass="w-100"
                country="uz"
                required={true}
            />
            <input
                value={props?.initData.name}
                onChange={(e) => props.changeName(e.target.value)}
                type="text"
                placeholder="Name"
                className="form-control my-3"
                required={true}
            />
            <input
                value={props?.initData.companyName}
                onChange={(e) => props.changeCompanyName(e.target.value)}
                type="text"
                placeholder="Company Name"
                className="form-control mb-3"
                required={true}
            />
            <input
                value={props?.initData.address}
                onChange={(e) => props.changeAddress(e.target.value)}
                type="text"
                placeholder="Address"
                className="form-control mb-3"
                required={true}
            />
            <input
                value={props?.initData.tin}
                onChange={(e) => props.changeTin(e.target.value)}
                type="text"
                placeholder="Tin (Optinal)"
                className="form-control mb-3"
                required={true}
            />
            <label className={'mb-3'}>
                Active
                <input type="checkbox" checked={props?.initData.active}
                       onChange={(e) => props.changeActive(e.target.checked)}/>
            </label>
            <YMaps
                query={{
                    apikey: "8edc3e7a-dd1a-4d9e-87d0-2d9c9865170e",
                    lang: "en_US",
                    coordorder: "latlong",
                    load: "package.full",
                }}
            >
                <Map
                    width={"100%"}
                    height={300}
                    defaultState={{
                        center: [props.initData.latitude, props.initData.longitude],
                        zoom: 10,
                    }}
                    onClick={handleMapClick}
                    modules={["templateLayoutFactory"]}
                >
                    <Placemark
                        options={{iconColor: "blue", iconImageHref: logo}}
                        geometry={[props.initData.latitude, props.initData.longitude]}
                        modules={["geoObject.addon.balloon"]}
                    />
                </Map>
            </YMaps>
            <div className={'btn-group my-3 w-100'}>
                <button onClick={() => props.changeUpdateBox()} className={'btn btn-danger'}>Cancel <i
                    className="fa-regular fa-circle-left"></i></button>
                <button disabled={props.disabled} onClick={() => props.updateClient()}
                        className={'btn btn-dark'}>Update <i
                    className="fa-solid fa-pen"></i></button>
            </div>
        </div>
    );
}

export default connect(state => state.clientsTelegram, clientsTelegramModel)(UpdateClientsTelegram);