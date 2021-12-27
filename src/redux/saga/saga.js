import {all,fork} from "redux-saga/effects";
import watchProductSaga from "../actions/productActions";
import watchProductDetails from "../actions/productDetailsAction";
import  watchCartSaga  from "../actions/cartActions";
import watchUserSignInSaga from "../actions/userAction";
export default function *rootSaga(){
    yield all([
        fork(watchProductSaga),
        fork(watchProductDetails),
        fork(watchCartSaga),
        fork(watchUserSignInSaga)
    ])
}