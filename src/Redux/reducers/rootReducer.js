import { combineReducers } from 'redux'; 

import { CREATE_USER } from "../actions/types";

import createReducer from './createReducer'; 

import setProfileInfo from './setProfileInfoReducer';

const index = combineReducers({
    createReducer,
    setProfileInfo
});

export default index;
