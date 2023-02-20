import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import authSlice from '../features/auth'
import companySlice from '../features/company';

const store = configureStore({
    reducer:{
        user: authSlice,
        company: companySlice
    }
}, applyMiddleware(thunk))

export default store;