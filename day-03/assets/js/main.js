const btnDecrement = document.querySelector('.decrement')
const btnIncrement = document.querySelector('.increment')
const quantidadeDisplay = document.querySelector('.quantidade')
const quantidadeControle = document.querySelectorAll('.quantidade-controle')
const buttonContainer = document.querySelector('.button-container');

let quantidade = parseInt(quantidadeDisplay.textContent)

function atualizarOpacidade() {
   if (quantidade >= 1 ){
        buttonContainer.classList.add('quantidade-maior-que-zero')
   } else {
    buttonContainer.classList.remove('quantidade-maior-que-zero')
   }
}

atualizarOpacidade();

btnIncrement.addEventListener('click', () =>{
   
        quantidade++
        quantidadeDisplay.textContent = quantidade
        atualizarOpacidade();
  
})

btnDecrement.addEventListener('click', () => {
    if (quantidade > 0) {
        quantidade--;
        quantidadeDisplay.textContent = quantidade
        atualizarOpacidade();
    }
})