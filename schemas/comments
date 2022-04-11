const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
    writer: String,
    content: String,
    Date: String,
    userId: String,
    // 수정된 부분: date: date, userId: userID로 된 부분 value 값 string으로 수정
});


module.exports = mongoose.model('Comments', comment_schema);