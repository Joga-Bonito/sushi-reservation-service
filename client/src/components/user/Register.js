import React, { useState } from "react";
import styled from "styled-components";

import axios from "axios";

const RegisterBlock = styled.div`
    margin 0 auto;
    * {box-sizing : border-box;}
    .headMessage{
        margin-bottom: 30px;
        margin-top: 20px;
    }
    .headMessage h2{
        font-weight: 300;
        font-size: 32px;
    }
    .headMessage .hlt{
        color: #3540AB;
        font-weight: 700;
    }
    .inputWrap{
        margin: 5px 0;
        width: 100%;
        overflow: auto;
    }
    .inputWrap input {
        width: 100%;
    }    
    .btnWrap{
        margin-top: 20px;
    }
    .btn {
        width: 100%;
        background-color: #3540A5;
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
        background-color: #3540A5;
        width: 100%;
        font-size: 18px;
        line-height: 18px;
        margin: 20px auto;
    }
    input[type="submit"] {
        cursor: pointer;
    }
    input{
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
    input[type=text], input[type=password], textarea, select {
        -webkit-transition: all 0.30s ease-in-out;
        -moz-transition: all 0.30s ease-in-out;
        -ms-transition: all 0.30s ease-in-out;
        -o-transition: all 0.30s ease-in-out;
        outline: none;
    }

    .innerContainer {
        padding: 20px;
    }
    form label {
        font-size: 11px;
        text-align: left;
        display: block;
        margin: 10px 0 3px 5px;
    }
    @media only screen and (min-width: 1024px){
        .innerContainer {
            margin-left: 460px;
            height: 100%;
            overflow: auto;
            position: relative;
        }
        .inner {
            max-width: 480px;
            margin: 0 auto;
            margin-top: 50px;
        }
        form label {
            display: inherit;
        }
    }
`;

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 다름");
      return;
    }

    let dataToSubmit = {
      name,
      email,
      password,
      phoneNumber
    };

    axios
      .post("api/user/register", dataToSubmit, { withCredentials: true })
      .then(response => {
        if (response.data.registerSuccess) {
          //props.history.push("/login");
          alert("Register success");
          window.location.replace("/");
        } else {
          alert("입력 정보를 확인해주세요");
          document.getElementById("email").focus();
        }
      });
  };

  return (
    <RegisterBlock>
      <div className="innerContainer">
        <div className="inner">
          <div className="headMessage">
            <h2>초밥 먹고 싶을 땐</h2>
            <h2 className="hlt">초밥집 예약 사이트</h2>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="inputWrap">
                  <div className="inputWrap">
                    <label>이름</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="inputWrap">
                    <label>이메일</label>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                      autoCapitalize="none"
                      required
                      id="email"
                    />
                  </div>
                  <div className="inputWrap">
                    <label>핸드폰 번호</label>
                    <input
                      type="text"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={e => {
                        setPhoneNumber(e.target.value);
                      }}
                      autoCapitalize="none"
                      required
                      id="phoneNumber"
                    />
                  </div>
                  <div className="inputWrap">
                    <label>비밀번호</label>
                    <input
                      type="password"
                      required
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <div className="inputWrap">
                    <label>비밀번호 확인</label>
                    <input
                      type="password"
                      required
                      id="confirmPassword"
                      placeholder="Enter your confirmPassword"
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="btnWrap">
                  <input
                    type="submit"
                    className="btn submit"
                    value="회원가입"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </RegisterBlock>
  );
};

export default Register;