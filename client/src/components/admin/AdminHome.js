import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import Reservations from "./Reservations";
import { Link } from "react-router-dom";
import Reserved from "./Reserved";

const AdminBlock = styled.div`
  background-color: #eee;
  margin: 0 auto;
  max-width: 1024px;
  @media (min-width: 1024px) {
    background-color: white;
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
const NavigationContainer = styled.div`
  padding: 0px;
  line-height: 40px;
  background-color: white;
  span {
    cursor: pointer;
    padding: 5px 5px;
    font-size: 20px;
    margin-right: 10px;
    position: relative;
  }
  span.selected {
    border-bottom: 3px solid #ffc645;
    font-weight: 700;
  }
  @media only screen and (min-width: 1024px) {
    /* background-color: #fafafa; */
    background-color: white;
  }
`;
const NavigationWrapper = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 18px;
    margin: 0 10px;
  }
  @media only screen and (min-width: 1024px) {
    padding: 14px 20px;
    max-width: 1024px;
    margin: 0 auto;
    span {
      font-size: 18px;
      margin: 0 20px;
    }
  }

  span:first-child {
    margin-left: 0;
  }
`;

const ListContainer = styled.div`
  ol,
  ul,
  li {
    list-style: none;
    margin-bottom: 20px;
    background-color: white;
    padding: 20px;
    font-size: 14px;
  }
  @media (min-width: 1024px) {
    ul > li {
      border: 1px solid #ddd;
      border-radius: 10px;
    }
  }
  span {
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div.rv_date {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  div.rv_option {
    font-size: 11px;
    color: #999;
    margin-top: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  div.rv_status {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #ddd;
    padding-top: 10px;
    margin-top: 10px;
  }
  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
  }
`;
const NavigationItem = styled.div`
  a {
    text-decoration: none;
  }
`;

const PageBody = styled.div``;

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
              <Link to="/admin/reservations">입금 전 내역</Link>
              <Link to="/admin/reserved">예약 완료 내역</Link>
            </NavigationItem>
          </NavigationWrapper>
        </NavigationContainer>
      </PageHeader>
      <PageBody>
        <ListContainer>
          <Switch>
            <Route path="/admin/reservations" component={Reservations} />
            <Route path="/admin/reserved" component={Reserved} />
          </Switch>
        </ListContainer>
      </PageBody>
    </AdminBlock>
  );
};

export default AdminHome;
