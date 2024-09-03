document.addEventListener('DOMContentLoaded', function () {
  const genero = document.getElementById('t2q1');
  const idade = document.getElementById('t2q2');
  const p2p1 = document.getElementById('t2q3');
  const ttp = document.getElementById('t2q4');
  const messagesDiv = document.getElementById('messages');

  // Adiciona eventos de input para atualizar as mensagens dinamicamente
  p2p1.addEventListener('input', atualizarMensagens);
  ttp.addEventListener('input', atualizarMensagens);

  function atualizarMensagens() {
    // Limpa mensagens anteriores
    messagesDiv.innerHTML = '';

    const valorP2P1 = parseFloat(p2p1.value);
    const valorTTP = parseFloat(ttp.value);
    const generoValue = genero.value;
    const idadeValue = parseInt(idade.value);
    let mensagemCritica = false;

    // Verifica condições para exibir mensagens apropriadas
    if (!isNaN(valorTTP)) {
      if (valorTTP >= 0.5) {
        adicionarMensagem('Refaça a monitorização, caso o valor de TTP continue acima de 0.5 avalie o fluxo sanguíneo cerebral', 'red');
        mensagemCritica = true;
      } else if (valorTTP >= 0.3) {
        adicionarMensagem('Sugestivo de alto risco de hipertensão intracraniana', 'red');
        mensagemCritica = true;
      }
    }

    if (!isNaN(valorP2P1)) {
      if (valorP2P1 < 0.6) {
        adicionarMensagem('Avaliar possibilidade do paciente apresentar hipotensão liquórica, redução do fluxo sanguíneo cerebral e hipovolemia', 'red');
        mensagemCritica = true;
      } else if (valorP2P1 >= 0.6 && valorP2P1 < 0.8) {
        adicionarMensagem('Paciente com baixíssimo risco de hipertensão intracraniana', 'green-dark');
        adicionarMensagem('Continue com monitorizações frequentes para continuar acompanhando o quadro do paciente', 'black');
      } else if (valorP2P1 >= 0.8 && valorP2P1 < 1.2) {
        adicionarMensagem('Paciente com baixo risco de hipertensão intracraniana', 'green-light');
        adicionarMensagem('Continue com monitorizações frequentes para continuar acompanhando o quadro do paciente', 'black');
      } else if ((generoValue === 'Feminino' && idadeValue > 40 && valorP2P1 >= 1.2 && valorP2P1 < 1.4) ||
                 (generoValue === 'Masculino' && valorP2P1 >= 1.2 && valorP2P1 < 1.4) ||
                 (generoValue === 'Feminino' && idadeValue <= 40 && valorP2P1 >= 1.2 && valorP2P1 < 1.4)) {
        adicionarMensagem('Paciente em risco potencial de hipertensão intracraniana', 'orange');
        mensagemCritica = true;
      } else if (valorP2P1 >= 1.4) {
        adicionarMensagem('Paciente com alto risco de hipertensão intracraniana', 'red');
        mensagemCritica = true;
      }
    }

    // Exibir mensagem adicional se houver mensagens críticas (vermelhas ou laranjas)
    if (mensagemCritica) {
      adicionarMensagem('Reagende nova monitorização com o sistema brain4care, avalie a clínica, outros exames complementares e caso julgue necessário e a clínica indique, encaminhe para atendimento especializado.', 'black');
    }
  }

  function adicionarMensagem(texto, cor) {
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = 'message ' + cor;
    messagesDiv.appendChild(p);
  }

  window.reinserirDados = function() {
    p2p1.value = '';
    ttp.value = '';
    messagesDiv.innerHTML = ''; // Limpa as mensagens
  };

  window.novaMonitorizacao = function() {
    genero.value = '';
    idade.value = '';
    p2p1.value = '';
    ttp.value = '';
    messagesDiv.innerHTML = ''; // Limpa as mensagens
  };

  window.voltar = function() {
    window.location.href = 'index.html';
  };
});
