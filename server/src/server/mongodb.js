
const mongoose = require('mongoose');

module.exports = () => {
    function connect() {
        mongoose.connect('mongodb://localhost:27017', function (err) {
            if (err) {
                console.error('mongodb connection error', err);
            }
            console.log('mongodb connected');
        });
    }

    connect();
    getSchema();
    mongoose.connection.on('disconnected', connect);
    //require('./user.js'); // user.js는 나중에 만듭니다.

    function getSchema() {
        // Schema 생성. (혹시 스키마에 대한 개념이 없다면, 입력될 데이터의 타입이 정의된 DB 설계도 라고 생각하면 됩니다.)
        const student = mongoose.Schema({
            name: 'string',
            address: 'string',
            age: 'number'
        });

        // 정의된 스키마를 객체처럼 사용할 수 있도록 model() 함수로 컴파일
        const Student = mongoose.model('Schema', student);
        // Student 객체를 new 로 생성해서 값을 입력
        const newStudent = new Student({ name: 'Hong Gil Dong', address: '서울시 강남구 논현동', age: '22' });
        // 데이터 저장
        newStudent.save(function (error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log('Saved!', data)
            }
        });

        // Student 레퍼런스 전체 데이터 가져오기
        Student.find().then(function (error, students) {
            console.log('--- Read all ---');
            if (error) {
                console.log(error);
            } else {
                console.log(students);
            }
        })
    };
};