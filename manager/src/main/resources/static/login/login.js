const form = document.getElementById("loginForm");

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    console.log(email, password);

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
        alert("Login realizado com sucesso!");

        console.log("Usuário:", data);

      } else {
        alert("Email ou senha inválidos!");
      }

    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login");
    }
  });
}