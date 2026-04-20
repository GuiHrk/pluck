const form = document.getElementById("loginForm");

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/users/login", {
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

        alert("Login realizado com sucesso!");
        console.log("Usuário:", data);

        window.location.href = "/kanban/kanban.html";

      } else {
        alert("Email ou senha inválidos!");
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login");
    }
  });
}