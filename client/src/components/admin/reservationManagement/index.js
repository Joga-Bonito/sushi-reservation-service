import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import BeforeDeposit from "./BeforeDeposit";
import AfterDeposit from "./AfterDeposit";
import DetailReservation from "./DetailReservation";

const ReservationManagementBlock = styled.div``;
const InsideNavContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom : 50px;
  ul, li{
    margin:0
    padding:0
  }
  ul{
    display :flex;
  }
  li{
    padding : 10px 10px;
  }
  a {
    text-decoration: none;
    padding: 10px 32px;
    font-family: sans-serif;
    color: #606060;
  }
  a.active {
    color: #030303;
    border-bottom: 2px #606060 solid;
  }
  a:hover {
    color: #030303;
  }
`;
const RouteResult = styled.div``;
const ReservationManagement = () => {
  return (
    <ReservationManagementBlock>
      <InsideNavContainer>
        <ul>
          <li>
            <NavLink to="/admin/reservationManagement/beforeDeposit">
              입금 전
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/reservationManagement/afterDeposit">
              임금 완료
            </NavLink>
          </li>
        </ul>
      </InsideNavContainer>
      <RouteResult>
        <Switch>
          <Route
            path="/admin/reservationManagement/beforeDeposit"
            component={BeforeDeposit}
          />
          <Route
            exact
            path="/admin/reservationManagement/afterDeposit"
            component={AfterDeposit}
          />
          <Route
            path="/admin/reservationManagement/afterDeposit/detail/:id"
            component={DetailReservation}
          />
        </Switch>
      </RouteResult>
    </ReservationManagementBlock>
  );
};

export default ReservationManagement;
