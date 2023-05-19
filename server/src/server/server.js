
// const { application } = require('express')
const express = require('express') // express.js 가져온다
const app = express() // express 서버 생성
const PORT = process.env.PORT || 4000 // PORT번호 4000에 할당
const bodyParser = require('body-parser')
app.use(bodyParser.json())

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

app.post('/api/post/one',(req,res)=>{
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
app.patch('/api/patch/one:name',(req,res)=>{
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