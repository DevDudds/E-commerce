const abrirCarrinho = document.querySelector(".abrir-carrinho");
const fecharCarrinho = document.querySelector("#fechar-carrinho");
const continuar = document.querySelector("#continuar-comprando");
const carrinho = document.querySelector("#carrinho");

abrirCarrinho.addEventListener("click", () => {
    carrinho.classList.add("ativo");
});

continuar.addEventListener("click", fechar);

fecharCarrinho.addEventListener("click", fechar);

function fechar() {
    carrinho.classList.remove("ativo");
}
