const produtosContainer = document.getElementById("produtos");

export async function carregarProdutos() {

    try {

        const resp = await fetch("./assets/js/data/produtos.json");

        if (!resp.ok) {
            throw new Error(`Erro ao carregar JSON: ${resp.status}`);
        }

        const produtos = await resp.json();

        produtosContainer.innerHTML = produtos.map(produto => {

            const preco = produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            return `
                <div class="card-produto">

                    <img 
                        class="card-produto-img" 
                        src="${produto.imagem}" 
                        alt="${produto.nome}"
                    >

                    <p>${produto.marca} - ${produto.categoria}</p>

                    <h3>${produto.nome}</h3>

                    <h2 class="produto-destaque">
                        ${preco}
                    </h2>

                    <p id="cinza">
                        12x de R$ 1.083,25 sem juros
                    </p>

                    <button data-id="${produto.id}" class="button-hero">
                        Adicionar ao Carrinho
                    </button>

                </div>
            `;

        }).join("");

        return produtos;

    } catch (erro) {

        console.error(erro);

        return [];

    }
}
