import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./order.css"
import apiCall from '../../../Config/apiCall';

function Basket() {
    const {clientId} = useParams()
    const [basket, setBasket] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setBasket(JSON.parse(localStorage.getItem('basket')))
    }, [])


    function getCount() {
        let result = 0
        basket.map((item)=>{
            result+=item.count
        })
        return result
    }

    function getSum() {
        let result = 0
        basket.map((item)=>{
            result+=item.count*item.product.price
        })
        return result
    }

    function toOrder() {
        apiCall("/order?id="+clientId, "POST", basket).then(res=>{
            if(res.data==="checking"){
                navigate("/telegram/order/checking/"+clientId)
            } else if(res.data==="saved by client") {
                navigate("/telegram/order/success/"+clientId)
            }
        })
    }


  return (
    <div className='py-1 px-4 vh-100'>
        <div className='c2'><Link to={"/telegram/order/"+clientId} className='btn btn-dark mb-2'>{"<-"}</Link></div>
        {
            basket.length?
            <div className='my-container-1'>
                <ul className='list-group'>
                {
                    basket.map((item)=>{
                        return <li className='list-group-item li-p'><i>{item.product.title}</i> <i>{item.count}x</i> <i>{item.count*item.product.price} so'm</i></li>
                    })
                }
                </ul>
                <div className="sum">
                    <h5 className='sum-a'>Jami: <i>{getCount()} ta</i></h5>
                    <h5 className='sum-a'>Umumiy Narx: <i>{getSum()} so'm</i></h5>
                    <div className="sum-btn"><button onClick={toOrder} className='btn btn-confirm'>Tasdiqlash</button></div>
                </div>
            </div>
            :
            <h1>Savat bo'sh</h1>
        }
    </div>
  )
}

export default Basket