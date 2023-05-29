
// const { application } = require('express')
const express = require('express'); // express.js 가져온다
const app = express(); // express 서버 생성
const PORT = process.env.PORT || 4000; // PORT번호 4000에 할당

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('mongoose'); //mongoose 불러오기
const userRouter = require('./routes/userRoutes');
app.use('/users',userRouter); //라우트도 미들웨어로 추가됨


// mongoose는 connect() 메소드 하나만 필요
// connect()에 전달하면 백엔드와 mongoDB 데이터베이스 사이의 모든 연결을 관리해준다.
mongoose.connect('mongodb+srv://new-user-01:U9frWWQHqNGCK7gA@cluster0.n8xt0zq.mongodb.net/user_test?retryWrites=true&w=majority'
).then(() => {
    // listen은 서버의 대기상태 (TCP/IP 통신의 과정중에 있는 함수)
    app.listen(PORT, () => {
        console.log(`Server On: http://localhost:${PORT}`)
    })
    console.log('데이터베이스 연결 성공!')
}).catch(() => {
    console.log('데이터베이스 연결 실패!')
})

// const db = mongoose.connection;
// // error 이벤트가 발생할 때마다 콜백함수가 호출됨을 의미한다.
// db.on('error', console.error.bind(console, 'connection error'));
// // 이벤트가 한 번만 호출됨을 의미하며, mongodb에 대한 연결이 열려 있을 때, 즉 연결이 성공하면 콜백함수가 호출된다.
// db.once('open', function callback() {
//     console.log("mongo db is connected");
// });