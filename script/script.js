import imprimeCotacao from "./imprimeCotacao.js";

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
  const horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
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
  const valor = event.data.ask;
  adicionaDados(graficoParaDolar, hora, valor)
  imprimeCotacao('Dolar', valor)

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