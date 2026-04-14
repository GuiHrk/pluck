function cadastrar() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmar = document.getElementById('confirmar').value;
  const msg = document.getElementById('msg');

  if (!nome || !email || !senha || !confirmar) {
    msg.style.color = 'red';
    msg.innerText = 'Preencha todos os campos!';
    return;
  }

  if (senha !== confirmar) {
    msg.style.color = 'red';
    msg.innerText = 'As senhas não coincidem!';
    return;
  }

  msg.style.color = 'green';
  msg.innerText = 'Cadastro realizado com sucesso!';

  console.log({ nome, email, senha });
}
