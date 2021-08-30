import React from "react";
import moment from "moment";
import styled from "styled-components";

const CalendarBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-flow: row;
`;
const CalendarContainer = styled.div`
  display: ${props => props.visible};
  background-color: white;
  position: absolute;
  width: 250px;
  height: 250px;
  margin-top: 40px;
  z-index: 9999;

  .btnWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    button {
      background: 0;
      border: 0;
      padding: 0;
      cursor: pointer;
      width: 10px;
      height: 10px;
      position: relative;
      text-indent: -9999px;
    }
    button[class="next"]::before {
      content: "";
      width: 10px; /* 사이즈 */
      height: 10px; /* 사이즈 */
      border-top: 5px solid #121212; /* 선 두께 */
      border-right: 5px solid #121212; /* 선 두께 */
      display: inline-block;
      transform: rotate(45deg); /* 각도 */
      position: absolute;
      left: 0;
      top: 0;
    }
    button[class="prev"]::before {
      content: "";
      width: 10px; /* 사이즈 */
      height: 10px; /* 사이즈 */
      border-top: 5px solid #121212; /* 선 두께 */
      border-right: 5px solid #121212; /* 선 두께 */
      display: inline-block;
      transform: rotate(225deg); /* 각도 */
      position: absolute;
      left: 0;
      top: 0;
    }
    span {
      margin: 0;
      text-align: center;
    }
  }

  table {
    background-color: white;
    border-radius: 6px;
    box-shadow: 1px 1px 5px 5px whitesmoke;
    width: 100%;
    height: 250px;
    padding: 10px;
  }
  tr {
    height: 25px;
  }
  td {
    text-align: center;
    vertical-align: middle;
  }
  td[class="days"] {
    cursor: pointer;
  }
  td[class="days"]:hover {
    background-color: grey;
    color: white;
  }
`;
const CalendarInput = styled.div`
  span {
    padding: 10px 15px;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-shadow: none;
    outline: none;
    background-color: #fafafa;
    -webkit-appearance: none;
    appearance: none;
    font-size: 16px;
    color: #333333;
    cursor: pointer;
  }
  span:hover {
    background-color: whitesmoke;
  }
`;

const Calendar = ({
  inputDate,
  changeInputDate,
  setVisible,
  visible,
  anotheCalendarSetVisible
}) => {
  //props로 부모 컴포넌트의 date값과 date 변경 함수를 받고 마지막에 변경해주자

  const prevMonth = () => {
    changeInputDate(
      new Date(moment(inputDate).subtract(1, "months").format("YYYY-MM-DD"))
    );
  };
  const nextMonth = () => {
    changeInputDate(
      new Date(moment(inputDate).add(1, "months").format("YYYY-MM-DD"))
    );
  };

  const generate = () => {
    //props로 받은 date의 1일을 가져옴. 왜냐면 1일이 무슨요일이냐에 따라서 array 시작점이 다름
    let tempDate = moment(inputDate).format("YYYY-MM-01");
    let element = "";
    let calendarArr = [];

    //moment(tempDate).day()는 해당 날이 무슨요일인지를 뱉음. 일월화수목금토 = 0,1,2,3,4,5,6 형식임
    //moment(tempDate).daysInMonth()는 해당 월이 몇일을 가지고 있는지 뱉음 ex) 8월은 31이 나옴
    //두 개를 더해서 총 array길이를 조정해줌. 왜냐면 헤더가 일월화수목금토인데 예를들어 1일이 토욜이면 array 시작점이 +6 되야 토요일 자리에 1일이 위치하니까. 그만큼 배열의 length가 늘어나야댐
    for (
      let i = 0;
      i < moment(tempDate).daysInMonth() + moment(tempDate).day();
      i++
    ) {
      calendarArr[i + moment(tempDate).day()] = i + 1; //ex) 1일이 토요일이면 calendarArr index 0~6까지는 undefined 혹은 empty인 채로 days를 넣는거임
    }

    //0부터 만들어놓은 calendarArr의 length만큼 돌려야되는데 empty 요소로 채워진 배열은 length 길이에 포함이 안되서 그냥 이렇게 했음
    for (
      let i = 0;
      i < moment(tempDate).daysInMonth() + moment(tempDate).day();
      i++
    ) {
      if (i % 7 === 0) {
        //시작 때(0)열어주고 6번째 닫았으니까 7번째에 다시 열어줌
        element += "<tr>";
      }

      if (!calendarArr[i]) {
        element += `<td></td>`; //calendarArr[i]가 empty 혹은 undefined이면 한칸 쩜프
      } else {
        element += `<td class="days">${calendarArr[i]}</td>`; //아니라면 day를 채움
      }

      if (i % 7 === 6) element += "</tr>"; //월화수목금토일에 해당하는 day 7개(0~6, 7~13 ...)를 다 뽑았으면 닫아준다
    }

    return { __html: element }; //string형태를 html render하는 법임
  };

  const handleClick = e => {
    if (e.target.tagName === "TD" && e.target.className === "days") {
      changeInputDate(
        new Date(moment(inputDate).format(`YYYY-MM-${e.target.textContent}`))
      );
      setVisible("none");
    }
  };
  return (
    <CalendarBlock>
      <CalendarInput>
        <span
          onClick={() => {
            anotheCalendarSetVisible("none");
            setVisible("");
          }}
        >
          {moment(inputDate).format("YYYY-MM-DD")}
        </span>
      </CalendarInput>
      <CalendarContainer visible={visible}>
        <div className="btnWrapper">
          <button className="prev" onClick={prevMonth}>
            prev
          </button>
          <span>{moment(inputDate).format("YYYY-MM-DD")}</span>
          <button className="next" onClick={nextMonth}>
            next
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody
              onClick={handleClick}
              dangerouslySetInnerHTML={generate()}
            ></tbody>
          </table>
        </div>
      </CalendarContainer>
    </CalendarBlock>
  );
};

export default Calendar;
