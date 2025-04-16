// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import userReducer from './userSlice'
import tvReducer from './tvSlice'

const store = configureStore({
    reducer: {
        MOVIE: movieReducer,
        USER: userReducer,
        TV: tvReducer
    }
})


export default store;