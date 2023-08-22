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
    setUser: (state, action) => {
      state.isLogin = true;
      if (action.payload) {
        state.memberId = action.payload.memberId;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
      }
    },
    deleteUser: (state) => {
      state.isLogin = false;
      state.memberId = null;
      state.email = null;
      state.displayName = null;
    },
  },
});

export const { setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;
