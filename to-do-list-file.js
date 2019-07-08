const express=require('express')
const fs= require('fs')
const app=express()
let todo=[]

function towritetodo()
{ data=JSON.stringify(todo)
    fs.writeFile('./to-do.txt', data, (err)=>
   { if (err)
    return console.log(err)
    return console.log("")
   })
}

function toreadtodo()
{
    fs.readFile('./to-do.txt', 'utf8', (err,data)=> {
    if (err)
    return console.log(err)
    let content=data
    todo=JSON.parse(content)
     console.log(todo)   
    })
    return todo
}

console.log(todo)
app.get('/',(req,res)=>{
    const temp= toreadtodo();
    res.send(temp);
})

app.listen(3000)