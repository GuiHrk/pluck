const form = document.getElementById("cadastroForm");

if(form){
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  console.log(name, email, password);

  try{
      const response = await fetch("http://localhost:8080/users", {
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
 
          alert("Usuário cadastrado com sucesso");

          window.location = "/login/login.html";
      }
     catch (error) {
      console.error(error);
      alert("Erro ao cadastrar ");
    }
 });
}