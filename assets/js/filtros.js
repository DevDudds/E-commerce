import { carregarProdutos, renderizarProdutos } from "./fetch.js";

let categoriasSelecionadas = new Set();

carregarProdutos().then(produtos => {
    criarBotoesCategorias(produtos);
    configurarBusca(produtos);
});

export function criarBotoesCategorias(produtos) {

    const container = document.querySelector(".categorias");

    const categorias = [
        "Todos",
        ...new Set(produtos.map(produto => produto.categoria))
    ];

    categorias.forEach(categoria => {
        const botao = document.createElement("button");
        botao.textContent = categoria;
        botao.dataset.categoria = categoria;
        botao.classList.add("filtro-categoria");

        botao.addEventListener("click", () => {
            if (categoria === "Todos") {
                document.querySelectorAll(".filtro-categoria").forEach(btn => {
                        btn.classList.remove("selecionado");
                });

                botao.classList.add("selecionado")
            } else {
                categoriasSelecionadas.delete("Todos");

                if (categoriasSelecionadas.has(categoria)) {
                    categoriasSelecionadas.delete(categoria);
                    botao.classList.remove("selecionado");
                } else {
                    categoriasSelecionadas.add(categoria);
                    botao.classList.add("selecionado");
                }

                document.querySelector('[data-categoria="Todos"]')?.classList.remove("selecionado");
            }

            aplicarFiltro(produtos);
        })

        container.appendChild(botao);
    });
    container.querySelector('[data-categoria="Todos"]')?.classList.add("selecionado");
}

function aplicarFiltro(produtos) {
    if (categoriasSelecionadas.size === 0) {
        document.querySelector('[data-categoria="Todos"]').classList.add("selecionado");

        renderizarProdutos(produtos);
        return;
    }

    const produtosFiltrados = produtos.filter(produto =>
        categoriasSelecionadas.has(produto.categoria)
    );
    renderizarProdutos(produtosFiltrados);
}

function configurarBusca(produtos) {
    const input = document.querySelector("#busca");

    input.addEventListener("input", () => {
        const texto = input.value.toLowerCase().trim();
        const produtosFiltrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(texto) ||
            produto.marca.toLowerCase().includes(texto) ||
            produto.categoria.toLowerCase().includes(texto)
        );
        renderizarProdutos(produtosFiltrados);
    });
}
