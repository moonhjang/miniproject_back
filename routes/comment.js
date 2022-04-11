const express = require("express");
const Comments = require("../schemas/comments");
const router = express.Router();


// Comment조회: 클라이언트에 보내기
router.get('/:user/comments', async (req, res) => {

    let userId = req.params.user
    const comment = await Comments.find({userId}).exec();
    // console.log(comment)
    res.json(comment);
    
});

// Comment추가
router.post('/:user/comments', async (req, res) => {
    const{ writer, content, Date, userId} = req.body

    await Comments.create({writer, content, Date, userId})
    return res.status(200).send({ });
});


// Comment삭제 (심심해서..테스트..)
router.delete('/:user/comments', async (req, res) => {
    const{ commentId, userId} = req.body
    console.log({commentId})
    console.log(req.body,'<<<<<')
    const comment = await Comments.findOne({_id: commentId}).exec();
    const theOne = await Comments.find({userId}).exec();

    console.log(comment._id)
    console.log(theOne)

    // await Comments.delete({writer, content, Date, userId})
    return res.status(200).send({msg: '완료' });
});




module.exports = router;