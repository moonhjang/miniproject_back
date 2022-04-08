const express = require("express");
const CryptoJS = require("crypto-js"); //비번 암호화
const jwt = require("jsonwebtoken");    
const router = express.Router();
const User = require("../schemas/user");
const authMiddleware = require("../middlewares/auth-middleware");

// //post(테스트용)
// router.post("/posts", authMiddleware, async (req, res) => {
//     const { user, password, title, content } = req.body

//     //postsId: 날짜기준으로 번호 만들기
//     const date = new Date()
//     let postsId = date.valueOf();

//     if (user,password,title,content){
//         await Posts.create({ postsId, user, password, title, content })
//         return res.status(200).send({Message: '저장완료🤸'});
//     }
// });



//로그인하기
router.post("/login", async (req, res) => {
    const {userId, password} = req.body;
    const user = await User.findOne({userId}).exec();
    // console.log(user.userId)

    if (!user) {
        res.status(400).send({errorMessage: '닉네임 또는 비밀번호를 확인해주세요'});
        return;
    }

    //암호화 비밀번호 확인 (작동안됨 > 확인필요)
    // const existPw = user.hashedpassword 
    // const decryptedPw = CryptoJS.AES.decrypt(existPw,process.env.keyForDecrypt);
    // const originPw = decryptedPw.toString(CryptoJS.enc.Utf8);
    // console.log(originPw)


    if (originPw != password) {
        res.status(400).send({errorMessage: '닉네임 또는 비밀번호를 확인해주세요'});
        return;
    } else {
        const token = jwt.sign({ userId : user.userId },process.env.JWT_SECRET);
            res.send ({token});
    }

});


// 로그인시, 미들웨어로 회원인식 및 회원으로 입장가능 (보류) 
router.get("/islogin", authMiddleware, async (req, res) => {
    const {user} = res.locals;
    res.send({
        user,
    });
});



// 회원가입
router.post("/signup", async (req, res) => {
    const { userId, nickName, password, passwordCheck } = req.body

    // //비밀번호 암호화 (작동됨) 
    // const hashedpassword = CryptoJS.AES.encrypt(password, process.env.keyForDecrypt).toString();

    const user = new User({ userId, nickName, hashedpassword})
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




module.exports = router;