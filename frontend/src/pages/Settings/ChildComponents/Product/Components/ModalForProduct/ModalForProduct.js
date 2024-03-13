import React, {useContext, useEffect, useState} from 'react';
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import "../../../Teritory/Teritory.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"
import {Select, Input, InputNumber, Checkbox, Button} from "antd";
import {MoveToInboxOutlined} from "@mui/icons-material";
import {domen} from "../../../../../../Config/apiCall";
import {productAction} from "pages/Settings/ChildComponents/Product/Redux/Reducers/ProductReducer";
import {LazyLoadImage} from "react-lazy-load-image-component";
import './inputFile.css'
import placeholderImage from '../../../../../../images/placeholderImage.png'

function ModalForProduct(props) {
    const {langIndex} = useContext(LanguageContext)
    const {products} = props;
    useEffect(() => {
        props.getCategory()
        props.getDealerStart()
    }, [])

    function checkInpValue() {
        return !!(products.title || products.price || products.company || products.dealerId || products.count || products.categoryId || products.free || products.base64Img);
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        props.setBase64Img(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };
    const [isDragOver, setIsDragOver] = useState(false);
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        props.setBase64Img(file);
    };
    const handleDragLeave = () => {
        setIsDragOver(false);
    };
    const dropZoneStyle = {
        border: isDragOver ? '1px dashed #007BFF' : '1px dashed #ccc',
        padding: '20px',
    };

    return (
        <UniversalModal
            modalTitle={
                !products.isEditing
                    ? `${langData[langIndex]?.productPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.productPage?.modal?.editeTitle}`
            }
            checkPage={checkInpValue()}
            isOpen={products.openModal}
            closeFunction={() => props.handleClose()}
            width={50}
            functionforSaveBtn={(modalButton) => props.saveProduct(modalButton)}
            JsxData={
                <div className={"d-flex justify-content-center gap-3"}>
                    <div className={"w-50"}>
                        {langData[langIndex]?.productPage?.modal?.category}
                        <select value={products.categoryId} onChange={(e) => props.handleCategoryId(e.target.value)}
                                className={"form-select mb-2"}>
                            <option value="">Select Category</option>
                            {
                                products.categories.map(item => <option value={item.id}>
                                    {item.name}
                                </option>)
                            }
                        </select>
                        {langData[langIndex]?.productPage?.modal?.dealer}
                        <select disabled={products.company} value={products?.dealerId ? products.dealerId : ""}
                                onChange={(e) => props.handleDealerId(e.target.value)}
                                className={"form-select mb-2"}>
                            <option value="">Select Dealer</option>
                            {
                                products.dealers.map(item => <option value={item.id}>
                                    {item.fullName}
                                </option>)
                            }
                        </select>

                        {langData[langIndex]?.productPage?.modal?.title}
                        <Input
                            className={"mb-2"}
                            size={"large"}
                            value={products.title}
                            onChange={(e) => props.handleTitle(e.target.value)}
                            type="text"/>
                        {langData[langIndex]?.productPage?.modal?.price}
                        <InputNumber
                            className={"mb-2"}
                            size={"large"}
                            style={{width: '100%'}}
                            value={products.price}
                            onChange={(e) => props.handlePrice(e)}
                            type="number"/>
                        {langData[langIndex]?.productPage?.modal?.count}
                        <InputNumber
                            className={"mb-2"}
                            size={"large"}
                            style={{width: '100%'}}
                            value={products.count}
                            onChange={(e) => props.handleCount(e)}
                            type="number"/>

                        <div className={"d-flex align-items-center justify-content-between mt-1"}>
                            <label>
                                {`${langData[langIndex]?.productPage?.modal?.company}`}
                                <Checkbox
                                    className={"mx-2"}
                                    checked={products.company}
                                    onChange={(e) => props.handleCompany(e.target.checked)}
                                />
                            </label>
                            <div className={"border p-2  rounded d-flex gap-4 align-items-center"}>
                                <label className={"text-danger"}>
                                    {`${langData[langIndex]?.productPage?.modal?.notFree}`}
                                    <input type={"radio"}
                                           name={"free"}
                                           className={"mx-2"}
                                           checked={!products.free && !products.free}
                                           onChange={(e) => props.handleFree(false)}
                                    />
                                </label>
                                <label className={"text-success"}>
                                    {`${langData[langIndex]?.productPage?.modal?.free}`}
                                    <input type={"radio"}
                                           name={"free"}
                                           className={"mx-2"}
                                           checked={products.free && products.free}
                                           onChange={(e) => props.handleFree(true)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={"position-relative w-50"}>
                        <label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                style={dropZoneStyle}
                                className={"inputFile"}
                            >
                                <div className={'d-flex flex-column align-items-center'}>
                                    <div>
                                        <MoveToInboxOutlined color={"primary"} fontSize={"large"}/>
                                    </div>
                                    <div>
                                        <p className={"font-monospace text-center"}>
                                            {`${langData[langIndex]?.uploadMessage?.title}`}
                                        </p>
                                    </div>
                                </div>
                                <input hidden type="file" accept="image/*"
                                       onChange={handlePhotoChange}/>
                            </div>
                        </label>
                        <div className={"imageContainer"}>
                            {
                                products.base64Img ?
                                    <LazyLoadImage
                                        width={"100%"}
                                        className={"text-center aspect-square object-contain img"}
                                        height={"180px"}
                                        effect={"blur"}
                                        src={URL.createObjectURL(products.base64Img)} alt=""/> :
                                    <LazyLoadImage className={"text-center  aspect-square object-contain"}
                                                   height={"180px"}
                                                   width={"100%"}
                                                   effect={"blur"}
                                                   src={products?.attachmentId ? domen + "/file/getFile/" + products?.attachmentId : placeholderImage}
                                                   alt=""/>
                            }
                        </div>
                    </div>
                </div>
            }
        />
    );
}

export default connect((state) => state, productAction)(ModalForProduct);