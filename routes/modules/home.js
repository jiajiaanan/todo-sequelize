// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 model
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
  const userId = req.user.id
  
  return Todo.findAll({
    raw: true,
    nest: true,
    where:{ UserId: userId },
    sort: { id: 'asc' }
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

// 匯出路由模組
module.exports = router



