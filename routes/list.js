const express = require("express");
const router = express.Router();

//=================================
//             List
//=================================

router.get("/admin/:tabValue", async (req, res) => {
  // console.log(req.params.tabValue);

  if (req.params.tabValue == 0) {
    const { data, err } = await db.query(
      "select * from reservations where confirm = 0"
    );
    if (!err) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ err: "error남" });
    }
  } else if (req.params.tabValue == 1) {
    const { data, err } = await db.query(
      "select * from reservations where confirm = 1"
    );
    if (!err) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ err: "error남" });
    }
  } else if (req.params.tabValue == 2) {
    const { data, err } = await db.query(
      "select * from reservations where confirm = 1 and cancel = 1"
    );
    if (!err) {
      res.status(200).send({ data });
    } else {
      res.status(500).send({ err: "error남" });
    }
  }
});

module.exports = router;
