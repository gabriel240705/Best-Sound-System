const form = document.getElementById("form-agendamento");
const lista = document.getElementById("lista-agendamentos");

let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

function mostrarAgendamentos() {
  lista.innerHTML = "";

  if (agendamentos.length === 0) {
    lista.innerHTML = "<p>Nenhum agendamento cadastrado.</p>";
    return;
  }

  agendamentos.forEach((agendamento) => {
    const item = document.createElement("div");

    item.innerHTML = `
      <h3>${agendamento.cliente}</h3>
      <p><strong>Carro:</strong> ${agendamento.carro}</p>
      <p><strong>Placa:</strong> ${agendamento.placa || "Não informada"}</p>
      <p><strong>Serviço:</strong> ${agendamento.servico}</p>
      <p><strong>Data:</strong> ${agendamento.data}</p>
      <p><strong>Hora:</strong> ${agendamento.hora}</p>
      <hr>
    `;

    lista.appendChild(item);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const novoAgendamento = {
    cliente: document.getElementById("cliente").value,
    carro: document.getElementById("carro").value,
    placa: document.getElementById("placa").value,
    servico: document.getElementById("servico").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value
  };

  agendamentos.push(novoAgendamento);

  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

  form.reset();

  mostrarAgendamentos();
});

mostrarAgendamentos();