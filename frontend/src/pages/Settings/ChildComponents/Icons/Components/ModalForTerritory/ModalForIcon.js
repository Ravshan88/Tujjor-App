import React, {useContext} from 'react';
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {iconAction} from "../../Redux/Reducers/IconReducer";
import "../../../Teritory/Teritory.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"
import {LazyLoadImage} from "react-lazy-load-image-component";
import uploadImg from "images/upload.png";
import {Button, Input} from "antd";
import {Delete} from "@mui/icons-material";
import {domen} from "../../../../../../Config/apiCall";

function ModalForIcon(props) {
    const {langIndex} = useContext(LanguageContext)
    const {icons} = props;

    function checkInpValue() {
        if (icons.name !== "" || icons.imgFileForBackend != null) {
            return true;
        }
        return false;
    }

    function handleFile(e) {
        let file = e.target.files[0];
        props.setImgFileForBackend(e.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                props.setBase64Img(reader.result)
            };
            reader.readAsDataURL(file);
        }
        // axios({
        //     url: "http://localhost:8080/api/v1/file/upload",
        //     method: "POST",
        //     data: formData,
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: localStorage.getItem("access_token")
        //     }
        // }).then(res => {
        //     dispatch(UploadFileStart(res.data));
        // });
    }

    return (
        <UniversalModal
            modalTitle={
                icons.itemForTeritoryEdite === ""
                    ? `${langData[langIndex]?.iconPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.iconPage?.modal?.editeTitle}`
            }
            checkPage={checkInpValue()}
            isOpen={icons.openModal}
            closeFunction={() => props.handleClose()}
            width={35}
            functionforSaveBtn={(modalButton) => props.saveIcon(modalButton)}
            JsxData={
                <div className={"d-flex justify-content-center flex-column"}>
                    {langData[langIndex]?.iconPage?.modal?.icon}
                    <div
                        className={"top my-2 d-flex w-100 rounded-3  border justify-content-center align-items-center"}>
                        <div className={"position-relative"}>
                            <label className={"my-3"}>
                                <input accept={"image/*"} onChange={handleFile} hidden type="file"/>
                                <div title={"Upload file"}
                                     className={`uploadDiv`}>
                                    {
                                        icons.base64Img ?
                                            <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                           effect={"blur"}
                                                           src={icons.base64Img} alt=""/> :
                                            <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                           effect={"blur"}
                                                           src={icons?.attachmentId ? domen + "/file/getFile/" + icons?.attachmentId : uploadImg}
                                                           alt=""
                                            />
                                    }
                                </div>
                            </label>
                            <div className={"deleteFileButton "}>
                                {
                                    (icons.base64Img || icons.attachmentId) &&
                                    <Button title={"Delete"} type={"dashed"} shape={"circle"}
                                            icon={<Delete color={"error"}/>}
                                            onClick={() => {
                                                props.setBase64Img("")
                                                props.setImgFileForBackend(null)
                                                props.setAttachmentId("")
                                            }} className={"d-flex justify-content-center align-items-center"}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {langData[langIndex]?.iconPage?.modal?.name}
                        <Input
                            size={"large"}
                            value={icons.name}
                            onChange={(e) => props.handleName(e.target.value)}
                            type="text"/>
                    </div>
                </div>
            }
        />
    );
}

export default connect((state) => state, iconAction)(ModalForIcon);