import React, {useEffect} from "react";
import {connect} from "react-redux";
import {dealerAction} from "./Redux/Reducers/dealerReducer";
import "./Dealer.css";
import DealerHeader from "./Components/HeaderForTerritory/DealerHeader";
import TableForDealer from "./Components/TableForTerritory/TableForDealer";
import ModalForDealer from "./Components/ModalForTerritory/ModalForDealer";
import AgentsModalForDealer
    from "pages/Settings/ChildComponents/Dealers/Components/AgentsModalForDealer/AgentsModalForDealer";


function Dealer(props) {

  useEffect(() => {
    props.getDealer();
  }, []);

  return (
    <div id={"fatherDivForTerritory"}>
      <DealerHeader/>
      <TableForDealer/>
      <ModalForDealer/>
      <AgentsModalForDealer/>
    </div>
  );
}

export default connect((state) => state, dealerAction)(Dealer);