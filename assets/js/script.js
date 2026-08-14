const abrirCarrinho = document.querySelector(".abrir-carrinho");
const fecharCarrinho = document.querySelector("#fechar-carrinho");
const carrinho = document.querySelector("#carrinho");

abrirCarrinho.addEventListener("click", () => {
    carrinho.classList.add("ativo");
});

fecharCarrinho.addEventListener("click", () => {
    carrinho.classList.remove("ativo");
});
