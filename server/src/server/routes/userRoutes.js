const express = require('express');
const mongoose = require('../controllers/mongoose');

// express.Router로 접근할 수 있는 router 설정
const router = express.Router();

// router.get('/get', async (req, res, next)=>{
//     const getUser = mongoose.getUser;
//     const user = await getUser.find().exec();
//     res.json({ user })
// })

// router.get('/get/:id', (req, res, next)=>{
//     const id = req.params.id;
//     const getUser = mongoose.getUser;
//     const user = getUser.find(u => {
//         return u.id === id;
//     })
//     res.json({user : user})
// })

router.get('/get', mongoose.getUser);

router.get('/get/:id', mongoose.getUserByIdx);

router.post('/post', mongoose.createUser);

router.patch('/patch/:id', mongoose.patchUser);

router.put('/put/:id', mongoose.putUser);

router.delete('/delete/:id', mongoose.deleteUser);

// router.patch('/patch', (req, res, next)=>{
//     console.log('patch');
//     res.json({message: 'success!'})
// })

module.exports = router;