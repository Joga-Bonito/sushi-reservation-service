import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import moment from "moment";
import axios from "axios";

const MyReservationsBlock = styled.div`
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
const NavigationItem = styled.div``;

const PageBody = styled.div``;
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

const MyReservations = ({ user }) => {
  const [tabValue, setTabValue] = useState(0);

  const { data } = useQuery(
    ["rvData", { tabValue }],
    async () => {
      try {
        const data = await axios.post(
          `/api/list/getDataByConditions`,
          { email: user?.email, confirm: tabValue },
          {
            withCredentials: true
          }
        );
        return data.data.rvData;
      } catch (err) {
        console.log(err);
      }
    },
    {
      staleTime: 1000 * 60 * 5, //쿼리 데이터가 fresh 에서 stale로 전환되는데 걸리는 시간.
      refetchOnWindowFocus: false, //윈도우가 다시 포커스되었을 때 데이터를 호출할 것인지 여부
      retry: 3
    }
  );

  return (
    <MyReservationsBlock>
      <PageHeader>
        <PageTitle>
          <h1>이용 내역</h1>
        </PageTitle>
        <NavigationContainer>
          <NavigationWrapper>
            <NavigationItem>
              <span
                className={tabValue === 0 ? "selected" : ""}
                onClick={() => {
                  setTabValue(0);
                }}
              >
                입금 전
              </span>
              <span
                className={tabValue === 1 ? "selected" : ""}
                onClick={() => {
                  setTabValue(1);
                }}
              >
                예약 완료
              </span>
            </NavigationItem>
          </NavigationWrapper>
        </NavigationContainer>
      </PageHeader>
      <PageBody>
        <ListContainer>
          <ul>
            {data?.length > 0 ? (
              data?.map((val, idx) => (
                <li key={idx}>
                  <div className="rv_date">
                    <h3>
                      {moment(val.bookTime).format(
                        "YYYY년 MM월 DD일 HH시 mm분"
                      )}
                    </h3>
                  </div>
                  <div className="rv_option">
                    <span>{"예약 인원 : " + val.numofpeople}</span>
                  </div>
                  <div className="rv_status">
                    <p>
                      {parseInt(val.confirm) === 1 ? "예약 확정" : "입금 전"}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li>내역 없음</li>
            )}
          </ul>
        </ListContainer>
      </PageBody>
    </MyReservationsBlock>
  );
};

export default MyReservations;
