const express = require('express')
const {createTodo,getTodos,updateTodo,deleteTodo} = require('../controllers/todo.controller')
const authenticateToken = require('../middleware/authMiddleware')



const router = express.Router()

router.post('/createtodo',authenticateToken,createTodo)
router.get('/getTodos',authenticateToken,getTodos)
router.put('/:id',authenticateToken,updateTodo)
router.delete('/:id',authenticateToken,deleteTodo)







module.exports = router