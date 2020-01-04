const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DATABASE, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>{
    console.log('mongodb connected')
})



