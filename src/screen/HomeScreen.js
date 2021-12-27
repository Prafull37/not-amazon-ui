import { useEffect } from 'react';
import styled from 'styled-components';
import {useDispatch,useSelector} from 'react-redux';
import Product from "../components/Product";
import { keyframes } from 'styled-components';
import MessageBox from "../components/MessageBox";

export default function HomeScreen(){
    const dispatch= useDispatch();
    // const [loading,setLoading]= useState(true);
    useEffect(()=>{
        dispatch({type:"FETCH_PRODUCTS_NETWORK"});
    },[])
    const {loading,products,error} = useSelector(state=> state.products);
    

    if(products?.length >0 && loading===false ){
            return (

        <div className="rows center">
        {products.map((product)=><Product product={product} key={product._id}/>)}
        </div>
            )
    }
    if(error){
        return(<MessageBox variant="danger">{error}</MessageBox>)
    }
    return (<Backdrop><Loader />
        </Backdrop>);
}

const rotate=keyframes`
    0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }

`;

export const Backdrop= styled.div`
    background-color:rgba(0,0,0,0.6);
    z-index:1;
    position:fixed;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
`;

export const Loader=styled.div`
border-top:4px solid  #ff8000;
border-radius:50%;
animation: ${rotate} 2s linear infinite;
position:absolute;
top:50%;
left:50%;
z-index:2;
height:50px;
width:50px;
`;
