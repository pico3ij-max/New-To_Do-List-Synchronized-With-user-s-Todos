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
const sortitems = document.querySelectorAll(".bysort");


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

    if (usertodo.length) {
            const newTodo = {
            id: Math.floor(Math.random() * 9999),
            todotitle: usertodo,
            isComplete: false,
            color: `rgb(${todocolor})`,
            bgcolor: `rgb(${todobgcolor})`,
        }
        usertodos.push(newTodo);


        setToLocal(usertodos);
        ShowinDom(usertodos);

        hidetodo();
        writeTodo.value = ``;
    } else {
        shownothing();
    }
}

addtodo.addEventListener("click" , GetTodo);

function setToLocal(todolist) {
    localStorage.setItem("TODOS" , JSON.stringify(todolist));
}

function Gettodosfromlocalstorage() {
    const todolist = JSON.parse(localStorage.getItem("TODOS"));

    if (todolist) {
        ShowinDom(todolist);
        usertodos = todolist;
        sortbydefault();
    }
}

function ShowinDom(todos) { // * Function fortest(Parameter , Parameter)  &  fortest(Arguments);
    TodosContainer.innerHTML = ``;

        todos.forEach(function (usertodo , index) {
        TodosContainer.insertAdjacentHTML("beforeend" ,
            `
            <article>
                <section>
                    <span>${index+1}. </span>
                    <p style="background-color:${usertodo.bgcolor}; color:${usertodo.color};">${usertodo.todotitle}</p>
                </section>
                <section>
                    <button type="button" class="btn delete" onclick="removeTodo(${usertodo.id})">Remove</button>
                    <button type="button" class="btn isitComplete" onclick="DoneTodos(${usertodo.id})">${usertodo.isComplete ? "DONE" : "Done ?"}</button>
                </section>
            </article>
            `
        )
    });
}


// ! Delete Todo
function removeTodo(todoid) {
    const todoindex = usertodos.findIndex(function (Todoindex) {
        return Todoindex.id === todoid;
    });

    usertodos.splice(todoindex , 1);
    ShowinDom(usertodos);
    setToLocal(usertodos);
}

// ! Done Todo
function DoneTodos(todoid) {
    const findtodowithid = usertodos.find(function (Todoindex) {
        return Todoindex.id === todoid;
    });

    const todo = findtodowithid;
    
    if (todo.isComplete) {
        todo.isComplete = false;

        ShowinDom(usertodos);
        setToLocal(usertodos);
    } else {
        todo.isComplete = true;

        ShowinDom(usertodos);
        setToLocal(usertodos);
    }
}

// ! Sort by User
let showlastsortbyusers;
function sortbyuser(event) {
    const usersort = event.target.dataset.value;
    let showlastsortbyusers;

    document.querySelector(".sort").firstElementChild.innerHTML = `${usersort}`;
    localStorage.setItem("sortbydefaultname" , usersort);

    switch(usersort) {
        case "Complete" : {
            const completetodo = usertodos.filter(function (usertodo) {
                return usertodo.isComplete === true;
            });

            showlastsortbyusers = completetodo;
            ShowinDom(completetodo);

            break;
        }
        case "Incomplete" : {
            const Incompletetodo = usertodos.filter(function (usertodo) {
                return usertodo.isComplete === false;
            });

            showlastsortbyusers = Incompletetodo;
            ShowinDom(Incompletetodo);

            break;
        }
        default : {
            ShowinDom(usertodos);
            showlastsortbyusers = usertodos;
        }
    }

    localStorage.setItem("lasttodosbyuser" , JSON.stringify(showlastsortbyusers));
}
sortitems.forEach(function (sort) {
    sort.addEventListener("click" , sortbyuser);
});


function sortbydefault() {
    const lastusersort = localStorage.getItem("sortbydefaultname");
    const lasttodosuser = JSON.parse(localStorage.getItem("lasttodosbyuser"));
    

    document.querySelector(".sort").firstElementChild.innerHTML = `${lastusersort}`;

    ShowinDom(lasttodosuser);
}
