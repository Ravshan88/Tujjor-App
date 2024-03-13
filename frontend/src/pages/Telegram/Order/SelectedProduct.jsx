import React, { useState } from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { telegramOrderModel } from '../Redux/Reducers/telegramOrderReducer';
import { domen } from '../../../Config/apiCall';
import "./order.css"
import { ErrorNotify } from 'tools/Alerts';


function SelectedProduct(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const {id:clientId} = useParams()
    let {telegramOrder} = props
    let selectedProduct = telegramOrder.selectedProduct
    const [count, setCount] = useState(1)
    const [isEdit, setIsEdit] = useState(false)
    let navigate = useNavigate()
    const id = searchParams.get('id')
    
    useEffect(() => {
        props.getProduct(id)
        // console.log(JSON.parse(localStorage.getItem('basket')).find(item => item.product.id === id));
        
        if(localStorage.getItem('basket') && JSON.parse(localStorage.getItem('basket')).find(item => item.product.id === id)) {
          let product = JSON.parse(localStorage.getItem('basket')).find(item => item.product.id === id)
          setCount(product.count)
          setIsEdit(true)
        }
    }, [])

    
    function addToBasket() {
      if (isEdit) {
        let basket = JSON.parse(localStorage.getItem('basket'))
        if (Number(count)===0) {
          basket = basket.map(item=>{
            if(item.product.id===id) {
              return {...item, count: count+1}
            }
          })
        } else {
          basket = basket.map(item=>{
            if(item.product.id===selectedProduct.id) {
              return {...item, count}
            }
            return item
          })
        }
        localStorage.setItem('basket', JSON.stringify(basket))
      } else {
        if (!localStorage.getItem('basket')){
          localStorage.setItem('basket', JSON.stringify([{product: selectedProduct, count}]))
        } else {
          let basket = JSON.parse(localStorage.getItem('basket'))
          basket.push({product: selectedProduct, count})
          localStorage.setItem('basket', JSON.stringify(basket))
        }
      }
      navigate("/telegram/order/"+clientId)
    }

    function handleInput(number) {
      if (number > 0) {
        if(number <= selectedProduct.count) {
          setCount(number)
        } else {
          ErrorNotify("Limitdan oshmang")
        }
      } else if (number==="") {
        setCount("")
      } else {
        setCount(1)
      }
    }


  return (
    <div className='father-div'>
      <div className='container'>
        <div className='c2'><Link to={"/telegram/order/"+clientId} className='btn btn-dark'>{"<-"}</Link></div>
        {
          selectedProduct ? 
          <img width={100} height={100} src={domen+"/file/getFile/"+selectedProduct?.attachment.id} />
          :
          ""
        }
        <div className='formcha'>
          <h5>Mahsulot ismi: <b className='green-text'>{selectedProduct?.title}</b></h5>
          <h5>Narxi: <b className='green-text'>{selectedProduct?.price}</b></h5>
          <h5>Company: <b className='green-text'>{selectedProduct?.category.name}</b></h5>
        </div>
        
      </div>
      <div className='btn-area'>
        <div>
          <div className='counter'>
            <button disabled={count<=1} onClick={()=>setCount(count-1)} className='buttoncha red'>-</button>
            <input onChange={(e)=>handleInput(e.target.value)} type='number' value={count} className='index' />
            <button disabled={count===selectedProduct?.count} onClick={()=>setCount(Number(count)+1)} className='buttoncha'>+</button>
          </div>
          <p className='end'>Umumiy: {count*selectedProduct?.price}</p>
        </div>
        <button onClick={addToBasket} className='buttoncha save-btn'>{isEdit?"Tahrirlash":"savatga solish"}</button>
      </div>
    </div>
  )
}

export default connect(state=>state, telegramOrderModel)(SelectedProduct);