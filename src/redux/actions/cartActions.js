import {call,put,takeLatest} from "redux-saga/effects";
import getProducts ,{post} from "../../network";

export function addToCartAction(data){
    
    return {type:"ADD_TO_CART",payload:data};
}



export function *getFromCartApi(){
    try{ 
        yield put({type:"CART_LOADING"});
        const {data}=yield call(getProducts,`/api/v1/cart`);
        console.log("data",data)
        yield put({type:"ADD_TO_CART",payload:data})
    }
    catch(e){

    }
}

export function *postToCart(action){
    console.log("action...",action)
    try{
        
       const {data}= yield call(post,'/api/v1/cart',action.payload);
    //    console.log("working..")
    //    console.log("data",data)
    //    yield put({type:"ADD_TO_CART",payload:data})
    }
    catch(e){

    }
}

export default function* watchCartSaga(){
    yield takeLatest("POST_TO_CART_NT",postToCart)
    yield takeLatest("GET_TO_CART_NT",getFromCartApi)
}