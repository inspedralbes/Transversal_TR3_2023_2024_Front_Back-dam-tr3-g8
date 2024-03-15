const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://usuari:ccF6ByhTUnmLc12K@tr3g8.i9mpnd9.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "Projecte_videojoc";

export async function logejarUser(username, passwd) {
  return new Promise((resolve, reject) => {
    usuaris
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

export async function updatePuntuacio(puntuacio, usuari) {
  return new Promise((resolve, reject) => {
    usuaris
      .findOne({ id: usuari }).then(async (result) => {
        if (result.PuntuacioMAX <= puntuacio) {
          await usuaris.updateOne(
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
          await usuaris.updateOne(
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
          await usuaris.updateOne(
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

export async function crearUsuari(usuari, contrasenya, email){
  let novaID="";
  let nouUsuari={
    username:usuari,
    contrasenya:contrasenya,
    email:email,
    puntuacioMax:0,
    puntuacioMaxSemanal:0,
    puntuacioMaxDia:0,
    assetsPropietat:[],
    monedas:0,
    id:novaID
  }
}