const form = document.getElementById("loginForm");

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      mostrarToast("Preencha todos os campos", "danger");
      return;
    }

    try {
      const response = await fetch("https://pluck-qebe.onrender.com/users/login", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if(response.ok){
        const data = await response.json();

        localStorage.setItem("user", JSON.stringify(data));

        // Mostra o toast de sucesso
        mostrarToast("Login realizado com sucesso!", "success");
        console.log("Usuário:", data);

        // Espera 1.5 segundos para o usuário ver o toast antes de mudar de página
        setTimeout(() => {
            window.location.href = "https://pluck-woad.vercel.app/kanban/kanban.html";
        }, 1500);

      } else {
        mostrarToast("Email ou senha inválidos!", "danger");
      }

    } catch (error) {
      console.error(error);
      mostrarToast("Erro ao fazer login. Tente novamente.", "danger");
    }
  });
}

// Função para mostrar notificações personalizadas e bonitas usando o Bootstrap
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