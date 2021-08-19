const router = require("express").Router();
const { ListController } = require("../controllers");

// Create a new list
router.post("/book", ListController.create);

router.post("/getData", ListController.read);

router.post("/getDataByConditions", ListController.readByConditions);

router.post("/updateStatus", ListController.updateStatus);

module.exports = router;
