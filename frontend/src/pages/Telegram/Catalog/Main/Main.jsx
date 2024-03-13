import React, {useEffect} from 'react';
import "./main.css"
import {connect} from "react-redux";
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";
import {useNavigate} from "react-router-dom";

function Main(props) {
    const {catalog} = props
    const navigate = useNavigate()

    useEffect(() => {
        props.getCatalogs()
    }, [])

    return (
        <div className={"main-container"}>
            <div className="flex-save-form input-group">
                <input type="text" className="form-control" placeholder={"New Catalog name"} value={catalog.name}
                       onChange={(e) => props.handleName(e.target.value)}/>
                <button className="btn btn-outline-primary" onClick={() => props.saveCatalog()}>Save</button>
            </div>

            <input type="text" className="form-control w-100" placeholder={"Search"} value={catalog.catalogQuickSearch}
                   onChange={(e) => props.handleCatalogQuickSearch(e.target.value)}/>
            <div className="catalogs-container">
                {catalog.catalogs.map(item => <button type="button" className="btn btn-primary w-100 mt-3"
                                                      onClick={() => navigate(`/telegram/catalog/about/${item.id}?name=${item.name}`)}>
                    {item.name} <span className="badge text-bg-secondary">{item.count}</span>
                </button>)}

            </div>
        </div>
    );
}

export default connect((state) => state, catalogActions)(Main);
