const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.secretKey;
const jwtOptions = {
  algorithm: "HS256", // 해싱 알고리즘
  expiresIn: "30m", // 토큰 유효 기간
  issuer: "issuer" // 발행자
};

// Controller 는 오직 Service 레이어에만 의존합니다.
const { UserService } = require("../services");

// 자주 사용되는 로직은 utils 로 빼서 모듈로 관리합니다.
// const { errorGenerator } = require('../utils');

exports.create = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.email) {
      res.send({
        err: "Email can not be empty"
      });
      return;
    } else if (!req.body.password) {
      res.send({
        err: "Password can not be empty"
      });
      return;
    } else if (!req.body.phoneNumber) {
      res.send({
        err: "PhoneNumber can not be empty"
      });
      return;
    } else if (!req.body.name) {
      res.send({
        err: "Name can not be empty"
      });
      return;
    }

    const user = {
      //주의 필드명이아니라 내가 스키마에 써놓은 이름으로 해야함
      name: req.body.name.replace(" ", "").toLowerCase(),
      email: req.body.email.replace(" ", "").toLowerCase(),
      password: req.body.password.replace(" ", ""),
      phoneNumber: req.body.phoneNumber.replace(" ", "")
    };

    const emailDuplicateCheck = await UserService.findUserByEmail(user.email);
    // if(emailDuplicateCheck) errorGenerator({ statusCode: 409, message: 'duplicated' })
    if (emailDuplicateCheck)
      return res.status(409).send({
        errMessaage: "이미 가입한 email 입니다.",
        errSubject: "email"
      });

    const createdUser = await UserService.createUser(user);

    res.status(200).json({ registerSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.read = async (req, res, next) => {
  try {
    const { email, password: inputPassword } = req.body;

    const findUserByEmail = await UserService.findUserByEmail(email);

    if (!findUserByEmail)
      return res
        .status(409)
        .send({ errMessaage: "없는 email 입니다.", errSubject: "email" });

    const { password: hashedPassword, salt, name } = findUserByEmail.dataValues;

    const passwordCheck = await findUserByEmail.validPassword(
      inputPassword + salt,
      hashedPassword
    );

    if (!passwordCheck)
      return res.status(409).send({
        errMessaage: "비밀번호가 일치하지 않습니다.",
        errSubject: "password"
      });

    //sign메소드를 통해 access token 발급!
    const token = jwt.sign({ email, name }, secretKey, jwtOptions);
    console.log("토큰 생성됨", token);

    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 120000),
        httpOnly: true // You can't access these tokens in the client's javascript
      })
      .status(200)
      .send({ loginSuccess: true, email });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const data = ({
    name, //name을 변수로 쓰지말라는데 싫어어
    phoneNumber,
    accountOwner,
    accountNumber,
    bank,
    email
  } = req.body);
  try {
    const updateUser = await UserService.updateUser(data, email);
    res.send({ updateSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.auth = (req, res) => {
  const cookies = req.cookies;
  if (cookies) {
    const token = cookies["jwt"];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (!err && decoded.email) {
        if (decoded.email === "admin@admin.com") {
          res.send({
            isAuth: true,
            text: "Admin logged in",
            isAdmin: true,
            email: decoded.email,
            name: decoded.name
          });
        } else {
          res.send({
            isAuth: true,
            text: "already logged in",
            isAdmin: false,
            email: decoded.email,
            name: decoded.name
          });
        }
      } else {
        res.send({ isAuth: false, text: "not logged in", isAdmin: false });
      }
    });
  } else {
    res.send({ isAuth: false, text: "not logged in", isAdmin: false });
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const { email } = req.body;

    const getUserData = await UserService.findUserByEmail(email);
    res.status(200).send({ data: getUserData });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res, next) => {
  try {
    const { email, name } = req.body;

    const token = jwt.sign({ email, name }, secretKey, jwtOptions);
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 100), //1초 미만으로 세팅해서 로그아웃처리
        httpOnly: true // You can't access these tokens in the client's javascript
      })
      .status(200)
      .send({ logoutSuccess: true });
  } catch (err) {
    next(err);
  }
};
