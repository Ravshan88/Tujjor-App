import React, { useContext } from "react";
import PhoneInput from "react-phone-input-2";
import { Map, Placemark, YMaps, ZoomControl } from "react-yandex-maps";
import { connect } from "react-redux";
import { clientsAction } from "../../../Redux/Reducers/clientsReducer";
import "../../../../Telegram/ClientsOnTheMapTelegram/clients.css";
import langData from "../../../../../Languages/Language.json";
import LanguageContext from "../../../../../Languages/Contex/Language";
import Select from "react-select";

function JsxContentForAddClientModal(props) {
  const { langIndex } = useContext(LanguageContext);
  const { clients } = props;
  function handleMapClick(event) {
    const coords = event.get("coords");
    const latitude = coords[0];
    const longitude = coords[1];
    props.handleTemplate([longitude, latitude]);
    props.handleMapState({ center: [latitude, longitude], zoom: 10 });
  }

  function generateOptionsOfCourier() {
    const optionsCourier = [];
    clients.couriers.map((item) => {
      optionsCourier.push({
        value: item.id,
        label: item.username,
      });
    });
    return optionsCourier;
  }

  function handleSelect(selectedItems) {
    props.setSelectedCouriers(selectedItems.map((item) => item.value));
  }

  return (
    <div style={{ display: "flex", gap: "4%" }}>
      <div className={"w-50"}>
        <div className={"d-flex"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "48%",
            }}
          >
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp1}
              </span>
              <select
                defaultValue={""}
                onChange={(e) => props.changeTeritoryId(e.target.value)}
                value={clients.teritoryId}
                className={"form-select"}
              >
                <option value="" disabled>
                  Territory
                </option>
                {props.teritory?.regions?.map((item) => {
                  return <option value={item?.id}>{item?.region}</option>;
                })}
              </select>
            </label>
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp2}
              </span>
              <input
                onChange={(e) => props.changeName(e.target.value)}
                value={clients.name}
                className={"form-control w-100"}
                type="text"
                name=""
                id=""
              />
            </label>
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp3}
              </span>
              <input
                onChange={(e) => props.changeAddress(e.target.value)}
                value={clients.address}
                className={"form-control w-100"}
                type="text"
                name=""
                id=""
              />
            </label>
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp4}
              </span>
              <PhoneInput
                inputStyle={{ width: "100%" }}
                value={clients.telephone}
                onChange={(e) => props.changeTelephone(e)}
              />
            </label>
            <label>
              <span className={"d-block"}>TIN</span>
              <input
                onChange={(e) => props.changeTin(e.target.value)}
                value={clients.tin}
                className={"form-control w-100"}
                type="text"
                name=""
                id=""
              />
            </label>
            <label className={"d-flex"}>
              <span>{langData[langIndex]?.clientPage?.modal?.inp5}</span>
              <input
                onChange={(e) => props.changeActive(e.target.checked)}
                checked={clients.active}
                className={"form-check w-25"}
                type="checkbox"
                name=""
                id=""
              />
            </label>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "48%",
              marginLeft: "4%",
            }}
          >
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp6}
              </span>
              <select
                defaultValue={""}
                onChange={(e) => props.changeCategoryId(e.target.value)}
                value={clients.categoryId}
                className={"form-select"}
              >
                <option value="" disabled>
                  Category
                </option>
                {props.customerCategory.categories?.map((item) => {
                  return <option value={item?.id}>{item?.name}</option>;
                })}
              </select>
            </label>
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp7}
              </span>
              <input
                onChange={(e) => props.changeCompanyName(e.target.value)}
                value={clients.companyName}
                className={"form-control w-100"}
                type="text"
                name=""
                id=""
              />
            </label>
            <label>
              <span className={"d-block"}>
                {langData[langIndex]?.clientPage?.modal?.inp8}
              </span>
              <input
                onChange={(e) => props.changePassword(e.target.value)}
                value={clients.password}
                className={"form-control w-100"}
                type="password"
                name=""
                id=""
              />
            </label>{" "}
            {/* password */}
            <label style={{ marginTop: "23px" }}>
              <Select
                options={generateOptionsOfCourier()}
                isMulti={true}
                value={generateOptionsOfCourier().filter((item) =>
                  clients.selectedCouriers.includes(item.value)
                )}
                onChange={handleSelect}
                placeholder="All Couriers"
              />
            </label>
            <label style={{ marginTop: "20px" }}>
              <span>Longitude:</span>
              <input disabled={true} type="text" value={clients.longitute} />
            </label>
            <label>
              <span>Latitude:</span>
              <input disabled={true} type="text" value={clients.latitute} />
            </label>
          </div>
        </div>
      </div>

      <div className={"w-50"}>
        <YMaps
          query={{
            apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
            lang: "en_US",
            coordorder: "latlong",
            load: "package.full",
          }}
        >
          <Map
            width={430}
            height={400}
            defaultState={{
              center: clients.defaultCenter,
              zoom: 10,
            }}
            onClick={handleMapClick}
            modules={["templateLayoutFactory"]}
          >
            <ZoomControl options={{ float: "right" }} />
            {clients.mapState.center[0] === "" ||
            clients.mapState.center[1] === "" ? (
              ""
            ) : (
              <Placemark
                geometry={clients.mapState.center}
                modules={["geoObject.addon.balloon"]}
              />
            )}
          </Map>
        </YMaps>

        <button
          type={"button"}
          className={"btn btn-danger my-2"}
          onClick={() => props.clearAllclients()}
        >
          {langData[langIndex]?.universalModal?.clear}
        </button>
      </div>
    </div>
  );
}

export default connect(
  (state) => state,
  clientsAction
)(JsxContentForAddClientModal);
