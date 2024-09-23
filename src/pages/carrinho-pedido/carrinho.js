
const divDosCards = document.querySelector(".lista-itens")
const modalPedido = document.getElementById('modal-pedido')
const modalBackdrop = document.getElementById('modal-backdrop')


atualizaLista()

function atualizaLista() {

    divDosCards.innerHTML = ''

    carrinho.forEach((lanche) => {
        const card =
            `
        
        <div class="item-pedido">
            <div>
                <img src="${lanche.img}"
                    alt="imagem do produto">
            </div>
    
            <div>
                <p>${lanche.titulo}</p>
            </div>
    
            <div>
                <p>${lanche.quantidade}</p>
            </div>
    
            <div>
                <p>${lanche.preco * lanche.quantidade}</p>
            </div>
    
            <div>
                <button id="remover" onclick="removerItem('${lanche.id}')" data-produto-id="${lanche.id}">remover</button>
            </div>
        </div>
    
        `
        divDosCards.innerHTML += card
    })

    calcularTotal()
}

function removerItem(id) {
    removerLancheDoCarrinho(id)
    atualizaLista()
}

function calcularTotal() {
    let total = 0
    for (item in carrinho) {
        total += carrinho[item].preco * carrinho[item].quantidade
    }
    const totalSpan = document.querySelector(".total")
    totalSpan.innerHTML = ` <h4>total: R$ ${total.toFixed(2)}</h4>`
}

function cancelarPedido() {
    if (carrinho.length > 0) {
        limparCarrinho()
        alert("Pedido cancelado!")
        window.location.href = "../";
    }
}

function limparCarrinho() {
        carrinho.length = 0
        atualizaLocalStorage()
        atualizaLista()
}

function finalizarCompra() {
    aguardandoPagamento()
    abreFechaModal()
    setTimeout( () => {
       pagamentoConfirmado()
    },4000)
    setTimeout( () => {
        mostrarSenha()
    },6000)
    setTimeout( () => {
        abreFechaModal()
        limparCarrinho()
        window.location.href = "../";
        
    },8000)
    

}

function aguardandoPagamento() {
    let imagem = ""
    let classeImg= ""

   const tipo = document.querySelector('input[name="pagamento"]:checked').value;
   if (tipo == "credito" || tipo == "debito")  {
    imagem = "../assets/img/pagamento-cartao.png"
    classeImg = "img-pag-cartao"
   } else {
    imagem = "../assets/img/qrcode.png"
    classeImg = "img-pag-qrcode"

   }

    modalPedido.innerHTML = `
    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Aguardando Pagamento...</h5>

                        </div>
                        <div class="modal-body" style="margin: 0 auto;">
                        <img src="${imagem}" class="${classeImg}"
                        alt="...">
                        </div>

                    </div>
    `

}

function pagamentoConfirmado() {

    modalPedido.innerHTML = `
    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Pagamento Confirmado!</h5>

                        </div>
                 

                    </div>
    `

}

function abreFechaModal() {
    modalPedido.classList.toggle("d-block")
    modalBackdrop.classList.toggle('modal-backdrop')
}

function mostrarSenha() {
    modalPedido.innerHTML = `
    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Pedido Realizado!</h5>

                        </div>
                        <div class="modal-body">
                           <h1 style="text-align: center;">SENHA: #${getRandomInt(500)}</h1>
                        </div>

                    </div>
    `
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

