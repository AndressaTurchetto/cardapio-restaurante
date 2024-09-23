const carrinho = pegaItensDoLocalStorage()

const todosOsbotoes = document.querySelectorAll('button')

todosOsbotoes.forEach((button) => {
    
    const lancheDentroDoCarrinho = carrinho.find(item => item.id === button.dataset.produtoId)
    if (lancheDentroDoCarrinho) {
        const input = button.parentNode.querySelector('.input-card')

        input.value = lancheDentroDoCarrinho.quantidade
    }
    
    button.addEventListener('click', () => {
     if (button.id == "cancelar") {
            cancelarPedido()
            return

        } else if (button.id == "finalizar") {
            finalizarCompra()
            return
        }

        const input = button.parentNode.querySelector('.input-card')

        let quantidadeAtual = Number(input.value)

        const lancheSelecionado = pratos.find(item => item.id === button.dataset.produtoId)

        if (button.classList.contains("aumentar")) {
            quantidadeAtual++
            input.value = quantidadeAtual

        } else if (button.classList.contains("diminuir")) {
            if (quantidadeAtual > 0) {
                quantidadeAtual--
                input.value = quantidadeAtual
            }

        } else if (quantidadeAtual > 0) {
            lancheSelecionado.quantidade = quantidadeAtual
            adicionarLancheNoCarrinho(lancheSelecionado)
        } 


    })
})

function pegaItensDoLocalStorage() {
    return JSON.parse(localStorage.getItem("carrinho")) || []
}

function atualizaLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

function adicionarLancheNoCarrinho(lancheSelecionado) {
    const lancheEncontrado = carrinho.find(item => item.id === lancheSelecionado.id)

    if (lancheEncontrado == undefined) {
        carrinho.push(lancheSelecionado)

    } else {
        lancheEncontrado.quantidade = lancheSelecionado.quantidade
    }

    atualizaLocalStorage()
}

function removerLancheDoCarrinho(id) {
    const index = carrinho.findIndex(it => it.id === id)
    carrinho.splice(index, 1)
    atualizaLocalStorage()
}


function createCard(pratos) {
    const card = document.createElement("div");
    card.className = "card card-hamburguer";
    card.style.width = "18rem";

    card.innerHTML = `
        <img src="${prato.imgSrc}" class="card-img-top img-card-hamburguer" alt="Imagem prato com ${prato.title}">
        <div class="card-body">
            <h5 class="card-title">${prato.title}</h5>
            <p class="card-text">${prato.description}</p>
            <p class="preco-hamburguer">${prato.price}</p>
            <div class="div-card">
                <button data-produto-id="${prato.id}" class="diminuir">-</button>
                <input type="number" class="form-control input-card" id="quantity" name="quantity" value="1">
                <button data-produto-id="${prato.id}" class="aumentar">+</button>
            </div>
            <button data-produto-id="${prato.id}" class="btn btn-danger">ADICIONAR</button>
        </div>
    `;

    return card;
}

// Adiciona os cards ao contêiner
const cardapio = document.getElementById("cardapio");
pratos.forEach(prato => {
    const card = createCard(prato);
    cardapio.appendChild(card);
});

