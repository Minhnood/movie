import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import tvService from "../services/tvService";



const initialState = {
    tvPopular: [],
    tvToday: [],
    tvTtopRated: [],
    tvDetails: [],
    tvDetailsSeasons: [],
    tvrecommendations: [],
    tvDetailsSeason: [],
    tvDetailsEpisodeId: [],
    tvDetailsEpisodeIds: [],
    listTvFavourite: []
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

export const fetchTvtopRated = createAsyncThunk("tv/fetchTvtopRated", async (data, thunkAPI) => {
    const response = await tvService.gettopRatedTvList();
    return response.data.results;
});

export const fetchTvDetails = createAsyncThunk("tv/fetchTvDetails", async (data, thunkAPI) => {
    const response = await tvService.getDetailsTv(data);
    console.log(response);
    return {
        list : response.data,
        seasons: response.data.seasons};
});

export const fetchTvrecommendations = createAsyncThunk("tv/fetchrecommendations", async (data, thunkAPI) => {
    const response = await tvService.getTvrecommendations(data);
    console.log(response.data.results);
    return response.data.results;
});

export const fetchTvDetailsSeason = createAsyncThunk("tv/fetchTvDetailsSeason", async (data, thunkAPI) => {
    const response = await tvService.getTvDetailsSeason(data);
    console.log(response.data);
    return {
        list : response.data,
        episodes: response.data.episodes};
});

export const fetchTvDetailsEpisodeId = createAsyncThunk("tv/fetchTvDetailsEpisodeId", async (data, thunkAPI) => {
    const response = await tvService.getTvDetailsEpisodeId(data);
    console.log(response.data);
    return response.data;
});

export const fetchTvFavourite = createAsyncThunk("tv/fetchTvFavourite", async (data, thunkAPI) => {
    const response = await tvService.getTvFavourite();
    console.log(response.data.results);
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
        buidler.addCase(fetchTvtopRated.fulfilled, (state, action) => {
            state.tvTtopRated = action.payload;
        });
        buidler.addCase(fetchTvDetails.fulfilled, (state, action) => {
            state.tvDetails = action.payload.list;
            state.tvDetailsSeasons =action.payload.seasons;
        });
        buidler.addCase(fetchTvrecommendations.fulfilled, (state, action) => {
            state.tvrecommendations = action.payload;
        });
        buidler.addCase(fetchTvDetailsSeason.fulfilled, (state, action) => {
            state.tvDetailsSeason = action.payload.list;
            state.tvDetailsEpisodeIds = action.payload.episodes;
        });
        buidler.addCase(fetchTvDetailsEpisodeId.fulfilled, (state, action) => {
            state.tvDetailsEpisodeId = action.payload;
        });

        buidler.addCase(fetchTvFavourite.fulfilled, (state, action) => {
            state.listTvFavourite = action.payload;
        });

    }
});


const { reducer, actions } = slice;

export default reducer;
