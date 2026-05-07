document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
        alert("Usuário não encontrado");
        window.location.href = "https://pluck-qebe.onrender.com/login/login.html";
        return;    
    }

    document.getElementById("btnCriarGrupo")
    .addEventListener("click", criarGrupo);

    document.getElementById("btnEntrarGrupo")
    .addEventListener("click", entrarGrupo);

    try{
        const response = await fetch(`https://pluck-qebe.onrender.com/tasks/user/${user.id}`);
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
        taskElement.innerHTML = `
            <strong>${task.title}</strong><br>
            <small>${task.description || "Sem descrição" }</small><br>
            <span>👤 ${task.user?.name || "Sem Responsável"}</span>
            <span>👥 ${task.group?.name || "Sem grupo"}</span>
            <button onclick="deleteTask(${task.id})"> Excluir</button>
        `;

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
        const response = await fetch("https://pluck-qebe.onrender.com/tasks", {
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
async function criarGrupo() {
   
    const name = prompt("Nome do grupo:");
    if(!name) return;

    try{
     const response = await fetch("https://pluck-qebe.onrender.com/groups",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
    body: JSON.stringify({ name: name })
    });
 
    if (!response.ok) throw new Error();
    alert("Grupo criado!");
    }catch {
    alert("Erro ao criar grupo");
    }
    

}

async function entrarGrupo() {
    const groupId = prompt("Id do grupo:");
    if (!groupId) return;

    const user = JSON.parse(localStorage.getItem("user"));

    try {
        const response = await fetch(`https://pluck-qebe.onrender.com/users/${user.id}/group`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Number(groupId)
            })
        });

        if (!response.ok) throw new Error();

        alert("Entrou no grupo!");
        location.reload();

    } catch {
        alert("Erro ao entrar no grupo");
        }
    }
//Deletes

//Deletar Tarefas
    async function deleteTask(taskId) {
        await fetch(`https://pluck-qebe.onrender.com/tasks/${taskId}`, {
            method: "DELETE"
        });

        alert("Tarefa excluida");
        localtion.reload();
    }

// Deletar Usuário
async function deleteUser(userId) {
    await fetch(`https://pluck-qebe.onrender.com/users/${userId}`, {
        method: "DELETE"
    });
    alert("Usuário excluido");
}
// Deletar Grupo
async function deleteGroup(groupId) {
    await fetch(`https://pluck-qebe.onrender.com/groups/${groupId}`, {
        method: "DELETE"
    });
alert("Grupo Excluido");
localtion.reload();

}
