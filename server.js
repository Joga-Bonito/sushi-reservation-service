//main 로직으로 Express app 기반 server의 실행 및 종료시 처리 담당
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const routes = require("./routes");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

app.use(express.json()); //json으로 이뤄진 request.body를 제대로 읽기 위함.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); //Express의 내장 미들웨어 함수. urlencoded 페이로드로 들어오는 요청을 구문 분석하고 본문 구문 분석기를 기반으로합니다.

app.use(express.static(path.join(__dirname, "client/build")));
app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "client/build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
