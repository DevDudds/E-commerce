const formLogin = document.querySelector("#form-login");
const avisoLogin = document.querySelector("#aviso-login");

formLogin.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const senha = document.querySelector("#senha-login").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(usuarios);
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        avisoLogin.textContent = "E-mail ou senha incorretos.";
        return;
    }

    localStorage.setItem("UsuarioLogado", JSON.stringify(usuario));
    
    window.location.href = "../index.html";
});

