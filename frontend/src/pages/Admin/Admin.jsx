import React, {useEffect} from "react";
import {connect} from "react-redux";
import {dashboardDataModel} from "./Redux/Reducers/dashboardDataReducer";
import {Outlet} from "react-router-dom";
import "./Index.css";
import LeftBar from "./Components/LeftBar/LeftBar";
import Navbar from "./Components/Navbar";

function Admin(props) {
    useEffect(() => {
        props.nextPermission();
        props.getDashboardData();
    }, []);

    return (
        <div id={"bigFather"}>
            <Navbar/>
            <div id={"bottomDiv"}>
                <LeftBar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default connect((state) => state, dashboardDataModel)(Admin);