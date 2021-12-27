const initialState={
    loading:true,
    products:[],
    error:false,
}

export default function productReducer(state=initialState,action){
   
    switch(action.type){
        case "REQUEST_FETCH_PRODUCT":{
            return {...state,loading:true}
        }
        case "FETCH_PRODUCTS_SUCCESS":{
            return {...state,products:action.payload,loading:false};
        }
        case "FETCH_PRODUCTS_ERROR":{
            return {...state,error:action.error,loading:false}
        }
        default:
            return state;
    }
}