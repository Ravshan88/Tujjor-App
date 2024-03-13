import React, {useCallback, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import apiCall from "../../../Config/apiCall";
import {domen} from "../../../Config/apiCall";
import {connect} from "react-redux";
import {telegramProductModel} from "../Redux/Reducers/telegramProductReducer";
import UniverModal from "pages/universal/Modal/UniverModal";
import {Abc} from "@mui/icons-material";
import AboutProduct from "pages/Telegram/Product/AboutProduct";

const telegram = window.Telegram.WebApp;

function Index(props) {
    const navigate = useNavigate()
    const {telegramProducts} = props
    const {token} = useParams();
    useEffect(() => {
        localStorage.setItem("access_token", token)
        props.getProducts()
    }, [token]);
    useEffect(() => {
        telegram.ready();
        props.getProducts();
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
        telegram.sendData(JSON.stringify(telegramProducts?.initData));
    }, [telegramProducts.initData]);
    useEffect(() => {
        if (telegramProducts.initData.title !== "" && telegramProducts.initData.categoryId !== "" && telegramProducts.initData.price !== "" && telegramProducts.initData.title.replaceAll(" ", "") !== "") {
            onCheckout(true)
            telegram.onEvent('mainButtonClicked', onSendData);
            return () => telegram.offEvent('mainButtonClicked', onSendData);
        }else {
            onCheckout(false)
        }
    }, [telegramProducts?.initData, onSendData]);

    function showProduct(item) {
        navigate("/telegram/product-info/"+item.id)
    }

    return (
        <div className='telegram_add_client position-relative'>
            <div className="container my-container ">
                {
                    telegramProducts.products.map((item, index)=> (
                        <div onClick={()=>showProduct(item)} className={"cardcha flex justify-content-center align-items-center flex-column gap-1 p-1"}>
                            {
                                item.attachment?
                                    <img width={100} height={70} src={domen+"/file/getFile/"+item.attachment.id} alt=""/>
                                    :
                                    "?"
                            }
                            <h5 className={"card w-75"}>{item.category.title}</h5>
                            <h5>{item.title}</h5>
                            <i>{item.price} so'm</i>
                        </div>
                    ))
                }
            </div>
            <Link to={"/telegram/product-add"} className={"add-button bg-success"}>+</Link>
        </div>
    );
}

export default connect(state=> state, telegramProductModel)(Index);