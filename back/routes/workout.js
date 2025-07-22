const express = require("express");
const {getall,getone,create,update,del} = require("../control/workoutcontrol");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/",getall)

router.get("/:id",getone)

router.post("/",create)

router.delete("/:id",del)

router.patch("/:id",update)

module.exports = router;