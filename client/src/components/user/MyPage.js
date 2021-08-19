import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import sushi_icon from "../../img/sushi_icon(1).png";

const MyPageBlock = styled.div`
  background-color: #fafafa;
`;
const MyHero = styled.div`
  padding: 35px 20px;
  background-color: #fff;
  margin-bottom: 20px;
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0 auto;
    padding: 70px;
    margin-bottom: 20px;
  }
`;
const MyHeroHi = styled.div`
  margin-bottom: 30px;
  h2 {
    font-weight: 300;
  }
  h2 > strong {
    font-weight: 700;
  }
`;
const CardWrapper = styled.div`
  @media (min-width: 1024px) {
    max-width: 1024px;
    margin: 0 auto;
  }
`;
const CardContainer = styled.div`
  padding: 50px;
  background-color: white;
  margin-bottom: 20px;
`;
const CardBody = styled.div`
  padding: 20px;
`;
const MyMenu = styled.div`
  ol,
  ul,
  li {
    list-style: none;
  }
  li > a {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    outline: none;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }
  li > a > div.title {
    display: flex;
    align-items: center;
  }
  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
  }
  li a img {
    width: 24px;
    margin-right: 5px;
    vertical-align: middle;
  }
`;
const MyPage = ({ user }) => {
  return (
    <MyPageBlock>
      <MyHero>
        <MyHeroHi>
          <h2>
            안녕하세요🔥
            <br />
            <strong>{user?.name + "님"}</strong>
          </h2>
        </MyHeroHi>
      </MyHero>
      <CardWrapper>
        <CardContainer>
          <CardBody>
            <MyMenu>
              <ul>
                <li>
                  <Link to="/myReservations">
                    <div className="title">
                      <img src={sushi_icon} alt="이용 내역" />
                      <p>이용 내역</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/setting">
                    <div className="title">
                      <img src={sushi_icon} alt="설정" />
                      <p>설정</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </MyMenu>
          </CardBody>
        </CardContainer>
      </CardWrapper>
    </MyPageBlock>
  );
};

export default MyPage;
