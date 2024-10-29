// let paragragrafo = document.querySelector('p')

// paragragrafo.textContent = "Ola"

// paragragrafo.style.color = "green"

// let novoTitle = document.createElement("h1")

// novoTitle.textContent = "Novo Titulo"

// novoTitle.style.backgroundColor = "yellow"

// novoTitle.style.color = "red"

// novoTitle.style.padding = "10px"
// novoTitle.style.borderRadius = "50px"

// document.body.appendChild(novoTitle)

// let tituloPagina = document.querySelector('title')

// tituloPagina.textContent = "Novo Titulo da Pagina"


function render(){
    const root = document.getElementById('root')

    root.style.display = "flex"
    root.style.flexDirection = "column"
    root.style.justifyContent = "center"
    root.style.alignItems = "center"

    root.style.marginTop = "100px"

    root.style.gap = "30px"
    
    root.innerHTML = ""

    const  title = document.createElement('h1')

    title.textContent = "Contador: " + state.counter

    root.appendChild(title)

    const button = document.createElement('button')

    button.textContent = "Incrementar"

    button.style.backgroundColor = "yellow"
    button.style.border = "none"

    button.style.padding = "20px";
    button.style.fontWeight = "bold"
    button.style.borderRadius = "20px"

    const btnDecrement = document.createElement('button')
    btnDecrement.textContent = "Decrementar"

    btnDecrement.addEventListener('click', function(){
        state.counter--;
        render()
    })
    

    button.addEventListener('click', function (){
    
        state.counter += 1;
        render();
    })

    root.appendChild(button)
    root.appendChild(btnDecrement)
}

let state = {
    counter: 0
}


render()