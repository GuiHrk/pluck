document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
        alert("Usuário não encontrado");
        window.location.href = "/login/login.html";
        return;    
    }

    try{
        const response = await fetch(`http://localhost:8080/tasks/user/${user.id}`);
        const tasks = await response.json();

        renderTasks(tasks);
        setupAddButtons(user);

    } catch (error){
        console.error("Erro ao carregar Tarefas:", error);
    }
});

function renderTasks(tasks) {

    const todo = document.querySelector("#todo .tasks-container");
    const doing =document.querySelector("#doing .tasks-container"); 
    const done = document.querySelector("#done .tasks-container");  

    todo.innerHTML = "";
    doing.innerHTML = "";
    done.innerHTML = "";

    tasks.forEach(task => {
       
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.setAttribute("draggable", "true");
        taskElement.innerText = task.title;

        const status = task.status?.toLowerCase();

        if(task.status === "Pendente"){
            todo.appendChild(taskElement);
        }
        else if(task.status === "Em Progresso"){
            doing.appendChild(taskElement);
        }
        else if(task.status === "Concluida"){
            done.appendChild(taskElement);
        }

    });
}

function setupAddButtons(user){
document.querySelectorAll(".add-btn").forEach(btn =>{
    btn.addEventListener("click", async () => {
        
        const title = prompt("Nome da tarefa:");
   
        if (!title) return;

        const description = prompt("Descrição da tarefa:");

        const status = prompt("Status (Pendente, Em Progresso, Concluida):" || "Pendente");

      try{ 
        const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            status: status,
            user: { id: user.id}
        })
    });
 
    if(!response.ok){
        throw new Error("Erro ao criar tarefa");
    }

   const newTask = await response.json();

   renderTasks([newTask]);

    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        alert("Erro ao criar tarefa");
      }
    });
  });
}