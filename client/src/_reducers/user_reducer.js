import { AUTH_USER, LOGOUT_USER } from "../_actions/types";

//로컬스토리지를 쓰면 이런식으로 해야하는데
// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { loggedIn: true, user } : {};
//나는 쿠키 + JWT고, 쿠키를 프론트에서 조회할 수 없음.
//게다가 모든 페이지가 HOC컴포넌트로 AUTH 체킹을 하는 중.

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