const pratos = [
    {
        img: "../../assets/images/doces/banoffee.png",
        title: "Banoffee",
        description: "Serve uma pessoa",
        price: "R$ 12,90",
        id: "doces"
    },
    {
        img: "../../assets/images/doces/cheesecake.jpg",
        title: "Cheesecake",
        description: "Serve uma pessoa",
        price: "R$ 12,90",
        id: "doces"
    },
    {
        img: "../../assets/images/doces/mil-folhas.jpg",
        title: "Mil-folhas",
        description: "Serve uma pessoa",
        price: "R$ 12,90",
        id: "doces"
    },
    {
        img: "../../assets/images/doces/pudim.jpg",
        title: "Pudim",
        description: "Serve uma pessoa",
        price: "R$ 9,90",
        id: "doces"
    },
    {
        img: "../../assets/images/doces/tiramisu.jpg",
        title: "Tiramisu",
        description: "Serve uma pessoa",
        price: "R$ 14,90",
        id: "doces"
    },
    {
        img: "../../assets/images/doces/creme-de-morango.jpg",
        title: "Creme de Morango",
        description: "Serve uma pessoa",
        price: "R$ 13,90",
        id: "doces"
    },
    {
        img: "../../assets/images/bebidas/cerveja.jpg",
        title: "Cerveja",
        description: "Maiores de 18 anos",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/whiskey.jpg",
        title: "Dose de Whiskey",
        description: "Maiores de 18 anos",
        price: "R$ 17,90",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/agua.jpg",
        title: "Água",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/suco-de-laranja.jpeg",
        title: "Suco de Laranja",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/suco-de-melancia.jpeg",
        title: "Suco de Melancia",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/suco-tropical.jpg",
        title: "Suco tropical",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/suco.jpg",
        title: "Suco",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/refrigerante.jpg",
        title: "Refrigerante",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/coca.jpg",
        title: "Refrigerante Coca-Cola",
        description: "Refrigerante ",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/coca-zero.jpg",
        title: "Refrigerante Coca-Cola zero",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/guarana.jpg",
        title: "Refrigerante Guaraná",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },
    {
        img: "../../assets/images/bebidas/guarana-zero.jpg",
        title: "Refrigerante Guaraná zero",
        description: "Unidade",
        price: "R$ 7,99",
        id: "bebidas"
    },

    

    {
        img: "../../assets/images/carnes/bife-ancho.jpg",
        title: "Bife-ancho",
        description: "Serve uma pessoa",
        price: "R$ 39,90",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/carpaccio.jpg",
        title: "Carpaccio",
        description: "Serve uma pessoa",
        price: "R$ 59,90",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/bruschetta.jpg",
        title: "Bruschetta",
        description: "Serve uma pessoa",
        price: "R$ 29,90",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/ebi-spicy.jpg",
        title: "Ebi-spicy",
        description: "Serve uma pessoa",
        price: "R$ 29,90",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/file-mignon.jpg",
        title: "File-mignon",
        description: "Serve uma pessoa",
        price: "R$ ",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/paella.jpg",
        title: "Paella",
        description: "Serve uma pessoa",
        price: "R$ ",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/picanha.png",
        title: "Picanha",
        description: "Serve uma pessoa",
        price: "R$ ",
        id: "carnes"
    },
    {
        img: "../../assets/images/carnes/prime-rib.jpg",
        title: "Prime",
        description: "Serve uma pessoa",
        price: "R$ ",
        id: "carnes"
    },
    {
        img: "../../assets/images/saladas/salada-caprese.jpg",
        title: "Salada Caprese",
        description: "Serve uma pessoa",
        price: "R$ 23,90",
        id: "saladas"
    },
    {
        img: "../../assets/images/saladas/salada-ceasar.jpg",
        title: "Salada Ceasar",
        description: "Serve uma pessoa",
        price: "R$ 20,90",
        id: "saladas"
    },
    {
        img: "../../assets/images/saladas/salada-grega.jpg",
        title: "Salada Grega",
        description: "Serve uma pessoa",
        price: "R$ 25,90",
        id: "saladas"
    },
    {
        img: "../../assets/images/saladas/salada-nicoise.jpg",
        title: "Salada Nicoise",
        description: "Serve uma pessoa",
        price: "R$ 23,90",
        id: "saladas"
    },
    {
        img: "../../assets/images/saladas/salada-waldorf.jpg",
        title: "Salada Waldorf",
        description: "Serve uma pessoa",
        price: "R$ 21,90",
        id: "saladas"
    },
    {
        img: "../../assets/images/massas/aligot.jpg",
        title: "Aligot",
        description: "Serve uma pessoa",
        price: "R$ 31,90",
        id: "massas"
    },
    {
        img: "../../assets/images/massas/capeletti.jpg",
        title: "Capeletti",
        description: "Serve uma pessoa",
        price: "R$ 35,90",
        id: "massas"
    },
    {
        img: "../../assets/images/massas/espaguete.jpg",
        title: "Espaguete",
        description: "Serve uma pessoa",
        price: "R$ 19,90",
        id: "massas"
    },
    {
        img: "../../assets/images/massas/lasanha.jpg",
        title: "",
        description: "Serve uma pessoa",
        price: "R$ 25,00",
        id: "massas"
    },
    {
        img: "../../assets/images/massas/nhoque.jpg",
        title: "",
        description: "Serve uma pessoa",
        price: "R$ 23,90",
        id: "massas"
    },
    {
        img: "../../assets/images/massas/ravioli.jpg",
        title: "29,90",
        description: "Serve uma pessoa",
        price: "R$ ",
        id: "massas"
    },
    {
        id: "hamburger",
        titulo: "X-Bacon",
        descricao: "Carne, bacon, queijo, alface e tomate.",
        preco: "16.99",
        img: "../../assets/images/hamburguer/x-bacon.png",
    },
    {
        id: "hamburger",
        titulo: "X-Salada",
        descricao: "Carne, queijo, alface, tomate e cebola.",
        preco: "10.99",
        img: "../../assets/images/hamburguer/x-salada.png"
    },
    {
        id: "hamburger",
        titulo: "X-Frango",
        descricao: "Frango empanado na farinha panko, bacon, queijo.",
        preco: "12.99",
        img: "../../assets/images/hamburguer/x-frango.png"
    },
    {
        id: "hamburger",
        titulo: "X-Tudo",
        descricao: "Carne, bacon, ovo, queijo, alface,tomate e maionese caseira.",
        preco: "19.99",
        img: "../../assets/images/hamburguer/x-tudo.png"
    },
    {
        id: "hamburger",
        titulo: "X-Smash",
        descricao: "Blend de carne prensada na chapa e queijo.",
        preco: "9.99",
        img: "../../assets/images/hamburguer/x-smash.png"
    },
    {
        id: "hamburger",
        titulo: "Cheese Burguer",
        descricao: "Carne, duplo queijo e maionese caseira.",
        preco: "12.99",
        img: "../../assets/images/hamburguer/cheese-burguer.png"
    },
    {
        id: "sanduiche",
        titulo: "Sanduíche de Atum",
        descricao: "Pão integral, atum, tomate e alface.",
        preco: "8,99 ",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "sanduiche",
        titulo: "Peito de Perú",
        descricao: "Pão na chapa, peito de perú e queijo.",
        preco: "11.99",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "sanduiche",
        titulo: "Presuto e Queijo",
        descricao: "Pão de fermentação natural na chapa, presunto e queijo.",
        preco: "12.99",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "sanduiche",
        titulo: "Sanduíche de Ricota",
        descricao: "Pão integral, ricota fresca e cenoura ralada.",
        preco: "8.99",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "sanduiche",
        titulo: "Ricota com Rúcula",
        descricao: "Pão de 7 grãos, ricota, rúcula e azeite.",
        preco: "9.99",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "sanduiche",
        titulo: "Mexicano",
        descricao: "Pão de 7 grãos, guacamole, pimenta caiena e ovo.",
        preco: "15.99",
        img: "../../assets/images/sanduiche/atum.jpg"
    },
    {
        id: "salgado",
        titulo: "Coxinha de Frango",
        descricao: "Massa de mandioca, empanada na farinha de milho.",
        preco: "8.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgado",
        titulo: "Croissant",
        descricao: "Tradicional com manteiga de garrafa.",
        preco: "11.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgado",
        titulo: "Enroladinho de Salsicha",
        descricao: "Massa de fermentação natural, salsicha e queijo.",
        preco: "12.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgado",
        titulo: "Pizza de Calabresa",
        descricao: "Massa leve, molho de tomate, queijo e calabresa.",
        preco: "8.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgado",
        titulo: "Pão de Queijo",
        descricao: "Polvilho doce, queijo parmesão meia cura e azeite.",
        preco: "9.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgadoe",
        titulo: "Esfirra de Cerne",
        descricao: "Massa leve, carne temperada com ervas finas.",
        preco: "5.99",
        img: "../../assets/images/salgado/coxinha.jpg"
    },
    {
        id: "salgado",
        titulo: "Banana com Nutela",
        descricao: "Massa leve, banana com nutela e calda de chocolate.",
        preco: "10.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    },
    {
        id: "crepe",
        titulo: "Chocolate",
        descricao: "Massa leve, chocolate amargo, calda de chocolate e chantilly.",
        preco: "11.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    },
    {
        id: "crepe",
        titulo: "Tradicional",
        descricao: "Massa de fermentação natural, queijo e manteiga.",
        preco: "8.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    },
    {
        id: "crepe",
        titulo: "Panqueca Americana",
        descricao: "Massa leve, frutas vermelhas e xarope de milho.",
        preco: "8.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    },
    {
        id: "crepe",
        titulo: "Panqueca Tradicional",
        descricao: "Massa leve, manteiga e xarope de milho.",
        preco: "6.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    },
    {
        id: "crepe",
        titulo: "Waffle com Nutela",
        descricao: "Massa leve, nutela e açucar de confeiteiro.",
        preco: "7.99",
        img: "../../assets/images/crepe/banana-com-nutela.jpg"
    }
]