import axios from "axios";
import { LOGOUT_USER, AUTH_USER } from "./types";

export function auth() {
  const request = axios
    .get(`/api/user/auth`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios
    .post(`/api/user/logout`, { withCredentials: true })
    .then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}
