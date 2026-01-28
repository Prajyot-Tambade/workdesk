import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  status: boolean;
  userData: null;
}

const initialState = {
  status: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      ((state.status = true), (state.userData = action.payload));
    },
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
