const form = document.getElementById("cadastroForm");

if(form){
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  console.log(name, email, password);

  try{
      const response = await fetch("https://pluck-qebe.onrender.com/users", {
      method: "POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: "USER"
        })
      });

      if (!response.ok) {
          throw new Error("Erro na resposta do servidor");
      }

      // Mostra o toast de sucesso
      mostrarToast("Usuário cadastrado com sucesso! Redirecionando...", "success");

      // Espera 1.5 segundos para o usuário ver a notificação antes de mudar de página
      setTimeout(() => {
          window.location = "https://pluck-woad.vercel.app/login/login.html";
      }, 1500);

  } catch (error) {
      console.error(error);
      // Mostra o toast de erro (danger)
      mostrarToast("Erro ao realizar o cadastro. Tente novamente.", "danger");
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