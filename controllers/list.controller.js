const { ListService } = require("../services");
// list 데이터 by 날짜
exports.read = async (req, res, next) => {
  try {
    const listData = await ListService.getList(req.body);
    res.status(200).send({ reservations: listData });
  } catch (err) {
    next(err);
  }
};

exports.readByConditions = async (req, res, next) => {
  try {
    const listData = await ListService.getListByConditions(req.body);
    res.status(200).send({ rvData: listData });
  } catch (err) {
    next(err);
  }
};

exports.readByTabValue = async (req, res, next) => {
  try {
    const listData = await ListService.getListByTabValue(req.body);
    res.status(200).send({ rvData: listData });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  // 예약 시간(bookTime), 예약 날짜(bookDate), 인원, 이메일( fk로 users table이랑 join할때 쓸거)
  //insert into Reservations ( email, bookTime, bookDate, numofpeople, insert_At ) values('guti.h.z950@gmail.com', '2021-07-20 18:00', '2021-07-20', 2, now());
  try {
    const createReservation = await ListService.createReservation(req.body);

    res.status(200).send({ reservationSuccess: true });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const conditions = req.body.id;
    delete req.body.id;
    console.log(conditions);

    const updateStatus = await ListService.updateStatus(req.body, conditions);
  } catch (err) {
    next(err);
  }
};
