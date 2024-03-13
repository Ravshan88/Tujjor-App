import React, {useEffect} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import logo from "../../../../../images/logo.jpg";
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/Reducers/clientsReducer";
import {domen} from "Config/apiCall";
import {convertToTitleFromDate} from "tools/utils";

function MapForMap(props) {
    const {clients} = props;
    const {teritory} = props;
    useEffect(() => {
        props.getClientsForMap();
    }, []);

    return (<YMaps
        query={{
            apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
            lang: "en_US",
            coordorder: "latlong",
            load: "package.full",
        }}

    >
        <Map
            width={"100%"}
            height={"70%"}
            defaultState={{
                center: [39.7756, 64.4253],
                zoom: 10,
            }}
            modules={["templateLayoutFactory"]}
        >
            <ZoomControl options={{float: "right"}}/>
            {clients?.clientsForMap?.map((address, index) => {
                return address.active ? (
                    clients.showActiveClient?
                        <Placemark
                            // onClick={()=>props.getPlanForMap(address.id)}
                            properties={{
                                // hintContent: 'Bu yerda markaziy nuqta',
                                balloonContent:
                                    (address.amount ===null ||  address.planDate ===null  || address.amount ==="" ||  address.planDate ==="")?
                                `${new DOMParser().parseFromString(
                                '<div>' +
                                '<p style="background-color: rgb(0,182,0);" id="textRightClientName">Name: '+address.clientName+'</p>' + 
                                    '<p style="background-color: red;" id="textRightClientName" > No Plan...</p>' +
                                '</div>', 'text/html').body.firstChild.outerHTML}`
                                :
                                `${new DOMParser().parseFromString(
                                '<div>' +
                                '<p style="background-color: rgb(0,182,0);" id="textRightClientName">Name: '+address.clientName+'</p>' +
                                '<p id="textRightDiv1">Plan: '+address.amount+'</p>' +
                                '<p id="textRightDiv2">Date: '+convertToTitleFromDate(address.planDate)+'</p>' +
                                '</div>', 'text/html').body.firstChild.outerHTML}`,
                                // iconCaption: address.clientName,
                                iconContent: `${new DOMParser().parseFromString('<div id="mapCard">' +
                                '<div style="border: 2px solid #00b600;" id="leftDiv"><img id="iconImage" src='+(domen+ "/file/getFile/" + address.image)+' alt="#"></div>'+
                                '<div>' +
                                '<p style="background-color: rgba(0,182,0,0.5);" id="textRightClientName2">'+address.clientName+'</p>' +
                                '</div>'+
                                '</div>', 'text/html').body.firstChild.outerHTML}`

                            }}
                            key={index}
                            geometry={[address.latitude, address.longitude]}
                        />:""
                ) : (
                    clients.showUnActiveClient?
                        <Placemark
                            // onClick={()=>props.getPlanForMap(address.id)}
                            properties={{
                                // hintContent: 'Bu yerda markaziy nuqta',
                                balloonContent:
                                    (address.amount ===null   || address.planDate ===null   || address.amount ===""  ||  address.planDate ==="")?
                                `${new DOMParser().parseFromString(
                                '<div>' +
                                '<p style="background-color: rgb(255, 0, 0);" id="textRightClientName">Name: '+address.clientName+'</p>' +
                                '</div>', 'text/html').body.firstChild.outerHTML}`
                                :
                                `${new DOMParser().parseFromString(
                                '<div>' +
                                '<p style="background-color: rgb(255, 0, 0);" id="textRightClientName">Name: '+address.clientName+'</p>' +
                                '<p id="textRightDiv1">Plan: '+address.amount+'</p>' +
                                '<p id="textRightDiv2">Date: '+convertToTitleFromDate(address.planDate)+'</p>' +
                                '</div>', 'text/html').body.firstChild.outerHTML}`,
                                // iconCaption: address.clientName,
                                iconContent: `${new DOMParser().parseFromString('<div id="mapCard">' +
                                '<div style="border: 2px solid red;" id="leftDiv"><img id="iconImage" src='+(domen+ "/file/getFile/" + address.image)+' alt="#"></div>'+
                                '<div>' +
                                '<p style="background-color: rgba(255, 0, 0, 0.5);" id="textRightClientName2">'+address.clientName+'</p>' +
                                '</div>'+
                                '</div>', 'text/html').body.firstChild.outerHTML}`

                            }}
                            key={index}
                            geometry={[address.latitude, address.longitude]}
                        />:""
                );
            })}
            {teritory?.teritories?.map((item, index) => {
                return (
                    clients.showTerritory?
                        <Placemark
                            properties={{
                                // balloonContent: item.name,
                                // hintContent: 'Bu yerda markaziy nuqta',
                                // iconContent: "Salom",
                                iconCaption: item.name,
                            }}
                            options={{iconColor: "blue", iconImageHref: logo}}
                            key={index}
                            geometry={[item.latitude, item.longitude]}
                        />:""
                );
            })}
        </Map>
        </YMaps>
    );
}
export default connect((state) => state, clientsAction)(MapForMap);