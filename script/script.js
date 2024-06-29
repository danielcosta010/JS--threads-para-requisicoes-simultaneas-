import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dolar',
      data: [],
      borderWidth: 1
    }]
  }
});


function geraHorario() {
  const data = new Date()
  const adicionaZero = (num) => (num < 10 ? '0' : '') + num
  const horario = `${adicionaZero(data.getHours())}:${adicionaZero(data.getMinutes())}:${adicionaZero(data.getSeconds())}`
  return horario;
}

function adicionaDados(grafico, legenda, dados) {
  grafico.data.labels.push(legenda)
  grafico.data.datasets.forEach((fiveSegundos) => {
    fiveSegundos.data.push(dados)
  })
  grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd')

workerDolar.addEventListener('message', event => {
  const hora = geraHorario();
  const valor = event.data;
  adicionaDados(graficoParaDolar, hora, valor)
  selecionaCotacao('Dolar', valor)

})

const graficoIene = document.getElementById('graficoIene')

const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1
    }]
  }

})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('jpy');

workerIene.addEventListener('message', event => {
  const hora = geraHorario();
  const valor = event.data;
  adicionaDados(graficoParaIene, hora, valor);
  selecionaCotacao('Iene', valor)
})

let graficoEuro = document.getElementById('graficoEuro');
const graficoParaEuro = new Chart(graficoEuro, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 1
    }]
  }
})

let workerEuro = new Worker('./script/workers/workerEuro.js');
workerEuro.postMessage('eur');

workerEuro.addEventListener('message', event => {
  const hora = geraHorario();
  const valor = event.data;
  adicionaDados(graficoParaEuro, hora, valor);
  selecionaCotacao('Euro', valor)
})