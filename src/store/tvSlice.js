import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import tvService from "../services/tvService";



const initialState = {
    tvPopular: [],
    tvToday: [],
    tvTTopRated: [],
    tvDetails: [],
    tvDetailsSeasons: [],
    tvRecommendations: [],
    tvDetailsSeason: [],
    tvDetailsEpisodeId: [],
};

// viet thuong: login, register, category
// neu co nhieu tu, thi dung gach noi: my-profile, detail-movie, tv-list

export const fetchTvPopular = createAsyncThunk("tv/fetchTvPopular", async (data, thunkAPI) => {
    const response = await tvService.getPopularTvList(data);
    return response.data.results;
});

export const fetchTvToday = createAsyncThunk("tv/fetchTvToday", async (data, thunkAPI) => {
    const response = await tvService.getTodayTvList(data);
    return response.data.results;
});

export const fetchTvTopRated = createAsyncThunk("tv/fetchTvTopRated", async (data, thunkAPI) => {
    const response = await tvService.getTopRatedTvList();
    return response.data.results;
});

export const fetchTvDetails = createAsyncThunk("tv/fetchTvDetails", async (data, thunkAPI) => {
    const response = await tvService.getDetailsTv(data);
    console.log(response);
    return {
        list : response.data,
        seasons: response.data.seasons};
});

export const fetchTvRecommendations = createAsyncThunk("tv/fetchRecommendations", async (data, thunkAPI) => {
    const response = await tvService.getTvRecommendations(data);
    console.log(response.data.results);
    return response.data.results;
});

export const fetchTvDetailsSeason = createAsyncThunk("tv/fetchTvDetailsSeason", async (data, thunkAPI) => {
    const response = await tvService.getTvDetailsSeason(data);
    console.log(response.data);
    return response.data;
});

export const fetchTvDetailsEpisodeId = createAsyncThunk("tv/fetchTvDetailsEpisodeId", async (data, thunkAPI) => {
    const response = await tvService.getTvDetailsEpisodeId(data);
    console.log(response.data);
    return response.data;
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
        buidler.addCase(fetchTvDetails.fulfilled, (state, action) => {
            state.tvDetails = action.payload.list;
            state.tvDetailsSeasons =action.payload.seasons;
        });
        buidler.addCase(fetchTvRecommendations.fulfilled, (state, action) => {
            state.tvRecommendations = action.payload;
        });
        buidler.addCase(fetchTvDetailsSeason.fulfilled, (state, action) => {
            state.tvDetailsSeason = action.payload;
        });
        buidler.addCase(fetchTvDetailsEpisodeId.fulfilled, (state, action) => {
            state.tvDetailsEpisodeId = action.payload;
        });
    }
});


const { reducer, actions } = slice;

export default reducer;
