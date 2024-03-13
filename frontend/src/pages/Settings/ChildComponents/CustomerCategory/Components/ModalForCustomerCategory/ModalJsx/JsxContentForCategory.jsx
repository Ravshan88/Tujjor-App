import React, {useEffect} from 'react';
import uploadImg from "../../../../../../../images/upload.png"
import "./modalCss.css"
import {connect} from "react-redux";
import {customerCategoryActions} from "../../../Redux/Reducers/customerCategoryReducer";
import {domen} from "../../../../../../../Config/apiCall";
import {Delete} from "@mui/icons-material";
import {Button} from "antd";
import {Chip, Divider} from "@mui/material"
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function JsxContentForCategory(props) {

    const {customerCategory} = props;

    useEffect(() => {
        props.getPhoto()
    }, [customerCategory.image])

    useEffect(() => {
        props.getIcons()
    }, [])

    function handleFile(e) {
        let file = e.target.files[0];
        props.setImgFileForBackend(e.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                props.setAttachmentId("")
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

    const handleImageClick = (url) => {
        props.setBase64Img("")
        props.setSelectedImage(url.url);
        props.setAttachmentId(url.attachmentId);
    };
    console.log(customerCategory.selectedImage)
    console.log(customerCategory.base64Img)
    return (
        <div>
            <div className={"top my-2 d-flex rounded-3  border justify-content-center align-items-center"}>

                            <div className={"position-relative"}>
                                <label className={"my-3"}>
                                    <input accept={"image/*"} onChange={handleFile} hidden type="file"/>
                                    <div title={"Upload file"}
                                         className={`uploadDiv`}>
                                        {
                                            customerCategory.base64Img ?
                                                <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                               effect={"blur"}
                                                               src={customerCategory.base64Img} alt=""/> :
                                                customerCategory.selectedImage ?
                                                    <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                                   effect={"blur"}
                                                                   src={customerCategory.selectedImage}
                                                                   alt=""/> :
                                                    <LazyLoadImage style={{borderRadius: "50%"}} height={80} width={80}
                                                                   effect={"blur"}
                                                                   src={customerCategory?.attachmentId ? domen + "/file/getFile/" + customerCategory?.attachmentId : uploadImg}
                                                                   alt=""
                                                    />
                                        }
                                    </div>

                                </label>
                                <div className={"deleteFileButton "}>
                                    {
                                        (customerCategory.base64Img || customerCategory.selectedImage || customerCategory.attachmentId) &&
                                        <Button title={"Delete"} type={"dashed"} shape={"circle"} icon={<Delete color={"error"}/>}
                                                onClick={() => {
                                                    props.setBase64Img("")
                                                    props.setSelectedImage("")
                                                    props.setAttachmentId("")
                                                }} className={"d-flex justify-content-center align-items-center"}/>
                                    }
                                </div>
                            </div>


            </div>
            <Divider>
                <Chip label={"Options"}/>
            </Divider>
            <div className="image-list-container my-2">
                {
                    customerCategory.isLoading ? (
                        <div className={"d-flex justify-content-center mx-auto align-items-center"}>
                            <div id="loading-bar-spinner" className="spinner" style={{margin: 0}}>
                                <div className="spinner-icon" style={{width: "20px", height: "20px"}}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="image-list">
                            {customerCategory.imageUrls.map((url, index) => (
                                <div
                                    className={`image-item ${customerCategory.selectedImage === url.url ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => handleImageClick(url)}
                                >
                                    <div
                                        className={"d-flex justify-content-center align-items-center flex-column mt-2"}>
                                        <LazyLoadImage effect={"blur"} src={url.url}
                                                       alt={`Image ${index}`}/>
                                        <span className={"small mx-auto"}>{url.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                    )
                }

            </div>
        </div>
    );
}

export default connect((state) => state, customerCategoryActions)(JsxContentForCategory);