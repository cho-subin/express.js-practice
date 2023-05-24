const mongoose = require('mongoose'); //mongoose 불러오기
const UserModel = require('./models/user'); // user 모델+스키마 불러오기

// mongoose는 connect() 메소드 하나만 필요
// connect()에 전달하면 백엔드와 mongoDB 데이터베이스 사이의 모든 연결을 관리해준다.
mongoose.connect('mongodb+srv://new-user-01:U9frWWQHqNGCK7gA@cluster0.n8xt0zq.mongodb.net/user_test?retryWrites=true&w=majority'
).then(()=>{
    console.log('데이터베이스 연결 성공!')
}).catch(()=>{
    console.log('데이터베이스 연결 실패!')
})

const createUser = async(req, res, next) => {
    const createdUser = new UserModel({
        name: req.body.name,
        age: req.body.age,
    })
    // save(): mongoose에서 생성한 모델과 스키마에 연결해서 사용가능,
    // 그리고 무거운 작업들을 모두 수행할 수 있는 큰 장점이 있다.
    const result = await createdUser.save();

    res.json(result);
}

exports.createUser = createUser;