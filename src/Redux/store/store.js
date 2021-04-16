import { createStore } from 'redux';

import createReducer from './../reducers/createReducer';

const store = createStore(createReducer);

export default store;