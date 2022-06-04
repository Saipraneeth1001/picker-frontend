import { createStore } from 'redux';


const initialState = {
  token: "", 
  user_forgot_password: "",
  alerts: []
}

const reducer = (state = initialState, action) => {

   if (action.type === "SAVE_TOKEN") {
      return {
        ...state,
        token: action.payload
      }
   }

   if (action.type == "SAVE_ALERTS") {
      return {
        ...state,
        alerts: action.payload
      }
   }

   if (action.type == "SAVE_USER_FORGOT_PASSWORD") {
     return {
       ...state, 
       user_forgot_password: action.payload
     }
   }

   return state;
}

const store = createStore(reducer);

export default store;