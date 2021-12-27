
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux';
import { useEffect,useState } from "react";

import ProductDetails from "../components/ProductDetails";
import MessageBox from "../components/MessageBox";
import { Backdrop, Loader } from "./HomeScreen";


export default function ProductScreen(props){
    const {id:productId}=useParams();
    const dispatch=useDispatch();
    const {loading,error,productDetail:product} = useSelector((state)=>state.productDetails)
    const [qty,setQty] =useState(()=>{ return product.countInStock===0?0:1});

    useEffect(()=>{
      dispatch({type:"FETCH_PRODUCT_DETAIL_NETWORK",id:productId})
    },[productId,dispatch])

    const setQuantity=(value)=>{
      setQty(value)
    }

    const addToCart = ()=>{
      dispatch({type:"POST_TO_CART_NT",payload:{id:productId,qty}})
      props.history.push(`/cart`);
    }
   
    if(error){
     return(<MessageBox variant="danger">{error}</MessageBox>)
    }
    if(product && loading===false ){
    return (
      <div style={{height:"100%"}}>
        <div>
            <div>
                <ProductDetails product={product} qunatity={qty} setQuantity={setQuantity} addToCartFunction={addToCart} />
            </div>
        </div>
      </div>
    )
   }
  return (<Backdrop><Loader />
    </Backdrop>);
}

