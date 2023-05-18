
// const { application } = require('express')
const express = require('express') // express.js 가져온다
const app = express() // express 서버 생성
const PORT = process.env.PORT || 4000 // PORT번호 4000에 할당

// 서버가 요청 처리하는곳
app.get('/api/get/person',(req,res)=>{
    console.log('server:/api/get/person')
})

// listen은 서버의 대기상태 (TCP/IP 통신의 과정중에 있는 함수)
app.listen(PORT,()=>{
    console.log(`Server On: http://localhost:${PORT}`)
})