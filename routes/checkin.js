const express = require("express");
const res = require("express/lib/response");
const User = require("../schemas/user");
const router = express.Router();
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/seoul")


// follows 전체조회
router.get('/:user/getfollows', async (req,res)=>{
    let userId = req.params.user

    const user = await User.findOne({userId});
    
   const friendsinfo = [];

    for (const friend of user.friendList){
        const info = await User.find({ userId :friend},    
            {_id:0, userId:1, nickName:1, startTime:1, totalTime:1, yesTime:1, connecting:1, friendList:1 })
            friendsinfo.push(info)
    }

    return res.status(201).json(friendsinfo);

});


// follows 찾기
router.get('/searchfollow',(req,res)=>{
    const {userId} = req.body;
    const token = req.headers.cookie.split('=')[1];
    const decoded = 1
});


// follows 추가하기
router.post('/searchfollow',async(req,res)=>{
    const {userId,friendId} = req.body;
    const existUser = await User.find({friendId});
    if(!existUser){
        return res.send({msg:"없는 유저입니다!"})
    }
    await User.updateOne({userId},{$addToSet:{friendList:`${friendId}`}})
    return res.send({msg:"추가완료"})
});



// StartTime 
router.post('/:userId/start',async(req,res)=>{
    const {userId} = req.body;

    const startTime = new moment().format('YYYY-MM-DD HH:mm');
    
    await User.updateOne({userId},{$set:{startTime:startTime,connecting:true}});

    return res.status(200).send({msg:"완료!"});
})



// EndTime 
router.post('/:userId/end', async(req,res)=>{
    const {userId} = req.body;
    const userInfo = await User.find({userId})
    // db에 있는 startTime 꺼내오기
    const startTimeIndb = userInfo[0].startTime
    // string타입인 startTime moment object로 바꿔주기
    const startTime = moment(startTimeIndb,'YYYY-MM-DD HH:mm');
    // endTime 생성
    const endTime = new moment();
    // 시간차 계산
    const todayTime = moment.duration(endTime.diff(startTime)).asMinutes()
   
    
     // type : 누적시간 분으로 환산한 number
     // 총시간 계산
    const totalTime = userInfo[0].totalTime + todayTime
    // totalTime 데이터 추가, connecting false
    await User.updateOne({userId},{$set:{totalTime:totalTime, connecting:false}});
    return res.send({msg:"체크아웃완료!"})
    
})



module.exports = router;
