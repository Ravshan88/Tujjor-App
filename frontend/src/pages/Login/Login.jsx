import React, {useEffect} from "react";
import "./login.css";
import {connect} from "react-redux";
import {loginModel} from "./Redux/Reducers/loginReducer";
import {Button} from "reactstrap";
import logo from "images/logo.jpg";
import PhoneInput from "react-phone-input-2";
import gif from "../../images/loading.gif";
import "react-phone-input-2/lib/style.css";
import {Input} from "antd";
import DeliveryMap from "pages/Login/maps";

function Login(props) {
    const {loginReducer} = props;
    useEffect(() => {
        document.getElementsByClassName("phoneInp")[0].focus()
        props.hasPermissionRoleSuperVisor();
    }, [])
    return (
        <div className={"background"}>
            <img id={"logoForLogin"} src={logo} alt="#"/>
            <div id="loginForm">
                <div id={"informationCompany"}>Company information...</div>
                <form onSubmit={(e) => props.loginHere(e)}>
                    <div className="form">
                        <PhoneInput
                            inputStyle={{width: "100%"}}
                            country={"uz"}
                            value={loginReducer.phone}
                            onChange={(e) => props.changePhone(e)}
                            className={"phoneInp"}
                        />
                        <div className={"mt-3"}>
                            <Input.Password
                                size={"large"}
                                value={loginReducer.password}
                                onChange={(e) => props.changePassword(e.target.value)}
                                placeholder={"Type a password..."}
                            />
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <label className={"my-3 d-flex align-items-center gap-1 text-white"}>
                                <input
                                    value={loginReducer.remember}
                                    onChange={(e) => props.rememberMe(e.target.checked)}
                                    style={{width: "20px", height: "20px"}}
                                    type="checkbox"
                                />{" "}
                                Remember me
                            </label>
                            <Button
                                style={{
                                    backgroundColor: "#65b965",
                                    marginTop: 20,
                                    width: "30%",
                                }}
                                variant="contained"
                            >
                                {props.loginReducer.loading ? (
                                    <img src={gif} width={25} alt="Loading Gif"/>
                                ) : (
                                    <>
                                        To come in <i className="fa-solid fa-circle-arrow-right"></i>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
                <h6 style={{textAlign: "left", marginTop: "25px"}} className="text-white">
                    Support Phone Number: <span onClick={props.handleCopyPhoneNumber}
                                                style={{cursor: "pointer", textDecoration: "underline"}}
                                                className={"text-primary"}>{props.loginReducer.mainPhoneNumber}</span>
                </h6>
            </div>
        </div>
    );
}

export default connect((state) => state, loginModel)(Login);