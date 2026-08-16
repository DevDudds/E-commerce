const produtosContainer = document.getElementById("produtos");

export async function carregarProdutos() {

    try {

        const resp = await fetch("./assets/js/data/produtos.json");

        if (!resp.ok) {
            throw new Error(`Erro ao carregar JSON: ${resp.status}`);
        }

        const produtos = await resp.json();

        produtosContainer.innerHTML = produtos.map(produto => {

            const valor = produto.valor;

            const valorDesconto = valor * (1 - produto.desconto);

            const precoAntigo = valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            const preco = valorDesconto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

            return `
                <div class="card-produto">

                    <div class="produto-imagem">
                        <img class="card-produto-img" src="${produto.imagem}" alt="">
                        <div class="etiquetas">
                            <span class="desconto">-${(produto.desconto*100).toFixed(0)}%</span>
                        </div>
                    </div>


                    <p>${produto.marca} - ${produto.categoria}</p>

                    <h3>${produto.nome}</h3>

                    <h2 class="produto-destaque riscado">
                        ${precoAntigo}
                    </h2>

                    <h2 class="produto-destaque">
                        ${preco}
                    </h2>

                    <p id="cinza">
                        12x de R$ ${(valor / 12).toFixed(2)} sem juros
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
