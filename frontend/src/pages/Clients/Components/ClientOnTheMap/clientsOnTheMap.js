import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import {teritoryAction} from "../../../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import HeaderForMap from "./HeaderForMap/HeaderForMap";
import MapForMap from "./MapForClientOnTheMap/MapForMap";
import Loading from "../../../Loading/Loading";

function ClientsOnTheMap(props) {
    const dispatch = useDispatch();
    const {clients} = props;
    useEffect(() => {
        dispatch(teritoryAction.getTeritory());
        props.changeLoadingActive(true);
        localStorage.setItem("sidebar_button", "map")
        setTimeout(() => {
            props.changeLoadingActive(false);
        }, 1000);
        props.getClients();
    }, []);

    return (
        <div id={"bigFatherForMap"}>
            <div id={"smallFatherForMap"} style={{display: clients.isLoading ? "flex" : "block"}}>
                {clients.isLoading ? (
                    <div id={'forLoading'}>
                   <Loading />
                    </div>
                ) : (
                    <>
                        <HeaderForMap />
                        <MapForMap/>
                    </>
                )}
            </div>
        </div>
    );
}

export default connect((state) => state, clientsAction)(ClientsOnTheMap);
