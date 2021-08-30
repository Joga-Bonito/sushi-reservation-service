import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Calendar from "../layout/Calendar";
import Loading from "../../layout/Loading";

const BeforeDepositBlock = styled.div`
  button {
    cursor: pointer;
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
  }
  .btn.dpConfirm {
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
  li > div > span {
    margin-left: 10px;
  }
`;

const BeforeDepositHeader = styled.div`
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
    padding: 10px 40px;
  }
`;
const BeforeDepositResult = styled.div`
  margin-top: 50px;
`;
const BeforeDepositConfirm = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
const BeforeDeposit = () => {
  const [listData, setListdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [checkedID, setCheckedID] = useState([]);

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
          depositCompleted: 0,
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

  const confirm = () => {
    let dataToSubmit = {
      depositCompleted: 1,
      depositCompletedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      id: checkedID
    };
    if (checkedID.length < 1) {
      return alert("선택된게 없습니다.");
    }
    axios
      .post("/api/list/multipleUpdate", dataToSubmit, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const checkHandler = e => {
    if (e.target.checked) {
      setCheckedID([...checkedID, parseInt(e.target.id)]);
    } else {
      setCheckedID(
        checkedID.filter(element => element !== parseInt(e.target.id))
      );
    }
  };

  return (
    <BeforeDepositBlock>
      <BeforeDepositHeader>
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
      </BeforeDepositHeader>
      <BeforeDepositResult>
        <ul>
          {loading ? (
            <Loading />
          ) : listData?.length <= 0 || !listData ? (
            <li>내역이 없습니다</li>
          ) : (
            listData?.map((val, idx) => (
              <li key={idx}>
                <div>
                  <input type="checkbox" id={val.id} onChange={checkHandler} />
                  <span>{val.bookDate}</span>
                  <span>{val.numofpeople}명</span>
                  <span>{val.email}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </BeforeDepositResult>
      <BeforeDepositConfirm>
        <button className="btn dpConfirm" onClick={confirm}>
          입금 확인
        </button>
      </BeforeDepositConfirm>
    </BeforeDepositBlock>
  );
};

export default BeforeDeposit;
