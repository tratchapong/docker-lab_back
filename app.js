require('dotenv').config()
const notFound = require('./midlewares/notFound')

const express = require('express')
const app = express()

const todo = [
    {id: 11, title: 'HTML'},
    {id: 22, title: 'CSS'},
    {id: 33, title: 'Javascript'},
]   

// ==> /todo?title=javascript
// res.send 
// {id: 33, title: 'Javascript'}
// ถ้าไม่มีข้อมูลนั้นให้ส่ง 
// {msg: 'not found!!'}

app.use(express.json())
// app.use(express.urlencoded())

app.get('/todo', (req,res) => {
    const {title} = req.query
    if(!title) {
        return res.send(todo)
    }
    let rs = todo.find(el => el.title.toLowerCase().includes(title.toLowerCase()))
    res.send( rs || {msg: 'data not found!!'} )
})

//  /todo/2 ให้ res.send todo ตัวที่ 2 ออกมา
// {id: 2, title: 'CSS'}

app.get('/todo/:id', (req,res) => {
    const {id} = req.params
    let rs = todo.find(el => el.id === +id)
    console.log(rs)
    res.send(rs || {msg: 'data not found!!'})
})



app.post('/todo', (req, res) => {
    const {id, title} = req.body
    // console.log(req.body)
    todo.push({id: id, title: title})
    console.log(todo)
    res.send(todo)
})

// not found middleware
app.use(notFound)

const port = process.env.PORT || 8000
app.listen(port, ()=> console.log(`Server on ${port}`))