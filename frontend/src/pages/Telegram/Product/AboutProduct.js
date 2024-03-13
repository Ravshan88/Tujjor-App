import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {telegramProductModel} from "../Redux/Reducers/telegramProductReducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./Product.css"
import {domen} from "../../../Config/apiCall";

function AboutProduct(props) {
    const navigate = useNavigate()
    const {telegramProducts} = props
    const {selectedProduct} = telegramProducts
    const {id} = useParams();

    useEffect(()=>{
        props.getInfo(id)
    }, [])

    function deleteProduct() {
        props.deleteProduct(id)
        navigate("/telegram/product/"+localStorage.getItem("access_token"))
    }

    return (
        <div className={"position-relative p-2"}>
            <div className="w-75 mx-auto mt-1 isFree">{selectedProduct?.free?<p className={"text-success bordercha center"}>Bu mahsulot svobodniy!<div className={"info"}>?</div></p>:
                <p className={"text-danger bordercha center position-relative"}>Bu mahsulot svobodniy emas!<div className={"info"}>?</div></p>}
            </div>
            <div className={"w-100 d-flex justify-content-between p-2"}>
                <Link to={`/telegram/product/${localStorage.getItem("access_token")}`} className={"btn btn-dark"}>{"<-"}</Link>
                <Link to={`/telegram/product-add/${id}`} className={"btn btn-primary"}>tahrirlash</Link>
            </div>
            <div className="container d-flex flex-column position-relative align-items-end">
                {
                    selectedProduct.attachmentId?
                        <img width={90} height={90} className={"rounded"} src={domen+"/file/getFile/"+selectedProduct.attachmentId}/>
                        :
                        ""
                }
                <div className="w-100">
                    <h5 className={"bordercha mt-2"}>imsi: {selectedProduct.title}</h5>
                    <h5 className={"bordercha"}>kategoriya: {selectedProduct.category}</h5>
                    <h5 className={"bordercha"}>narxi: {selectedProduct.price}</h5>
                    <h5 className={"bordercha"}>soni: {selectedProduct.count}</h5>
                </div>
                <button onClick={deleteProduct} className={"btn btn-danger mt-1"}>O'chirish</button>
            </div>
        </div>
    );
}

export default connect(state=>state, telegramProductModel)(AboutProduct);