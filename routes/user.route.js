const express = require('express')
const {registerUser,loginUser,logoutUser} = require('../controllers/user.controller')
const authenticateToken = require('../middleware/authMiddleware')



const router = express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/:id')

router.post('/logout',authenticateToken,logoutUser)





module.exports = router