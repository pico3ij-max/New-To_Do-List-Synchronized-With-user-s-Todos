const AddTodo = document.querySelector(".AddTodo");
const writeTodo = document.querySelector("#write-Todo");
const addtodo = document.querySelector(".addtodo");
const back = document.querySelector(".cancel");
const deletetodo = document.querySelectorAll(".delete");
const overlay = document.querySelector(".overlay");
const forclose = document.querySelector(".for-close");
const colors = document.querySelector(".colors").querySelectorAll("span");
const bgcolors = document.querySelector(".bgcolors").querySelectorAll("span");
const TodosContainer = document.querySelector(".todolist-container");


let usertodos = [];


// ! Show And Hide Todo 🐵
function showtodo() {
    overlay.classList.remove("hide");
    writeTodo.focus();
}
function hidetodo() {
    overlay.classList.add("hide");
}
function Hditodo(event) {
    if (event.key === "Escape") {
        hidetodo();
    }
}

AddTodo.addEventListener("click" , showtodo);
document.body.addEventListener("keydown" , Hditodo);
back.addEventListener("click" , hidetodo);
forclose.addEventListener("click" , hidetodo);

// ! Appearance 😍
let todocolor = 0;
let todobgcolor = 0;
function getDataColors() {
    const colors = document.querySelector(".colors").querySelectorAll("span");
    const bgcolors = document.querySelector(".bgcolors").querySelectorAll("span");

    colors.forEach(function (getcolor) {
        const dataofcolor = getcolor.dataset.color;
        
        getcolor.style.backgroundColor = `rgb(${dataofcolor})`;

        getcolor.addEventListener("click" , function () {
            todocolor = getcolor.dataset.color; 
        });
    });

    bgcolors.forEach(function (datacolor) {
        const getdatacolor = datacolor.dataset.bgcolor;
        
        datacolor.style.backgroundColor = `rgb(${getdatacolor})`;

        datacolor.addEventListener("click" , function () {
            todobgcolor = datacolor.dataset.bgcolor; 
        });
    });

}

// ! Todo Logic 🔥
function GetTodo() {
    const usertodo = writeTodo.value;

    if (usertodo.length > 0) {
            const newTodo = {
            id: Math.floor(Math.random() * 9999),
            todotitle: usertodo,
            isComplete: false,
            color: `rgb(${todocolor})`,
            bgcolor: `rgb(${todobgcolor})`,
        }
        usertodos.push(newTodo);


        setToLocal(usertodos);
        ShowinDom();


        hidetodo();
        writeTodo.value = ``;
    } else {
        if (String(usertodo).includes("" , 0)) {
            shownothing();
        } else {
            shownothing();
        }
    }
}

function setToLocal(todolist) {
    localStorage.setItem("TODOS" , JSON.stringify(todolist));
}

function Gettodosfromlocalstorage() {
    const todolist = JSON.parse(localStorage.getItem("TODOS"));

    if (todolist) {
        usertodos = todolist;
        ShowinDom();
    }
}

function ShowinDom() {
    TodosContainer.innerHTML = ``;

        usertodos.forEach(function (usertodo , index) {
        TodosContainer.insertAdjacentHTML("beforeend" ,
            `
            <article>
                <section>
                    <span>${index+1}. </span>
                    <p style="background-color:${usertodo.bgcolor}; color:${usertodo.color};">${usertodo.todotitle}</p>
                </section>
                <section>
                    <button type="button" class="btn delete" onclick="deletethis(${usertodo.id})">Remove</button>
                    <button type="button" class="btn isitComplete" onclick="message(${index})">${usertodo.isComplete ? "DONE ✅" : "Done ?"}</button>
                </section>
            </article>
            `
        )
    });
}


// ! Remove Todo ⛔️
function deletethis(todoId) {

    const findtodo = usertodos.findIndex(function (findtodowithsameId) {
        return findtodowithsameId.id === todoId;
    });

    usertodos.splice(findtodo, 1);
    
    ShowinDom();
    setToLocal(usertodos);
}

// ! Show Success Message ✅
function message(index) {
    const findtodo = usertodos[index];

    if (findtodo.isComplete) {
        findtodo.isComplete = false;
        
        setToLocal(usertodos);
        ShowinDom();
    } else {
        findtodo.isComplete = true;

        setToLocal(usertodos);
        ShowinDom();
    }
}


// ! Show Nothing 😶‍🌫️
function shownothing() {
    hidetodo();
    ShowinDom();
}

addtodo.addEventListener("click" , GetTodo);