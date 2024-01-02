import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, getAdditionalMatchDetails } from "../actions/userAction";

let initialState = {
  userInfo: {},
  leagueInfo: {},
  matchInfo: {},
  matchDetailInfo: {},
  spells: {},
  status: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.leagueInfo = action.payload.leagueInfo;
      state.matchInfo = action.payload.matchInfo;
      state.matchDetailInfo = action.payload.matchDetailInfo;
      state.spells = action.payload.spells;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.userInfo;
        state.leagueInfo = action.payload.leagueInfo;
        state.matchInfo = action.payload.matchInfo;
        state.matchDetailInfo = action.payload.matchDetailInfo;
        state.spells = action.payload.spells;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAdditionalMatchDetails.fulfilled, (state, action) => {
        state.matchInfo = {
          ...state.matchInfo,
          ...action.payload.matchInfo,
        };
        state.matchDetailInfo = {
          ...state.matchDetailInfo,
          ...action.payload.matchDetailInfo,
        };
      });

  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
