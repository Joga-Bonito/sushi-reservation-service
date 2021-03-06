import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const SettingBlock = styled.div`
  padding: 0 20px;
  input {
    padding: 15px 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-shadow: none;
    outline: none;
    background-color: #fafafa;
    -webkit-appearance: none;
    appearance: none;
    font-size: 16px;
    color: #333333;
  }
  select {
    padding: 15px 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-shadow: none;
    outline: none;
    color: #333333;
    background-color: #fafafa;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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
  .btn.submit {
    background-color: #3540a5;
    width: 100%;
    font-size: 18px;
    line-height: 18px;
    margin: 20px auto;
  }
`;
const Inner = styled.div`
  @media only screen and (min-width: 1024px) {
    max-width: 480px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .inputWrap {
    margin: 5px 0;
    width: 100%;
    overflow: auto;
  }
  .inputWrap input {
    width: 100%;
  }
  .inputWrap select {
    width: 100%;
  }
  div.inputDWrap {
    overflow: auto;
    margin: 5px 0;
    display: inline-block;
    width: 100%;
  }
  div.inputWrap50:first-child {
    margin-right: 1%;
  }

  .inputWrap50 {
    width: 49%;
    float: left;
  }
  .inputFull {
    width: 100%;
  }
  form label {
    font-size: 11px;
    text-align: left;
    display: block;
    margin: 10px 0 3px 5px;
  }
  @media only screen and (min-width: 1024px) {
    form label {
      display: inherit;
    }
  }
`;
const HeadMessage = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;
  h2 {
    font-weight: 300;
    font-size: 32px;
  }
`;

const BtnWrap = styled.div`
  margin-top: 20px;
`;

const Setting = ({ user }) => {
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    bank: "",
    accountNumber: "",
    accountOwner: ""
  });
  const { name, phoneNumber, bank, accountNumber, accountOwner } = userData;

  useEffect(() => {
    async function getUserData() {
      const data = await axios.post(
        "/api/user/getUserData",
        {
          email: user?.email
        },
        {
          withCredentials: true
        }
      );
      const { name, phoneNumber, bank, accountNumber, accountOwner } =
        data.data.data;
      setUserData({
        name,
        phoneNumber,
        bank: bank || "",
        accountNumber: accountNumber || "",
        accountOwner: accountOwner || ""
      });
    }
    if (user?.email) {
      getUserData();
    }
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();

    if (user?.email) {
      const userData = {
        email: user.email,
        name,
        phoneNumber,
        bank,
        accountNumber,
        accountOwner
      };

      axios
        .post("/api/user/update", userData, { withCredentials: true })
        .then(response => {
          if (response.data.updateSuccess) {
            window.location.replace("/mypage");
          }
        });
    }
  };
  const onChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <SettingBlock>
      <Inner>
        <HeadMessage>
          <h2>{user?.email}</h2>
        </HeadMessage>
        <form>
          <fieldset>
            <div className="inputWrap">
              <label>??????</label>
              <input
                type="text"
                name="name"
                value={name || ""}
                placeholder="??????"
                required
                onChange={onChange}
              />
            </div>
            <div className="inputWrap">
              <label>????????? ??????</label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber || ""}
                placeholder="????????? ??????"
                required
                onChange={onChange}
              />
            </div>
            <div className="inputWrap">
              <label>?????? ?????? ??????</label>
              <select name="bank" onChange={onChange} value={bank}>
                <option value="">---------</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????(???????????????)</option>
                <option value="?????????">?????????</option>
                <option value="SC">SC(?????????????????????)</option>
                <option value="KEB??????">KEB??????(???????????????)</option>
                <option value="????????????">????????????(??? ??????)</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="?????????">?????????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="???????????????">???????????????</option>
                <option value="??????????????????">??????????????????</option>
                <option value="???????????????">???????????????(HSBC)</option>
                <option value="???????????????????????????">???????????????????????????</option>
                <option value="BOA">BOA(Bank of America)</option>
                <option value="????????????????????????">????????????????????????</option>
                <option value="???????????????">???????????????</option>
                <option value="????????????">????????????</option>
                <option value="???????????????">???????????????</option>
              </select>
            </div>
            <div className="inputWrap">
              <label>?????? ?????? ??????</label>
              <input
                type="text"
                name="accountNumber"
                value={accountNumber}
                maxLength="45"
                onChange={onChange}
              />
            </div>
            <div className="inputWrap">
              <label>?????? ?????? ?????????</label>
              <input
                type="text"
                name="accountOwner"
                value={accountOwner}
                maxLength="10"
                onChange={onChange}
              />
            </div>
          </fieldset>
          <BtnWrap>
            <button type="submit" className="btn submit" onClick={handleSubmit}>
              ????????????
            </button>
          </BtnWrap>
        </form>
      </Inner>
    </SettingBlock>
  );
};

export default Setting;
