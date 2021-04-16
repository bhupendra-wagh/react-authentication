import { CREATE_USER } from "../actions/types";
import { combineReducers } from 'redux'; 

import MOCK_DATA from './../../components/list/MOCK_DATA.json'

const createReducer = (state= MOCK_DATA, action) => {
    console.log(action.payload);
    switch(action.type){
        case CREATE_USER : 
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        default:
                return state;       
    }
}


const index = combineReducers({
    createReducer
  });
  
  
export default index;

