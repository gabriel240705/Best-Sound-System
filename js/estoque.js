const formProduto = document.getElementById("form-produto");
const listaProdutos = document.getElementById("lista-produtos");
const buscaProduto = document.getElementById("busca-produto");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function mostrarProdutos() {
  listaProdutos.innerHTML = "";

  if (produtos.length === 0) {
    listaProdutos.innerHTML = "<p>Nenhum produto cadastrado.</p>";
    return;
  }

  produtos.forEach((produto, index) => {
    const item = document.createElement("div");

    item.classList.add("card-produto");

   if (produto.quantidade <= produto.estoqueMinimo) {
  item.classList.add("estoque-baixo-card");
  }

    item.innerHTML = `
      <h3>${produto.nome}</h3>
      ${produto.quantidade <= produto.estoqueMinimo
         ? '<p class="alerta-estoque">⚠ Estoque baixo</p>'
         : ''}
      <p><strong>Marca:</strong> ${produto.marca || "Não informada"}</p>
      <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
      <p><strong>Estoque mínimo:</strong> ${produto.estoqueMinimo}</p>
      <p><strong>Custo:</strong> R$ ${produto.custo.toFixed(2)}</p>
      <p><strong>Venda:</strong> R$ ${produto.venda.toFixed(2)}</p>

      <button onclick="entradaProduto(${index})">+ Entrada</button>
      <button onclick="saidaProduto(${index})">- Saída</button>
      <button onclick="excluirProduto(${index})">
        Excluir
      </button>

      <hr>
    `;

    listaProdutos.appendChild(item);
  });
}

function entradaProduto(index) {
  produtos[index].quantidade++;

  salvarProdutos();
  mostrarProdutos();
}

function saidaProduto(index) {
  if (produtos[index].quantidade > 0) {
    produtos[index].quantidade--;

    salvarProdutos();
    mostrarProdutos();
  } else {
    alert("Esse produto já está zerado.");
  }
}

formProduto.addEventListener("submit", function(event) {
  event.preventDefault();

  const novoProduto = {
    nome: document.getElementById("produto").value,
    marca: document.getElementById("marca").value,
    quantidade: Number(document.getElementById("quantidade").value),
    estoqueMinimo: Number(document.getElementById("estoque-minimo").value),
    custo: Number(document.getElementById("custo").value) || 0,
    venda: Number(document.getElementById("venda").value) || 0
  };

  produtos.push(novoProduto);

  salvarProdutos();

  formProduto.reset();

  mostrarProdutos();
});


function mostrarProdutos(filtro = "") {
  listaProdutos.innerHTML = "";

  const produtosFiltrados = produtos.filter((produto) => {
    const nome = produto.nome.toLowerCase();
    const marca = (produto.marca || "").toLowerCase();
    const textoBusca = filtro.toLowerCase();

    return nome.includes(textoBusca) || marca.includes(textoBusca);
  });

  if (produtosFiltrados.length === 0) {
    listaProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  produtosFiltrados.forEach((produto) => {
    const index = produtos.indexOf(produto);

    const item = document.createElement("div");

    item.classList.add("card-produto");

    if (produto.quantidade <= produto.estoqueMinimo) {
      item.classList.add("estoque-baixo-card");
    }

    item.innerHTML = `
      <h3>${produto.nome}</h3>

      ${produto.quantidade <= produto.estoqueMinimo
        ? '<p class="alerta-estoque">⚠ Estoque baixo</p>'
        : ''}

      <p><strong>Marca:</strong> ${produto.marca || "Não informada"}</p>
      <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
      <p><strong>Estoque mínimo:</strong> ${produto.estoqueMinimo}</p>
      <p><strong>Custo:</strong> R$ ${produto.custo.toFixed(2)}</p>
      <p><strong>Venda:</strong> R$ ${produto.venda.toFixed(2)}</p>

      <button onclick="entradaProduto(${index})">+ Entrada</button>
      <button onclick="saidaProduto(${index})">- Saída</button>
      <button onclick="excluirProduto(${index})">Excluir</button>

      <hr>
    `;

    listaProdutos.appendChild(item);
  });
}
buscaProduto.addEventListener("input", function() {
  mostrarProdutos(buscaProduto.value);
});

mostrarProdutos();