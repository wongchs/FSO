import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const userLogin = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
    dispatch(login(user));
    dispatch(
      setNotification({ message: `welcome ${user.name}`, type: "success" })
    );
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(logout());
  };
};

export default userSlice.reducer;
