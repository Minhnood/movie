import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    currentUser: null,
    sessionId: localStorage.getItem("SESSION_ID"),
};

export const fetchMe = createAsyncThunk("user/fetchMe", async (sessionId, thunkAPI) => {
    try {
        const response = await userService.fetchMe(sessionId);
        console.log(response.data);
        
        localStorage.setItem("ACCOUNT", response.data.id);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue("Không thể lấy thông tin user");
    }
});

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
    try {
        const sessionId = await userService.login(data);

        if (!sessionId) throw new Error("Đăng nhập thất bại");

        localStorage.setItem("SESSION_ID", sessionId);

        const responseMe = await userService.fetchMe(sessionId);
        const currentUser = responseMe.data;

        return {
            sessionId,
            currentUser
        };
    } catch (err) {
        return thunkAPI.rejectWithValue("Thông tin đăng nhập không đúng");
    }
});

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("SESSION_ID");
            state.currentUser = null;
            state.sessionId = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload.currentUser;
            state.sessionId = action.payload.sessionId;
        });
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.currentUser = action.payload;
        });
    }
});

const { reducer, actions } = slice;

export const { logout } = actions;

export default reducer;
