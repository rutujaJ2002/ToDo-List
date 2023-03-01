
const todoInput = document.querySelector('.taskip');
const todoBtn = document.querySelector('.todobtn');
const todoList =document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click",deleteCheck);
filterTodo.addEventListener("change", filteredTodo);

//to save new task item
function saveLocalTodos(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }
    else{
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//to get all task items
function getLocalTodos(){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("todo");
        const newTask = document.createElement("li");
        newTask.innerText =task;
        newTask.classList.add("todo-item");
        taskDiv.appendChild(newTask);

        const compltedBtn =  document.createElement("button");
        compltedBtn.innerHTML ='<i class="fas fa-check-circle"></i>';
        compltedBtn.classList.add("completebtn");
        taskDiv.appendChild(compltedBtn);

        const trashBtn =  document.createElement("button");
        trashBtn.innerHTML ='<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trashbtn");
        taskDiv.appendChild(trashBtn);

        todoList.appendChild(taskDiv);

    });
}

//to display added task in list
function addTodo(event){
    event.preventDefault();
    const taskDiv =document.createElement("div");
    taskDiv.classList.add("todo");
    const newTask =document.createElement("li");
    newTask.innerText = todoInput.value;
    newTask.classList.add("todo-item");
    taskDiv.appendChild(newTask);
    saveLocalTodos(todoInput.value);

    const compltedBtn =  document.createElement("button");
    compltedBtn.innerHTML ='<i class="fas fa-check-circle"></i>';
    compltedBtn.classList.add("completebtn");
    taskDiv.appendChild(compltedBtn);

    const trashBtn =  document.createElement("button");
    trashBtn.innerHTML ='<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trashbtn");
    taskDiv.appendChild(trashBtn);    

    todoList.appendChild(taskDiv);
    todoInput.value="";
}

//confirm before deleting task
function deleteCheck(e){
    const item=e.target;
    if(item.classList[0]=="trashbtn"){
        const task=item.parentElement;
        task.classList.add("slide");
        removeLocalTodos(task);
        task.addEventListener("transitioned", function(){
            task.remove();
        });
    }

    if(item.classList[0]=="completebtn"){
        const task= item.parentElement;
        task.classList.toggle("completed");
    }
}

//to remove local items
function removeLocalTodos(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }
    else{
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }

    const taskIndex= task.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex),1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

