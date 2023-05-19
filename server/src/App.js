import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [person,setPerson] = useState()

  console.log('person',person)

  const request1 = async() => {
    alert('요청')
    const res = await axios.get('/api/get/person')
    console.log(res)
  }

  const request2 = async () => {
    alert('요청')
    const res = await axios.get(`/api/get/one/${'subin'}&${29}`)
    console.log(res)
    setPerson(res.data)
  }

  const request3 = async () => {
    alert('요청')
    const personObj = { name: 'subin', age: 29 }
    // 클라이언트 측에서 post 또는 put의 body에 담아 보내는 값을 서버 내에서 해석 가능한 형태로 변형해줘야 사용 가능하다.
    // 이때 필요한게 bodyParser(미들웨어), API 요청에서 받은 body 값을 파싱하는 역할을 수행해준다.
    const res = await axios.post(`/api/post/one/`, personObj)
    console.log(res)
  }

  const request4 = async () => {
    alert('요청')
    const personObj = {age:27}
    // 클라이언트 측에서 post 또는 put의 body에 담아 보내는 값을 서버 내에서 해석 가능한 형태로 변형해줘야 사용 가능하다.
    // 이때 필요한게 bodyParser(미들웨어), API 요청에서 받은 body 값을 파싱하는 역할을 수행해준다.
    const res = await axios.put(`/api/put/one/${'yoonyoung'}`, personObj)
    console.log(res)
  }

  const request5 = async () => {
    alert('요청')
    const personObj = {age:25}
    const res = await axios.patch(`/api/patch/one/${'yoonyoung'}`, personObj)
    console.log(res)
  }
  
  // 실제로 data 삭제할때는 data의 idx같은 중복이 되지않는 것을 params에 넣어야 함.
  const request6 = async () => {
    alert('요청')
    const res = await axios.delete(`/api/delete/one/${'yoonyoung'}`)
    console.log(res)
  }
  
  

  return (
    <div className="App">
      <button onClick={() => request1() }>/api/get/person</button>
      <button onClick={() => request2()}>/api/get/one:name&:age</button>
      <button onClick={() => request3()}>/api/post/one:name&:age</button>
      <button onClick={() => request4()}>/api/put/one:name&:age</button>
      <button onClick={() => request5()}>/api/patch/one:age</button>
      <button onClick={() => request6()}>/api/delete/one:name&:age</button>
    </div>
  );
}

export default App;
