const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        required: false,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// const task2 = new Task({
//     description: 'Make dinner',
//     // completed:true
// })

// task2.save().then(() =>{
//     console.log(task2)
// }).catch((error) =>{
//     console.log(error)
// })

module.exports = Task;