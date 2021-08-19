import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import DarkBackground from "./DarkBackground";
import { useSelector } from "react-redux";
import sushi_icon from "../../img/sushi_icon(1).png";

const NavBar = styled.div`
    padding: 0;
    -webkit-box-sizig: border-box -moz-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 5;
    background-color: white;
    a {
      text-decoration : none;
    }
`;

const NavContainer = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @media only screen and (min-width: 1024px) {
    max-width: 1024px;
    padding: 0 20px;
    margin: 0 auto;
  }
`;

const Logo = styled.div`
  img {
    height: 32px;
  }
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainTab = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #333333;
    font-size: 18px;
    padding: 5px 5px;
    cursor: pointer;
    position: relative;
  }
  a > img {
    width: 24px;
  }
  .goIn a {
    color: #3540a5;
    font-size: 14px;
  }
  .goIn span {
    font-size: 12px;
    color: #999;
  }
`;

const SideBarTrigger = styled.div`
  padding-left: 8px;
  cursor: pointer;
  display: flex;
`;
const MoreIconWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;
const MoreIcon = styled.div`
  width: 4px;
  height: 4px;
  background-color: #333;
  margin: 0 2px;
  border-radius: 10px;
  display: inline-block;
`;

const Header = () => {
  const status = useSelector(state => state.userReducer.userData);
  const [sidebarAppear, setSidebarAppear] = useState(false);
  const sideBarRef = useRef();

  return (
    <NavBar>
      <NavContainer>
        <Logo>
          <Link to="/">초밥집 예약 사이트</Link>
        </Logo>
        <UserMenu>
          <MainTab>
            {!status?.isAuth ? (
              <div className="goIn">
                <Link to="/login">로그인</Link>
                <span>또는</span>
                <Link to="/register">회원가입</Link>
              </div>
            ) : (
              <>
                {status?.isAdmin ? (
                  <div className="goIn">
                    <Link to="/admin">관리자 페이지</Link>
                    <span>5분 후 자동 로그아웃 됩니다.</span>
                  </div>
                ) : (
                  <>
                    <Link to="/mypage">
                      <img src={sushi_icon} alt="초밥" />
                    </Link>
                  </>
                )}
              </>
            )}
          </MainTab>
          <SideBarTrigger>
            <MoreIconWrap
              onClick={() => {
                setSidebarAppear(true);
              }}
            >
              <MoreIcon />
              <MoreIcon />
              <MoreIcon />
            </MoreIconWrap>
          </SideBarTrigger>
        </UserMenu>
      </NavContainer>
      <SideBar
        sidebarAppear={sidebarAppear}
        sideBarRef={sideBarRef}
        setSidebarAppear={setSidebarAppear}
      />
      <DarkBackground sidebarAppear={sidebarAppear} />
    </NavBar>
  );
};

export default Header;
