const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://usuari:ccF6ByhTUnmLc12K@tr3g8.i9mpnd9.mongodb.net/";
const uri = "mongodb://usuari:ccF6ByhTUnmLc12K@ac-6peobmd-shard-00-00.i9mpnd9.mongodb.net:27017,ac-6peobmd-shard-00-01.i9mpnd9.mongodb.net:27017,ac-6peobmd-shard-00-02.i9mpnd9.mongodb.net:27017/?ssl=true&replicaSet=atlas-su9plh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=TR3G8"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "Projecte_videojoc";
let taulaUsuari;

async function connexioUsuari() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        let database = client.db(dbName);
        taulaUsuari = database.collection("usuaris");
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function logejarUser(username, passwd) {
  return new Promise((resolve, reject) => {
    taulaUsuari
      .findOne({ username: username }, { contrasenya: passwd })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//busca si existeix un usuari amb el usuarname i contrasenya proporcionat 

async function updatePuntuacio(puntuacio, usuari) {
  return new Promise((resolve, reject) => {
    taulaUsuari
      .findOne({ id: usuari }).then(async (result) => {
        if (result.PuntuacioMAX <= puntuacio) {
          await taulaUsuari.updateOne(
            { id: usuari },
            {
              $set: {
                PuntuacioMAX: puntuacio,
                puntuacioMaxSemanal: puntuacio,
                puntuacioMaxDia: puntuacio
              }
            }
          )
          resolve()
        }
        else if (result.puntuacioMaxSemanal <= puntuacio) {
          await taulaUsuari.updateOne(
            { id: usuari },
            {
              $set: {
                puntuacioMaxSemanal: puntuacio,
                puntuacioMaxDia: puntuacio
              }
            }
          )
          resolve()
        }
        else if (result.puntuacioMaxDia <= puntuacio) {
          await taulaUsuari.updateOne(
            { id: usuari },
            {
              $set: {
                puntuacioMaxDia: puntuacio
              }
            }
          )
          resolve()
        }
        else
          resolve()
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });

  })
}//compara la nova puntuacio amb les registrades i els actualitza si son superiors

async function acabarPartida(dadesPartida) {
  updatePuntuacio(dadesPartida.puntuacio, dadesPartida.user)
  updateMonedas(dadesPartida.monedas, dadesPartida.user)
}//al acabar una partida actualitzem els registres de puntuacio i monedas

async function updateMonedas(novaCantitat, usuari) {
  return new Promise((resolve, reject) => {
    taulaUsuari
      .updateOne(
        {
          id: usuari,
        },
        {
          $set: {
            "monedas": novaCantitat
          }
        }
      )
      .then((result) => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//busca l'usuari a la base de dades i reemplaça les monedas

async function comprarProducte(producte, monedas, user) {
  updateMonedas(monedas, user)
  usuari = await buscarUsuari(user)
  usuari.assetsPropietat.push(producte)
  return new Promise((resolve, reject) => {
    taulaUsuari
      .updateOne(
        {
          id: user,
        },
        {
          $set: usuari
        }
      )
      .then((result) => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  }); user
}

async function buscarUsuari(username) {
  return new Promise((resolve, reject) => {
    taulaAssets
      .findOne({ username: username })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
async function crearUsuari(usuari, contrasenya, email) {
  let novaID = "";
  let nouUsuari = {
    username: usuari,
    contrasenya: contrasenya,
    email: email,
    puntuacioMax: 0,
    puntuacioMaxSemanal: 0,
    puntuacioMaxDia: 0,
    assetsPropietat: [],
    monedas: 0,
    id: novaID
  }
}

module.exports = {
  logejarUser,
  updatePuntuacio,
  crearUsuari,
  connexioUsuari,
  acabarPartida,
  updateMonedas,
  comprarProducte
}