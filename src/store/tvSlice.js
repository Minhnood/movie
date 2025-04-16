import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import tvService from "../services/tvService";



const initialState = {
    tvPopular: [],
    tvToday: [],
    tvTTopRated: [],
};

// viet thuong: login, register, category
// neu co nhieu tu, thi dung gach noi: my-profile, detail-movie, tv-list

export const fetchTvPopular = createAsyncThunk("tv/fetchTvPopular", async (data, thunkAPI) => {
    const response = await tvService.getPopularTvList(data);
    return response.data.results;
});

export const fetchTvToday = createAsyncThunk("tv/fetchTvToday", async (data, thunkAPI) => {
    const response = await tvService.getTodayTvList(data);
    console.log(response);
    
    return response.data.results;
});

export const fetchTvTopRated = createAsyncThunk("tv/fetchTvTopRated", async (data, thunkAPI) => {
    const response = await tvService.getTopRatedTvList();
    return response.data.results;
});

const slice = createSlice({
    name: "tv",
    initialState,
    reducers: {
    },
    extraReducers: (buidler) => {
        buidler.addCase(fetchTvPopular.fulfilled, (state, action) => {
            state.tvPopular = action.payload;
        });
        buidler.addCase(fetchTvToday.fulfilled, (state, action) => {
            state.tvToday = action.payload;
        });
        buidler.addCase(fetchTvTopRated.fulfilled, (state, action) => {
            state.tvTTopRated = action.payload;
        });
    }
});


const { reducer, actions } = slice;

export default reducer;
