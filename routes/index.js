const express = require("express");
const userRouter = require("./user");
const checkinRouter = require("./checkin");
const commentRouter = require("./comment");

const router = express.Router();

// 앞에 /api/로 시작됨
router.use('/', userRouter);
router.use('/', checkinRouter);
router.use('/', commentRouter);

module.exports = router;

