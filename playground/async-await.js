const add = (a,b) =>{
    return new Promise ((resolve, reject) =>{
        setTimeout(() =>{
            resolve(a + b)
        },2000)
    })
}


const doAwait = async () =>{
       return await add(1,3);

}

doAwait().then((result) =>{
    console.log(result)
}).catch((e) =>{
    console.log(e)
})