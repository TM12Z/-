require('dotenv').config()
const  cors = require('cors')
const express = require('express')
const Router = require('./routes/index')
const sequelize = require('./db')
//const models = require('./models/models')
const PORT = process.env.PORT || 1234

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', Router)

app.get('/',(req, res) => {
    res.send('Main page')
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`start ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
