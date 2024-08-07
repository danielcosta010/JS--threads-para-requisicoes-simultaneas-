addEventListener('message', () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 5000)
})

async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/last/EUR-BRL')
  const conectaJson = await conecta.json();
  postMessage(conectaJson.EURBRL.ask)
}