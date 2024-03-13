import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";
import "./productAbout.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {domen} from "../../../../Config/apiCall";
import {icons} from "../../../../Config/icons";

function ProductAbout(props) {
    useEffect(() => {
        const productId = window.location.pathname.substring(window.location.pathname.length - 36);
        props.getProductAbout(productId)
    }, [])

    const {catalog} = props
    const api = domen + "/file/getFile/" + catalog.productAbout.attachmentId

    return (
        <div className={"product-container "}>
            <div className="d-flex justify-content-start py-2">
                <button className="btn btn-dark" onClick={() => window.history.back()}>{icons.goBackIcon}</button>
            </div>

            <div className="d-flex justify-content-center ">
                <div className="card p-3 shadow">
                    <div className="d-flex justify-content-center shadow-lg w-auto">
                        <LazyLoadImage
                            height={80}
                            effect={"blur"}
                            className={"aspect-square object-fit p-2"}
                            src={api}
                            alt="product image"
                        />

                    </div>
                    <h1 className={"py-3"}>Product Name: <span className="text-success">{catalog.productAbout.title}</span></h1>
                    <h1 className={"py-3"}>Product Price: <span className="text-success">{catalog.productAbout.price}</span></h1>
                    <h1 className={"py-3"}>Product Category: <span className="text-success">{catalog.productAbout.category}</span>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default connect((state) => state, catalogActions)(ProductAbout);