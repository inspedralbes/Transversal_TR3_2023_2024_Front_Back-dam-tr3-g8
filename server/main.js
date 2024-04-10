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
const spritesheets = "./assetsNode";
const operacionsAssets = require("./operacionsMongo/operacionsAssets");
const operacionsUser = require("./operacionsMongo/operacionsUsuaris");
const operacionsProta = require("./operacionsMongo/operacionsProtagonista");
const operacionsEnemic = require("./operacionsMongo/opercionsEnemics");
const operacionsOdoo = require("./operacionsOdoo/operacionsOdoo");
const operacionsBroadcast = require("./operacionsMongo/operacionsBroadcast");
const operacionsPartida = require("./operacionsMongo/operacionsPartida")

const PORT = 3000;

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
  await operacionsUser.connexioUsuari();
  await operacionsBroadcast.connexioBroadcast();
  await operacionsPartida.connexioPartida();
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

app.post("/broadcast", async (req, res) => {
  console.log(req.body)
  missatge = {
    enunciat: req.body.titol,
    text: req.body.cos,
    fecha: new Date()
  }
  await operacionsBroadcast.crearBroadcast(missatge)

})//reb un missatge i l'enmagatzema a la base de dades per poder recollir desde android

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

  console.log("103")
  fs.readdir(spritesheets, function (err, files) {
    var arraySprites = []
    console.log("105")
    for (let i = 0; i < files.length; i++) {
      arraySprites[i] = {
        nom: files[i],
        imatge: base64_encode(spritesheets + "/" + files[i])
      }
    }
    arraySprites = JSON.parse(JSON.stringify(arraySprites))
    res.json(arraySprites)
  })

})

app.get("/mailsOdoo", async (req, res)=>{
  mail=req.body.mail
  usuaris=await operacionsUser.recollirGmails()
  for (let i=0; i<usuaris.length; i++){
    operacionsOdoo.enviarMails(mail, usuaris[i].email)
  }
})

//---------------------Crides android------------------//

app.post("/loginUser", async (req, res) => {
  username = req.body.user;
  passwd = req.body.contrasenya
  passwd = desencriptar(passwd)
  let validacio = await operacionsUser.logejarUser(username, passwd);
  if (validacio != null) {
    let token;
    //Creating jwt token
    token = jwt.sign(
      {
        userId: validacio.id,
      },
      "secretkeyappearshere",
      { expiresIn: "4h" }
    )
    resposta = {
      permis: true,
      token: token
    }
  }
  else {
    resposta = {
      permis: false,
      token: null
    }
  }
  res.json(resposta)
})//permet autoritzar el login del usuari

app.post("/registerUser", async (req, res) => {
  nouUser = {
    usuari: req.body.user,
    contrasenya: encriptar(req.body.passwd),
    email: req.body.correu,
    maxPuntuacio: 0,
    maxPuntuacioDiaria: 0,
    maxPuntuacioSemanal: 0,
    monedas: 0,
    assetsPropietat: []
  }
  operacionsOdoo.registrarClient(req.body.user, req.body.correu)
  await operacionsUser.crearUsuari(nouUser)
  //cridar odoo registrar nou client
})//crea un registre del usuari a la bbdd 

app.get("/veureTenda", async (req, res) => {
  productes = await operacionsAssets.obtenirTenda()
  res.json(productes)
})//agafa els productes en venta i els envia al solicitant

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

app.post("/acabarPartida", async (req, res) => {
  dadespartida = req.body
  await operacionsUser.acabarPartida(dadespartida)
})

app.post("/obtenirPropietat", async (req, res) => {

})

app.post("/comprarItems", async (req, res) => {
  producte = await operacionsAssets.obtenirAssetEspecific(req.body.producteComprat)
  await operacionsUser.comprarProducte(producte, req.body.monedas, req.body.user)
})


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

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}//funcio auxilar per codificar fotos

