const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const crypto = require('crypto');

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
  usuari=req.body.user
  contrasenya = encriptar(req.body.passwd)
  email=req.body.correu

})//crea un registre del usuari a la bbdd 

app.get("/veureTenda", async(req,res)=>{
  productes=await operacionsAssets.obtenirTenda()
  res.json(productes)
})//agafa els productes en venta i els envia al solicitant

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