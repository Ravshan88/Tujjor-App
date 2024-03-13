import apiCall from '../../../Config/apiCall';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SockJsClient from 'react-stomp';

function Checking() {
    const {clientId} = useParams()
    const navigate = useNavigate()
    const [phone, setPhone] = useState("+998-xxx-xx-xx")

function handleMessage(data) {
    if(data.clientId === clientId) {
        if(data.status==="yes") {
            apiCall("/order/toOrder/"+clientId, "POST", JSON.parse(localStorage.getItem("basket"))).then(res=>console.log(res.data))
            navigate("/telegram/order/success/"+clientId)
        } else if(data.status==="no") {
            navigate("/telegram/order/failure/"+clientId)
        }
    }
}

useEffect(()=>{
    apiCall("/client/getClient/"+clientId).then(res=>{
        setPhone(res.data.user.phone);
    })
}, [])


  return (
    <div className='father-div'>
        <SockJsClient url='http://localhost:8080/ws' topics={['/topics/verifyClient']}
            onMessage={handleMessage}
            />
        <h5 className='w-75 mx-auto mt-5'>{phone} raqamli mijozga tasdiqlash xabari yuborildi, iltimos kuting...!</h5>
    </div>
  )
}

export default Checking