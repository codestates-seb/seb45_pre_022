import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    memberId: null,
    email: null,
    displayName: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      if (action.payload) {
        state.memberId = action.payload.memberId;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
      }
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
