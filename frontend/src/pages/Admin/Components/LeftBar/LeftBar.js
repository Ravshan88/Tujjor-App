import React, { useContext } from "react";
import DashboardButton from "../../../universal/DashboardButton/DashboardButton";
import { icons } from "../../../../Config/icons";
import "../../Index.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { dashboardDataModel } from "../../Redux/Reducers/dashboardDataReducer";
import LanguageContext from "../../../../Languages/Contex/Language";
import langData from "../../../../Languages/Language.json";

function LeftBar(props) {
  const { langIndex } = useContext(LanguageContext);
  const { dashboardDataReducer } = props;
  const navigate = useNavigate();
  const unCheckedButtonClass = "dashboard_button";
  const checkedButtonClass = "checked_dashboard_button " + unCheckedButtonClass;
  const unCheckedClientsButtonClass = "dashboard_clients_button";
  const checkedClientsButtonClass =
    "checked_clients_button " + unCheckedClientsButtonClass;

  function toClientOnTheMap() {
    localStorage.setItem("sidebar_button", "5");
    navigate("/admin/clients_on_the_map");
    props.changeIsHovered(false);
  }
  function toClientPage() {
    localStorage.setItem("sidebar_button", "5");
    navigate("/admin/clients");
    props.changeIsHovered(false);
  }
  return (
    <div
      className={
        "leftBar" +
        (dashboardDataReducer.leftbar ? " active_leftbar" : " unactive_leftbar")
      }
    >
      <DashboardButton
        id={1}
        icon={<i className="fa fa-medkit"></i>}
        title={`${langData[langIndex]?.adminPage?.toDiagnostic}`}
        path={"/admin/diagnostic"}
        class={
          localStorage.getItem("sidebar_button") === "1"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <DashboardButton
        id={2}
        title={`SMS`}
        path={"/admin/sms"}
        icon={<i className="fa fa-rocket"></i>}
        class={
          localStorage.getItem("sidebar_button") === "2"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <DashboardButton
        id={3}
        title={`${langData[langIndex]?.adminPage?.toApplication}`}
        path={"/admin/applications"}
        icon={<i className="fa fa-shopping-cart"></i>}
        class={
          localStorage.getItem("sidebar_button") === "3"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <DashboardButton
        id={4}
        title={`${langData[langIndex]?.adminPage?.toStock}`}
        path={"/admin/stock"}
        icon={icons.stockIcon}
        class={
          localStorage.getItem("sidebar_button") === "4"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <button
        className={
          localStorage.getItem("sidebar_button") === "5"
            ? checkedClientsButtonClass
            : unCheckedClientsButtonClass
        }
        onMouseEnter={() => props.changeIsHovered(true)}
        onMouseLeave={() => props.changeIsHovered(false)}
        style={{ position: "relative" }}
      >
        {icons.clientsIcon}
        <span>{langData[langIndex]?.adminPage?.toClients}</span>
        {/*for hovered div 👇👇👇*/}
        {dashboardDataReducer.isHovered && (
          <div
            onMouseEnter={() => props.changeIsHovered(true)}
            onMouseLeave={() => props.changeIsHovered(false)}
            id={"clientDataBox"}
          >
            <p onClick={toClientPage}>
              {langData[langIndex]?.adminPage?.clientPages?.page1}
            </p>
            <p onClick={toClientOnTheMap}>
              {langData[langIndex]?.adminPage?.clientPages?.page2}
            </p>
            <p style={{ padding: "0px" }}></p>
          </div>
        )}
      </button>
      <DashboardButton
        id={6}
        title={`${langData[langIndex]?.adminPage?.toAgents}`}
        path={"/admin/agents"}
        icon={icons.androidIcon}
        class={
          localStorage.getItem("sidebar_button") === "6"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <DashboardButton
        id={7}
        title={`${langData[langIndex]?.adminPage?.toReports}`}
        path={"/admin/reports"}
        icon={icons.reportsIcon}
        class={
          localStorage.getItem("sidebar_button") === "7"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
      <DashboardButton
        id={8}
        title={`${langData[langIndex]?.adminPage?.toSettings}`}
        path={"/admin/settings/company-profile"}
        icon={<i className="fa fa-cogs"></i>}
        class={
          localStorage.getItem("sidebar_button") === "8"
            ? checkedButtonClass
            : unCheckedButtonClass
        }
      />
    </div>
  );
}
export default connect((state) => state, dashboardDataModel)(LeftBar);
