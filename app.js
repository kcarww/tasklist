const storage = localStorage.getItem("todilist") || "[]";
const listToStorage = JSON.parse(storage);

const inputAdd = document.querySelector(".input-container input");
const btnAdd = document.querySelector(".btn-add");
const tasks = document.querySelector(".tasks");
let tasksList = listToStorage;



function changeTask(id) {
    const checkbox = document.getElementById(id);
    const newList = tasksList.map(item => {
        if(item.id === id) {
            item.checked = checkbox.checked;
        }
        return item;
    });
    tasksList = newList;
    populateTasks();
}
function deleteTask(id) {
    const newList = tasksList.filter(item => item.id !== id);
    tasksList = newList;
    populateTasks();
}

function populateTasks() {
    let taskItens = "";

    tasksList.forEach(item => {
        taskItens += `
        <li>
            <label for="${item.id}">
                <input onchange="changeTask('${item.id}')" type="checkbox" id="${item.id}" ${item.checked ? "checked" : ""}>
                <span>${item.name}</span>
            </label>
            <i class='bx bx-trash' onclick="deleteTask('${item.id}')"></i>
        </li>
        `
    });
    
    tasks.innerHTML = taskItens;
    localStorage.setItem("todilist", JSON.stringify(tasksList));
}


function addTaskToList() {
    const inputValue = inputAdd.value;
 
    if(inputValue) {
        const item = {
            id: crypto.randomUUID(),
            name: inputValue,
            checked: false
        }

        const isExists = tasksList.filter(item => item.name === inputValue);

        if(!isExists.length) {
            tasksList.push(item);
            inputAdd.style.border = "solid transparent 2px";
            inputAdd.value = "";
            populateTasks();
        } else {
            alert("Ooops! Essa tarefa já existe.")
        }
    } else {
        alert("O campo não deve ser vazio.");
    }

}


inputAdd.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        addTaskToList();
    }
})

btnAdd.addEventListener("click", addTaskToList);
populateTasks();