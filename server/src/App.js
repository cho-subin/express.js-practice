import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

function App() {

  const [person,setPerson] = useState();
  const [personIdx,setPersonIdx] = useState();
  const [personIdx1, setPersonIdx1] = useState();

  // 새로 매길 idx
  let idx = () => {
    if (person?.length === undefined || person?.length === null) {
      setPersonIdx(0);
    }
    else{
      setPersonIdx(person?.length);
    }
  }
  
  // 기존 idx
  let idx1 = () => {
    if (person?.length === undefined || person?.length === null) {
      setPersonIdx1(0);
    }
    else{
      setPersonIdx1(person?.length-1);
    }
  }
  console.log('person',person)
  console.log('personIdx', personIdx)
  console.log('personIdx1', personIdx1)

  React.useEffect(()=>{
    idx();
    idx1();
  }, [person])

  const request1 = async() => {
    alert('요청')
    const res = await axios.get('/users/get')
    console.log(res)
    setPerson(res.data)
  }

  const request2 = async () => {
    alert('요청')
    const res = await axios.get(`/users/get/${1}`)
    console.log(res)
    setPerson(res.data)
  }
  
  const request21 = async () => {
    alert('요청')
    const res = await axios.get(`/users/get/${person[0]._id}`)
    console.log(res)
    setPerson([res.data.user])
  }

  const request3 = async () => {
    alert('요청')
    const personObj = { idx: personIdx, name: 'subin1', age: 27 }
    // 클라이언트 측에서 post 또는 put의 body에 담아 보내는 값을 서버 내에서 해석 가능한 형태로 변형해줘야 사용 가능하다.
    // 이때 필요한게 bodyParser(미들웨어), API 요청에서 받은 body 값을 파싱하는 역할을 수행해준다.
    const res = await axios.post('/users/post', personObj)
    console.log(res)
  }

  const request4 = async () => {
    alert('요청')
    const personObj = {age:27}
    // 클라이언트 측에서 post 또는 put의 body에 담아 보내는 값을 서버 내에서 해석 가능한 형태로 변형해줘야 사용 가능하다.
    // 이때 필요한게 bodyParser(미들웨어), API 요청에서 받은 body 값을 파싱하는 역할을 수행해준다.
    const res = await axios.put(`/users`, personObj)
    console.log(res)
  }

  const request5 = async () => {
    alert('요청')
    const personObj = {age:24}
    const res = await axios.patch(`/users/patch/${person[0]?._id}`, personObj)
    console.log(res)
  }
  
  // 실제로 data 삭제할때는 data의 idx같은 중복이 되지않는 것을 params에 넣어야 함.
  const request6 = async () => {
    alert('요청')
    const res = await axios.delete(`/users/delete/${person[0]?._id}`)
    console.log(res)
  }
  
  

  return (
    <div className="App">
      <button onClick={() => request1() }>/api/get/users</button>
      <button onClick={() => request2()}>/api/get/one:idx</button>
      <button onClick={() => request21()}>/api/get/:id</button>
      <button onClick={() => request3()}>/api/post/users</button>
      <button onClick={() => request4()}>/api/put/one:name&:age</button>
      <button onClick={() => request5()}>/api/patch/one:age</button>
      <button onClick={() => request6()}>/api/delete/:id</button>
      <div>
        {person?.map((item, idx)=>{
          return(
            <>
              <h1>name : {item?.name}</h1>
              <h1>age : {item?.age}</h1>
            </>
          )
        })}
      </div>
    </div>
  );
}

export default App;
