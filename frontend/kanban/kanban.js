// Criamos as variáveis no escopo global para que as funções criarGrupo e entrarGrupo consigam acessá-las
let bsModalCriarGrupo;
let bsModalEntrarGrupo;

document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
        alert("Usuário não encontrado");
        window.location.href = "https://pluck-woad.vercel.app/login/login.html";
        return;
    }

    // Inicializa as instâncias dos modais do Bootstrap de forma segura aqui dentro
    bsModalCriarGrupo = new bootstrap.Modal(document.getElementById('modalCriarGrupo'));
    bsModalEntrarGrupo = new bootstrap.Modal(document.getElementById('modalEntrarGrupo'));

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

    loadUserData();
    loadGroupData();

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
        taskElement.dataset.id = task.id;
        taskElement.setAttribute("draggable", "true");
        taskElement.innerHTML = `
            <strong>${task.title}</strong><br>
            <small>${task.description || "Sem descrição" }</small><br>
            <span>👤 ${task.user?.name || "Sem Responsável"}</span>
            <span>👥 ${task.group?.name || "Sem grupo"}</span>
            <button onclick="deleteTask(${task.id})"> Excluir</button>
        `;

        const status = task.status?.trim().toLowerCase();

        if(status === "pendente"){
            todo.appendChild(taskElement);
        }
        else if(status === "em progresso"){
            doing.appendChild(taskElement);
        }
        else if(status === "concluida"){
            done.appendChild(taskElement);
        }

        taskElement.addEventListener("dragstart", () => {
    taskElement.classList.add("dragging");
});

taskElement.addEventListener("dragend", () => {
    taskElement.classList.remove("dragging");
});

    });
}

document.querySelectorAll(".tasks-container").forEach(container => {

    container.addEventListener("dragover", e => {
        e.preventDefault();
    });

    container.addEventListener("drop", async e => {

        e.preventDefault();

        const dragging = document.querySelector(".dragging");

        if (!dragging) return;

        container.appendChild(dragging);

        const taskId = dragging.dataset.id;

        const columnId = container.parentElement.id;

        let newStatus = "Pendente";

        if (columnId === "doing") {
            newStatus = "Em Progresso";
        }

        else if (columnId === "done") {
            newStatus = "Concluida";
        }

        try {

            await fetch(`https://pluck-qebe.onrender.com/tasks/${taskId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });

        } catch(error){
            console.error("Erro ao atualizar status:", error);
        }

    });

});



function setupAddButtons(user) {
    // Instancia o modal do Bootstrap para podermos controlar via JS
    const modalElement = document.getElementById('modalCriarTarefa');
    const bsModal = new bootstrap.Modal(modalElement);

    document.querySelectorAll(".column").forEach(column => {
        const addBtn = column.querySelector(".add-btn");
        if (!addBtn) return;

        addBtn.addEventListener("click", () => {
            // Limpa o formulário antes de abrir
            document.getElementById("formCriarTarefa").reset();

            // Descobre o status baseado no ID da coluna onde o botão foi clicado
            const columnId = column.id; // 'todo', 'doing' ou 'done'
            let statusMapeado = "Pendente";

            if (columnId === "doing") statusMapeado = "Em Progresso";
            if (columnId === "done") statusMapeado = "Concluida";

            // Salva o status no input oculto do modal
            document.getElementById("taskStatusHidden").value = statusMapeado;

            // Abre o modal de forma elegante na tela
            bsModal.show();
        });
    });

    // Escuta o envio do formulário do modal
    const form = document.getElementById("formCriarTarefa");
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que a página recarregue do nada

        const title = document.getElementById("taskTitle").value;
        const description = document.getElementById("taskDesc").value;
        const status = document.getElementById("taskStatusHidden").value;

        if (!title) return;

        try {
            const response = await fetch("https://pluck-qebe.onrender.com/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    status: status,
                    user: { id: user.id }
                })
            });

            if (!response.ok) {
                throw new Error("Erro ao criar tarefa");
            }

            // Esconde o modal e atualiza a tela
            bsModal.hide();
            location.reload();

        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            alert("Erro ao criar tarefa");
        }
    }, { once: true }); // O { once: true } evita que o evento se duplique ao clicar várias vezes
}

async function criarGrupo() {
    // Agora a instância global bsModalCriarGrupo estará definida
    document.getElementById("formCriarGrupo").reset();
    bsModalCriarGrupo.show();
}

// Configura o evento do formulário de criar grupo
document.getElementById("formCriarGrupo").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("groupNameInput").value;
    if(!name) return;

    try {
        const response = await fetch("https://pluck-qebe.onrender.com/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: name })
        });

        if (!response.ok) throw new Error();

        bsModalCriarGrupo.hide();
        alert("Grupo criado com sucesso!");
        location.reload();
    } catch (error) {
        alert("Erro ao criar grupo");
    }
});

async function entrarGrupo() {
    // Agora a instância global bsModalEntrarGrupo estará definida
    document.getElementById("formEntrarGrupo").reset();
    bsModalEntrarGrupo.show();
}

// Configura o evento do formulário de entrar em um grupo
document.getElementById("formEntrarGrupo").addEventListener("submit", async (e) => {
    e.preventDefault();

    const groupId = document.getElementById("groupIdInput").value;
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

        const updateUser = await response.json();

        localStorage.setItem("user", JSON.stringify(updateUser));

        bsModalEntrarGrupo.hide();
        alert("Entrou no grupo com sucesso!");
        location.reload();

    } catch (error) {
        alert("Erro ao entrar no grupo");
    }
});

//Deletes
//Deletar Tarefas
async function deleteTask(taskId) {
    await fetch(`https://pluck-qebe.onrender.com/tasks/${taskId}`, {
        method: "DELETE"
    });

    alert("Tarefa excluida");
    location.reload();
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
    location.reload();
}

function loadUserData(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    document.querySelector("#userName").value = user.name || "Usuário sem nome";
    document.querySelector("#userEmail").value = user.email || "Usuário sem email";
}

async function loadGroupData () {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (!user || !user.group) return;
    document.querySelector("#groupName").value = user.group.name || "Sem grupo";
    document.querySelector("#groupDescription").value = user.group.description || "Sem descrição";
    document.querySelector("#groupId").value = user.group.id || "";
}