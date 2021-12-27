import {call,put,takeLatest} from "redux-saga/effects";
import getProducts from "../../network";


function fetchProduct(data){
    return {type:"FETCH_PRODUCTS_SUCCESS",payload:data}
}

function getError(error){
    return {type:"FETCH_PRODUCTS_ERROR",error:error}
}



function *generatorFetchData(){
    try{
        yield put({type:"REQUEST_FETCH_PRODUCT"});
        const {data}=yield call(getProducts,"/api/v1/products");
        const action=fetchProduct(data.products);
        yield put(action)
    }
    catch(err){
        const action=getError(err);
        yield put(action)
    }
}

export default function *watchProductSaga(){
    yield takeLatest("FETCH_PRODUCTS_NETWORK",generatorFetchData);
}