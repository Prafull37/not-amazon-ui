const initialState={
    loading:false,
    cartItems:[],
}

export default function cartReducer(state={ cartItems:[]},action){
    // console.log(action.type)
    switch(action.type){
        case "CART_LOADING":{
            return {
                ...state,
                loading:true,
            }
        }
        case "ADD_TO_CART": {
            const item=action.payload;
            console.log("action",item)
            // const itemExist = state.cartItems.find((cartItem)=>item.product===cartItem.product); 
            return {
                    ...state,
                    loading:false,
                    cartItems:action.payload
              }
        }
        default:
            return state;
    }
}