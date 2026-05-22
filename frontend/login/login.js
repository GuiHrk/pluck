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
    const toastIcon = document.getElementById('toastIcon');

    if (tipo === 'success') {
        // Verde esmeralda moderno com 90% de opacidade para o efeito blur
        toastElement.style.backgroundColor = 'rgba(16, 185, 129, 0.92)';
        toastElement.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        toastIcon.innerHTML = '✨'; // Ícone de sucesso
    } else {
        // Vermelho rubi moderno com 90% de opacidade
        toastElement.style.backgroundColor = 'rgba(239, 68, 68, 0.92)';
        toastElement.style.border = '1px solid rgba(255, 255, 255, 0.15)';
        toastIcon.innerHTML = '⚠️'; // Ícone de atenção/erro
    }

    toastMessage.textContent = mensagem;

    // Força o display block para a animação do Bootstrap funcionar
    toastElement.style.display = 'block';

    const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
    bsToast.show();
}