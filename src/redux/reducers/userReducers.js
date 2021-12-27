const initState={
    loading:false,
    user:{},
    error:false
}

export default function userReducers(state=initState,action){

    switch(action.type){
        case "USER_LOADING":{
            return {loading:true}
        }
        case "USER_SIGNIN_SUCCESS":{
            return {error:false,loading:false,user:action.payload}
        }
        case "USER_SIGNIN_FAIL":{
            return {...state,loading:false,error:action.error}
        }
        case "USER_SIGNOUT":{
            return initState
        }
        default:
            return state;
    }
}