import { carregarProdutos } from "./fetch.js";

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtos = [];

carregarProdutos().then(items => {
    produtos = items;
    configurarBotoes();
});

function configurarBotoes() {

    document.querySelectorAll(".button-hero").forEach(btn => {

        btn.addEventListener("click", () => {

            console.log("Eu fui clicado menor");

            const id = Number(btn.dataset.id);

            adicionarCarrinho(id);

        });

    });

}

document.querySelectorAll(".button-hero").forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("Eu fui clicado menor");
        const id = Number(btn.dataset.id);
        adicionarCarrinho(id);
    });
});

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarCarrinho(id) {
    const produto = produtos.find(produto => produto.id === id);

    if (!produto) return;

    const item = carrinho.find(item => item.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    console.log("gello sdoadoas");
    salvarCarrinho();
}


