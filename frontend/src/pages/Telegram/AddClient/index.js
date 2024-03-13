import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Select from 'react-select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {connect} from "react-redux";
import {telegramClientModel} from "../Redux/Reducers/telegramClientReducer";
import './style.css'
import {Map, Placemark, YMaps} from "react-yandex-maps";
import logo from "../../../images/logo.jpg";

const telegram = window.Telegram.WebApp;

function Index(props) {
    const {telegramClients} = props
    const {token} = useParams();
    useEffect(() => {
        localStorage.setItem("access_token", token)
    }, [token]);
    useEffect(() => {
        telegram.ready();
        props.claimData();
    }, []);
    const onCheckout = (check) => {
        if (check) {
            telegram.MainButton.text = 'SAVE';
            telegram.MainButton.show();
        } else {
            telegram.MainButton.hide();
        }
    };
    const onSendData = useCallback(() => {
        telegram.sendData(JSON.stringify(telegramClients?.initData));
    }, [telegramClients.initData]);
    useEffect(() => {
        if (telegramClients.initData.territoryId !== "" && telegramClients.initData.categoryId !== "" && telegramClients.initData.phone !== "" && telegramClients.initData.name.replaceAll(" ", "") !== "" && telegramClients.initData.companyName.replaceAll(" ", "") !== "" && telegramClients.initData.address.replaceAll(" ", "") !== "" && telegramClients.initData.latitude !== "" && telegramClients.initData.longitude !== "" && telegramClients.initData.phone.length === 12 && telegramClients.initData.phone.startsWith("998")) {
            onCheckout(true)
            telegram.onEvent('mainButtonClicked', onSendData);
            return () => telegram.offEvent('mainButtonClicked', onSendData);
        }else {
            onCheckout(false)
        }
    }, [telegramClients?.initData, onSendData]);

    function handleMapClick(event) {
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.changeLatitude(latitude)
        props.changeLongitude(longitude)
    }

    return (
        <div className='telegram_add_client'>
            <Select
                placeholder="Select Territory"
                options={telegramClients?.territories?.map(i => ({value: i?.id, label: i?.name}))}
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={telegramClients?.initData.territoryId}
                onChange={(e) => props.changeTerritoryId(e.value)}
            />
            <Select
                placeholder="Select Category"
                options={telegramClients?.categories?.map(i => ({value: i?.id, label: i?.name}))}
                className="basic-multi-select my-3"
                classNamePrefix="select"
                defaultValue={telegramClients?.initData.categoryId}
                onChange={(e) => props.changeCategoryId(e.value)}
            />
            <PhoneInput
                value={telegramClients?.initData.phone}
                onChange={(e) => props.changePhone(e)}
                inputClass="w-100"
                country="uz"
                required={true}
            />
            <input
                value={telegramClients?.initData.name}
                onChange={(e) => props.changeName(e.target.value)}
                type="text"
                placeholder="Name"
                className="form-control my-3"
                required={true}
            />
            <input
                value={telegramClients?.initData.companyName}
                onChange={(e) => props.changeCompanyName(e.target.value)}
                type="text"
                placeholder="Company Name"
                className="form-control mb-3"
                required={true}
            />
            <input
                value={telegramClients?.initData.address}
                onChange={(e) => props.changeAddress(e.target.value)}
                type="text"
                placeholder="Address"
                className="form-control mb-3"
                required={true}
            />
            <input
                value={telegramClients?.initData.tin}
                onChange={(e) => props.changeTin(e.target.value)}
                type="text"
                placeholder="Tin (Optinal)"
                className="form-control mb-3"
                required={true}
            />
            <label>
                Active
                <input type="checkbox" checked={telegramClients?.initData.active}
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
                        center: [65.75757475, 53.74773654],
                        zoom: 10,
                    }}
                    onClick={handleMapClick}
                    modules={["templateLayoutFactory"]}
                >
                    <Placemark
                        options={{iconColor: "blue", iconImageHref: logo}}
                        geometry={[telegramClients.initData.latitude, telegramClients.initData.longitude]}
                    />
                </Map>
            </YMaps>
        </div>
    );
}

export default connect((state) => state, telegramClientModel)(Index);