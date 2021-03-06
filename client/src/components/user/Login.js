import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const LoginBlock = styled.div`
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

const Login = props => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    let dataToSubmit = {
      email: email,
      password: pwd
    };

    axios
      .post("/api/user/login", dataToSubmit, { withCredentials: true })
      .then(response => {
        if (response.data.loginSuccess) {
          //props.history.push("/login");
          alert("Login success");
          window.location.replace("/");
        }
      })
      .catch(err => {
        if (err.response.status === 409) {
          document.getElementById(err.response.data.errSubject).focus();
          return alert(err.response.data.errMessaage);
        }
      });
  };

  return (
    <LoginBlock>
      <div className="innerContainer">
        <div className="inner">
          <div className="headMessage">
            <h2>?????? ?????? ?????? ???</h2>
            <h2 className="hlt">????????? ?????? ?????????</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="inputWrap">
                <div className="inputWrap">
                  <label>?????????</label>
                  <input
                    type="email"
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
                  <label>????????????</label>
                  <input
                    type="password"
                    required
                    id="password"
                    placeholder="Enter your password"
                    value={pwd}
                    onChange={e => {
                      setPwd(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="btnWrap">
                <input type="submit" className="btn submit" value="?????????" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </LoginBlock>
  );
};

export default Login;
