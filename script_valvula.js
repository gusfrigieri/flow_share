document.addEventListener('DOMContentLoaded', function () {
  const t4q1 = document.getElementById('t4q1');
  const t4q2 = document.getElementById('t4q2');
  const messagesDiv = document.getElementById('messages');

  // Adiciona eventos de input para atualizar as mensagens dinamicamente
  t4q1.addEventListener('input', atualizarMensagens);
  t4q2.addEventListener('input', atualizarMensagens);

  function atualizarMensagens() {
    // Limpa mensagens anteriores
    messagesDiv.innerHTML = '';

    const valorT4Q1 = parseFloat(t4q1.value);
    const valorT4Q2 = parseFloat(t4q2.value);

    // Verifica condições para exibir mensagens apropriadas
    if (!isNaN(valorT4Q1) && !isNaN(valorT4Q2)) {
      if (valorT4Q1 < 0.6 || valorT4Q2 < 0.6) {
        adicionarMensagem('Suspeita de hiperdrenagem, avalie reduzir o fluxo da derivação ventricular.', 'red');
      } else if (valorT4Q1 > valorT4Q2 && valorT4Q1 >= 0.6 && valorT4Q1 <= 1.2 && valorT4Q2 >= 0.6 && valorT4Q2 <= 1.2) {
        adicionarMensagem('Resultado sugestivo de funcionamento normal do sistema de derivação ventricular.', 'green-bold');
      } else if (valorT4Q1 >= 0.8 && valorT4Q1 <= 1.2 && valorT4Q2 >= 0.8 && valorT4Q2 <= 1.2) {
        if (valorT4Q1 > valorT4Q2) {
          adicionarMensagem('Exame sugestivo de funcionamento normal do sistema de derivação ventricular.', 'green-dark');
        } else {
          adicionarMensagem('Resultado sugestivo de baixo risco de hiperdrenagem do sistema de derivação ventricular. Avalie sintomas e necessidade de redução da drenagem do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'orange');
        }
      } else if (valorT4Q1 > 1.2 && valorT4Q1 < 1.4 && valorT4Q1 > valorT4Q2) {
        adicionarMensagem('Paciente com risco de hipertensão intracraniana, avalie os sintomas e a necessidade de aumentar o fluxo do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'orange');
      } else if (valorT4Q1 >= 1.4 && valorT4Q1 > valorT4Q2) {
        adicionarMensagem('Paciente com alto risco de hipertensão intracraniana, avalie os sintomas e a necessidade de aumentar o fluxo do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'red');
      } else if (valorT4Q1 > 1.2 && valorT4Q2 > valorT4Q1) {
        adicionarMensagem('Exame sugestivo de hiperdrenagem liquórica, avalie a clínica do paciente e a possibilidade em reduzir o fluxo do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'red');
      } else if (valorT4Q2 > valorT4Q1) {
        if (valorT4Q2 >= 1.4) {
          adicionarMensagem('Resultado sugestivo de hiperdrenagem, avalie a clínica do paciente e a possibilidade em reduzir o fluxo do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'red');
        } else {
          adicionarMensagem('Resultado sugestivo de hiperdrenagem, avalie a clínica do paciente e a possibilidade em reduzir o fluxo do sistema de derivação ventricular. Reagende nova monitorização para continuar o acompanhando do paciente.', 'orange');
        }
      }
    }
  }

  function adicionarMensagem(texto, cor) {
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = 'message ' + cor;
    messagesDiv.appendChild(p);
  }

  window.voltar = function() {
    window.location.href = 'index.html';
  };
});
