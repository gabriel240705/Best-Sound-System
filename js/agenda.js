const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

function salvarAgendamentos() {
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

function mostrarAgendamentos() {
  lista.innerHTML = "";

  if (agendamentos.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
    return;
  }
  agendamentos.sort((a, b) => {
  const dataHoraA = `${a.data}T${a.hora}`;
  const dataHoraB = `${b.data}T${b.hora}`;

  return dataHoraA.localeCompare(dataHoraB);
});

  agendamentos.forEach((agendamento, index) => {
    const item = document.createElement("div");
    item.classList.add("card-agendamento");
    const dataFormatada = new Date(
      agendamento.data + "T00:00:00"
    ).toLocaleDateString("pt-BR");

    item.innerHTML = `
      <h3>${agendamento.cliente}</h3>

      <p><strong>Carro:</strong> ${agendamento.carro}</p>
      <p><strong>Placa:</strong> ${agendamento.placa || "Não informada"}</p>
      <p><strong>Serviço:</strong> ${agendamento.servico}</p>
      <p><strong>Data:</strong> ${dataFormatada}</p>
      <p><strong>Hora:</strong> ${agendamento.hora}</p>

      <p><strong>Status:</strong></p>

      <select onchange="alterarStatus(${index}, this.value)">
        <option value="Agendado" ${agendamento.status === "Agendado" || !agendamento.status ? "selected" : ""}>
          Agendado
        </option>

        <option value="Em serviço" ${agendamento.status === "Em serviço" ? "selected" : ""}>
          Em serviço
        </option>

        <option value="Pronto" ${agendamento.status === "Pronto" ? "selected" : ""}>
          Pronto
        </option>

        <option value="Entregue" ${agendamento.status === "Entregue" ? "selected" : ""}>
          Entregue
        </option>
      </select>

      <button onclick="excluirAgendamento(${index})">
      Excluir
      </button>

      <hr>
    `;

    lista.appendChild(item);
  });
}

function alterarStatus(index, novoStatus) {
  agendamentos[index].status = novoStatus;

  salvarAgendamentos();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const novoAgendamento = {
    cliente: document.getElementById("cliente").value,
    carro: document.getElementById("carro").value,
    placa: document.getElementById("placa").value,
    servico: document.getElementById("servico").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    status: document.getElementById("status").value
  };

  agendamentos.push(novoAgendamento);

  salvarAgendamentos();

  form.reset();

  mostrarAgendamentos();
});
function excluirAgendamento(index) {
  const confirmar = confirm("Deseja realmente excluir este agendamento?");

  if (confirmar) {
    agendamentos.splice(index, 1);

    salvarAgendamentos();
    mostrarAgendamentos();
  }
}

mostrarAgendamentos();