// const mongoose = require('mongoose'); //mongoose 불러오기
const UserModel = require('../models/user'); // user 모델+스키마 불러오기

const createUser = async(req, res, next) => {
    const createdUser = new UserModel({
        idx: req.body.idx,
        name: req.body.name,
        age: req.body.age,
    })
    // save(): mongoose에서 생성한 모델과 스키마에 연결해서 사용가능,
    // 그리고 무거운 작업들을 모두 수행할 수 있는 큰 장점이 있다.
    let result
    try{
        result = await createdUser.save();
    }
    catch (err){
        console.log(err);
        return next(err); // 오류가 생겼을때 코드 실행 중단.
    }
    res.json(result);
}

const getUser = async (req, res, next) => {
    let getUsers;

    try {
        getUsers = await UserModel.find().exec() // exec() : promiss로 반환하기위해 쓴다.
    }
    catch (err) {
        console.log(err);
        return next(err); // 오류가 생겼을때 코드 실행 중단.
    }

    res.json(getUsers);
}

const getUserByIdx = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        // user = await getUser.find(u => {
        //     return u.idx === idx;
        // });
        // findById() : mongoose 정적메소드, 장소 생성자 함수에 직접 사용됨. promiss를 반환하지 않는다.
        user = await UserModel.findById(id);
    }
    catch (err) {
        console.log(err);
        return next(err); // 오류가 생겼을때 코드 실행 중단.
    }

    if(!user){
        return next(console.log('해당 idx가 없습니다!'))
    }
    
    //getters: true -> _id 프로퍼티와 동일한 값을 가진 id 프로퍼티가 추가되게 된다.
    //그냥 _id로 접근하기 위해 false 걸어줌.
    res.json({user: user.toObject({getters: false})});
}

const updateUser = async (req, res, next) => {
    const id = req.params.id
    const age = req.body.age

    const result = await UserModel.updateOne({ id: id }, { $set: age });
    res.json(result);
}

const deleteUser = async (req, res, next) => {
    //1. findById()로 삭제할 컬렉션을 찾는다.
    //2. remove()로 삭제
    
    const id = req.params.id;

    let user;
    try {
        // user = await getUser.find(u => {
        //     return u.idx === idx;
        // });
        // findById() : mongoose 정적메소드, 장소 생성자 함수에 직접 사용됨. promiss를 반환하지 않는다.
        user = await UserModel.findById(id);
    }
    catch(err) {
        console.log('1',err);
        return next(err); // 오류가 생겼을때 코드 실행 중단.
    }

    try{
        await user.deleteOne();
    }
    catch(err){
        console.log(err);
        return next(err); // 오류가 생겼을때 코드 실행 중단.
    }

    //getters: true -> _id 프로퍼티와 동일한 값을 가진 id 프로퍼티가 추가되게 된다.
    //그냥 _id로 접근하기 위해 false 걸어줌.
    res.json({ message: '삭제되었습니다.' });
}

exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserByIdx = getUserByIdx;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;