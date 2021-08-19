// 서비스 계층은 나머지 애플리케이션에서 모든 비즈니스 로직을 캡슐화하고 추상화합니다.
// 비즈니스 로직 포함
// 데이터 액세스 계층을 활용하여 데이터베이스와 상호 작용
// controller 계층에 전달할 데이터 리턴

// req , res 활용 X
// 클라이언트에 대한 응답 처리 X
// 데이터베이스와 직접 상호 작용 X

const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findUserByEmail = email => {
  return User.findOne({
    where: { email }
  });
};

exports.createUser = userData => {
  //데이터베이스에 저장하기
  return User.create(userData);
};

exports.updateUser = (inputData, email) => {
  return User.update(inputData, { where: { email } });
};
