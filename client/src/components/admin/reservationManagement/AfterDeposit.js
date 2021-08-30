import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Calendar from "../layout/Calendar";
import Loading from "../../layout/Loading";

import { Link } from "react-router-dom";

const AfterDepositBlock = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
  button {
    background-color: #3540a5;
    color: white;
    border-radius: 6px;
    border: none;
    box-shadow: none;
    cursor: pointer;
  }
  .btnConfirm {
    width: 500px;
    font-size: 18px;
    line-height: 18px;
    padding: 20px 20px;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid #bcbcbc;
    cursor: pointer;
  }
  ul {
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
  li {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 15px 15px;
  }
  li:hover {
    background-color: whitesmoke;
  }
  li > div > span {
    margin-left: 10px;
  }
`;

const AfterDepositHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  .btn {
    background-color: #3540a5;
    color: white;
    border-radius: 6px;
    border: none;
    box-shadow: none;
    padding: 10px 40px;
    cursor: pointer;
  }
`;
const AfterDepositResult = styled.div`
  margin-top: 50px;
`;

const AfterDeposit = () => {
  const [listData, setListdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(
    new Date(moment().format("YYYY-MM-DD"))
  );
  const [endDate, setEndDate] = useState(
    new Date(moment().add(7, "days").format("YYYY-MM-DD"))
  );

  const [CalendarDivForStartDateVisible, SetCalendarDivForStartDateVisible] =
    useState("none");
  const [CalendarDivForEndDateVisible, SetCalendarDivForEndDateVisible] =
    useState("none");

  const search = () => {
    if (startDate >= endDate) {
      return alert("검색 기간을 다시 선택하시오");
    } else if (moment(endDate).diff(moment(startDate), "months") > 6) {
      return alert("최대 검색 가능 기간은 6개월 단위입니다");
    } else {
      let dataToSubmit = {
        startDate,
        endDate,
        conditions: {
          depositCompleted: 1,
          confirm: 0,
          cancel: 0
        }
      };
      setLoading(true);
      axios
        .post("/api/list/getDataBetweenDays", dataToSubmit, {
          withCredentials: true
        })
        .then(res => {
          setListdata(res.data.listData);
          setLoading(false);
        });
    }
  };

  return (
    <AfterDepositBlock>
      <AfterDepositHeader>
        <CalendarWrapper>
          <Calendar
            inputDate={startDate}
            changeInputDate={setStartDate}
            visible={CalendarDivForStartDateVisible}
            setVisible={SetCalendarDivForStartDateVisible}
            anotheCalendarSetVisible={SetCalendarDivForEndDateVisible}
          />
          &nbsp;-&nbsp;
          <Calendar
            inputDate={endDate}
            changeInputDate={setEndDate}
            visible={CalendarDivForEndDateVisible}
            setVisible={SetCalendarDivForEndDateVisible}
            anotheCalendarSetVisible={SetCalendarDivForStartDateVisible}
          />
        </CalendarWrapper>
        <BtnWrapper>
          <button className="btn" onClick={search}>
            조회
          </button>
        </BtnWrapper>
      </AfterDepositHeader>
      <AfterDepositResult>
        <ul>
          {loading ? (
            <Loading />
          ) : listData?.length <= 0 || !listData ? (
            <li>내역이 없습니다</li>
          ) : (
            listData?.map((val, idx) => (
              <Link
                to={`/admin/reservationManagement/afterDeposit/detail/${val.id}`}
                key={idx}
              >
                <li>
                  <div>
                    <span>{val.bookDate}</span>
                    <span>{val.numofpeople}명</span>
                    <span>{val.email}</span>
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      </AfterDepositResult>
    </AfterDepositBlock>
  );
};

export default AfterDeposit;
