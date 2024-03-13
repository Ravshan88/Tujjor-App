import React from "react";
import {Outlet} from "react-router-dom";
import "./Settings.css";
import LeftBar from "./LeftBar/LeftBar";

const Settings = () => {
    return (
        <div className="settings">
            <div className="content">
               <LeftBar/>
                <div className="right">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Settings;
