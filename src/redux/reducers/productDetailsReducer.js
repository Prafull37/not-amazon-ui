
const initState={
    loading:true,
    productDetail:{},
    error:false
};


export default function productDetailsReducer(state=initState,action){
    switch(action.type){
        case "REQUEST_PRODUCT_DETAILS":{
            return {...state,loading:true}
        }
        case "FETCH_PRODUCT_DETAIL_SUCCESS":{
            return {...state,loading:false,productDetail:action.payload}
        }
        case "FETCH_PRODUCT_DETAIL_ERROR":{
            return {...state,loading:false,error:action.error}
        }
        default:
            console.log("State in world",state)
            return state;
    }
}