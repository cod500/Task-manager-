const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const jwt = require('jsonwebtoken')

const app = express();
// use heroku port or localhost
const port = process.env.PORT;

//for express to read json data 
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//express server running
app.listen(port, () =>{
    console.log('Listening on port ' + port)
})