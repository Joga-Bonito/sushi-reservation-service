import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import ReservationManagement from "./reservationManagement";
import { NavLink } from "react-router-dom";
import UserManagement from "./userManagement";
import RefundManagement from "./refundManagement";

const AdminBlock = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  @media (min-width: 1024px) {
    background-color: white;
  }
  ol,
  ul,
  li {
    list-style: none;
  }
`;
const PageHeader = styled.div`
  padding: 20px 20px 30px 20px;
  background-color: white;
`;
const PageTitle = styled.div`
  h1 {
    font-size: 24px;
  }
`;
const NavigationContainer = styled.div``;
const NavigationWrapper = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
`;

const NavigationItem = styled.div`
  display: flex;
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

const PageBody = styled.div``;

const ListContainer = styled.div``;

const AdminHome = ({ user }) => {
  return (
    <AdminBlock>
      <PageHeader>
        <PageTitle>
          <h1>관리자 페이지</h1>
        </PageTitle>
        <NavigationContainer>
          <NavigationWrapper>
            <NavigationItem>
              <NavLink
                to="/admin/reservationManagement"
                activeClassName="active"
              >
                예약 관리
              </NavLink>
              <NavLink to="/admin/refundManagement" activeClassName="active">
                취소 관리
              </NavLink>
              <NavLink to="/admin/usersManagement" activeClassName="active">
                회원 관리
              </NavLink>
            </NavigationItem>
          </NavigationWrapper>
        </NavigationContainer>
      </PageHeader>
      <PageBody>
        <ListContainer>
          <Switch>
            <Route
              path="/admin/reservationManagement"
              component={ReservationManagement}
            />
            <Route
              path="/admin/refundManagement"
              component={RefundManagement}
            />
            <Route path="/admin/usersManagement" component={UserManagement} />
          </Switch>
        </ListContainer>
      </PageBody>
    </AdminBlock>
  );
};

export default AdminHome;
