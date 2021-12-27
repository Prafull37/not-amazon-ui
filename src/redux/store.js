import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import productReducer from './reducers/productReducer';
import productDetailsReducer from './reducers/productDetailsReducer';
import cartReducer from './reducers/cartReducers';
import userReducers from './reducers/userReducers';
//saga
import rootSaga from "./saga/saga";

export default function store(){
    const initialState={
        userInfo:{
            loading:false,
            error:false,
            user:localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {},
    }
        
    }
    const saga=createSagaMiddleware();
    const reducers=combineReducers({
        products:productReducer,
        productDetails:productDetailsReducer,
        cart:cartReducer,
        userInfo:userReducers
    })
    // const init={
    //     products:{}
    // }
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const enhancer = composeEnhancer(applyMiddleware(saga));
    const store = createStore(reducers,initialState,enhancer);
    saga.run(rootSaga);
    return store;
}