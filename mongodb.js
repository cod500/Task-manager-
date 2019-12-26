// CRUD create read update delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

// const id = new ObjectID(); 
// console.log(id);
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if(error){
        return console.log('Unable to connect to database')
    }

    // const db = client.db(databaseName);

    // db.collection('tasks').deleteOne({
    //     description: 'workout'
    // }).then((result) =>{
    //     console.log(result.deletedCount)
    // }).catch((error) =>{
    //     console.log(error)
    // })

})


