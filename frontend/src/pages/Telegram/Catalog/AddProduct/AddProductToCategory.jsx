import React, {useEffect} from 'react';
import "./addProduct.css"
import {connect} from "react-redux";
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";
import {useNavigate} from "react-router-dom";
import {domen} from "../../../../Config/apiCall";
import {icons} from "../../../../Config/icons";
import {LazyLoadImage} from "react-lazy-load-image-component";

function AddProductToCategory(props) {
    const {catalog} = props
    const navigate = useNavigate()
    const catalogId = window.location.pathname.substring(window.location.pathname.length - 36)

    useEffect(() => {
        props.getCatalogProductForProductAddPage(catalogId)
        props.getProductCategories()
        props.clearData()
    }, [])

    return (
        <div className={"catalogPage"}>
            <div className="d-flex justify-content-left my-3">
                <button className="btn btn-dark" onClick={() => window.history.back()}>{icons.goBackIcon}</button>
            </div>
            <div className="d-flex justify-content-between my-3">
                <h1 className={"text-start"}>{catalog.currentCatalogName}</h1>
            </div>
            <div className="flex-forms">
                <select className="form-select mx-2" onChange={(e) => props.handleSelectProductCategory(e.target.value)}
                        value={props.selectedProductCategory}>
                    <option value={""} selected={true} disabled={true}>Select Category</option>
                    <option value={""}>All</option>
                    {
                        catalog.productCategories.map(item =>
                            <option value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <input type="search" className="form-control" placeholder={"Search"}
                       value={catalog.catalogProductQuickSearch}
                       onChange={(e) => props.handleCatalogProductQuickSearch(e.target.value)}/>
            </div>

            <div className="container d-flex cardContainer position-relative">
                {
                    catalog.catalogProductsForAddPage.map(item => <div className="card rounded-0 m-3 productCard">
                        <div>
                            <LazyLoadImage
                                height={80}
                                effect={"blur"}
                                className={"aspect-square object-fit"}
                                src={domen + "/file/getFile/" + item.attachmentId}
                                alt="asd"
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <hr className="w-75 text-center"/>
                        </div>
                        <button className="btn btn-outline-dark"
                                onClick={() => navigate("/telegram/catalog/product/" + item.productId)}>{item.title}</button>
                        {
                            item.isInCatalog ? <button className="btn btn-success"
                                                       onClick={() => navigate("/telegram/catalog/product/" + item.productId)}>Selected</button> :
                                <button className="btn btn-dark" onClick={() => props.addProductToCatalog({
                                    catalogId,
                                    productId: item.id
                                })}>Select</button>
                        }
                    </div>)
                }
            </div>

            <div className="position-absolute bottom-0 end-0 m-2 w-100">
                <hr className="bg-black"/>
                <div className="d-flex justify-content-around align-items-center">
                    <h1>Total:</h1>
                    <h1>{catalog.catalogProductsForAddPage.length}</h1>
                </div>

                <hr className="text-black"/>
            </div>
        </div>
    );
}

export default connect((state) => state, catalogActions)(AddProductToCategory);