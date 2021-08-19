import React, { useEffect, useState } from "react";
import moment from "moment";
import styled, { css } from "styled-components";

const FlexItme = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  button {
    display: none;
  }
  @media only screen and (min-width: 1024px) {
    button {
      display: block;
      cursor: pointer;
      width: 20px;
      height: 20px;
      padding: 0;
      font-size: 0;
      border: 0;
      outline: 0;
      margin: auto;
    }
  }
`;

const CalendarBlock = styled.div`
  padding: 9px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
    width: 0; /* Remove scrollbar space */
    height: 0;
    background: transparent; /* Optional: just make scrollbar invisible */
    -webkit-appearance: none;
  }

  @media only screen and (min-width: 1024px) {
    overflow: hidden;
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    transition: transform 500ms ease 0.3s;
  }
  li {
    display: inline-block;
    border-radius: 40px;
    padding: 13px 0;
    cursor: pointer;
    text-align: center;
  }
  li.isActive {
    background-color: #3534a5;
    color: white;
  }
  li > p {
    font-size: 18px;
    line-height: 14px;
    padding-top: 8px;
    font-weight: 400;
  }
  li > span {
    font-size: 11px;
  }

  span.previous {
    display: flex;
    align-items: center;
    line-height: 1.2;
    &::before {
      content: "◀";
      margin: 0 10px;
    }
  }

  ${props => css`
    width: ${props.width}px;
    ul {
      width: ${(props.width / 7) * 14}px;
      transform: translate3d(-${props.translateRange}px, 0px, 0px);
    }
    li {
      width: ${props.width / 7}px;
    }
  `}
`;
const PreviousButton = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;
  cursor: pointer;

  &::before {
    content: "<";
    margin: 0 10px;
  }
`;
const NextButton = styled.span`
  display: flex;
  align-items: center;
  line-height: 1.2;
  cursor: pointer;

  &::before {
    content: ">";
    margin: 0 10px;
  }
`;

const Calendar = ({ selectedDay, setSelectedDay }) => {
  const [calendar_days, setCalendar_days] = useState([]);

  useEffect(() => {
    //create days array
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    let temp_array = [];
    for (let i = 0; i < 14; i++) {
      if (week[moment().add(i, "days").day()] !== "일") {
        //일요일 휴무 기준.
        temp_array.push({
          date: moment().add(i, "days").format("YYYY-MM-DD"),
          dayOfTheWeek: week[moment().add(i, "days").day()]
        });
      }
    }
    setCalendar_days(temp_array);
  }, [selectedDay]);

  //slide setting
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const slideItemWidth = windowWidth >= 1024 ? 944 : windowWidth - 40;
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 5;

  useEffect(() => {
    const resizeFunc = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", resizeFunc);
    return () => {
      window.removeEventListener("resize", resizeFunc);
    };
  }, [windowWidth]);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      return;
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  return (
    <FlexItme>
      <PreviousButton onClick={prevSlide} />
      <CalendarBlock
        width={slideItemWidth}
        translateRange={(slideItemWidth / 7) * currentSlide}
      >
        <ul>
          {calendar_days.length === 0
            ? "예약 가능한 날짜가 없습니다."
            : calendar_days.map((val, idx) =>
                val.date === selectedDay ? (
                  <li
                    key={idx}
                    className={val.date + " isActive"}
                    onClick={() => {
                      setSelectedDay(val.date);
                    }}
                  >
                    <p>{val.date.split("-")[2]}</p>
                    <span>{val.dayOfTheWeek}</span>
                  </li>
                ) : (
                  <li
                    key={idx}
                    className={val.date}
                    onClick={() => {
                      setSelectedDay(val.date);
                    }}
                  >
                    <p>{val.date.split("-")[2]}</p>
                    <span>{val.dayOfTheWeek}</span>
                  </li>
                )
              )}
        </ul>
      </CalendarBlock>
      <NextButton onClick={nextSlide} />
    </FlexItme>
  );
};

export default Calendar;
