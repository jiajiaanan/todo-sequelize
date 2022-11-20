const express = require('express')
const router = express.Router()

// 引用 model
const db = require('../../models')
const Todo = db.Todo
const User = db.User

//new page
router.get('/new', (req, res) => {
  return res.render('new')
})

//Read : detail page
router.get('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where:{ userId , id }
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  return Todo.findOne({
    where:{ userId , id }
  })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

//Create
router.post('/', (req, res) => {
  const userId = req.user.id
  const name = req.body.name

  return Todo.create({ name: name, UserId: userId })     // 整份資料存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//Update
router.put('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findOne({
    where:{ id , userId }
  })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//Delete功能
router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const id = req.params.id

  return Todo.findOne({
    where :{id , userId}
  })
    .then(todo => todo.destroy()) //刪除該筆資料
    .then(() => res.redirect('/')) //導向根目錄頁
    .catch(error => console.log(error))
})

module.exports = router