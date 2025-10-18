const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const serverless = require('serverless-http');
require('dotenv').config();

app.use(cors({
    origin: '*'
}));
app.use(express.json())

const topicRouter = require('../routes/topics')
app.use('/topics', topicRouter)

const studentRouter = require('../routes/students')
app.use('/students', studentRouter)


const initializeDBAndServer = () => {
    const PORT = 4001
    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`)
    })
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))
}
initializeDBAndServer()
module.exports = app;
module.exports.handler = serverless(app);
