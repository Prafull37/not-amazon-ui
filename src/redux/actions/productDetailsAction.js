import {put,call,takeEvery} from "redux-saga/effects"
import getProducts from "../../network";

function  productDetailsSuccess(data){
    return {type:"FETCH_PRODUCT_DETAIL_SUCCESS",payload:data}
}

function productDetailsError(error){
    return {type:"FETCH_PRODUCT_DETAIL_ERROR",error:error}
}


function *fetchProductDetails({id}){
    
    try{    
        yield put({type:"REQUEST_PRODUCT_DETAILS"})
        const {data}=yield call(getProducts,`/api/v1/products/${id}`);
    
        yield put(productDetailsSuccess(data.product))

    }catch(e){
        yield put(productDetailsError(e.message))
    }
}

export default function *watchProductDetails(id){
    
    yield takeEvery("FETCH_PRODUCT_DETAIL_NETWORK",fetchProductDetails)
}