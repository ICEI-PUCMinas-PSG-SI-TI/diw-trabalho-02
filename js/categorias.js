const produtosContainer = document.getElementById('produtos');

window.addEventListener("load", async event => {

    const searchParams = new URL(location.href).searchParams
    let categoria = searchParams.get('categoria')
    let produtos = await listarProdutosCategoria(categoria);

    produtosContainer.innerHTML += `<h4 style="color: rgb(255, 101, 0);"> ${categoria.split(" - ")[0]} </h4>`;
    produtosContainer.innerHTML += `<div class="row gap-2 justify-content-center">
                                        ${renderizarProdutos(produtos, 4)}
                                    </div>`


})

function renderizarProdutos(produtos, limit) {
    let products = "";
    for (let i = 0; i < (limit > produtos.length ? produtos.length : limit); i++) {

        let produto = produtos[i]
        let avaliacao = produto.rating.rate
        let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

        products += `
                <a href="./screens/detalhes.html?id=${produto.id}" class="col text-decoration-none  py-2 border rounded my-2 text-black"> 
                    <div class="px-3">
                        <img class="d-block ${produtos.length == 1 ? "" : "m-auto"}" width="107px" src=${produto.image} alt="Card image cap">
                    </div>

                    <div class="">
                        <h1 class="fs-6">${produto.title}</h1>
                        <small><span class="text-decoration-line-through small-text"> R$${((produto.price) * (1.2)).toFixed(2)} </span></small> 
                        <h5 style="color: rgb(255, 101, 0);" class="fw-bold"> R$${(produto.price).toFixed(2)} </h5>
                        <small>  <span> (${avaliacao}) </span>${estrelasAvaliacao.innerHTML} </small> 
                    </div>
                </a>`

    }
    return products
}

function criaElementoAvaliacao(rate) {
    let myDiv = document.createElement('div')
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rate)) {
            myDiv.innerHTML += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`
        } else {
            myDiv.innerHTML += `<i class="fa-solid fa-star" style="color: #cccccc;"></i>`
        }
    }
    return myDiv
}
