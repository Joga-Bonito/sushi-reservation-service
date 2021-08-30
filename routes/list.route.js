const router = require("express").Router();
const { ListController } = require("../controllers");

// Create a new list
router.post("/book", ListController.create);

router.post("/getData", ListController.read);
router.post("/getNumofpeople", ListController.getNumofpeople);

router.post("/getDetailData", ListController.readOne);

router.post("/getDataByConditions", ListController.readByConditions);

router.post("/getDataBetweenDays", ListController.getDataBetweenDays);

router.post("/updateStatus", ListController.updateStatus);
router.post("/updateToConfirm", ListController.updateToConfirm);
router.post("/multipleUpdate", ListController.multipleUpdateStatus);

module.exports = router;
