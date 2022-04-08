const express = require("express");
const jwt = require("jsonwebtoken");    
const router = express.Router();
const User = require("../schemas/user");
// const authMiddleware = require("../middlewares/auth-middleware");


//로그인하기
router.post("/login", async (req, res) => {
    const {userId, password} = req.body;
    const user = await User.findOne({userId}).exec();

    if (!user) {
        res.status(400).send({});
        // res.status(400).send({errorMessage: '닉네임 또는 비밀번호를 확인해주세요'});
        return;
    }

    // //암호화된 비밀번호 풀기
    // const existPw = user.password 
    // const decryptedPw = CryptoJS.AES.decrypt(existPw,process.env.keyForDecrypt);
    // const originPw = decryptedPw.toString(CryptoJS.enc.Utf8);

    if (password !== user.password) {
        res.status(400).send({});
        return;
    } else {
        const token = jwt.sign({ userId : user.userId},process.env.JWT_SECRET);
            res.send ({token});
    }

});


// 회원가입
router.post("/signup", async (req, res) => {
    const { userId, nickName, password, passwordCheck } = req.body

    const user = new User({ nickName, password})
    await user.save();
    res.status(201).send({});       

});


//회원가입: 아이디 중복확인
router.post("/idCheck", async (req, res) => {
    const { userId } = req.body

    const existUsers = await User.find({
        $or: [{ userId }]
    });

    if (existUsers.length) {
        res.status(400).send({result: "false"});
        return;
    } else {
        res.status(201).send({result: "true"}); 
    }     

});


//회원가입: 닉네임 중복확인
router.post("/nickCheck", async (req, res) => {
    const { nickName } = req.body

    const existUsers = await User.find({
        $or: [{ nickName }]
    });

    if (existUsers.length) {
        res.status(400).send({result: "false"});
        return;
    } else {
        res.status(201).send({result: "true"}); 
    }        

});


// // 로그인시, 미들웨어로 회원인식 및 회원으로 입장가능
// router.get("/users/me", authMiddleware, async (req, res) => {
//     // const token = req.header("Authorization")
//     const {user} = res.locals;
//     res.send({
//         user:{
//             user
//         },
//     });
// });



module.exports = router;