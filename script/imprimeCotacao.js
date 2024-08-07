const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao(nome, valor) {
  lista.forEach((listaEscolhida) => {
    if(listaEscolhida.id == nome) {
      imprimeCotacao(listaEscolhida, nome, valor)
    }
  })
}

function imprimeCotacao(lista, nome, valor) {
  lista.innerHTML = '';
  const plurais = {
    'Dolar' : 'Dolares',
    'Iene' : 'Ienes',
    'Euro' : 'Euros'
  }

  for(let multiplicador  = 1; multiplicador <= 1000; multiplicador *= 10) {
    const listaItem = document.createElement('li');
    listaItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plurais[nome]}: R$${(multiplicador * valor).toFixed(2)}`;
    lista.appendChild(listaItem);
  }
};

export default selecionaCotacao;