const express = require("express");
const userRouter = require("./user");

const router = express.Router();

// 앞에 /api/로 시작됨
router.use('/', userRouter);


module.exports = router;