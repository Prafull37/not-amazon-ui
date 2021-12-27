import { takeLatest,put,call } from "redux-saga/effects";
import { post } from "../../network";


export function* userProcess(...rest){
    // console.log("invoke",url)
    const [url,{credentials}]= rest;
    yield put({type:"USER_LOADING"})
    try{
        const {data} = yield call(post,url,credentials);
        localStorage.setItem("userInfo",JSON.stringify(data))
        console.log("Daa",data)
        yield put({type:"USER_SIGNIN_SUCCESS",payload:data})
    }catch(e){
        yield put({type:"USER_SIGNIN_FAIL",error:e.message})
    }   
}

export function* userSignOut(){
    localStorage.removeItem("userInfo");
    yield put({type:"USER_SIGNOUT"})
}


export default function* watchUserSignInSaga(){
    yield takeLatest("CREATE_NEW_USER",userProcess,'api/v1/users/register');
    yield takeLatest("FETCH_USER_DETAILS",userProcess,'api/v1/users/signin');
    yield takeLatest("USER_TAKE_SIGNOUT",userSignOut);
}