import React from 'react'
import { Link, useParams } from 'react-router-dom'
import successIcon from './success.svg'
import { useState } from 'react'
import { useEffect } from 'react'
import apiCall from '../../../Config/apiCall';

function Success() {
    const {clientId} = useParams()
    const [clientName, setClientName] = useState()
    const [isClient, setIsClient] = useState(true)

    function backToHome() {
        let cleanMassive = []
        localStorage.setItem('basket', JSON.stringify(cleanMassive))
    }

    useEffect(()=>{
        apiCall("/client/getClient/"+clientId).then(res=>{
            if (res.data==="Access Denied") {
                setIsClient(true)
            } else if (res.data) {
                setClientName(res.data.name)
                setIsClient(false)
            }
        })
    }, [])

    function sum() {
        let result = 0
        let basket = JSON.parse(localStorage.getItem('basket'))
        for (let i=0; i<basket.length; i++) {
            result += basket[i].count*basket[i].product.price
        }
        return result
    }
    function count() {
        let result = 0
        let basket = JSON.parse(localStorage.getItem('basket'))
        for (let i=0; i<basket.length; i++) {
            result += basket[i].count
        }
        return result
    }


  return (
    <div className='father-div'>
        <div className='c2 m-2'><Link onClick={backToHome} to={"/telegram/order/"+clientId} className='btn btn-dark mb-2'>{"<-"}</Link></div>
        {
            isClient?
            <p className='w-75 mx-auto text-start mt-5 h4'>Buyurtma muvaffaqiyatli yaratildi!<br /><br />
        </p>
        :
        <p className='w-75 mx-auto text-start mt-5 h4'>Siz va {clientName} o'rtasida muvafaqqiyatli buyurtma yaratildi! <br />
        Umumiy narx: {sum()}so'm <br />
        Mahsulotlar soni: {count()}<br /><br />
        </p>
        }
        <h1><img width={70} height={70} src={successIcon} alt="" /></h1>
    </div>
  )
}

export default Success