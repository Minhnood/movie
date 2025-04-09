import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import movieService from "../services/movieService";


const initialState = {
    list: [],
    listFavourite: [],
    listPage: 1,
    UpcomingPage: 1,
    MaxUpcomingPage: 1,
    TopRatedPage: 1,
    MaxTopRatedPgae: 1,
    SeacrhPage: 1,
    MaxSearchPgae: 1,
    detailMovie: [],
    Recommendations: [],
    genreList: [],
    searchList: [],
    Upcoming:[],
    TopRated:[]
};

export const fetchPopularList = createAsyncThunk("Movie/fetchPopularList", async (data, thunkAPI) => {
    try {
        const response = await movieService.getPopularList(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});


export const fetchMovieUpcoming = createAsyncThunk("Movie/fetchMovieUpcoming", async (data, thunkAPI) => {
    try {
        const response = await movieService.getUpcoming(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
            maxPage: response.data.total_pages
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchTopRated = createAsyncThunk("Movie/fetchTopRated", async (data, thunkAPI) => {
    try {
        const response = await movieService.getTopRated(data);
        return {
            list: response.data.results,
            listPage: response.data.page,
            maxPage: response.data.total_pages
        };
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchMovieGenress = createAsyncThunk("Movie/fetchMovieGenress", async (data, thunkAPI) => {
    try {
        const response = await movieService.getMovieGenres();
        return response.data.genres;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchDetailsMovie = createAsyncThunk("Movie/fetchDetailsMovie", async (data, thunkAPI) => {
    try {
        const response = await movieService.getDetailMovie(data);
        return response.data;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchRecommendations = createAsyncThunk("Movie/fetchRecommendations", async (data, thunkAPI) => {
    try {
        const response = await movieService.getRecommendations(data);
        return response.data.results;
    } catch (err) {
        console.error("Error fetching categories:", err);
        return thunkAPI.rejectWithValue(err.response?.data || "Lỗi không xác định");
    }
});

export const fetchSearch = createAsyncThunk("post/fetchSearch", async (keyword, thunkAPI) => {
    const response = await movieService.getSearchList(keyword);
    
    const search = response.data.results;
    const sendData = search;
    return {
        sendData: sendData,
        listPage: response.data.page,
        maxPage: response.data.total_pages
    };
});

export const postFavourite = createAsyncThunk("post/postFavourite", async (data, thunkAPI) => {
    const response = await movieService.postFavourite(data);
    const {dispatch} = thunkAPI;
    dispatch(fetchFavourite());
    // dispatch fetch fav movies
});

export const fetchFavourite = createAsyncThunk("post/fetchFavourite", async (data, thunkAPI) => {
    const response = await movieService.getFavourite();
    
    return response.data.results;
});

const slice = createSlice({
    name: "post",
    initialState,
    reducers: {
    },
    extraReducers: (buidler) => {
        buidler.addCase(fetchPopularList.fulfilled, (state, action) => {
            state.list = action.payload.list;
            state.listPage = action.payload.listPage;
        });
        buidler.addCase(fetchDetailsMovie.fulfilled, (state, action) => {
            state.detailMovie = action.payload;
        });
        buidler.addCase(fetchRecommendations.fulfilled, (state, action) => {
            state.Recommendations = action.payload;
        });
        buidler.addCase(fetchMovieGenress.fulfilled, (state, action) => {
            state.genreList = action.payload;
        });
        buidler.addCase(fetchSearch.fulfilled, (state, action) => {
            state.searchList = action.payload.sendData;
            state.SeacrhPage = action.payload.listPage;
            state.MaxSearchPgae = action.payload.maxPage;
        });
        buidler.addCase(fetchMovieUpcoming.fulfilled, (state, action) => {
            state.Upcoming = action.payload.list;
            state.UpcomingPage = action.payload.listPage;
            state.MaxUpcomingPage = action.payload.maxPage;
        });
        buidler.addCase(fetchTopRated.fulfilled, (state, action) => {
            state.TopRated = action.payload.list;
            state.TopRatedPage = action.payload.listPage;
            state.MaxTopRatedPgae = action.payload.maxPage;
        });
        buidler.addCase(fetchFavourite.fulfilled, (state, action) => {
            console.log(action);
            
            state.listFavourite = action.payload;
        });
    }
});


const { reducer, actions } = slice;

export default reducer;
