import React, {useContext, useState} from 'react';
import {connect} from "react-redux";
import {clientsAction} from "../../../Redux/Reducers/clientsReducer";
import "../../../../Telegram/ClientsOnTheMapTelegram/clients.css"
import LanguageContext from "../../../../../Languages/Contex/Language";
import langData from "../../../../../Languages/Language.json"
import Dropdown from 'pages/universal/Dropdown/Dropdown'
import {useLocation} from "react-router-dom";

function HeaderForMap(props) {
    const {langIndex} = useContext(LanguageContext)
    const {clients} = props;
    const {teritory} = props;
    const location = useLocation();
    const [selectedTerritories,setSelectedTerritories] = useState([]);
    const [search,setSearch] = useState("");


    return (
        <div>
            <p id={'titleForMap'}>
                {langData[langIndex]?.clientPage?.clientOnTheMap?.title}
            </p>
            <hr style={{color:'#FED053'}}/>
            <div className="d-flex flex-wrap pb-2 justify-content-between">
                <label className={'notificationForMap text-white'} onClick={() => props.changeAllLocation()}>
                    <span className="whitelight"></span>
                    <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.allDataBtn}</span>
                    {
                        clients.clients.filter(item => item.active === true).length +
                        clients.clients.filter(item => item.active === false).length +
                        teritory.teritories.length
                    }
                    </label>
                {location.pathname.startsWith("/telegram")?"":<div style={{display: "flex", gap: "40px"}}>
                    <label className={'notificationForMap '} onClick={() => props.changeShowActiveClient()}>
                        <span className="greenlight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.activeClientsBtn}</span>
                        {clients.clients.filter(item => item.active === true).length}
                    </label>
                    <label className={'notificationForMap '} onClick={() => props.changeShowUnActiveClient()}>
                        <span className="redlight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.unActiveClientsBtn}</span>
                        {clients.clients.filter(item => item.active === false).length}
                    </label>
                    <label className={'notificationForMap'} onClick={() => props.changeShowTerritory()}>
                        <span className="bluelight"></span>
                        <span>{langData[langIndex]?.clientPage?.clientOnTheMap?.territoriesBtn}</span>
                        {teritory.teritories.length}
                    </label>
                </div>}

             <div className="d-flex gap-2 align-items-center">
                 <Dropdown
                     multiSelect={true}
                     customTitle={
                         "Search by Territory"
                     }
                     countModeTitle={"Territory"}
                     allCountSize={(teritory.teritories?teritory.teritories:[]).length}
                     countMode={true}
                     dropdownId="3"
                     body={(teritory.teritories?teritory.teritories:[]).map((item) => ({
                         title: item.region,
                     }))}
                     onItemClick={(arr) => {
                         props.filterByTerritory({cities:arr,search,});
                     setSelectedTerritories([...arr]);
                     }}
                 />
                 <label htmlFor="">
                    <span>
                        Search:
                    </span>
                     <input type="search" onChange={(e)=>{
                         props.filterByName({search:e.target.value,cities: selectedTerritories});
                         setSearch(e.target.value);
                     }}/>
                 </label>


             </div>




            </div>
        </div>
    );
}

export default connect((state) => state, {...clientsAction})(HeaderForMap);
