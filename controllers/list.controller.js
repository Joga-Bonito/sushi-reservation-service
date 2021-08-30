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

exports.readOne = async (req, res, next) => {
  try {
    const data = await ListService.getDetailData(req.body);
    res.status(200).send({ detailData: data });
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

exports.getDataBetweenDays = async (req, res, next) => {
  try {
    const { startDate, endDate, conditions } = req.body;
    const listData = await ListService.getDataBetweenDays(
      startDate,
      endDate,
      conditions
    );
    res.status(200).send({ listData });
  } catch (err) {
    next(err);
  }
};

exports.getNumofpeople = async (req, res, next) => {
  try {
    const data = await ListService.getNumofpeople(req.body);
    let numofpeople = data?.numofpeople ? parseInt(data.numofpeople) : 0;
    console.log(data);
    res.status(200).send({ numofpeople });
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

    const updateStatus = await ListService.updateStatus(req.body, conditions);
    res.send({ message: "updated" });
  } catch (err) {
    next(err);
  }
};
exports.multipleUpdateStatus = async (req, res, next) => {
  try {
    const conditionsArr = req.body.id;
    delete req.body.id;
    const multipleUpdateStatus = await ListService.multipleUpdateStatus(
      req.body,
      conditionsArr
    );
    res.send({ message: "updated" });
  } catch (err) {
    next(err);
  }
};

exports.updateToConfirm = async (req, res, next) => {
  try {
    // getNumofpeople
    const conditions = req.body.id;
    const numofpeople = req.body.numofpeople;
    const bookTime = req.body.bookTime;
    delete req.body.id;
    delete req.body.numofpeople;
    delete req.body.bookTime;

    const getNumofpeople = await ListService.getNumofpeople({
      bookTime,
      confirm: 1
    });
    const num =
      getNumofpeople && getNumofpeople.numofpeople
        ? parseInt(getNumofpeople.numofpeople)
        : 0;
    if (num + parseInt(numofpeople) > 10) {
      return res.send({ errText: "해당 시간에 예약 가능 인원 초과" });
    }
    const updateStatus = await ListService.updateStatus(req.body, conditions);
    return res.status(200).send({ message: "updated" });
  } catch (err) {
    next(err);
  }
};
