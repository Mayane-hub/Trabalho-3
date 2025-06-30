const pontos = [
    {
      id: 1,
      nome: "Bloco A",
      local: "Proximo a entrada principal",
      capacidade: 10,
      atual: 3,
      coberto: true,
      iluminado: true
    },
    {
      id: 2,
      nome: "Bloco B",
      local: "Ao lado do refeitorio",
      capacidade: 8,
      atual: 7,
      coberto: false,
      iluminado: true
    },
    {
      id: 3,
      nome: "Bloco C",
      local: "Estacionamento lateral",
      capacidade: 5,
      atual: 5,
      coberto: true,
      iluminado: false
    }
  ];
  
  function getStatus(ponto) {
    const ocupacao = ponto.atual / ponto.capacidade;
    if (ocupacao >= 1) return "lotado";
    if (ocupacao >= 0.8) return "quase-cheio";
    return "disponivel";
  }
  
  function renderPontos() {
    const container = document.getElementById('parking-list');
    container.innerHTML = '';
  
    pontos.forEach((ponto, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', `Ponto ${ponto.nome}`);
      card.dataset.status = getStatus(ponto);
  
      card.innerHTML = `
        <h2>${ponto.nome}</h2>
        <p><strong>Local:</strong> ${ponto.local}</p>
        <p><strong>Capacidade:</strong> ${ponto.capacidade}</p>
        <p><strong>Ocupado:</strong> ${ponto.atual}</p>
        <div>
          <button onclick="alterarBicicleta(${index}, 1)" aria-label="Adicionar bicicleta"></button>
          <button onclick="alterarBicicleta(${index}, -1)" aria-label="Remover bicicleta"></button>
          <button onclick="mostrarDetalhes(${index})" aria-label="Ver detalhes"></button>
        </div>
      `;
      container.appendChild(card);
    });
  }
  
  function alterarBicicleta(index, delta) {
    const ponto = pontos[index];
    ponto.atual = Math.max(0, Math.min(ponto.capacidade, ponto.atual + delta));
    renderPontos();
  }
  
  function mostrarDetalhes(index) {
    const ponto = pontos[index];
    const modal = document.getElementById('modal');
    const info = `
      <strong>Nome:</strong> ${ponto.nome}<br>
      <strong>Local:</strong> ${ponto.local}<br>
      <strong>Capacidade:</strong> ${ponto.capacidade}<br>
      <strong>Ocupado:</strong> ${ponto.atual}<br>
      <strong>Coberto:</strong> ${ponto.coberto ? 'Sim' : 'Nao'}<br>
      <strong>Iluminado:</strong> ${ponto.iluminado ? 'Sim' : 'No'}
    `;
    document.getElementById('modal-info').innerHTML = info;
    modal.classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('modal').classList.add('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', renderPontos);
  
