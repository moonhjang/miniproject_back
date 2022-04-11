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
    const user = await User.findOne({userId}).exec();
    console.log(user.friendList)

    

});


// follows 추가하기
router.patch('/searchfollow', async (req,res)=>{
    const {userId, friendId} = req.body;
    const user = await User.findOne({userId})

    for (let i=0; i< user.friendList.length; i++){
        
        if(user.friendList[i] === friendId){
            return res.status(400).send({msg:'이미 추가된 친구입니다.'})
        } else {
            user.friendList = [friendId]
            await user.save()

            return res.status(200).send({msg:'완료1'}); 
        } 
    }

    if (user.friendList.length === 0){
        user.friendList = [friendId]
        console.log(friendId)
        await user.save()
        return res.status(200).send({msg:'완료2'}); 
    }
});







// follows 찾기
router.get('/searchfollow',async (req,res)=>{
    // const {userId} = req.body;
    // const token = req.headers.cookie.split('=')[1];
    let userId = req.params.user
    const user = await User.find({})
    

});


//작업중
router.post('/searchFollow',async (req,res)=>{
    const {userId} = req.body;
    const token = req.headers.cookie.split('=')[1];
});



//테스트
// router.post('/addinfo', async(req,res)=>{
    


//     const {userId,nickname,password,startTime,totalTime,connecting,friendList} = req.body
//     console.log({userId,nickname,password,startTime,totalTime,connecting,friendList})
//     await User.create({userId,nickname,password,startTime,totalTime,connecting,friendList})
//     return res.status(200).send({msg:"완료!"});
// })


// StartTime
router.post('/:userId/start',async(req,res)=>{
    const {userId} = req.body;

    const startTime = new moment().format('YYYY-MM-DD HH:mm');
    
    console.log(startTime)
    
    await User.updateOne({userId},{$set:{startTime:startTime,connecting:true}});
    return res.status(200).send({msg:"완료!"});
   
})
// moment 상태로 데이터에 집어넣고 나중에 .format이용하면?


// EndTime  (확인필요)
router.post('/:userId/end', async(req,res)=>{
    const {userId} = req.body;
    const startTime = await User.find({userId}).startTime;
    const endTime = new moment();
    const todayTime = moment.duration(endTime.diff(startTime)).asHours()
    const userInfo = await User.find({userId})
    // accum type : 누적시간 분으로 환산한 number 
    const totalTime = userInfo.totalTime + todayTime
    // accum활용
    // let hours = parseInt(accum/60);
    // let minutes = accum % 60
    // let accumTime = `${hours}시간 ${minutes}분`
    
    await User.updateOne({userId},{$set:{totalTime:totalTime}});
    
})


module.exports = router;




// checkin
// {userid, startTime}
// db의 userinfo에 checkin time 기록,(array로 추가해서 새로운 array 만든다, slice(-7,0)  or 단순 업데이트 숫자만 변경)
// db의 userinfo checkout time 초기화, 
// 어제의 공부시간기록 누적시간 = checkOutTime - checkInTime