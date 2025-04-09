// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import userReducer from './userSlice'

const store = configureStore({
    reducer: {
        MOVIE: movieReducer,
        USER: userReducer,
    }
})


export default store;