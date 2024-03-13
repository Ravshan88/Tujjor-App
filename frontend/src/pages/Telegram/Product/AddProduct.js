import React, {useEffect, useRef, useState} from 'react';
import "./Product.css"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import {connect} from "react-redux";
import {telegramProductModel} from "../Redux/Reducers/telegramProductReducer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {Select} from "antd";

function AddProduct(props) {
    const navigate = useNavigate()
    const {telegramProducts} = props
    const inputRef = useRef(null)
    const [image, setImage] = useState("")
    const {id} = useParams()

    useEffect(() => {
        props.getProducts()
        if (id) {
            props.fillInitData(id)
        }
    }, [])

    const handleImageClick = () => {
        inputRef.current.click()
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        props.setInitData({field: "file", value: file})
        setImage(file)
    }

    const deleteAvatar = () => {
        setImage("")
    }

    const save = () => {
        const {initData} = telegramProducts
        if (initData.title.length === 0 || initData.categoryId === "" || initData.file === null) {
            toast.error("barcha ma'lumotlarni to'ldiring!")
            return
        }
        props.saveProduct(telegramProducts.initData)
        props.clearInitData()
        navigate("/telegram/product/" + localStorage.getItem("access_token"))
    }

    const editProduct = () => {
        const {initData} = telegramProducts
        if (initData.title.length === 0 || initData.categoryId === "" || initData.file === null) {
            toast.error("barcha ma'lumotlarni to'ldiring!")
            return
        }
        props.editProduct({...telegramProducts.initData, id})
        props.clearInitData()
        navigate("/telegram/product/" + localStorage.getItem("access_token"))
    }

    function generateCategoriesSelect() {
        const optionsCategory = [];
        telegramProducts?.categories?.map((item) => {
            optionsCategory.push({
                value: item.id,
                label: item.name,
            });
        });
        return optionsCategory;
    }

    function handleSelect(item) {
        props.setInitData({value: item, field: "categoryId"})
    }

    return (
        <div>
            <div className={"w-100 d-flex justify-content-start p-2"}><Link
                to={`/telegram/product/${localStorage.getItem("access_token")}`}
                className={"btn btn-dark"}>{"<-"}</Link></div>
            <div className={"form1 d-flex justify-content-center align-items-center mx-auto position-relative"}>
                {
                    image ?
                        <img onClick={handleImageClick} className={"img1"} width={80} height={80}
                             src={URL.createObjectURL(image)}/>
                        :
                        <AddAPhotoIcon onClick={handleImageClick}/>
                }
                <input type="file" ref={inputRef} onChange={handleImageChange} hidden={true}/>
                <div onClick={() => deleteAvatar()} className={"trash1"}>
                    <DeleteIcon/>
                </div>
            </div>
            <form onSubmit={e => e.preventDefault()} className={"mt-4 w-75 mx-auto"}>

                <input value={telegramProducts.initData.title}
                       onChange={(e) => props.setInitData({field: "title", value: e.target.value})}
                       className={"form-control my-2"} placeholder={"name"} type="text"/>

                <Select
                    style={{width: "100%"}}
                    placeholder={"Select product"}
                    onChange={handleSelect}
                    value={telegramProducts.initData.categoryId}  // Make sure this is the correct property
                    options={generateCategoriesSelect()}
                />

                <input value={telegramProducts.initData.price}
                       onChange={(e) => props.setInitData({field: "price", value: e.target.value})}
                       className={"form-control my-2"} placeholder={"price"} type="number"/>
                <input value={telegramProducts.initData.count}
                       onChange={(e) => props.setInitData({field: "count", value: e.target.value})}
                       className={"form-control my-2"} placeholder={"count"} type="number"/>
                <div className={"w-100 d-flex justify-content-around"}>
                    <label className={"text-success"}>
                        active
                        <input checked={telegramProducts.initData.free}
                               onChange={(e) => props.setInitData({field: "free", value: e.target.checked})}
                               name={"active"} placeholder={"count"} type="radio"/>
                    </label>
                    <label className={"text-danger"}>
                        inactive
                        <input checked={!telegramProducts.initData.free}
                               onChange={(e) => props.setInitData({field: "free", value: !e.target.checked})}
                               name={"active"} placeholder={"count"} type="radio"/>
                    </label>
                </div>
                {
                    id ?
                        <button onClick={editProduct} className={"btn btn-primary"}>Tahrirlash</button>
                        :
                        <button onClick={save} className={"btn btn-primary w-50 mt-4"}>Mahsulotni Qo'shish</button>
                }
            </form>
        </div>
    );
}

export default connect(state => state, telegramProductModel)(AddProduct);