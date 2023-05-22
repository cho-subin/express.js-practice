
// const { application } = require('express')
const express = require('express') // express.js 가져온다
const app = express() // express 서버 생성
const PORT = process.env.PORT || 4000 // PORT번호 4000에 할당
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const mongoose = require('mongoose'); //mongoose를 import

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const db = mongoose.connection;
// error 이벤트가 발생할 때마다 콜백함수가 호출됨을 의미한다.
db.on('error', console.error.bind(console, 'connection error'));
// 이벤트가 한 번만 호출됨을 의미하며, mongodb에 대한 연결이 열려 있을 때, 즉 연결이 성공하면 콜백함수가 호출된다.
db.once('open', function callback() {
    console.log("mongo db is connected");
});

// 서버가 요청 처리하는곳
app.get('/api/get/person',(req,res)=>{
    // console.log('server:/api/get/person')
    res.send({person_res:'success!'})
})

app.get('/api/get/one/:name&:age', (req, res) => {
    console.log(req.params)
    const name = req.params.name
    const age = req.params.age
    res.send({ name: `${name}`, age: `${age}` })
})

app.post('/api/post/one/:name&:age',(req,res)=>{
    console.log(req.body) // request body
    // {name:'subin', age:29}
    const name = req.params.name
    const age = req.params.age
    res.send({ success: `post ${name} & ${age}` })
})

// put은 전체 수정
app.put('/api/put/one/:name',(req,res)=>{
    console.log(req.params)
    console.log(req.body)
    console.log(req.params.name)
    console.log(req.body.age)

    const name = req.params.name
    const age = req.body.age
    res.send({ success: `put ${name} & ${age}` })
})

// patch는 부분 수정
app.patch('/api/patch/one/:name',(req,res)=>{
    console.log(req.params)
    console.log(req.body)
    console.log(req.body.age)

    const age = req.body.age
    res.send({ success: `patch ${age}` })
})

app.delete('/api/delete/one/:name',(req,res)=>{
    console.log(req.params)

    const name = req.params.name
    res.send({ success: `delete ${name}` })
})



// listen은 서버의 대기상태 (TCP/IP 통신의 과정중에 있는 함수)
app.listen(PORT,()=>{
    console.log(`Server On: http://localhost:${PORT}`)
})