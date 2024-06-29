async function conectaAPI() {
  const conecta = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
  const conectaJson = await conecta.json();
  postMessage(conectaJson.USDBRL.ask)

}

addEventListener('message', () => {
  conectaAPI()
  setInterval(() => conectaAPI(), 5000)
})