const btnAgenda = document.getElementById("btn-agenda");
const btnEstoque = document.getElementById("btn-estoque");

const totalAgendamentos = document.getElementById("total-agendamentos");
const totalProdutos = document.getElementById("total-produtos");
const estoqueBaixo = document.getElementById("estoque-baixo");

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

  totalProdutos.textContent = produtos.length;

  const produtosEstoqueBaixo = produtos.filter((produto) => {
    return produto.quantidade <= produto.estoqueMinimo;
  });

  estoqueBaixo.textContent = produtosEstoqueBaixo.length;
}

atualizarResumo();