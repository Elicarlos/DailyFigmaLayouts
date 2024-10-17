// Variáveis globais
const cart = [];
const cartItemContainer = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-list');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const cartPopup = document.getElementById('cart-popup');
const openCartButton = document.querySelectorAll('.open-cart'); // NodeList of all 'open-cart' buttons
const closeCartButton = document.querySelector('.close-cart');
const menuOverlay = document.querySelector('.menu-overlay');

const whatsappNumber = '5586988347557'; // O número do WhatsApp de destino
const whatsappBaseURL = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=`;

// Carrega o carrinho e atualiza no início
carregarCarrinho();
atualizarCarrinho();


// Função para formatar e enviar o pedido via WhatsApp
function enviarPedidoWhatsApp() {
    let pedidoTexto = '*Pedido*\n'; // Inicia o texto do pedido
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        pedidoTexto += `${item.quantidade}x ${item.nome} = R$${itemTotal.toFixed(2)}\n`;
        total += itemTotal;
    });

    pedidoTexto += `\n*Total* = R$${total.toFixed(2)}`;
    
    // Codificar a mensagem para URL
    const mensagemWhatsApp = encodeURIComponent(pedidoTexto);
    
    // Montar a URL final
    const urlFinal = `${whatsappBaseURL}${mensagemWhatsApp}&type=phone_number&app_absent=0`;
    
    // Abrir o link para WhatsApp
    window.open(urlFinal, '_blank');
}

// Adiciona evento de clique ao botão "Enviar Pedido"
document.querySelector('.enviar-whatsapp').addEventListener('click', enviarPedidoWhatsApp);

// Menu Mobile
// Abre o menu mobile e mostra o overlay
hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    menuOverlay.classList.add('active');
    hamburger.classList.add('active');
});

// Fecha o menu mobile e esconde o overlay
closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
});

// Fechar o menu ao clicar fora (no overlay)
menuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
});

// Corrigido: adicionar evento a todos os botões de abrir carrinho (desktop e mobile)
openCartButton.forEach(button => {
    button.addEventListener('click', () => {
        cartPopup.style.display = 'flex';
    });
});

// Fecha o carrinho ao clicar no botão de fechar
if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });
}

// Fecha o carrinho ao clicar fora do popup
window.onclick = function(event) {
    if (event.target == cartPopup) {
        cartPopup.style.display = 'none';
    }
};

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para carregar o carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('cart');
    if (carrinhoSalvo) {
        cart.push(...JSON.parse(carrinhoSalvo));
    }
}

// Função para adicionar produto ao carrinho
function adicionarProduto(nome, preco) {
    const itemExistente = cart.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        cart.push({ nome: nome, preco: preco, quantidade: 1 });
    }
    atualizarCarrinho();
    salvarCarrinho();
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    cartItemContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}</p>
            <button class="remove-btn" data-nome="${item.nome}">Remover</button>
        `;
        cartItemContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });

    totalAmountElement.innerText = total.toFixed(2);
    atualizarQuantidadeCarrinho();

    // Adicionando funcionalidades ao botão de remover
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const nome = this.getAttribute('data-nome');
            removerProduto(nome);
        });
    });
}

// Função para remover produto do carrinho
function removerProduto(nome) {
    const itemIndex = cart.findIndex(item => item.nome === nome);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1); // Remove um item do array
    }
    atualizarCarrinho();
    salvarCarrinho();
}

// Função para capturar o clique em cada botão de adicionar produto
document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const nome = card.querySelector('.card-title h2').innerText; // Pega o texto do nome
        const preco = parseFloat(card.querySelector('.card-price span').innerText.replace(',', '.')); // Converte o preço

        adicionarProduto(nome, preco);
        showToast(`${nome} adicionado ao carrinho!`);
    });
});

// Função para atualizar a quantidade de itens no carrinho (ícone do carrinho)
function atualizarQuantidadeCarrinho() {
    const cartCountElement = document.getElementById('cart-count');
    const totalUniqueItems = cart.length; // Número de produtos únicos no carrinho
    cartCountElement.innerText = `(${totalUniqueItems})`;
}

// Função para exibir uma mensagem temporária (Toast)
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<span>&#10004;</span><p>${message}</p>`;
    
    toastContainer.appendChild(toast);

    // Remover o toast após 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
