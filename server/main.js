const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
app.use(express.json({ strict: false }))
app.use(bodyParser.json());
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
const operacionsOdoo = require("./operacionsOdoo/operacionsOdoo")


const PORT = process.env.PORT || 3817;


app.get("/controlTenda", async (req, res) => {
  let productes = await operacionsAssets.obtenirAssets();
  //productes=JSON.parse(productes);
  res.json(productes)
})//envia tots els assets de la bbdd a interficie

app.post("/actualitzarAsset", async (req, res) => {
  asset = req.body;
  await operacionsAssets.editarAsset(asset)
})//reb un asset desde interficie i actualitza el registre a mongo

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
})

app.post("/registerUser", async (req, res) => {

})
