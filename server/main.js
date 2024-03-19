const express = require("express");
//const http = require("http");
const cors = require("cors");
const app = express();
//const server = http.createServer(app);
//const { Server } = require("socket.io");
//const path = require('path');
const crypto = require('crypto');

app.use(express.json({ strict: false }))
//app.use(bodyParser.json());
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))

const operacionsAssets = require("./operacionsMongo/operacionsAssets");
const operacionsUser = require("./operacionsMongo/operacionsUsuaris");
const operacionsProta = require("./operacionsMongo/operacionsProtagonista");
const operacionsEnemic = require("./operacionsMongo/opercionsEnemics");
const operacionsOdoo = require("./operacionsOdoo/operacionsOdoo");
const operacionsBroadcast = require("./operacionsMongo/operacionsBroadcast");

const PORT = 3817;
app.listen(PORT, async () => {
  await operacionsAssets.connexioAssets();
  await operacionsEnemic.connexioEnemics();
  await operacionsProta.connexioJugador();
  await operacionsUser.connexioUsuari();
  await operacionsBroadcast.connexioBroadcast();
  console.log(`Server is running on http://localhost:${PORT}`);

});



//---------------------Crides interficie------------------//

app.get("/controlTenda", async (req, res) => {
  let productes = await operacionsAssets.obtenirAssets();
  //productes=JSON.parse(productes);
  res.json(productes)
})//envia tots els assets de la bbdd a interficie

app.post("/actualitzarAsset", async (req, res) => {
  asset = req.body;
  await operacionsAssets.editarAsset(asset)
})//reb un asset desde interficie i actualitza el registre a mongo

app.post("/actualitzarProtagonista", async (req, res) => {
  console.log("info prota updated")
  novesStats = req.body
  console.log("noves stats: ", req.body)
  await operacionsProta.actualitzarStatsProta(novesStats)
})//reb un objecte protagonista i actualitza el de la bbdd

app.post("/actualitzarEnemic", async (req, res) => {
  novesStats = req.body.stats
  await operacionsEnemic.actualitzarStatsEnemic(novesStats)
})//reb un objecte enemic i actualitza el de la bbdd per id

app.post("/broadcast", async (req, res) => {
  missatge = {
    enunciat: req.body.titol,
    text: req.body.cos
  }
  await operacionsBroadcast.crearBroadcast(missatge)

})//reb un missatge i l'enmagatzema a la base de dades per poder recollir desde android

//---------------------Crides android------------------//

app.post("/loginUser", async (req, res) => {
  username = req.body.user;
  passwd = req.body.contrasenya
  passwd = desencriptar(passwd)
  let validacio = operacionsUser.logejarUser(username, passwd);
  if (validacio != null) {
    resposta = {
      permis: true
    }
  }
  else {
    resposta = {
      permis: false
    }
  }
  res.json(resposta)
})//permet autoritzar el login del usuari

app.post("/registerUser", async (req, res) => {
  usuari = req.body.user
  contrasenya = encriptar(req.body.passwd)
  email = req.body.correu

})//crea un registre del usuari a la bbdd 

app.get("/veureTenda", async (req, res) => {
  productes = await operacionsAssets.obtenirTenda()
  res.json(productes)
})//agafa els productes en venta i els envia al solicitant

//---------------------Crides multiplataforma------------------//

app.get("/statsProta", async (req, res) => {
  stats = await operacionsProta.obtenirStatsProta()
  res.json(stats)
  console.log("info prota collected:");
  console.log(stats);
})//retorna tots els protagonista

app.get("/statsEnemics", async (req, res) => {
  stats = await operacionsEnemic.obtenirStatsEnemics()
  res.json(stats)
  console.log("info enemics collected:")
  console.log(stats)

})//retorna tots els enemics

//---------------------Procesos odoo------------------//


//---------------------Funcions auxiliars------------------//

function encriptar(data) {
  const cipher = crypto.createCipher('aes-256-cbc', 'a password');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
} //encripta la contrasenya per poder guardarla a la bbdd

function desencriptar(data) {
  const decipher = crypto.createDecipher('aes-256-cbc', 'a password');
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted
} //desencripta la contrasenya per poder validar el login