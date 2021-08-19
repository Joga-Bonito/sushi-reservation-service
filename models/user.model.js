const Crypto = require("crypto-js");
require("dotenv").config();
const AES_KEY = process.env.AESKEY;

module.exports = (sequelize, Sequelize) => {
  //Sequelize에서 Model은 Database공간의 Table의 Schema를 표현하는 수단이다.
  //sequelize.define( "객체이름", 스키마 정의, 테이블 설정 )
  const User = sequelize.define(
    "User",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        field: "name",
        type: Sequelize.STRING(20),
        allowNull: false
      },
      email: {
        field: "email",
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        field: "password",
        type: Sequelize.STRING(100),
        allowNull: false
      },
      iv: {
        field: "iv",
        type: Sequelize.STRING(100),
        comment: "암호화 복호화시 필요한 값"
      },
      salt: {
        field: "salt",
        type: Sequelize.STRING(100),
        comment: "해싱할 때 필요한 값"
      },
      phoneNumber: {
        field: "phoneNumber",
        type: Sequelize.STRING(100),
        allowNull: false
      },
      accountOwner: {
        field: "accountOwner",
        type: Sequelize.STRING(30),
        comment: "환불 계좌 예금주"
      },
      accountNumber: {
        field: "accountNumber",
        type: Sequelize.STRING(100),
        comment: "환불 계좌 번호"
      },
      bank: {
        field: "bank",
        type: Sequelize.STRING(30),
        comment: "환불 은행명"
      }
    },
    {
      hooks: {
        beforeCreate: async user => {
          user.iv = Crypto.lib.WordArray.random(16)
            .toString(Crypto.enc.utf8)
            .slice(0, 16);
          user.salt = Crypto.lib.WordArray.random(32)
            .toString(Crypto.enc.utf8)
            .slice(0, 32);

          if (user.password) {
            user.password = Crypto.SHA512(user.password + user.salt).toString(
              Crypto.enc.Base64
            );
          }
          if (user.accountNumber) {
            user.accountNumber = await Crypto.AES.encrypt(
              user.accountNumber,
              AES_KEY,
              { iv: user.iv }
            ).toString();
          }
        },
        beforeBulkUpdate: async user => {
          user.attributes.iv = Crypto.lib.WordArray.random(16)
            .toString(Crypto.enc.utf8)
            .slice(0, 16);

          if (user.attributes.password) {
            user.attributes.password = Crypto.SHA512(
              user.attributes.password + user.attributes.salt
            ).toString(Crypto.enc.Base64);
          }
          if (user.attributes.accountNumber) {
            user.attributes.accountNumber = await Crypto.AES.encrypt(
              user.attributes.accountNumber,
              AES_KEY,
              { iv: user.attributes.iv }
            ).toString();
          }
        },
        afterFind: async result => {
          if (result) {
            if (result.accountNumber) {
              //decrypt가 16진수를 뱉어서 utf8해줌
              result.accountNumber = await Crypto.AES.decrypt(
                result.accountNumber,
                AES_KEY,
                { iv: result.iv }
              ).toString(Crypto.enc.Utf8);
            }
          }
        }
      }
    }
  );
  // Instance methods
  User.prototype.validPassword = async (inputPassword, hashedPassword) => {
    return await (Crypto.SHA512(inputPassword).toString(Crypto.enc.Base64) ===
      hashedPassword);
  };

  return User;
};
