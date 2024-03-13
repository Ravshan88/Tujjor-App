
import { connect } from 'react-redux';
import apiCall, { domen } from '../../../Config/apiCall';
import {useEffect} from 'react';
import { telegramOrderModel } from '../Redux/Reducers/telegramOrderReducer';
import "./order.css"
import {Select} from "antd";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { toast } from 'react-toastify';


function Index(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const {clientId} = useParams()
    const {telegramOrder} = props;
    const navigate = useNavigate();
    let basket = JSON.parse(localStorage.getItem('basket'))
    const token = searchParams.get('token')


    useEffect(()=>{
        if (token) {
            localStorage.setItem('access_token', token)
        }
        props.getProducts();
    },[])

    function checkProduct(id) {
        if (!localStorage.getItem('basket')) return null;
        let product = JSON.parse(localStorage.getItem('basket')).find(item => item.product.id === id)
        return product?.count
    }

    function addToBasket(product) {
        if (checkProduct(product.id)) {
            let basket = JSON.parse(localStorage.getItem('basket')).map(item => {
                if (item.product.id === product.id && item.count === product.count) {
                    toast.error("Mahsulot tugadi!")
                    return item
                }
                if (item.product.id === product.id) {
                    return {...item, count: Number(item.count)+1}
                }
                return item
            })
            localStorage.setItem('basket', JSON.stringify(basket))
        } else {
            if (localStorage.getItem('basket')) {
                let basket = JSON.parse(localStorage.getItem('basket'))
                basket.push({product, count: 1})
                localStorage.setItem('basket', JSON.stringify(basket))
            } else {
                localStorage.setItem('basket', JSON.stringify([{product: product, count: 1}]))
            }
        }
        props.getProducts()
    }

    function removeProduct(id) {
        let basket = JSON.parse(localStorage.getItem('basket'))
        basket = basket.filter(item=>item.product.id !== id)
        localStorage.setItem('basket', JSON.stringify(basket))
        props.getProducts()
    }


    return (
        <div className='father-div'>
            <div className='filter'>
                <Select
                    style={{width: "25%"}}
                    placeholder={"kategoriya"}
                    // onChange={handleSelect}
                    // value={telegramProducts.initData.categoryId}
                    // options={generateCategoriesSelect()}
                />
                <input className='input' style={{width: "25%"}} type='text' placeholder='search' />
                <button className='buttoncha red'>clear</button>
            </div>
            <div className='container-div'>
                {
                    telegramOrder.products.map((product)=>{
                        let selected = checkProduct(product.id)
                        return <div className={`cardcha2`}>
                            {selected?<div onClick={()=>removeProduct(product.id)} className='x'>x</div>:""}
                            <div className='w-100' onClick={()=>{navigate(`/telegram/order/selectedProduct/${clientId}?id=${product.id}`)}}>
                                <h5>{product.title}</h5>
                                <img width={100} height={80} src={domen+"/file/getFile/"+product.attachment.id} />
                            </div>
                            <button onClick={()=>addToBasket(product)} className={`buttoncha  ${selected? "green":""}`}>{selected?`Tanlandi! (${selected})`: `Tanlash`}</button>
                            {/* {selected?
                            <button>edit</button>
                            :
                            ""} */}
                        </div>
                        })
                }
            </div>
            <button onClick={()=>navigate("/telegram/order/basket/"+clientId)} className='show-cart'>Savatni Ko'rish{basket && basket?.length!==0?"("+basket?.length+")":""} <ShoppingBagIcon /></button>
        </div>
    );
}

export default connect(state=>state, telegramOrderModel)(Index);