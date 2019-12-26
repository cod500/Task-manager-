require('../src/db/mongoose')
const User = require('../src/models/users');
const Task = require('../src/models/tasks')

//5d93c20baa54834b18bcb357
//5d93c20baa54834b18bcb357

User.findByIdAndUpdate('5d93c2695a7a954f2079fb3a', {age: 1}).then((user) =>{
    console.log(user)
    return User.countDocuments({age: 1})

}).then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})

const countComplete = async (_id) =>{
    await Task.findOneAndDelete(_id);

    return Task.countDocuments({completed:false})
}

countComplete('5d92acd9228ace1a44e68ab7').then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})