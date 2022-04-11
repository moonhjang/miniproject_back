const express = require("express");
const Comments = require("../schemas/comments");
const router = express.Router();


// Comment조회: 클라이언트에 보내기
router.get('/:user/comments', async (req, res) => {
    
    let userId = req.params.user
    const comment = await Comments.findOne({userId}).exec();
    res.json(comment);
    
});

// Comment추가
router.post('/:user/comments', async (req, res) => {
    const{ writer, content, Date, userId} = req.body

    console.log(req.body);

    await Comments.create({writer, content, Date, userId})
    return response.status(200).send({ });
});




module.exports = router;