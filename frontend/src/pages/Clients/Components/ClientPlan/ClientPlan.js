import React, {useContext} from 'react';
import UniversalModal from "../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {clientsAction} from "../../Redux/Reducers/clientsReducer";
import langData from '../../../../Languages/Language.json'
import LanguageContext from "../../../../Languages/Contex/Language";
import {TextField} from "@mui/material";
import dayjs from "dayjs";
import {convertToTitleFromDate} from "tools/utils";
import {ErrorNotify} from "tools/Alerts";


function ClientPlan(props) {
    const validateYear = (date) => !(date.get('year') === dayjs().get('year') || date.get('year') === dayjs().add(1, 'year').get('year'));
    const validateMonth = (date) => {
        if (date.get('year') === dayjs().add(1, 'year').get('year')) {
            if (date.get('month') !== 0) {
                return true;
            }
        }
    }

    const {clients} = props;
    const {langIndex} = useContext(LanguageContext)

    function checkInputs() {
        if (clients.currentPlane !== "") return false;
        if (clients.datePlane !== null || clients.amountPlane !== "") {
            return true;
        }
        return false;
    }


    function generateDateColor(date) {
        let dayJsDate = dayjs(date);
        let currentDate = dayjs();
        if(dayJsDate.get("month")===currentDate.get("month") && dayJsDate.get("year")===currentDate.get("year")) return "same";
        if(dayJsDate.isBefore(currentDate)) {
            return "before"
        }else if(dayJsDate.isAfter(currentDate)) {
            return "after";
        }
    }

    return (
        <UniversalModal
            checkPage={checkInputs()}
            modalTitle={langData[langIndex]?.clientPage?.plan?.title}
            isOpen={clients.modalForAddPlan}
            closeFunction={() => props.closeModalForPlan()}
            width={50}
            JsxData={<div className={'w-100'}>
                <div style={{justifyContent: "space-between"}} className={'d-flex gap-2'}>
                    <div style={{width: "40%"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <DatePicker label={'"month" and "year"'}
                                            views={['month', 'year']}
                                            value={clients.currentPlane !== "" ? null : clients.datePlane}
                                            onChange={(e) => props.changeDatePlane(e)}
                                            shouldDisableYear={validateYear}
                                            shouldDisableMonth={validateMonth}
                                />

                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div style={{width: "40%"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                <TextField type={'number'} onChange={(e) => props.changeAmountPlane(e.target.value)}
                                           value={clients.currentPlane !== "" ? "" : clients.amountPlane}
                                           id="outlined-basic" label={langData[langIndex]?.clientPage?.plan?.inp2}
                                           variant="outlined"/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div style={{paddingTop: "24px", display: "flex", gap: "10px"}}>
                        {
                            checkInputs() ?
                                <button onClick={() => props.resetDataForPlansMap()}
                                        className={'btn btn-danger'}>{langData[langIndex]?.clientPage?.plan?.clearBtn}</button> : ""
                        }
                        <button className={"btn btn-success"}
                                onClick={() => {
                                    if(validateMonth(clients.datePlane) || validateYear(clients.datePlane)) {
                                        ErrorNotify("Please Enter Valid Date!")
                                        return;
                                    }
                                    props.savePlane();
                                }}>{langData[langIndex]?.clientPage?.plan?.saveBtn}</button>
                    </div>
                </div>
                <hr/>
                <div style={{maxHeight: "400px", marginBottom: "20px", overflow: "auto", textAlign: "center"}}>
                    {
                        clients.plans.length === 0 ?
                            <b>{langData[langIndex]?.clientPage?.plan?.noPlans}</b> :
                            clients.plans.map((item, index) => {
                                return <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid",
                                    borderRadius: "7px",
                                    padding: "10px 5px",
                                    boxShadow: "0px 3px 10px -4px rgba(0,0,0,0.75)",
                                    marginBottom: "10px",
                                    alignItems: "center"
                                }}>
                                    {(clients.currentPlane !== "") && clients.currentPlane.id === item.id ?
                                        <div style={{display: "flex", justifyContent: "space-between", width: "80%"}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
                                                    <TextField value={clients.amountPlane}
                                                               onChange={(e) => props.changeAmountPlane(e.target.value)}
                                                               type={'number'} id="outlined-basic"
                                                               label={langData[langIndex]?.clientPage?.plan?.inp2}
                                                               variant="outlined"/>
                                                </DemoContainer>
                                            </LocalizationProvider>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                        <DatePicker label={'"month" and "year"'}
                                                                    views={['month', 'year']}
                                                                    onChange={(e) => props.changeDatePlane(e)}
                                                                    defaultValue={dayjs(clients.datePlane)}
                                                                    shouldDisableYear={validateYear}
                                                                    shouldDisableMonth={validateMonth}
                                                        />

                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </div> :
                                        <div style={{display: "flex", justifyContent: "space-between", width: "80%"}}>
                                            <b>{item.amount} $</b>
                                            <span className={generateDateColor(item.date)==="same"?"text-primary":generateDateColor(item.date)==="after"?"text-warning":"text-success"}>{convertToTitleFromDate(item.date)}</span>
                                            <span className={generateDateColor(item.date)==="same"?"text-primary":generateDateColor(item.date)==="after"?"text-warning":"text-success"}>{generateDateColor(item.date)==="same"?"INPROGRESS":generateDateColor(item.date)==="after"?"COMING SOON...!":"COMPLETED!"}</span>
                                        </div>}
                                    {(clients.currentPlane !== "") && clients.currentPlane.id === item.id ?
                                        <button onClick={() => props.editPlan(item)} className={'btn btn-warning'}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button> :
                                        <button onClick={() => props.editPlan(item)} className={'btn btn-warning'}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    }

                                    {(clients.currentPlane !== "") && clients.currentPlane.id === item.id ?
                                        <button className={"btn btn-success"} onClick={() => props.savePlane()}>
                                            {langData[langIndex]?.clientPage?.plan?.saveBtn}
                                        </button> : ""}


                                </div>
                            })
                    }
                </div>
            </div>
            }
        />
    );
}

export default connect((state) => state, clientsAction)(ClientPlan);