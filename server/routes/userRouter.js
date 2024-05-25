const express =require('express')
const router=express.Router();

const {
    getUser,
    changeAvatar,
    editUser,
    getAuthor,
    register,
    loginUser
}=require('../controllers/userControllers')
const authMidleware=require('../midllewaers/authMidleware')

router.get('/:id',getUser)
router.post('/register',register)
router.post('/login',loginUser)

router.post('/change-avater',authMidleware,changeAvatar)

router.patch('/edit-user',authMidleware,editUser)

router.get('/',getAuthor)

module.exports=router;