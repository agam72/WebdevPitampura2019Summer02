function f1(){
var a = document.getElementById("in").value;



document.getElementById("list").innerHTML+="<li class='none' onclick='f2(this)'>"+a+"</li>" ;
} 
function f2(id)
{    if(id.className=== "line")
{
    id.setAttribute("class","none");
} else
    {id.setAttribute("class","line");}
}     
function f3()
{var elements = document.getElementsByClassName('line');
for(var i=0; i<elements.length; i++) { 
  elements[i].style.display='none';
}
}
    

    
   

