import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';

import { QuantityOption,QtySelect, AddToCartButton } from '../components/ProductDetails';
import { Backdrop, Loader } from './HomeScreen';

import styled from 'styled-components';

export default function CartScreen(props) {
    const [remove,setRemove] = useState(false);
    const {id:productId} = props.match.params ||undefined;
    const dispatch=useDispatch();

    useEffect(() => {
        dispatch({type:"GET_TO_CART_NT"})
        setRemove(false);
    }, [remove]);
    
    const {loading,cartItems}= useSelector((state)=>state.cart) || [];
    
    console.log("cartItem",cartItems);

    const removeFromCart =(id)=>{
        
        const filterItems= cartItems.filter((item)=>item._id !== id);
        dispatch({type:"POST_TO_CART_NT",payload:filterItems});
        setRemove(true);
    }

    const proceedToBuy =()=>{
        props.history.push('/signin?redirect=shipping');
    }
    
    if(loading){
        return (<Backdrop><Loader/></Backdrop>)
    }

    return (
        <BigWrapper>
        <Wrapper>
           {cartItems.length === 0 ? (<MessageBox variant="success">
               No Items in Cart. <Link to="/">Shop Here</Link>
           </MessageBox>):(
               <Ul>
                    {cartItems.map((item)=>{
                        return (
                            <Li key={item._id}>
                                <ListWrap>
                                    <ImagWrap>
                                        <Img src={item.image} alt={item.name} />
                                    </ImagWrap>
                                    <Details>
                                        <ProductName>{item.name}</ProductName>
                                        <ProductPrice>$ {item.price}</ProductPrice>
                                        <QtySelect 
                                        onChange={(e)=>  {
                                            dispatch({type:"POST_TO_CART_NT",payload:{id:item._id,qty:Number(e.target.value)}})
                                            setRemove(true);
                                        }}
                                        defaultValue={item.qty}>
                                            {QuantityOption(item.countInStock)}
                                        </QtySelect>
                                        <DeleteWrap>
                                            <button onClick={()=>removeFromCart(item._id)}>Delete</button>
                                        </DeleteWrap>
                                    </Details>
                                </ListWrap>
                            </Li>
                        )
                    })}
               </Ul>
           )}
           </Wrapper>

           <div className="card" style={{display:"flex",flexDirection:"column", flexGrow:"0.5",height:"min-content",padding:"16px"}}>
                <div style={{margin:"10px"}}>
                    Subtotal : {cartItems.reduce((a,c)=>a+Number(c.qty),0)} Items 
                </div>
                <div style={{margin:"10px"}}> 
                    Price : ${cartItems.reduce((a,c)=>a+c.qty*c.price,0)}
                </div>  
                <AddToCartButton onClick={proceedToBuy} disabled={cartItems.length===0}>Proceed To Buy</AddToCartButton>
           </div>
        </BigWrapper>
    )
}

const BigWrapper = styled.div`
    display:flex;
`;

const Wrapper = styled.div`
    width: 70%;
    display: flex;

`

const Ul= styled.ul`   
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
`;

const Li = styled.li`   
    display: flex;
    flex-direction: row;
    width: 100%;
`

const ListWrap=styled.div`
    display: flex;
    width: 100%;
    justify-content: stretch;
    padding: 16px;
`

const ImagWrap = styled.div`
    max-height:200px;
    width: 100px;
    margin-right: 20px;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`

const Details= styled.div`
    flex-grow: 1;
    position: relative;
    top: 0;
    & > div {
        margin-bottom:8px;
    }
`;

const ProductName = styled.h2`

`;

const ProductPrice = styled.div`
    color: #f30000e8;
`;

const DeleteWrap=styled.div`
    display: inline-block;
    float: right;
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;

    & button{
        padding:8px;
    }
`;

