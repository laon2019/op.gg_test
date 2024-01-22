import api from "../api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
  "summoners",
  async (userNickName, { rejectWithValue }) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      const userInfoApi = await api.get(
        `kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${userNickName}?api_key=${API_KEY}`
      );
      const leagueInfoApi = await api.get(
        `kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userInfoApi.data.id}?api_key=${API_KEY}`
      );
      const matchInfoApi = await api.get(
        `asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${userInfoApi.data.puuid}/ids?start=0&count=12&api_key=${API_KEY}`
      );

      const matchDetailPromises = matchInfoApi.data.map(async (matchId) => {
        const response = await api.get(
          `asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
        );
        return response.data;
      });

      const matchDetailInfoApi = await Promise.all(matchDetailPromises);
      const spellsApi = await api.get(
        `ddragon.leagueoflegends.com/cdn/13.24.1/data/ko_KR/summoner.json`
      );

      return {
        userInfo: userInfoApi.data,
        leagueInfo: leagueInfoApi.data,
        matchInfo: matchInfoApi.data,
        matchDetailInfo: matchDetailInfoApi,
        spells: spellsApi.data,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAdditionalMatchDetails = createAsyncThunk(
  "summoners/additionalMatchDetails",
  async ({ userPuuid, start}, { rejectWithValue }) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      const matchInfoApi = await api.get(
        `asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${userPuuid}/ids?start=${start}&count=4&api_key=${API_KEY}`
      );

      const matchDetailPromises = matchInfoApi.data.map(async (matchId) => {
        const response = await api.get(
          `asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
        );
        return response.data;
      });

      const matchDetailInfoApi = await Promise.all(matchDetailPromises);

      return {
        matchInfo: matchInfoApi.data,
        matchDetailInfo: matchDetailInfoApi,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
