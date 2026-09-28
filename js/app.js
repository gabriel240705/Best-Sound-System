const btnAgenda = document.getElementById("btn-agenda");
const btnEstoque = document.getElementById("btn-estoque");
const agendaHoje = document.getElementById("agenda-hoje");
const totalAgendamentos = document.getElementById("total-agendamentos");
const totalProdutos = document.getElementById("total-produtos");
const estoqueBaixo = document.getElementById("estoque-baixo");
const listaEstoqueBaixo = document.getElementById("lista-estoque-baixo");

btnAgenda.addEventListener("click", function () {
  window.location.href = "agenda.html";
});

btnEstoque.addEventListener("click", function () {
  window.location.href = "estoque.html";
});

function atualizarResumo() {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  totalAgendamentos.textContent = agendamentos.length;

  totalProdutos.textContent = 0;
  estoqueBaixo.textContent = 0;
}

function atualizarResumo() {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  const dataHoje = `${ano}-${mes}-${dia}`;

  const agendamentosHoje = agendamentos.filter((agendamento) => {
  return agendamento.data === dataHoje;
});

totalAgendamentos.textContent = agendamentosHoje.length;
agendaHoje.innerHTML = "";

agendamentosHoje
  .sort((a, b) => a.hora.localeCompare(b.hora))
  .forEach((agendamento) => {
    const item = document.createElement("div");

    item.classList.add("card-resumo");

    item.innerHTML = `
      <strong>${agendamento.hora} - ${agendamento.cliente}</strong>
      <p>${agendamento.carro}</p>
      <p>${agendamento.servico}</p>
      <span>${agendamento.status || "Agendado"}</span>
    `;

    agendaHoje.appendChild(item);
  });

if (agendamentosHoje.length === 0) {
  agendaHoje.innerHTML = "<p>Nenhum agendamento para hoje.</p>";
}
  totalProdutos.textContent = produtos.length;

  const produtosEstoqueBaixo = produtos.filter((produto) => {
    return produto.quantidade <= produto.estoqueMinimo;
  });

  estoqueBaixo.textContent = produtosEstoqueBaixo.length;
  listaEstoqueBaixo.innerHTML = "";

produtosEstoqueBaixo.forEach((produto) => {
  const item = document.createElement("div");

  item.classList.add("card-resumo");

  item.innerHTML = `
    <strong>${produto.nome}</strong>
    <p>Marca: ${produto.marca || "Não informada"}</p>
    <p>Quantidade: ${produto.quantidade}</p>
    <p>Estoque mínimo: ${produto.estoqueMinimo}</p>
  `;

  listaEstoqueBaixo.appendChild(item);
});

if (produtosEstoqueBaixo.length === 0) {
  listaEstoqueBaixo.innerHTML = "<p>Nenhum produto com estoque baixo.</p>";
}
}

atualizarResumo();