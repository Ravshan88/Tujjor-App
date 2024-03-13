import React from 'react';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "pages/universal/Table/Table";

function UniversalArchiveModal(props) {

    return (
        <div>
            <Modal
                open={props.visibility}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={props.style}>
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
                            <b>Archived Data</b>
                            <button
                                style={{ margin: "-4px 3% 5px 0px" }}
                                className={"btn btn-danger"}
                                onClick={()=>props.handleArchiveModalVisibility()}
                            >
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            // padding: "10px 0px 10px 45px",
                            fontSize: "18px",
                            color: "white",
                            // borderTopLeftRadius: "10px",
                            // borderTopRightRadius: "10px",
                        }}
                    >
                        <Table
                            filterActive={false}
                            columnOrderMode={false}
                            excel={false}
                            dataProps={props.data}
                            pagination={false}
                            changeSizeMode={false}
                            columnsProps={props.columns}
                            tableHeader={false}

                        />
                    </div>

                </Box>




            </Modal>

        </div>
    );
}

export default UniversalArchiveModal;