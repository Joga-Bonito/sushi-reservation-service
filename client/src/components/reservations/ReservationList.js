import React, { useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { useHistory } from "react-router";

const RvListBlock = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  ul,
  li {
    list-style: none;
  }
  li {
    cursor: pointer;
  }
  p {
    text-align: center;
  }
  li.schedule_item > div {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 15px 15px;
  }
  div.schedule_time {
    width: 15%;
    font-weight: 700;
    text-align: center;
    font-size: 15px;
  }
  div.schedule_time > p {
    margin: 0;
    padding: 0;
    word-break: break-all;
    font-size: 14px;
  }
  div.schedule_info {
    width: 62%;
    padding-right: 10px;
  }
  div.schedule_info h3 {
    font-size: 14px;
    font-weight: 400;
    word-break: keep-all;
  }
  div.schedule_title {
  }
  div.schedule_option {
    font-size: 11px;
    color: #999;
    margin-top: 3px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  div.schedule_option span {
    padding-right: 3px;
  }
  div.schedule_status {
    width: 20%;
  }
  div.schedule_status > .status {
    width: 100%;
    text-align: center;
    padding: 8px 5px;
    border-radius: 6px;
    font-size: 12px;
    color: #999;
    background-color: #ddd;
  }
  .status.possible {
    color: white !important;
    background-color: #3534a5 !important;
  }
  .status_option {
    font-size: 11px;
    color: #999;
  }
`;

const ReservationList = ({ selectedDay }) => {
  const history = useHistory();
  const { data } = useQuery(
    ["reservations", { date: selectedDay }],
    async () => {
      try {
        const data = await axios.post(
          `/api/list/getData`,
          { bookDate: selectedDay, confirm: 1, cancel: 0, depositCompleted: 1 },
          {
            withCredentials: true
          }
        );
        return data.data.reservations;
      } catch (err) {
        console.log(err);
      }
    },
    {
      staleTime: 1000 * 60 * 5, //쿼리 데이터가 fresh 에서 stale로 전환되는데 걸리는 시간.
      refetchOnWindowFocus: false, //윈도우가 다시 포커스되었을 때 데이터를 호출할 것인지 여부
      suspense: true, //컴포넌트를 Suspended 상태로 만들어주는 suspense 옵션
      retry: 3
    }
  );

  const memoizedData = useMemo(() => {
    let result = {};

    result[selectedDay] = [
      { bookTime: "11:30", numofpeople: 0 },
      { bookTime: "13:00", numofpeople: 0 },
      { bookTime: "18:00", numofpeople: 0 },
      { bookTime: "20:00", numofpeople: 0 }
    ];

    for (let i = 0; i < result[selectedDay].length; i++) {
      for (let j = 0; j < data?.length; j++) {
        if (data[j].bookTime === result[selectedDay][i].bookTime) {
          result[selectedDay][i].numofpeople = parseInt(data[j].numofpeople);
        }
      }
    }
    return result;
  }, [data, selectedDay]);

  const onClick = (time, numofpeople) => {
    if (numofpeople === 10) {
      alert("마감 되었습니다.");
      return;
    }
    history.push({
      pathname: `/detail`,
      state: { selectedDay, time }
    });
  };

  return (
    <RvListBlock>
      <ul>
        {memoizedData[selectedDay]?.map((val, idx) => (
          <li
            className="schedule_item"
            onClick={() => {
              onClick(val.bookTime, val.numofpeople);
            }}
            key={idx}
          >
            <div>
              <div className="schedule_time">
                <p>{val.bookTime}</p>
              </div>
              <div className="schedule_status">
                {val.numofpeople < 10 ? (
                  <div className="status possible">
                    <p>{val.numofpeople + " / 10"}</p>
                  </div>
                ) : (
                  <div className="status">
                    <p>예약 마감</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </RvListBlock>
  );
};

export default ReservationList;
