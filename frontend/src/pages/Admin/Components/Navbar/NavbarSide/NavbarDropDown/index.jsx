import React, {useContext} from 'react';
import {icons} from "../../../../../../Config/icons";
import {useNavigate} from "react-router-dom";
import {dashboardDataModel} from "../../../../Redux/Reducers/dashboardDataReducer";
import {connect} from "react-redux";
import "../../../../Index.css"
import langData from '../../../../../../Languages/Language.json'
import LanguageContext from "../../../../../../Languages/Contex/Language";

function Index(props) {
    const navigate = useNavigate()
    const {langIndex} = useContext(LanguageContext)
    function logOut() {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <div style={{position: "relative"}}>
            <button
                onMouseEnter={()=>props.changeUserDropDown(true)}
                onMouseLeave={()=>props.changeUserDropDown(false)}
                className="btn text-white"
                // ref={userBoxRef}
            >
                {icons.userIcon}
                {icons.downTriangleIcon}
            </button>

            {props.dropDownBox &&
                <div
                    onMouseEnter={()=>props.changeUserDropDown(true)}
                    onMouseLeave={()=>props.changeUserDropDown(false)}

                    className={"user_box_admin"}
                >
                    <button className="custom_userbox_button">
                        {icons.keyIcon} {langData[langIndex]?.adminPage?.dropDown?.function1}
                    </button>
                    <button className="custom_userbox_button d-flex justify-content-between align-items-center"
                            onClick={() => navigate("/payment")}>
                        <span className="d-flex gap-2">{icons.moneyIcon} {langData[langIndex]?.adminPage?.dropDown?.function2}</span>
                    </button>
                    <button className="custom_userbox_button" onClick={logOut}>
                        {icons.exitIcon} {langData[langIndex]?.adminPage?.dropDown?.function3}
                    </button>
                </div>
            }
        </div>
    );
}

export default connect(state=>state.dashboardDataReducer,dashboardDataModel)(Index);