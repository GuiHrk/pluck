// Criamos as variáveis no escopo global para que as funções criarGrupo e entrarGrupo consigam acessá-las
let bsModalCriarGrupo;
let bsModalEntrarGrupo;

document.addEventListener("DOMContentLoaded", async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
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
        mostrarToast("Erro ao carregar as tarefas do servidor.", "danger");
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
            mostrarToast("Status da tarefa atualizado!", "success");
        } catch(error){
            console.error("Erro ao atualizar status:", error);
            mostrarToast("Erro ao salvar o novo status da tarefa.", "danger");
        }

    });

});

function setupAddButtons(user) {
    const modalElement = document.getElementById('modalCriarTarefa');
    const bsModal = new bootstrap.Modal(modalElement);

    document.querySelectorAll(".column").forEach(column => {
        const addBtn = column.querySelector(".add-btn");
        if (!addBtn) return;

        addBtn.addEventListener("click", () => {
            document.getElementById("formCriarTarefa").reset();

            const columnId = column.id;
            let statusMapeado = "Pendente";

            if (columnId === "doing") statusMapeado = "Em Progresso";
            if (columnId === "done") statusMapeado = "Concluida";

            document.getElementById("taskStatusHidden").value = statusMapeado;
            bsModal.show();
        });
    });

    const form = document.getElementById("formCriarTarefa");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

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

            bsModal.hide();
            mostrarToast("Tarefa criada com sucesso!", "success");

            setTimeout(() => {
                location.reload();
            }, 1500);

        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            mostrarToast("Erro ao criar a tarefa.", "danger");
        }
    }, { once: true });
}

async function criarGrupo() {
    document.getElementById("formCriarGrupo").reset();
    bsModalCriarGrupo.show();
}

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
        mostrarToast("Grupo criado com sucesso!", "success");

        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        mostrarToast("Erro ao criar grupo.", "danger");
    }
});

async function entrarGrupo() {
    document.getElementById("formEntrarGrupo").reset();
    bsModalEntrarGrupo.show();
}

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
        mostrarToast("Entrou no grupo com sucesso!", "success");

        setTimeout(() => {
            location.reload();
        }, 1500);

    } catch (error) {
        mostrarToast("Erro ao entrar no grupo. Verifique o ID.", "danger");
    }
});

// Deletar Tarefas
async function deleteTask(taskId) {
    try {
        await fetch(`https://pluck-qebe.onrender.com/tasks/${taskId}`, {
            method: "DELETE"
        });
        mostrarToast("Tarefa excluída com sucesso!", "success");
        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        mostrarToast("Erro ao excluir tarefa.", "danger");
    }
}

// Deletar Usuário
async function deleteUser(userId) {
    try {
        await fetch(`https://pluck-qebe.onrender.com/users/${userId}`, {
            method: "DELETE"
        });
        mostrarToast("Usuário excluído com sucesso!", "success");
    } catch (error) {
        mostrarToast("Erro ao excluir usuário.", "danger");
    }
}

// Deletar Grupo
async function deleteGroup(groupId) {
    try {
        await fetch(`https://pluck-qebe.onrender.com/groups/${groupId}`, {
            method: "DELETE"
        });
        mostrarToast("Grupo excluído com sucesso!", "success");
        setTimeout(() => {
            location.reload();
        }, 1500);
    } catch (error) {
        mostrarToast("Erro ao excluir grupo.", "danger");
    }
}

function loadUserData(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    document.querySelector("#userName").value = user.name || "Usuário sem nome";
    document.querySelector("#userEmail").value = user.email || "Usuário sem email";
}

async function loadGroupData () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.group) return;
    document.querySelector("#groupName").value = user.group.name || "Sem grupo";
    document.querySelector("#groupDescription").value = user.group.description || "Sem descrição";
    document.querySelector("#groupId").value = user.group.id || "";
}

// Função para mostrar notificações personalizadas e bonitas
function mostrarToast(mensagem, tipo = 'success') {
    const toastElement = document.getElementById('pluckToast');
    const toastMessage = document.getElementById('toastMessage');

    if (tipo === 'success') {
        toastElement.style.backgroundColor = '#10b981'; // Verde moderno
    } else {
        toastElement.style.backgroundColor = '#ef4444'; // Vermelho moderno
    }

    toastMessage.textContent = mensagem;

    const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
    bsToast.show();
}