let carrinhoCompras = []
let carrinhoFiltro =    []
function CriarTodasSecoes(){
    let listaSecao                          = ["Todos Produtos"]
    produtos.forEach(element => (listaSecao.includes(element.secao) == false ? listaSecao.push(element.secao):""))
    return listaSecao
}

function wakeUpIndex(arrayFiltro){
    const body                              = document.body
    body.innerText = ""
    const header                            = criarHeader()
    const main                              = criarMain(arrayFiltro)
    body.append(header, main)
    const categoria                         = carrinho()
}
wakeUpIndex(produtos)

function criarHeader(){
    const header                            = document.createElement("header")
    const titulo                            = document.createElement("h1")
    titulo.innerText = "Shop now"
    header.appendChild(titulo)
    return header

}

function criarMain(arrayFiltro){
    const main                              = document.createElement("main")
    const sectionContainers                 = criarSectionContainers()
  //  const containerPrice                    = criarContainerPrice(arrayFiltro)
    const containerProdutos                 = criarContainerProdutos(arrayFiltro)

    main.append(sectionContainers,containerProdutos)
    
    return main
  
}

function criarSectionContainers(){
    const sectionFilters                    = document.createElement("section")
    sectionFilters.setAttribute("class","filtersContainer")
    const recebeDivContainerDeButtons       = criarButtonsCategoria()
    const recebeDivContainerDeBusca         = criarCampoDeBusca()
    sectionFilters.append(recebeDivContainerDeButtons,recebeDivContainerDeBusca)
    return sectionFilters
}

function criarButtonsCategoria(){
    const containersDeButtons               = document.createElement("div")
    containersDeButtons.setAttribute("id","botoesContainer")
    containersDeButtons.setAttribute("class","botoesContainer")

    
    let listaSecao                          = CriarTodasSecoes()
    listaSecao.forEach((elem,index) => {
        let btnCategoria                    = document.createElement("button")
        btnCategoria.setAttribute("id",index)
        btnCategoria.setAttribute("class", "estiloGeralBotoes estiloGeralBotoes--filter")
        btnCategoria.innerText              = elem
        containersDeButtons.appendChild(btnCategoria)
    })
    containersDeButtons.addEventListener("click",direcaoEscutadores)
    return containersDeButtons
}

function criarCampoDeBusca(){
    const containerBusca                    = document.createElement("div")
    containerBusca.setAttribute("class","containerBuscaPorNome")
    const inputBusca                        = document.createElement("input")
    inputBusca.setAttribute("placeholder","Pesquisar por")
    inputBusca.setAttribute("class","campoBuscaPorNome")
    const btnBusca                          = document.createElement("button")
    btnBusca.setAttribute("class","estiloGeralBotoes estiloGeralBotoes--botaoBuscaPorNome")
    btnBusca.setAttribute("id","buscarInput")
    const imgBusca                          = document.createElement("img")
    imgBusca.setAttribute("id","buscarInput")
    imgBusca.src="./src/img/search.png"
    imgBusca.alt="lupa"
    btnBusca.appendChild(imgBusca)
    containerBusca.append(inputBusca,btnBusca)
    containerBusca.addEventListener("click",direcaoEscutadores)
    return containerBusca
}

function criarContainerProdutos(arrayFiltro){
    const containerVitrine                  = document.createElement("section")
    containerVitrine.setAttribute("class","containerVitrine")
    const divProdutos                       = document.createElement("div")
    divProdutos.setAttribute("class","containerListaProdutos")
    const listaUl                           = document.createElement("ul")

    arrayFiltro.forEach(elem => {
        const produto                       = document.createElement("li")
        const imgProduto                    = document.createElement("img")
        imgProduto.src                      = elem.img
        imgProduto.alt                      = `Imagem ${elem.nome}`
        const nomeProduto                   = document.createElement("h3")
        nomeProduto.innerText               = elem.nome
        const secaoProduto                  = document.createElement("span")
        secaoProduto.innerText              = elem.secao
        const listaOrdenada                 = document.createElement("ol")
        listaOrdenada.setAttribute("class","listaComponentes")
        elem.componentes.forEach(componente => {
            const itemComponente                = document.createElement("li")
            itemComponente.innerText            = componente
            listaOrdenada.appendChild(itemComponente)
        })
        const containerPreco                = document.createElement("div")
        const precoProduto                  = document.createElement("p")
        precoProduto.innerText              = Number(elem.preco).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
        const btnComprar                    = document.createElement("button")
        btnComprar.setAttribute("id",elem.id)
        btnComprar.innerText                = "Comprar"
        containerPreco.append(precoProduto,btnComprar)
        produto.append(imgProduto,nomeProduto,secaoProduto,listaOrdenada,containerPreco)
        listaUl.appendChild(produto)
    })
divProdutos.appendChild(listaUl)
containerVitrine.appendChild(divProdutos)
divProdutos.addEventListener("click",carrinhoDinamico)
return containerVitrine
}

