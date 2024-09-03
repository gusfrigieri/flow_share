document.addEventListener('DOMContentLoaded', function () {
  const genero = document.getElementById('t3q1');
  const idade = document.getElementById('t3q2');
  const p2p1 = document.getElementById('t3q3');
  const ttp = document.getElementById('t3q4');
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

    // Verifica condições para exibir mensagens apropriadas
    if (!isNaN(valorTTP)) {
      if (valorTTP > 0.5) {
        adicionarMensagem('Repetir a monitorização para confirmar o valor do TTP, caso confirme avaliar a análise do fluxo sanguíneo cerebral.', 'red-bold');
        return; // Para a execução aqui se TTP > 0.5
      } else if (valorTTP > 0.3 && valorTTP <= 0.5) {
        adicionarMensagem('Exame sugestivo de hipertensão intracraniana, avalie a segurança em realizar a drenagem liquórica, e caso faça e comece a observar aumento nos valores da razão P2/P1 ao longo da monitorização, avalie a interrupção da coleta de liquor por risco de hipotensão liquórica.', 'red-bold');
        return; // Para a execução aqui se 0.3 < TTP <= 0.5
      }
    }

    if (!isNaN(valorP2P1)) {
      if (valorP2P1 <= 0.6) {
        adicionarMensagem('Exame sugestivo de risco de hipotensão liquórica, caso necessário, realize a drenagem liquórica com cautela para evitar piorar o quadro. Monitore o paciente durante a coleta do líquor, avalie a interrupção da coleta por risco de hipotensão intracraniana caso ocorra grandes variações no valor da razão P2/P1.', 'red-bold');
      } else if (valorP2P1 > 1.4) {
        adicionarMensagem('Exame sugestivo de hipertensão intracraniana, avalie a segurança em realizar a drenagem liquórica, e caso faça e comece a observar aumento nos valores da razão P2/P1 ao longo da monitorização, avalie a interrupção da coleta de liquor por risco de hipotensão liquórica.', 'red-bold');
      } else if ((generoValue === 'Masculino' || (generoValue === 'Feminino' && idadeValue < 40)) && valorP2P1 >= 1.2 && valorP2P1 < 1.4) {
        adicionarMensagem('Exame sugestivo de potencial risco de hipertensão intracraniana, avalie a segurança em realizar a drenagem liquórica, e caso faça e comece a observar aumento nos valores da razão P2/P1 ao longo da monitorização, avalie a interrupção da coleta de liquor por risco de hipotensão liquórica.', 'orange');
      } else if (generoValue === 'Feminino' && idadeValue >= 40 && valorP2P1 >= 1.2 && valorP2P1 < 1.4) {
        adicionarMensagem('Exame sugestivo de baixo risco de hipertensão intracraniana, caso necessário, realize a drenagem liquórica com cautela para evitar hipotensão liquórica. Monitore o paciente durante a coleta do líquor, caso o valor da razão P2/P1 fique em algum momento abaixo de 0.6 ou comece a crescer, avalie a interrupção da coleta por risco de hipotensão intracraniana.', 'green-bold');
      } else if (valorP2P1 >= 0.6 && valorP2P1 < 1.2) {
        adicionarMensagem('Exame sugestivo de baixo risco de hipertensão intracraniana, caso necessário, realize a drenagem liquórica com cautela para evitar hipotensão liquórica. Monitore o paciente durante a coleta do líquor, caso o valor da razão P2/P1 fique em algum momento abaixo de 0.6 ou comece a crescer, avalie a interrupção da coleta por risco de hipotensão intracraniana.', 'green-bold');
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
