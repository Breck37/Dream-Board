// import axios from 'axios';

const initialState = {
  user: {},
  homepage: []
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const HOME = "HOME";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log("action", action.payload);
      return { ...state, user: action.payload };
    case HOME:
      return { ...state, homepage: action.payload };
    case LOGOUT:
      return {...state, user: action.payload}
    default:
      console.log(action.type);
      return state;
  }
}

export const login = user => {
  return {
    type: LOGIN,
    payload: user
  };
};

export function logout(){
  return {
    type: LOGOUT,
    payload: {},
  }
}

export function home(images) {
  return {
    type: HOME,
    payload: images
  };
}
