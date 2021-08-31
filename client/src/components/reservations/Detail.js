import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const Content = styled.div`
  margin: 0 auto;
  background: white;
  a {
    text-decoration: none;
  }
`;

const RvDetail = styled.div`
  max-width: 1024px;
  min-height: 1000px;
  margin: 0 auto;

  select {
    width: 200px; /* 원하는 너비설정 */
    padding: 0.8em 0.5em; /* 여백으로 높이 설정 */
    font-size: 15px;
    font-weight: 700;
    border: 1px solid #999;
    border-radius: 0px; /* iOS 둥근모서리 제거 */
  }
`;
const Section = styled.div`
  padding: 30px 0;
  margin: 0 20px;
  border-bottom: 1px solid #ddd;

  p {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    padding: 0;
    word-break: break-all;
  }
  span {
    font-size: 10px;
    color: #999;
  }

  @media only screen and (min-width: 1024px) {
    padding: 50px 0;
  }
  .title {
    margin-bottom: 10px;
    h3 {
      font-size: 20px;
      font-weight: 400;
    }
  }
  .inner {
    margin-top: 20px;
    line-height: 28px;
    ul,
    li {
      list-style: none;
    }
    li {
      margin-left: 20px;
      position: relative;
      line-height: 21px;
      padding: 3px 0;
      font-size: 14px;
      letter-spacing: -0.2px;
      word-break: keep-all;
    }
    li:before {
      content: "";
      width: 4px;
      height: 4px;
      background-color: #333;
      border-radius: 4px;
      display: inline-block;
      position: absolute;
      left: -15px;
      top: 12px;
    }
  }
`;
const RvApply = styled.div`
  div.letsEat {
    position: fixed;
    bottom: 0;
    width: 100%;
    @media only screen and (min-width: 1024px) {
      max-width: 100%;
      margin: 0 auto;
      left: 0;
      right: 0;
      background-color: white;
      border-top: 1px solid #ddd;
    }
    div.leWrapper {
      @media only screen and (min-width: 1024px) {
        max-width: 1024px;
        margin: 0 auto;
        overflow: auto;
        padding: 0 20px;
      }
      div.btnWrap {
        margin-top: 0;
        @media only screen and (min-width: 1024px) {
          width: 50%;
          margin: 0 auto;
        }
        .btn {
          width: 100%;
          background-color: #3540a5;
          color: white;
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
          p {
            font-size: 18px;
            @media only screen and (min-width: 1024px) {
              font-size: 20px;
            }
          }
        }
        .btn.letseat {
          background-color: #3540a5;
          color: white;
          width: 100%;
          font-size: 18px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 0;
          @media only screen and (min-width: 1024px) {
            margin: 0;
            border-radius: 6px;
            width: 100%;
            margin: 30px auto;
            font-weight: 400;
          }
        }
      }
    }
  }
`;

const Detail = props => {
  const [numofpeople, setNumofpeople] = useState(0);
  const [selectedNum, setSelctedNum] = useState(1);

  const date = props.location.state.selectedDay;
  const time = props.location.state.time;

  useEffect(() => {
    async function getNumofpeople() {
      const data = await axios.post(
        "/api/list/getNumofpeople",
        {
          bookTime: new Date(date + " " + time),
          confirm: 1,
          cancel: 0,
          depositCompleted: 1
        },
        { withCredentials: true }
      );

      setNumofpeople(parseInt(data.data.numofpeople));
    }
    getNumofpeople();
  }, [date, time]);

  const Selects = () => {
    let element = [];
    let max = 10 - numofpeople;
    if (max < 1) {
      return <option value={0}>0</option>;
    }
    for (let i = 1; i <= max; i++) {
      element.push(
        <option key={i} value={i}>
          {i}명
        </option>
      );
    }
    return element;
  };

  const handleClick = () => {
    let dataToSubmit = {
      email: props.user.email,
      numofpeople: selectedNum,
      bookTime: date + " " + time,
      bookDate: date,
      insert_At: "now()"
    };
    if (!props.user.email) {
      alert("로그인을 해주세요");
      window.location.replace("/login");
    }
    axios
      .post("api/list/book", dataToSubmit, { withCredentials: true })
      .then(response => {
        if (response.data.reservationSuccess) {
          alert("예약이 완료되었습니다");
          window.location.replace("/");
        } else {
          alert("예약 실패");
          return;
        }
      });
  };

  return (
    <Content>
      <RvDetail>
        <Section>
          <span>예약일</span>
          <p>{date + "일 " + time + "분"}</p>
          <span>주소</span>
          <p>경기도 고양시 일산</p>
        </Section>
        <Section className="numofpeople">
          <span>예약비</span>
          <p>{selectedNum * 10000 + "원"}</p>
        </Section>
        <Section>
          <span>인원</span>
          <p>
            <select
              onChange={e => {
                setSelctedNum(e.target.value);
              }}
              value={selectedNum}
            >
              <Selects />
            </select>
          </p>
        </Section>
        <Section>
          <div className="title">
            <h3>환급 규정</h3>
          </div>
          <div className="inner">
            <ul>
              <li>환불 해줄까?</li>
              <li>싫은데</li>
            </ul>
          </div>
        </Section>
      </RvDetail>
      <RvApply>
        <div className="letsEat">
          <div className="leWrapper">
            <div className="btnWrap">
              {props.user?.email ? (
                <button className="btn letseat" onClick={handleClick}>
                  <p>예약하기</p>
                </button>
              ) : (
                <Link to="/login" className="btn letseat">
                  <p>예약하기</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </RvApply>
    </Content>
  );
};

export default Detail;
