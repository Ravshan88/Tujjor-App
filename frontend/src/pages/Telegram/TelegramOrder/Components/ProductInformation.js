import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {domen} from "../../../../Config/apiCall";
import {KeyboardBackspace, PhoneSharp} from "@mui/icons-material";
import '../TelegramProductStyle.css'
// import Loading from "pages/Loading/Loading";
import load from '../../../../images/loading.gif'

function ProductInformation(props) {
    const {id} = useParams()
    const orderInfo = JSON.parse(localStorage.getItem("productInfo"))
    const navigate = useNavigate()
    const date = new Date(orderInfo?.createdAt).getFullYear() + "-"
        + new Date(orderInfo?.createdAt).getMonth() + "-"
        + new Date(orderInfo?.createdAt).getDate() + " "
        + new Date(orderInfo?.createdAt).getHours() + ":"
        + new Date(orderInfo?.createdAt).getMinutes();
    const [loading, setLoading] = useState(false)
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
        if (match) {
            return `+(${match[1]}) ${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
        }
        return null;
    };

    // Extract phone number from orderInfo and format it
    const phoneNumber = formatPhoneNumber(orderInfo?.phoneNumber);
    return (
        <div className={"p-2"}>
            <div style={{maxWidth: "500px"}} className={"border children mx-auto mt-3 p-2"}>
                <div className={"text-start"}>
                    <button className={"backButton"} onClick={
                        () => {
                            navigate(-1)
                            localStorage.removeItem("productInfo")
                        }
                    }><KeyboardBackspace color={"primary"}/>
                    </button>
                </div>
                <h3 className={"text-center"}>Order Information</h3>
                <div className={"text-start mt-2"}>
                    <div className={"d-flex gap-1 "}>
                        <h6 style={{color:"#0d6efd"}}>Ordered by: </h6>
                        <h6 className={"text-secondary"}>&nbsp;{orderInfo?.clientName}</h6>
                    </div>
                    <div className={"d-flex"}>
                        <h6 style={{color:"#0d6efd"}}>Date:</h6>
                        <h6 className={"text-secondary"}>&nbsp;{date}</h6>
                    </div>
                    <div className={"d-flex"}>
                        <a style={{textDecoration: "none", display: "flex"}}
                           href={`tel:+${phoneNumber.replace(/\D/g, '')}`}>
                            <h6>Phone Number:</h6>
                            <h6 className={"text-secondary"}>&nbsp;{phoneNumber}</h6>
                        </a>

                    </div>
                </div>
                <div className={"d-flex flex-wrap gap-2"}>
                    {orderInfo?.products?.map(prod => <div className={"border"}>
                        <div className={"products p-3"}>
                            <div className={"imgContainer"}>
                                <LazyLoadImage
                                    beforeLoad={() => {
                                        setLoading(true)
                                    }}
                                    afterLoad={() => {
                                        setLoading(false)
                                    }}
                                    className={"aspect-square object-contain"}
                                    height={80}
                                    src={loading ? load : domen + `/file/getFile/${prod.product?.attachment?.id}`}
                                    effect={"blur"}/>
                            </div>
                            <div className={"d-flex gap-2"}>
                                <p className={"productName"}>Name: </p>
                                <p>{prod.product?.title}</p>
                            </div>
                            <div className={"d-flex gap-2 "}>
                                <p className={"productPrice"}>Count: </p>
                                <p>{prod.product?.count}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default ProductInformation;