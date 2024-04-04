const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const soket = require("socket.io");
const crypto = require('crypto');
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

const operacionsUser = require("./operacionsMongo/operacionsUsuaris");


const PORT = 3821;


server.listen(PORT, async () => {
  //iniciem les connexions a mongo per no alentir les operacions mes endavant
  await operacionsUser.connexioUsuari();
  console.log(`Server is running on http://localhost:${PORT}`);
});


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

