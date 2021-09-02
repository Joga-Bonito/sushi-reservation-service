import React from "react";
import styled from "styled-components";
import { NavLink, Route, Switch } from "react-router-dom";
import CancelRequest from "./CancelRequest";
import CancelCompleted from "./CancelCompleted";
import DetailCancel from "./DetailCancel";

const RefundManagementBlock = styled.div``;
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
const RefundManagement = () => {
  return (
    <RefundManagementBlock>
      <InsideNavContainer>
        <ul>
          <li>
            <NavLink to="/admin/refundManagement/cancelRequest">
              취소 요청 내역
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/refundManagement/cancelCompleted">
              취소 완료 내역
            </NavLink>
          </li>
        </ul>
      </InsideNavContainer>
      <RouteResult>
        <Switch>
          <Route
            path="/admin/refundManagement/cancelRequest"
            component={CancelRequest}
          />
          <Route
            exact
            path="/admin/refundManagement/cancelCompleted"
            component={CancelCompleted}
          />
          <Route
            path="/admin/refundManagement/cancelRequest/detail/:id"
            component={DetailCancel}
          />
        </Switch>
      </RouteResult>
    </RefundManagementBlock>
  );
};

export default RefundManagement;
