import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Auth from "./hoc/auth";
import NotFound from "./components/layout/NotFound";
import AdminHome from "./components/admin/AdminHome";
import Detail from "./components/reservations/Detail";
import MyPage from "./components/user/MyPage";
import MyReservations from "./components/reservations/MyReservations";
import Setting from "./components/user/Setting";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(Home, null)} />
        <Route path="/login" component={Auth(Login, false)} />
        <Route path="/register" component={Auth(Register, false)} />
        <Route path="/detail" component={Auth(Detail, null)} />
        <Route path="/mypage" component={Auth(MyPage, true)} />
        <Route path="/myReservations" component={Auth(MyReservations, true)} />
        <Route path="/setting" component={Auth(Setting, true)} />
        <Route path="/admin" component={Auth(AdminHome, true, true)} />

        {/* 가장 맨아래 */}
        <Route component={Auth(NotFound, null)} />
      </Switch>
    </QueryClientProvider>
  );
};

export default App;
