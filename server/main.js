const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const soket = require("socket.io");
app.use(express.json({ strict: false }))
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))

const operacionsBroadcast = require("./operacionsMongo/operacionsBroadcast");

const PORT = 3817;

server.listen(PORT, async () => {
  //iniciem les connexions a mongo per no alentir les operacions mes endavant
  await operacionsBroadcast.connexioBroadcast();
  console.log(`Server is running on http://localhost:${PORT}`);
});

//---------------------Crides interficie------------------//

app.post("/broadcast", async (req, res) => {
  console.log(req.body)
  missatge = {
    enunciat: req.body.titol,
    text: req.body.cos,
    fecha: new Date()
  }
  await operacionsBroadcast.crearBroadcast(missatge)

})//reb un missatge i l'enmagatzema a la base de dades per poder recollir desde android


//---------------------Crides android------------------//


app.get("/veureBroadcasts", async (req, res) => {
  let missatges = [{}]
  missatges = await operacionsBroadcast.enviarBroadcast()
  missatges = missatges.sort((a, b) => {
    if (a.fecha > b.fecha) {
      return -1
    }
  });
  res.json(missatges)
})//reenvia tots els broadcasts de la base de dades a android

