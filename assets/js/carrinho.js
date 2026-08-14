import { carregarProdutos } from "./fetch.js";

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let produtos = [];

carregarProdutos().then(items => {
    produtos = items;
    configurarBotoes();
    renderizarProdutos();
});

function configurarBotoes() {
    document.querySelectorAll(".button-hero").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            adicionarCarrinho(id);
        });
    });
}

document.querySelectorAll(".button-hero").forEach(btn => {
    btn.addEventListener("click", () => {
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
    salvarCarrinho();
}

export default function renderizarProdutos() {

    const container = document.querySelector("#carrinho-produtos");
    container.innerHTML = "";
    carrinho.forEach(item => {
        const elemento = document.createElement("div");
        elemento.classList.add("item-carrinho");
        elemento.innerHTML = `

            <img src="${item.imagem}" alt="${item.nome}">

            <div class="item-info">
                <h3>${item.nome}</h3>
                <span class="item-preco">
                    ${item.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
                <div class="quantidade">
                    <button
                        class="diminuir"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>
                    <button
                        class="aumentar"
                        data-id="${item.id}"
                    >
                        +
                    </button>
                </div>
            </div>

            <button class="remover-item" data-id="${item.id}">
                🗑
            </button>
        `;

        container.appendChild(elemento);

    });
}


