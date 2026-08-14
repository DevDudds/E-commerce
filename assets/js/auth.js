const form = document.querySelector("#form-cadastro");
const aviso = document.querySelector("#aviso");

form.addEventListener("submit", event => {
    event.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const email = document.querySelector("#email").value.trim();
    const senha = document.querySelector("#senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.some(usuario => usuario.email == email);

    if (usuario) {
        aviso.textContent = "Esse e-mail já está cadastrado.";
        return;
    }

    const novoUsuario = {
        id: Date.now(), nome, email, senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    aviso.textContent = "Conta criada com sucesso!";
    form.reset();
});
