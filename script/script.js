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

async function conectaAPI() {
  const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
  const conectaTraduzido = await conecta.json()
  const hora = geraHorario();
  const valor = conectaTraduzido.USDBRL.ask
  adicionaDados(graficoParaDolar, hora, valor)
  
}

setInterval(() => conectaAPI(), 5000);

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

