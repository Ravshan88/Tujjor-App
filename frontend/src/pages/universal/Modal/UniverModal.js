import React, {useContext, useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "./modal.css";
import Loading from "../../Loading/Loading";
import LanguageContext from "../../../Languages/Contex/Language";
import LangData from "../../../Languages/Language.json"
import PhoneInput from "react-phone-input-2";
import {Spin} from "antd";

// ishlatish uchun namuna👇

// <UniversalModal
// modalTitle={"Men modalmaaan"}
// isOpen={openModal}
// closeFunction={closeModal}
// width={35}
// functionforSaveBtn={()=>console.log("SALOM")}
// inpData = {[
//         {
//             title: "",
//             labelValue: "bo'loptimii",
//             id: 2,
//             value: ipnValue,
//             onChange: (e)=>setInpValue(e.target.value),
//             placeholder: "Salomlaar",
//             type: "checkbox"
//         },{
//     title: "active:",
//         id: 2,
//         value: ipnValue,
//         onChange: (e)=>setInpValue(e.target.value),
//         placeholder: "dghfhgghshg",
//         type: "checkbox"
// },{
//     title: "df: ",
//         id: 2,
//         value: ipnValue,
//         onChange: (e)=>setInpValue(e.target.value),
//         placeholder: "dghfhgghshg",
//         type: "text"
// },
// ]}
// />

const UniversalModal = ({
  inpData = "",
  height,
  isOpen,
  closeFunction,
  modalTitle,
  width,
  functionforSaveBtn,
  JsxData = "",
  checkPage = true
}) => {
  const {langIndex} = useContext(LanguageContext)
  const [loadingButton,setLoadingButton] = useState(false);
  const [miniModal, setMiniModal] = useState(false);
  const [loading, setLoading] = useState();
  const style = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    width: width + "%",
    overflow: "auto",
    maxHeight: '655px',
  };
  const style2 = {
    position: "absolute",
    top: "48%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
    width: "30%",
    overflow: "auto",
  };
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [isOpen]);

  function closeFunctionCheck() {
    if(!checkPage) {
      setMiniModal(false)
      closeFunction()
    } else {
      setMiniModal(true)
    }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeFunctionCheck}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
              <Spin size={"large"} className={"bg-white d-flex justify-content-center align-items-center gap-2 p-4"}/>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  height: "50px",
                  padding: "10px 0px 0px 45px",
                  fontSize: "18px",
                  color: "white",
                  background: "#FED053",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <b>{modalTitle}</b>
                  <button
                    style={{ margin: "-4px 3% 5px 0px" }}
                    className={"btn btn-danger"}
                    onClick={closeFunctionCheck}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </div>
              </div>
              {
                functionforSaveBtn !== undefined ?
                    <div id={"bottomChildForUModal"}>
                      <form onSubmit={(e)=>{
                        e.preventDefault()
                        functionforSaveBtn(setLoadingButton);
                      }
                      }>
                        <div>
                          {`JsxData` !== "" && inpData !== "" ? (
                              <div>
                                <div style={{ gap: "4%" }} className={"d-flex w-100"}>
                                  <div style={{ width: "48%" }}>
                                    {inpData?.map((item, index) => {
                                      return (
                                          <div key={index}>
                                            {item?.type === "checkbox" ? (
                                                <div
                                                    style={{
                                                      display: "flex",
                                                      marginTop: "10px",
                                                      gap:
                                                          item?.title === undefined ||
                                                          item?.title === ""
                                                              ? "0%"
                                                              : "10%",
                                                      justifyContent: "space-between",
                                                    }}
                                                >
                                    <span
                                        style={{
                                          maxWidth: "20%",
                                          wordBreak: "break-all",
                                        }}
                                    >
                                      {item?.title === undefined
                                          ? ""
                                          : item?.title + " "}{" "}
                                    </span>
                                                  <label
                                                      style={{
                                                        position: "relative",
                                                        width:
                                                            item?.title === undefined ||
                                                            item?.title === ""
                                                                ? "100%"
                                                                : "70%",
                                                      }}
                                                  >
                                                    <input
                                                        className={"form-check"}
                                                        type={item?.type}
                                                        checked={item?.value}
                                                        style={{ width: "25px" }}
                                                        onChange={item?.onChange}
                                                    />{" "}
                                                    <span
                                                        style={{
                                                          position: "absolute",
                                                          left: "35px",
                                                          top: "8px",
                                                        }}
                                                    >
                                        {item?.labelValue}
                                      </span>
                                                  </label>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{ marginTop: "10px" }}
                                                    className={
                                                      "d-flex g-2 justify-content-between"
                                                    }
                                                >
                                    <span
                                        style={{
                                          maxWidth: "20%",
                                          wordBreak: "break-all",
                                        }}
                                    >
                                      {item?.title === undefined
                                          ? ""
                                          : item?.title + " "}{" "}
                                    </span>
                                                  <div
                                                      style={{
                                                        width:
                                                            item?.title === undefined ||
                                                            item?.title === ""
                                                                ? "100%"
                                                                : "70%",
                                                      }}
                                                  >
                                                    {(item.phone === true && item.type === "number")?
                                                        <PhoneInput
                                                            inputStyle={{ width: "100%" }}
                                                            value={item?.value}
                                                            onChange={item?.onChange}
                                                        />
                                                        :
                                                        <input
                                                            className={"form-control"}
                                                            type={item?.type}
                                                            value={item?.value}
                                                            onChange={item?.onChange}
                                                            placeholder={item?.placeholder}
                                                        />
                                                    }
                                                  </div>
                                                </div>
                                            )}
                                          </div>
                                      );
                                    })}
                                  </div>
                                  <div style={{ width: "48%" }} className={"w-50"}>
                                    {JsxData}
                                  </div>
                                </div>
                              </div>
                          ) : JsxData !== "" && inpData === "" ? (
                              <div style={{ width: "100%" }}>
                                {JsxData}
                              </div>
                          ) : JsxData === "" && inpData !== "" ? (
                              <div>
                                {inpData?.map((item, index) => {
                                  return (
                                      <div key={index}>
                                        {item?.type === "checkbox" ? (
                                            <div
                                                style={{
                                                  display: "flex",
                                                  marginTop: "10px",
                                                  gap:
                                                      item?.title === undefined ||
                                                      item?.title === ""
                                                          ? "0%"
                                                          : "10%",
                                                  justifyContent: "space-between",
                                                }}
                                            >
                                <span
                                    style={{
                                      maxWidth: "20%",
                                      wordBreak: "break-all",
                                    }}
                                >
                                  {item?.title === undefined
                                      ? ""
                                      : item?.title + " "}{" "}
                                </span>
                                              <label
                                                  style={{
                                                    position: "relative",
                                                    width:
                                                        item?.title === undefined ||
                                                        item?.title === ""
                                                            ? "100%"
                                                            : "70%",
                                                  }}
                                              >
                                                <input
                                                    className={"form-check"}
                                                    type={item?.type}
                                                    checked={item?.value}
                                                    style={{ width: "25px" }}
                                                    onChange={item?.onChange}
                                                /> {" "}
                                                <span
                                                    style={{
                                                      position: "absolute",
                                                      left: "35px",
                                                      top: "8px",
                                                    }}
                                                >
                                    {item?.labelValue}
                                  </span>
                                              </label>
                                            </div>
                                        ) : (
                                            <div
                                                style={{ marginTop: "10px" }}
                                                className={"d-flex g-2 justify-content-between"}
                                            >
                                <span
                                    style={{
                                      maxWidth: "20%",
                                      wordBreak: "break-all",
                                    }}
                                >
                                  {item?.title === undefined
                                      ? ""
                                      : item?.title + " "}{" "}
                                </span>
                                              <div
                                                  style={{
                                                    width:
                                                        item?.title === undefined ||
                                                        item?.title === ""
                                                            ? "100%"
                                                            : "70%",
                                                  }}
                                              >
                                                {(item.phone === true && item.type === "number")?
                                                    <PhoneInput
                                                        inputStyle={{ width: "100%" }}
                                                        value={item?.value}
                                                        onChange={item?.onChange}
                                                        placeholder={item?.placeholder}
                                                    />
                                                    :
                                                    <input
                                                        className={"form-control"}
                                                        type={item?.type}
                                                        value={item?.value}
                                                        onChange={item?.onChange}
                                                        placeholder={item?.placeholder}
                                                    />
                                                }
                                              </div>
                                            </div>
                                        )}
                                      </div>
                                  );
                                })}

                              </div>
                          ) : (
                              ""
                          )}
                          <button style={{ margin: "15px 0px 5px 0px", width:"auto"}} className={"btn btn-success"}>
                            {

                              loadingButton?
                                <div id="loading-bar-spinner" className="spinner" style={{margin:0}}>
                                  <div className="spinner-icon" style={{width:"20px",height:"20px"}}></div>
                                </div>:LangData[langIndex]?.universalModal?.saveBtn
                            }
                          </button>
                        </div>
                      </form>
                    </div>

                    :

                    <div id={"bottomChildForUModal"}>
                        <div>
                          {JsxData !== "" && inpData !== "" ? (
                              <div>
                                <div style={{ gap: "4%" }} className={"d-flex w-100"}>
                                  <div style={{ width: "48%" }}>
                                    {inpData?.map((item, index) => {
                                      return (
                                          <div key={index}>
                                            {item?.type === "checkbox" ? (
                                                <div
                                                    style={{
                                                      display: "flex",
                                                      marginTop: "10px",
                                                      gap:
                                                          item?.title === undefined ||
                                                          item?.title === ""
                                                              ? "0%"
                                                              : "10%",
                                                      justifyContent: "space-between",
                                                    }}
                                                >
                                    <span
                                        style={{
                                          maxWidth: "20%",
                                          wordBreak: "break-all",
                                        }}
                                    >
                                      {item?.title === undefined
                                          ? ""
                                          : item?.title + " "}{" "}
                                    </span>
                                                  <label
                                                      style={{
                                                        position: "relative",
                                                        width:
                                                            item?.title === undefined ||
                                                            item?.title === ""
                                                                ? "100%"
                                                                : "70%",
                                                      }}
                                                  >
                                                    <input
                                                        className={"form-check"}
                                                        type={item?.type}
                                                        checked={item?.value}
                                                        style={{ width: "25px" }}
                                                        onChange={item?.onChange}
                                                    />{" "}
                                                    <span
                                                        style={{
                                                          position: "absolute",
                                                          left: "35px",
                                                          top: "8px",
                                                        }}
                                                    >
                                        {item?.labelValue}
                                      </span>
                                                  </label>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{ marginTop: "10px" }}
                                                    className={
                                                      "d-flex g-2 justify-content-between"
                                                    }
                                                >
                                    <span
                                        style={{
                                          maxWidth: "20%",
                                          wordBreak: "break-all",
                                        }}
                                    >
                                      {item?.title === undefined
                                          ? ""
                                          : item?.title + " "}{" "}
                                    </span>
                                                  <div
                                                      style={{
                                                        width:
                                                            item?.title === undefined ||
                                                            item?.title === ""
                                                                ? "100%"
                                                                : "70%",
                                                      }}
                                                  >
                                                    {(item.phone === true && item.type === "number")?
                                                        <PhoneInput
                                                            inputStyle={{ width: "100%" }}
                                                            value={item?.value}
                                                            onChange={item?.onChange}
                                                        />
                                                        :
                                                        <input
                                                            className={"form-control"}
                                                            type={item?.type}
                                                            value={item?.value}
                                                            onChange={item?.onChange}
                                                            placeholder={item?.placeholder}
                                                        />
                                                    }
                                                  </div>
                                                </div>
                                            )}
                                          </div>
                                      );
                                    })}
                                  </div>
                                  <div style={{ width: "48%" }} className={"w-50"}>
                                    {JsxData}
                                  </div>
                                </div>
                              </div>
                          ) : JsxData !== "" && inpData === "" ? (
                              <div style={{ width: "100%" }}>
                                {JsxData}
                              </div>
                          ) : JsxData === "" && inpData !== "" ? (
                              <div>
                                {inpData?.map((item, index) => {
                                  return (
                                      <div key={index}>
                                        {item?.type === "checkbox" ? (
                                            <div
                                                style={{
                                                  display: "flex",
                                                  marginTop: "10px",
                                                  gap:
                                                      item?.title === undefined ||
                                                      item?.title === ""
                                                          ? "0%"
                                                          : "10%",
                                                  justifyContent: "space-between",
                                                }}
                                            >
                                <span
                                    style={{
                                      maxWidth: "20%",
                                      wordBreak: "break-all",
                                    }}
                                >
                                  {item?.title === undefined
                                      ? ""
                                      : item?.title + " "}{" "}
                                </span>
                                              <label
                                                  style={{
                                                    position: "relative",
                                                    width:
                                                        item?.title === undefined ||
                                                        item?.title === ""
                                                            ? "100%"
                                                            : "70%",
                                                  }}
                                              >
                                                <input
                                                    className={"form-check"}
                                                    type={item?.type}
                                                    checked={item?.value}
                                                    style={{ width: "25px" }}
                                                    onChange={item?.onChange}
                                                /> {" "}
                                                <span
                                                    style={{
                                                      position: "absolute",
                                                      left: "35px",
                                                      top: "8px",
                                                    }}
                                                >
                                    {item?.labelValue}
                                  </span>
                                              </label>
                                            </div>
                                        ) : (
                                            <div
                                                style={{ marginTop: "10px" }}
                                                className={"d-flex g-2 justify-content-between"}
                                            >
                                <span
                                    style={{
                                      maxWidth: "20%",
                                      wordBreak: "break-all",
                                    }}
                                >
                                  {item?.title === undefined
                                      ? ""
                                      : item?.title + " "}{" "}
                                </span>
                                              <div
                                                  style={{
                                                    width:
                                                        item?.title === undefined ||
                                                        item?.title === ""
                                                            ? "100%"
                                                            : "70%",
                                                  }}
                                              >
                                                {(item.phone === true && item.type === "number")?
                                                    <PhoneInput
                                                        inputStyle={{ width: "100%" }}
                                                        value={item?.value}
                                                        onChange={item?.onChange}
                                                        placeholder={item?.placeholder}
                                                    />
                                                    :
                                                    <input
                                                        className={"form-control"}
                                                        type={item?.type}
                                                        value={item?.value}
                                                        onChange={item?.onChange}
                                                        placeholder={item?.placeholder}
                                                    />
                                                }
                                              </div>
                                            </div>
                                        )}
                                      </div>
                                  );
                                })}

                              </div>
                          ) : (
                              ""
                          )}
                        </div>
                    </div>
              }
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={miniModal}
        onClose={() => setMiniModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <div
            style={{
              width: "100%",
              padding: "10px 0px 10px 45px",
              fontSize: "18px",
              color: "white",
              background: "#FED053",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <b>{LangData[langIndex]?.universalModal?.note}</b>
          </div>
            <div
              className={"d-flex justify-content-between"}
              style={{ marginTop: "24px", padding: "1% 10% 3%" }}
            >
              <button
                onClick={() => setMiniModal(false)}
                className={"btn btn-danger"}
              >
                {LangData[langIndex]?.universalModal?.no}
              </button>
              <button
                onClick={() =>
                  setMiniModal(false) & closeFunction()
                }
                className={"btn btn-success"}
              >
                {LangData[langIndex]?.universalModal?.yes}
              </button>
            </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UniversalModal;
