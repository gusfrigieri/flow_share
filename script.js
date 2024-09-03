document.addEventListener('DOMContentLoaded', function () {
  const genero = document.getElementById('t2q1');
  const idade = document.getElementById('t2q2');
  const p2p1 = document.getElementById('t2q3');
  const ttp = document.getElementById('t2q4');
  const messagesDiv = document.getElementById('messages');
  const tabelaFatores = document.getElementById('tabela-fatores');
  const btnProximoPasso = document.getElementById('btn-proximo-passo');
  const btnPassoAnterior = document.getElementById('btn-passo-anterior');

  // Elementos de Passos
  const passos = [
    tabelaFatores,
    document.getElementById('passo-2'),
    document.getElementById('passo-3'),
    document.getElementById('passo-4'),
    document.getElementById('passo-5'),
    document.getElementById('passo-final')
  ];

  let passoAtual = 0;

  p2p1.addEventListener('input', atualizarMensagens);
  ttp.addEventListener('input', atualizarMensagens);

  function atualizarMensagens() {
    messagesDiv.innerHTML = '';
    esconderPassos();
    btnProximoPasso.style.display = 'none';
    btnPassoAnterior.style.display = 'none';

    const valorP2P1 = parseFloat(p2p1.value);
    const valorTTP = parseFloat(ttp.value);
    const generoValue = genero.value;
    const idadeValue = parseInt(idade.value);

    if (!isNaN(valorTTP)) {
      if (valorTTP >= 0.5) {
        adicionarMensagem('Refaça a monitorização, caso o valor de TTP continue acima de 0.5 avalie o fluxo sanguíneo cerebral', 'red');
        return;
      }
      if (valorTTP >= 0.3) {
        adicionarMensagem('Sugestivo de alto risco de hipertensão intracraniana', 'red');
        exibirPasso(0);
        btnProximoPasso.style.display = 'inline-block';
        return;
      }
    }

    if (!isNaN(valorP2P1)) {
      if (valorP2P1 < 0.6) {
        adicionarMensagem('Avaliar possibilidade do paciente apresentar hipotensão liquórica, redução do fluxo sanguíneo cerebral e hipovolemia', 'red');
        adicionarMensagem('Continue com monitorizações frequentes para continuar acompanhando o quadro do paciente', 'black');
      } else if (valorP2P1 >= 0.6 && valorP2P1 < 0.8) {
        adicionarMensagem('Paciente com baixíssimo risco de hipertensão intracraniana', 'green-dark');
        adicionarMensagem('Continue com monitorizações frequentes para continuar acompanhando o quadro do paciente', 'black');
      } else if (valorP2P1 >= 0.8 && valorP2P1 < 1.2) {
        adicionarMensagem('Paciente com baixo risco de hipertensão intracraniana', 'green-dark');
        adicionarMensagem('Continue com monitorizações frequentes para continuar acompanhando o quadro do paciente', 'black');
      } else if ((generoValue === 'Feminino' && idadeValue > 40 && valorP2P1 >= 1.2 && valorP2P1 < 1.4) || (generoValue === 'Masculino' && valorP2P1 >= 1.2 && valorP2P1 < 1.4) || (generoValue === 'Feminino' && idadeValue <= 40 && valorP2P1 >= 1.2 && valorP2P1 < 1.4)) {
        adicionarMensagem('Paciente em risco potencial de hipertensão intracraniana', 'orange');
        exibirPasso(0);
        btnProximoPasso.style.display = 'inline-block';
      } else if (valorP2P1 >= 1.4) {
        adicionarMensagem('Paciente com alto risco de hipertensão intracraniana', 'red');
        exibirPasso(0);
        btnProximoPasso.style.display = 'inline-block';
      }
    }
  }

  function adicionarMensagem(texto, cor) {
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = 'message ' + cor;
    messagesDiv.appendChild(p);
  }

  function esconderPassos() {
    passos.forEach(passo => passo.style.display = 'none');
  }

  function exibirPasso(indice) {
    passos[indice].style.display = 'block';
    passoAtual = indice;

    if (indice === passos.length - 1) {
      // No passo final, adicionar o botão "Voltar" junto aos outros botões
      btnProximoPasso.style.display = 'none';
      btnPassoAnterior.style.display = 'none';
      adicionarBotaoVoltar();
    } else {
      if (indice > 0) {
        btnPassoAnterior.style.display = 'inline-block';
      }
      btnProximoPasso.style.display = 'inline-block';
    }
  }

  function adicionarBotaoVoltar() {
    const btnVoltar = document.createElement('button');
    btnVoltar.textContent = 'Voltar';
    btnVoltar.className = 'btn-voltar';
    btnVoltar.onclick = function() {
      window.location.href = 'index.html';
    };
    // Adiciona o botão "Voltar" na div de botões para manter a consistência visual
    document.querySelector('.button-container').appendChild(btnVoltar);
  }

  window.proximoPasso = function() {
    if (passoAtual < passos.length - 1) {
      esconderPassos();
      exibirPasso(passoAtual + 1);
    }
  };

  window.passoAnterior = function() {
    if (passoAtual > 0) {
      esconderPassos();
      exibirPasso(passoAtual - 1);
    }
  };

  window.reinserirDados = function() {
    p2p1.value = '';
    ttp.value = '';
    messagesDiv.innerHTML = '';
    esconderPassos();
    btnProximoPasso.style.display = 'none';
    btnPassoAnterior.style.display = 'none';
  };

  window.novaMonitorizacao = function() {
    genero.value = '';
    idade.value = '';
    p2p1.value = '';
    ttp.value = '';
    messagesDiv.innerHTML = '';
    esconderPassos();
    btnProximoPasso.style.display = 'none';
    btnPassoAnterior.style.display = 'none';
  };
});
