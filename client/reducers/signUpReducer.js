export default function signUpReducer(state = [],action){
    switch(action.type){
        case "SIGN_UP":
            return [...state, Object.assign({},action.data)];
        default:
            return state; 
    }
}