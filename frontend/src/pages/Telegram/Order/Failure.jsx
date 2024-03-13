import React from 'react'
import closeIcon from "./close-icon.svg"
import { Link, useParams } from 'react-router-dom'

function Failure() {
    const {clientId} = useParams()

function backToHome() {
    let cleanMassive = []
    localStorage.setItem('basket', JSON.stringify(cleanMassive))
}

  return (
    <div className='father-div'>
        <div className='c2 m-2'><Link onClick={backToHome} to={"/telegram/order/"+clientId} className='btn btn-dark mb-2'>{"<-"}</Link></div>
        <div className='mt-4'>
            <h3>Buyurtma rad etildi <br /><br/>
            <img width={70} height={70} src={closeIcon} alt="" />
            </h3>
        </div>
    </div>
  )
}

export default Failure