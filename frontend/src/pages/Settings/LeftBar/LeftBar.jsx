import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {settingsActions} from "../Redux/Reducers/settingsReducer";
import LanguageContext from "../../../Languages/Contex/Language";
import langData from "../../../Languages/Language.json"

function LeftBar({data, getData, activeButtonIndex, setCurrentIndex}) {
    const {langIndex} = useContext(LanguageContext)
    const navigate = useNavigate();

    useEffect(() => {
        getData();
        localStorage.setItem("sidebar_button", "8")
    }, []);
    useEffect(() => {
        if (localStorage.getItem("selectedSettingsButton") && data.length) {
            if (parseInt(localStorage.getItem("selectedSettingsButton")) < 3) {
                navigate(
                    "/admin/settings" +
                    data[localStorage.getItem("selectedSettingsButton")].path
                );
            }
        }
    }, [data]);


    return (
        <div className="left  pt-3">
            <button className="btn_panel">{langData[langIndex].settingsPage.title}</button>
            {data.map((item, index) => (
                <button
                    key={item.id}
                    className={
                        "settings_button" +
                        (window.location.pathname.substring(window.location.pathname.lastIndexOf("/")) === item.path ? " active_button" : " ")
                    }
                    onClick={() => {
                        navigate("/admin/settings" + item.path);
                        localStorage.setItem("selectedSettingsButton", index);
                        setCurrentIndex(index);
                    }}
                >
                    <span>{index + 1}</span>. {item.name}
                </button>
            ))}
        </div>
    );
}

export default connect((state) => state.settings, settingsActions)(LeftBar);