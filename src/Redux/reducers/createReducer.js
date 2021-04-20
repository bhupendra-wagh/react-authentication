import { CREATE_USER } from "../actions/types";

import MOCK_DATA from './../../components/list/MOCK_DATA.json'

const createReducer = (state= MOCK_DATA, action) => {
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



  
  
export default createReducer;

