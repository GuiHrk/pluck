const tasks = document.querySelectorAll(".task");
const columns = document.querySelectorAll(".column");

let dragged = null;
tasks.forEach(task => {
    task.addEventListener("dragstart", () => {
        dragged = task;
    });
});

columns.forEach(column => {

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("drop", () => {
        column.appendChild(dragged);
    });

});

document.querySelectorAll(".add-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        let text = prompt("Nome da tarefa:");

        if(text){

            let newTask = document.createElement("div");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.innerText = text;

            // reativar drag
            newTask.addEventListener("dragstart", () => {
                dragged = newTask;
            });

            btn.parentElement.insertBefore(newTask, btn);
        }

    });

});