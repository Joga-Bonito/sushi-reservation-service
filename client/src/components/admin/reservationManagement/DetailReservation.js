import axios from "axios";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import styled from "styled-components";

const DetailReservationBlock = styled.div`
  margin: 0 auto;
  background: white;
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
  .btn.rvConfirm {
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
`;
const Detail = styled.div`
  max-width: 1024px;
  margin: 0 auto;
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
`;

const DetailReservation = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState();
  useEffect(() => {
    setLoading(true);
    let dataToSubmit = {
      id: match.params.id,
      confirm: 0,
      cancel: 0
    };
    axios
      .post("/api/list/getDetailData", dataToSubmit, {
        withCredentials: true
      })
      .then(res => {
        setDetailData(res.data.detailData);
        setLoading(false);
      });
  }, [match.params.id]);

  const confirm = () => {
    let dataToSubmit = {
      confirm: 1,
      confirmTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      numofpeople: detailData?.numofpeople,
      bookTime: moment(detailData?.bookTime).format("YYYY-MM-DD HH:mm:ss"),
      id: match.params.id
    };
    axios
      .post("/api/list/updateToConfirm", dataToSubmit, {
        withCredentials: true
      })
      .then(res => {
        if (res.data.errText) {
          alert(res.data.errText);
        } else {
          window.location.replace("/admin/reservationManagement/afterDeposit");
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <DetailReservationBlock>
      <Detail>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Section>
              <span>이메일</span>
              <p>{detailData?.email}</p>
            </Section>
            <Section>
              <span>인원</span>
              <p>{detailData?.numofpeople}</p>
            </Section>
            <Section>
              <span>예약 날짜</span>
              <p>{moment(detailData?.bookTime).format("YYYY-MM-DD HH:mm")}</p>
            </Section>
          </div>
        )}
      </Detail>
      <div>
        <button className="btn rvConfirm" onClick={confirm}>
          예약 확정
        </button>
      </div>
    </DetailReservationBlock>
  );
};

export default DetailReservation;
