const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const soket = require("socket.io");
const io = soket(server)
//const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
//const imatges = require('join-images')
const jwt = require("jsonwebtoken");
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
const spritesheets = "../assetsNode";
const operacionsAssets = require("./operacionsMongo/operacionsAssets");
const operacionsProta = require("./operacionsMongo/operacionsProtagonista");
const operacionsEnemic = require("./operacionsMongo/opercionsEnemics");
const operacionsOdoo = require("./operacionsOdoo/operacionsOdoo");

const PORT = 3818;

/*app.listen(PORT, async () => {
  await operacionsAssets.connexioAssets();
  await operacionsEnemic.connexioEnemics();
  await operacionsProta.connexioJugador();
  await operacionsUser.connexioUsuari();
  await operacionsBroadcast.connexioBroadcast();
  console.log(`Server is running on http://localhost:${PORT}`);
});*/

server.listen(PORT, async () => {
  //iniciem les connexions a mongo per no alentir les operacions mes endavant
  await operacionsAssets.connexioAssets();
  await operacionsEnemic.connexioEnemics();
  await operacionsProta.connexioJugador();
  console.log(`Server is running on http://localhost:${PORT}`);
});

//---------------------Crides interficie------------------//

app.get("/controlTenda", async (req, res) => {
  let productes = await operacionsAssets.obtenirAssets();
  res.json(productes)
})//envia tots els assets de la bbdd a interficie

app.post("/actualitzarAsset", async (req, res) => {
  asset = req.body;
  await operacionsAssets.editarAsset(asset)
})//reb un asset desde interficie i actualitza el registre a mongo

app.post("/actualitzarProtagonista", async (req, res) => {
  novesStats = req.body
  await operacionsProta.actualitzarStatsProta(novesStats)
})//reb un objecte protagonista i actualitza el de la bbdd

app.post("/actualitzarEnemic", async (req, res) => {
  novesStats = req.body
  await operacionsEnemic.actualitzarStatsEnemic(novesStats)
})//reb un objecte enemic i actualitza el de la bbdd per id

app.post("/inserirAsset", async (req, res) => {
  nouAsset = req.body
  await operacionsAssets.crearAsset(nouAsset)
})//reb un objecte asset i l'insereix directament a mongo

app.post("/actulitzarSprite", async (req, res) => {
  let nouSpriteSheet = req.body.imatge
  let nouNom = spritesheets + "/" + req.body.nom + ".png"
  fs.writeFile(nouNom, nouSpriteSheet, { encoding: 'base64' }, function (err) {
    console.log('File created');
  });

})//substitueix la imatge per la nova

app.get("/mirarSprites", async (req, res) => {
  let arraySprites = [{}]
  fs.readdir(spritesheets, function (err, files) {
    files.forEach(async function (file, index) {
      arraySprites[index] = {
        nom: file,
        imatge: base64_encode(file)
      }
    })
  })
  arraySprites=JSON.parse(arraySprites)
  res.json(arraySprites)
})

//---------------------Crides android------------------//

app.get("/veureTenda", async (req, res) => {
  productes = await operacionsAssets.obtenirTenda()
  res.json(productes)
})//agafa els productes en venta i els envia al solicitant


//---------------------Crides multiplataforma------------------//

app.get("/statsProta", async (req, res) => {
  stats = await operacionsProta.obtenirStatsProta()
  res.json(stats)
})//retorna tots els protagonista

app.get("/statsEnemics", async (req, res) => {
  stats = await operacionsEnemic.obtenirStatsEnemics()
  res.json(stats)
})//retorna tots els enemics

//---------------------Procesos odoo------------------//



//---------------------Funcions auxiliars------------------//

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}//funcio auxilar per codificar fotos

