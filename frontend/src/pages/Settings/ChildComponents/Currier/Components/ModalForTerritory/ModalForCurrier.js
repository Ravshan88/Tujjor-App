import {useContext, useEffect, useState} from 'react';
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect, useDispatch} from "react-redux";
import {currierAction} from "../../Redux/Reducers/CurrierReducers";
import "../../../Teritory/Teritory.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"
import PhoneInput from "react-phone-input-2";
import {Switch, Input, Checkbox} from "antd";
import {MultiSelect} from "react-multi-select-component";

function ModalForCurrier(props) {
    const {langIndex} = useContext(LanguageContext)
    const {currier} = props;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(currierAction.getTerritories())
    }, [])

    function generateOptionsOfTerritory() {
        const optionsTerritory = [];
        currier.territories.map((item) => {
            optionsTerritory.push({
                value: item.id,
                label: item.name,
            });
        });
        return optionsTerritory;
    }

    function handleMapClick(event) {
        const coords = event.get("coords");
        const latitude = coords[0];
        const longitude = coords[1];
        props.handleTemplate([longitude, latitude]);
        props.handleMapState({center: [latitude, longitude], zoom: 10});
    }

    function checkInpValue() {
        if (currier.firstname !== "" || currier.lastname !== "" || currier.phone !== "" || currier.active !== false || currier.longitute !== "" || currier.latitute !== "" || currier.teritories !== []) {
            return true;
        }
        return false;
    }

    const handleSelectChange = (selectedItems) => {
        dispatch(currierAction.setSelectedTerritory(selectedItems.map(item => item.value)));
    };
    return (
        <UniversalModal
            modalTitle={
                currier.itemForTeritoryEdite === ""
                    ? `${langData[langIndex]?.currierPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.currierPage?.modal?.editeTitle}`
            }
            checkPage={checkInpValue()}
            isOpen={currier.openModal}
            closeFunction={() => props.handleClose()}
            width={65}
            functionforSaveBtn={(modalButton) => props.saveCurrier(modalButton)}
            JsxData={
                <div className={"w-100 d-flex justify-content-between gap-5"}>
                    <div className={"w-75"}>

                        <div className={"d-flex justify-content-between gap-1 mb-2"}>
                            <div className={" mb-2"}>
                                {`${langData[langIndex]?.currierPage?.modal?.firstName}`}
                                <Input
                                    value={currier.firstname}
                                    size={"large"}
                                    onChange={(e) => props.handleFirstName(e.target.value)}
                                    type="text"/>
                            </div>
                            <div className={" mb-2"}>
                                {`${langData[langIndex]?.currierPage?.modal?.lastName}`}
                                <Input
                                    value={currier.lastname}
                                    size={"large"}
                                    onChange={(e) => props.handleLastName(e.target.value)}
                                    type="text"/>
                            </div>
                        </div>


                        <div className={"d-flex gap-1 justify-content-between mb-2"}>
                            <div className={" mb-2 w-100"}>
                                {`${langData[langIndex]?.currierPage?.modal?.userName}`}
                                <Input
                                    size={"large"}
                                    value={currier.username}
                                    onChange={(e) => props.handleUserName(e.target.value)}
                                    type="text"/>
                            </div>
                            <div className={" mb-2 w-100"}>
                                {`${langData[langIndex]?.currierPage?.modal?.password}`}
                                <Input.Password value={currier.password}
                                                onChange={(e) => props.handlePassword(e.target.value)}
                                                placeholder="input password" size={"large"}/>
                            </div>
                        </div>


                        <div className={"d-flex justify-content-between gap-1 mb-2"}>
                            <div style={{maxWidth: "100%"}} className={"mb-2"}>
                                {`${langData[langIndex]?.currierPage?.modal?.phone}`}
                                <PhoneInput
                                    inputStyle={{width: "100%", height: 40}}
                                    value={currier.phone}
                                    onChange={(e) => props.handlePhone(e)}
                                />
                            </div>
                            <div style={{maxWidth: "100%"}} className={"mb-2 w-75"}>
                                {`${langData[langIndex]?.currierPage?.modal?.territory}`}
                                <MultiSelect
                                    className={"w-100"}
                                    options={generateOptionsOfTerritory()}
                                    value={generateOptionsOfTerritory().filter((item) => currier.selectedTerritory.includes(item.value))}
                                    onChange={handleSelectChange}
                                    labelledBy="Select"
                                />
                            </div>
                        </div>
                        <div className={"mb-2"}>
                            <label>
                                {`${langData[langIndex]?.currierPage?.modal?.active}`}
                                <Checkbox
                                    className={"mx-2"}
                                    checked={currier.active}
                                    onChange={(e) => props.handleActive(e.target.checked)}
                                />
                            </label>


                        </div>
                    </div>
                    <div style={{
                        maxWidth: "100%"
                    }}>
                        <YMaps
                            query={{
                                apikey: "e24090ad-351e-4321-8071-40c04c55f144\n",
                                lang: "en_US",
                                coordorder: "latlong",
                                load: "package.full",
                            }}
                        >
                            <Map
                                width={"100%"}
                                height={300}
                                defaultState={{
                                    center: currier.defaultCenter,
                                    zoom: 10,
                                }}
                                onClick={handleMapClick}
                                modules={["templateLayoutFactory"]}
                            >
                                <ZoomControl options={{float: "right"}}/>
                                {currier.mapState.center[0] === "" ||
                                currier.mapState.center[1] === "" ? (
                                    ""
                                ) : (
                                    <Placemark
                                        geometry={currier.mapState.center}
                                        modules={["geoObject.addon.balloon"]}
                                    />
                                )}
                            </Map>
                        </YMaps>
                        <div className={"d-flex gap-2 my-2"}>
                            <div className={"d-flex flex-column"}>
                                Longitude:
                                <input disabled={true} type="text" value={currier.longitute}/>
                            </div>


                            <div className={"d-flex flex-column"}>
                                Latitude:
                                <input disabled={true} type="text" value={currier.latitute}/>
                            </div>

                        </div>
                        <button
                            type={"button"}
                            className={"btn btn-danger"}
                            onClick={() => props.clearAllTeritory()}
                        >
                            {langData[langIndex]?.universalModal?.clear}
                        </button>
                    </div>
                </div>
            }
        />
    );
}

export default connect((state) => state, currierAction)(ModalForCurrier);