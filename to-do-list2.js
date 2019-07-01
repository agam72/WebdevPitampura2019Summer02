let todo=[]
todo= JSON.parse(localStorage.getItem("todo"))
paint()


const render=(state)=>{
    return state.reduce((acum,todo,index)=>{
        const string=todo.striked ? 'class= "striked"': ''
        return acum + `<li ${string} data-index="${index}" > ${todo.title} </li>`
    }, '')

    
}

const paint = function() {
    const html= render(todo)
    document.getElementById("list").innerHTML=html
}

document.getElementById("addbutton").addEventListener("click", e =>{
    const input=document.getElementById("in").value 
    document.getElementById("in").value =""
    todo.push({
        title: input,
        striked: false
    })
    paint()
    localStorage.removeItem("todo");
localStorage.setItem("todo", JSON.stringify(todo));
    
})

document.getElementById("list").addEventListener("click",e =>
{
    const index = e.target.dataset.index
    todo[index].striked=!todo[index].striked
    
    paint()
    localStorage.removeItem("todo");
localStorage.setItem("todo", JSON.stringify(todo));
})


document.getElementById("remove").addEventListener("click",e=>{
  todo=todo.filter(item=> !item.striked)
    paint()
    localStorage.removeItem("todo");
localStorage.setItem("todo", JSON.stringify(todo));
})


