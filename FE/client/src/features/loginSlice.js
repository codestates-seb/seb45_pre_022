import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    memberId: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.memberId = action.payload.memberId;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
