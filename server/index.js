const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const authRoute = require('./routes/auth')
const booksRoute = require('./routes/books')
const loansRoute = require('./routes/loans')
const { fail } = require('assert')

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false },
    () => {
        console.log('Connected to DB')
    });


//Middleware 
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors())
// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/books', booksRoute)
app.use('/api/loans', loansRoute)


server.listen(PORT, () => {
    console.log('Server up and running')
})
