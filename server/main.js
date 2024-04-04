const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const soket = require("socket.io");
const io = soket(server)
app.use(express.json({ strict: false }))
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))

const operacionsPartida = require("./operacionsMongo/operacionsPartida")

const PORT = 3820;



server.listen(PORT, async () => {
  //iniciem les connexions a mongo per no alentir les operacions mes endavant
  await operacionsPartida.connexioPartida();
  console.log(`Server is running on http://localhost:${PORT}`);
});



//---------------------Crides android------------------//

io.on('connection', (socket, identificacio) => {
  //Utilitzem "identificacio" com el token que obtenen els usuaris a fer login per identificar qui es qui per evitar que el 2n player faci els moviments del primer jugador
  let codiSala

  socket.on('crearSala', async (dificultat, identificacio) => {
    partida = {
      dificultat: dificultat,
      codi: await operacionsPartida.generarNouCodiSala(),
      j1: identificacio
    }
    await operacionsPartida.crearPartida(partida)
    codiSala = partida.codi
    socket.join(codiSala)
    socket.to(codiSala).broadcast.emit('creacio', "Sala creada, bona sort jugant")
  })//Crear una sala

  socket.on('unirseAsala', async (codi, identificacio) => {
    await operacionsPartida.unirseAPartida(codi, identificacio)
    infoPartida = await operacionsPartida.buscarPartida(codi)
    socket.join(codiSala)
    socket.to(codiSala).broadcast.emit('creacio', infoPartida)
  })//Uneix el jugador a una sala i retorna la configuracio de la sala

  socket.on('moviment', (direccio) => {
    socket.to(codiSala).broadcast.emit('movimentJugador', { direccio, identificacio })
  })//enviar a android que l'altre jugador a començat a moures

  socket.on('acabarMoviment', (direccio) => {
    socket.to(codiSala).broadcast.emit('acabarMovimentJugador', { direccio, identificacio })
  })//enviar a android que l'altre jugador a acabat el moviment

  socket.on('atacar', () => {
    socket.to(codiSala).broadcast.emit('jugadorAtaca', { identificacio })
  })//enviar a android que l'altre jugador a atacat

  socket.on('desconectar', async () => {
    await operacionsPartida.tancarSala(codiPartida)
  })//tanca la sala

})//socket per permetre el multijugador a android, esta preparat per dos jugadors nomes
