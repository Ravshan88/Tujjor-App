import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";
import "./catalogPage.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {domen} from "../../../../Config/apiCall"
import {icons} from "../../../../Config/icons"
import {useLocation, useNavigate} from "react-router-dom";


function CatalogPage(props) {
    const {catalog} = props
    const navigate = useNavigate()
    const catalogId = window.location.pathname.substring(window.location.pathname.length - 36)
    const location = useLocation();
    const catalogName = new URLSearchParams(location.search).get('name');

    useEffect(() => {
        props.handleCurrentCatalogId(catalogId)
        props.handleCurrentCatalogName(catalogName)
        props.getCatalogProducts(catalogId)
        props.getProductCategories()
        props.clearData()

        localStorage.setItem("currentCatalog", catalogId)
    }, [])

    return (
        <div className={"catalogPage position-relative"} style={{height: "100vh"}}>
            <div className="d-flex justify-content-left my-3">
                <button className="btn btn-dark" onClick={() => window.history.back()}>{icons.goBackIcon}</button>
            </div>
            <div className="d-flex justify-content-between my-3">
                <h1 className={"text-start"}>{catalogName}</h1>
                <button className="btn btn-success"
                        onClick={() => navigate("/telegram/catalog/add-product/" + catalogId)}>Add Product
                </button>
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

            <div className="container d-flex cardContainer position-relative " >
                {
                    catalog.catalogProducts.map(item => <div className="card m-3 productCard">
                        <button
                            className="position-absolute btn top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            onClick={() => props.deleteCatalogProduct({
                                catalogId: item.catalogId,
                                productId: item.productId,
                                catalogProductQuickSearch: catalog.catalogProductQuickSearch,
                                selectedProductCategory: catalog.selectedProductCategory,
                                currentCatalogId: catalogId
                            })}
                        >
                            X
                        </button>
                        <div onClick={() => navigate("/telegram/catalog/product/" + item.productId)}>
                            <div className="pt-3">
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
                            <h3 className="text-center">{item.title}</h3>
                        </div>
                    </div>)
                }
            </div>

            <div className="position-absolute bottom-0 end-0 m-2 w-100">
                <hr className="bg-black"/>
                <div className="d-flex justify-content-around align-items-center">
                    <h1>Total:</h1>
                    <h1>{catalog.catalogProducts.length}</h1>
                </div>

                <hr className="text-black"/>
            </div>
        </div>
    );
}


export default connect((state) => state, catalogActions)(CatalogPage);