function carrinho(){    
    const vitrine       = document.querySelector(".containerVitrine")
    const containerCart = document.createElement("div")
    containerCart.setAttribute("class","containerCart")
    const containerTextoCarrinho  = document.createElement("div")
    containerTextoCarrinho.setAttribute("class","containerTextoCarrinho")
    const TextoCarrinho = document.createElement("h3")
    TextoCarrinho.innerText = "Carrinho"
    containerTextoCarrinho.appendChild(TextoCarrinho)
    const containerProdutosCompra = document.createElement("div")
    containerProdutosCompra.setAttribute("class","listaCompras")
    containerCart.append(containerTextoCarrinho,containerProdutosCompra)
        vitrine.appendChild(containerCart)
    if(carrinhoCompras.length == 0){
        
        const textoVazio = document.createElement("p")
        textoVazio.setAttribute("class","textoCarrinhoVazio")
        textoVazio.innerText = "Por enquanto não temos produtos no carrinho"
        containerProdutosCompra.appendChild(textoVazio)
        
        
    }else if(carrinhoCompras.length > 0){
        const listaCompras      = document.querySelector(".listaCompras")
        carrinhoFiltro.forEach((elem,index) =>{
        const produtoCarrinho   = document.createElement("div")
        produtoCarrinho.setAttribute("class","produtoCart")
        const imgCart                   = document.createElement("img")
        imgCart.setAttribute("src",elem.img)
        const descricoes                = document.createElement("div")
        //descricoes
        const tituloCart                = document.createElement("h3")
        tituloCart.innerText            = `${carrinhoCompras.reduce((acc,act) => (elem == act? acc = acc +1 : acc),0)} ${(carrinhoCompras.reduce((acc,act) => (elem == act? acc = acc +1 : acc),0) == 1 ? elem.nome : (elem.nome == "Pão"? "Pães": elem.nome+"s"))}`
        const precoCart                 = document.createElement("p")
        precoCart.innerText             = `${Number(elem.preco).toLocaleString("pt-br", {style: "currency", currency: "BRL"})}(un.)`              
        const precoCartTotal            = document.createElement("p")
        precoCartTotal.innerText        = ` ${carrinhoCompras.reduce((acc,act) => (elem == act? acc + Number(elem.preco) : acc),0).toLocaleString("pt-br", {style: "currency", currency: "BRL"})} (total)`
        const btnCart                   = document.createElement("button")
        btnCart.setAttribute("id",index)
        btnCart.innerText = "Remover"
        descricoes.append(tituloCart,precoCart,precoCartTotal,btnCart)
        produtoCarrinho.append(imgCart,descricoes) 
        listaCompras.appendChild(produtoCarrinho)
    })
    const quantidadeContainer               = document.createElement("section")
    quantidadeContainer.setAttribute("class","quantidadeContainer")
    const totalContainer                    = document.createElement("section")
    totalContainer.setAttribute("class","totalContainer")
    const quantidadeTexto                   = document.createElement("p")
    const quantidadeValor                   = document.createElement("p")
    const totalTexto                        = document.createElement("p")
    const totalValor                        = document.createElement("p")
    quantidadeTexto.innerText               = "Quantidade:"
    totalTexto.innerText                    = "Total:"
    quantidadeValor.innerText               = carrinhoCompras.length
    totalValor.innerText                    = (carrinhoCompras.reduce((valorFinal, elem) => valorFinal + Number(elem.preco), 0)).toLocaleString("pt-br", {style: "currency", currency: "BRL"})
    quantidadeContainer.append(quantidadeTexto,quantidadeValor)
    totalContainer.append(totalTexto,totalValor)
    containerCart.append(quantidadeContainer,totalContainer)
    listaCompras.addEventListener("click",removerDoCarrinho)
    }
}

function carrinhoDinamico(event){
    const carrinhoVazio = document.querySelector(".listaCompras")
    if(event.target.tagName == "BUTTON"){
        carrinhoVazio.innerText=""
        produtos.forEach(elem => {
           if(elem.id == event.target.id){
            carrinhoCompras.push(elem) 
            if(carrinhoFiltro.includes(elem) == false){
                carrinhoFiltro.push(elem)
            }
           }
    })   
    wakeUpIndex(produtos)
    }

}


function removerDoCarrinho(event){
    if(event.target.tagName == "BUTTON"){
        if(carrinhoCompras.reduce((acc, act) => (act == carrinhoCompras[carrinhoCompras.indexOf(carrinhoFiltro[event.target.id])]? acc= acc +1: acc),0) == 1){
            let elemento = carrinhoFiltro[event.target.id]
            carrinhoCompras.splice(carrinhoCompras.indexOf(elemento),1)
            carrinhoFiltro.splice(carrinhoFiltro.indexOf(elemento),1)
            wakeUpIndex(produtos)
        }else{
        carrinhoCompras.forEach((elem,index) => {
            if(event.target.id == index){
             carrinhoCompras.splice(index,1)
            }
    })
    wakeUpIndex(produtos)
 
}
}
}

function direcaoEscutadores(event){
    let arraySecoes = CriarTodasSecoes()
    let targetId    = event.target.id
    if(targetId == "buscarInput"){
        let valorPesquisa = document.querySelector(".campoBuscaPorNome")
        pesquisarInput(valorPesquisa.value)
    }else if(event.target.tagName == "BUTTON") {  
        FiltraSecao(arraySecoes[targetId],targetId)
    }
}

function FiltraSecao(valueBtn,targetId){
    if(valueBtn !== "Todos Produtos"){
    let secaoFiltrada   = produtos.filter(elem => elem.secao == valueBtn)
    wakeUpIndex(secaoFiltrada)
    let listaBtnSecoes = document.querySelectorAll("#botoesContainer button")
    listaBtnSecoes.forEach((elem,index) => {
        elem.classList.remove("active")
        if(index == targetId){
            elem.classList.add("active")
        }
    })
    }else{
        wakeUpIndex(produtos)
    }
}

function pesquisarInput(campoInput){
    let buscaFiltrada = produtos.filter(elem => elem.nome.toLowerCase().includes(campoInput.toLowerCase()) == true || 
    elem.secao.toLowerCase().includes(campoInput.toLowerCase()) == true || elem.categoria.toLowerCase().includes(campoInput.toLowerCase()) == true)
    wakeUpIndex(buscaFiltrada)
}