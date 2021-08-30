//Sequelize에서 Model은 Database공간의 Table의 Schema를 표현하는 수단이다.

module.exports = (sequelize, Sequelize) => {
  //sequelize.define( "객체이름", 스키마 정의, 테이블 설정 )
  const Reservation = sequelize.define(
    "Reservation",
    {
      id: {
        field: "id",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "PK용 아이디 값"
      },
      memo: {
        field: "memo",
        type: Sequelize.STRING(50),
        comment: "짧게 메모란 만들고 싶었음"
      },
      email: {
        field: "email",
        type: Sequelize.STRING(30),
        allowNull: false,
        comment: "FK로 users table이랑 join할때 쓸거"
      },
      bookTime: {
        field: "bookTime",
        type: Sequelize.DATE,
        allowNull: false,
        comment: "예약한 시간 (예약 시간 별로 그룹핑 해야되서 만듬)"
      },
      bookDate: {
        field: "bookDate",
        type: Sequelize.DATEONLY, //DATE without time.
        allowNull: false,
        comment: "예약한 날짜 (예약 날짜 별로 그룹핑 해야되서 만듬)"
      },
      depositCompleted: {
        field: "depositCompleted",
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        comment: "입금 확인 내역을 표시하기 위함"
      },
      depositCompletedAt: {
        field: "depositCompletedAt",
        type: Sequelize.DATE,
        comment: "admin이 입금 확인한 시간"
      },
      confirmTime: {
        field: "confirmTime",
        type: Sequelize.DATE,
        comment: "admin이 입금 확인 후에 예약 확정한 시간"
      },
      cancelTime: {
        field: "cancelTime",
        type: Sequelize.DATE,
        comment: "user가 취소 요청한 시간"
      },
      numofpeople: {
        field: "numofpeople",
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "예약 인원"
      },
      confirm: {
        field: "confirm",
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        comment: "예약 확정 내역을 표시하기 위함"
      },
      cancel: {
        field: "cancel",
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        comment: "예약 취소 내역을 표시하기 위함"
      },
      insert_At: {
        field: "insert_At",
        type: Sequelize.DATE
      },
      update_At: {
        field: "update_At",
        type: Sequelize.DATE
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          user.insert_At = sequelize.fn("NOW");
        },
        beforeUpdate: user => {
          user.update_At = sequelize.fn("NOW");
        }
      }
    }
  );

  return Reservation;
};
