import React, {useEffect} from "react";
import "../Telegram/ClientsOnTheMapTelegram/clients.css";
import {connect, useDispatch} from "react-redux";
import {clientsAction} from "./Redux/Reducers/clientsReducer";
import {teritoryAction} from "../Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import {
    customerCategoryActions
} from "../Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer";
import HeaderForClient from "./Components/HeaderForClient/HeaderForClient";
import ModalForClient from "./Components/ModalForClient/ModalForClient";
import TableForClient from "./Components/TableForClient/TableForClient";
import FilterForClient from "./Components/FilterForClient/FilterForClient";
import ModalForClientCouriers from "pages/Clients/Components/ModalForClientCouriers/ModalForClientCouriers";

function Clients(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    props.getClients();
    localStorage.setItem("sidebar_button", "5")
  }, []);

  useEffect(() => {
    dispatch(teritoryAction.getCities());
    dispatch(customerCategoryActions.getCategory());
  }, [dispatch]);

  return (
    <div id={"fatherDivForClients"}>
      <div id={"clientsFatherDiv"}>
          <HeaderForClient/>
          <div >
            <FilterForClient/>
            <TableForClient/>
          </div>
      </div>
      <ModalForClient/>
      <ModalForClientCouriers/>
    </div>
  );
}

export default connect((state) => state, clientsAction)(Clients);
