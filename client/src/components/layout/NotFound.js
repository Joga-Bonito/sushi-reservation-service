import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import sushi_icon from "../../img/sushi_icon(1).png";

const Content = styled.div`
  margin: 0 auto;
  background: white;
`;

const ContentWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  overflow: auto;

  @media only screen and (min-width: 1024px) {
    padding: 0 20px 80px 20px;
  }
`;
const CompleteWrap = styled.div`
  margin: 0 20px;
  padding: 20px 0 50px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;

  border: none;

  img {
    width: 70%;
    margin: 30px auto 50px auto;
    display: block;
    vertical-align: middle;
  }

  .welcomeTitle {
    text-align: center;
    word-break: keep-all;
  }
  .welcomeTitle h1 {
    font-size: 18px;
  }
  .welcomeTitle p {
    font-size: 14px;
    margin: auto;
    margin-top: 10px;
    max-width: 480px;
    word-break: keep-all;
    padding: 0;
  }
  .btnWrap {
    margin-top: 20px;
  }
  .btnWrap a {
    outline: none;
    text-decoration: none;
    background-color: #3540a5;
    color: white;
    width: 240px;
    margin: 0 auto;
    border-radius: 6px;
    border: none;
    box-shadow: none;
    padding: 15px 10px;
    -webkit-transition: background-color 0.3s ease-out;
    -moz-transition: background-color 0.3s ease-out;
    -o-transition: background-color 0.3s ease-out;
    transition: background-color 0.3s ease-out;
    -webkit-appearance: none;
    display: block;
    text-align: center;
    cursor: pointer;
  }

  @media only screen and (min-width: 1024px) {
    padding: 50px 0;
    text-align: center;
    img {
      width: 320px;
      margin-bottom: 50px;
    }
    .btnWrap {
      max-width: 480px;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
`;

const NotFound = () => {
  return (
    <Content>
      <ContentWrapper>
        <CompleteWrap>
          <img src={sushi_icon} alt="notfound" />
          <div className="welcomeTitle">
            <h1>존재하지 않는 페이지입니다.</h1>
            <p>URL을 다시 확인해주세요.</p>
          </div>
          <div className="btnWrap">
            <Link to="/">홈으로 가기</Link>
          </div>
        </CompleteWrap>
      </ContentWrapper>
    </Content>
  );
};

export default NotFound;
