//controller로부터 받은 인자 기반 data 가공 비즈니스 로직 담당
const { sequelize } = require("../models");
const db = require("../models");
const List = db.list;
const Op = db.Sequelize.Op;

exports.createReservation = reservationData => List.create(reservationData);

exports.getList = data => {
  return List.findAll({
    attributes: [
      [
        sequelize.fn("date_format", sequelize.col("bookTime"), "%H:%i"),
        "bookTime"
      ],
      [sequelize.fn("sum", sequelize.col("numofpeople")), "numofpeople"]
    ],
    where: data,
    group: ["bookTime"],
    raw: true
  });
};

exports.getDetailData = conditions => {
  return List.findOne({
    where: conditions,
    raw: true
  });
};

exports.getListByConditions = data => {
  return List.findAll({
    where: data,
    raw: true,
    order: [["bookTime", "DESC"]]
  });
};

exports.getDataBetweenDays = (startDate, endDate, conditions) => {
  return List.findAll({
    where: {
      [Op.and]: [
        {
          bookTime: {
            [Op.between]: [startDate, endDate]
          }
        },
        conditions
      ]
    },
    raw: true,
    order: [["bookTime", "DESC"]]
  });
};

exports.getNumofpeople = time => {
  return List.findOne({
    attributes: [
      sequelize.col("bookTime"),
      [sequelize.fn("sum", sequelize.col("numofpeople")), "numofpeople"]
    ],
    where: time,
    group: ["bookTime"],
    raw: true
  });
};

exports.updateStatus = (inputData, conditions) => {
  return List.update(inputData, { where: { id: conditions } });
};
exports.multipleUpdateStatus = (inputData, conditionsArr) => {
  return List.update(inputData, { where: { id: { [Op.in]: conditionsArr } } });
};
