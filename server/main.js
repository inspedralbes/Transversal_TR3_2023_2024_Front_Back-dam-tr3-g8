const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const soket= require("socket.io");
const io = soket(server)
//const path = require('path');
const crypto = require('crypto');
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
const spritesheetOriginal = "../assetsNode/spritesheet.png";
const operacionsAssets = require("./operacionsMongo/operacionsAssets");
const operacionsUser = require("./operacionsMongo/operacionsUsuaris");
const operacionsProta = require("./operacionsMongo/operacionsProtagonista");
const operacionsEnemic = require("./operacionsMongo/opercionsEnemics");
const operacionsOdoo = require("./operacionsOdoo/operacionsOdoo");
const operacionsBroadcast = require("./operacionsMongo/operacionsBroadcast");

const PORT = 3817;

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

app.post("/afegirImatge", async (req, res) => {
  nouSprite = decode(req.body)
  imatges.joinImages([spritesheetOriginal, nouSprite], "vertical").then((img) => {
    // Save image as file
    img.toFile(spritesheetOriginal);
  });
})//funcio en proces, ha d'agafar el nou spritesheet encriptat de interficie i adjuntarlo al final del spritesheet que tenim a ./assetsNode; 
//la funcio .joinimages adejunta el parametre 1 mes parametre 2 en el format de parametre 3 i despres sobrescriu la spritesheet original amb el resultat



//---------------------Crides android------------------//

app.post("/loginUser", async (req, res) => {
  username = req.body.user;
  passwd = req.body.contrasenya
  passwd = desencriptar(passwd)
  let validacio = operacionsUser.logejarUser(username, passwd);
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
  usuari = req.body.user
  contrasenya = encriptar(req.body.passwd)
  email = req.body.correu

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

app.post("/crearPartida", async(req,res)=>{
  partida={
    dificultat:req.body.dificultat,
    codi:generarNouCodiSala()
  }
  
})
app.post("/unirseAPartida", async(req,res)=>{
  codi=req.body
})

io.on('connection', (socket, identificacio, codiPartida) => {
  //Utilitzem "identificacio" com el token que obtenen els usuaris a fer login per identificar qui es qui per evitar que el 2n player faci els moviments del primer jugador

  socket.on('moviment', (direccio) => {
    socket.broadcast.emit('movimentJugador', { direccio, identificacio })
  })//enviar a android que l'altre jugador a començat a moures

  socket.on('acabarMoviment', (direccio) => {
    socket.broadcast.emit('acabarMovimentJugador', { direccio, identificacio })
  })//enviar a android que l'altre jugador a acabat el moviment

  socket.on('atacar', () => {
    socket.broadcast.emit('jugadorAtaca', {identificacio})
  })//enviar a android que l'altre jugador a atacat
  
  socket.on('desconectar', () => {
    tancarSala(codiPartida)
  })//enviar a android que l'altre jugador a atacat

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