import {
  LOGIN_POPUP,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CHECK_EMAIL,
  CREATE_USER,
} from "./types";

const localUserId = localStorage.getItem("userId");
const localToken = localStorage.getItem("token");
const localUserName = localStorage.getItem("userName");

export const initialState = {
  token: localToken ? localUserId : null,
  userId: localUserId ? localUserId : null,
  userName: localUserName ? localUserName : null,
  userEmail: null,
  loginPopup: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_POPUP:
      return {
        ...state,
        loginPopup: action.payload.loginPopup
      }

    case LOGIN_SUCCESS:
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("phone", action.payload.phone);
      return {
        ...state,
        userId: action.payload.userId,
        email: action.payload.email,
        name: action.payload.name,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      return {
        userId: null,
        email: null,
      };

    case CREATE_USER:
      return {
        email: action.payload.email ? action.payload.email : null,
        phone: action.payload.phone ? action.payload.phone : null,
        name: action.payload.name ? action.payload.name : null,
      };

    default:
      return state;
  }
};
