import React, { useState, Suspense } from "react";
import styled from "styled-components";
import moment from "moment";
import Slider from "./layout/Slider";
import Calendar from "./layout/Calendar";
import ReservationList from "./reservations/ReservationList";
import Loading from "./layout/Loading";

const AppBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  ul,
  li {
    list-style: none;
  }
`;
const CarouselContainer = styled.div`
  border-bottom: 10px solid #eee;
  @media (min-width: 1024px) {
    background-color: #fafafa;
    margin: 0 auto;
    border-bottom: 1px solid #ddd;
  }
`;
const ReservationContainer = styled.div``;

const Home = () => {
  //토요일일 경우엔 다음날이 일요일이니까 일요일은 건너뛰고 월요일 출력
  //나머지 요일엔 그냥 다음날 출력
  const [selectedDay, setSelectedDay] = useState(
    moment().day() === 6
      ? moment().add(2, "days").format("YYYY-MM-DD")
      : moment().add(1, "days").format("YYYY-MM-DD")
  );

  return (
    <AppBlock>
      <CarouselContainer>
        <Slider />
      </CarouselContainer>
      <ReservationContainer>
        <Calendar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <Suspense fallback={<Loading />}>
          <ReservationList selectedDay={selectedDay} />
        </Suspense>
      </ReservationContainer>
    </AppBlock>
  );
};

export default Home;
