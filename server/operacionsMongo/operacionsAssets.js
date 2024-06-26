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

let taulaAssets;

async function connexioAssets() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        let database = client.db(dbName);
        taulaAssets = database.collection("assets");
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
async function obtenirAssets() {
  return new Promise((resolve, reject) => {
    taulaAssets
      .find()
      .toArray()
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//envia tots els assets de la bbdd

async function editarAsset(assetAModificar) {
  return new Promise((resolve, reject) => {
    taulaAssets
      .updateOne(
        {
          id: assetAModificar.id,
        },
        {
          $set: {
            "nom": assetAModificar.nom,
            "tipus": assetAModificar.tipus,
            "Disponible": assetAModificar.Disponible,
            "xInicial": assetAModificar.xInicial,
            "xFinal": assetAModificar.xFinal,
            "yInicial": assetAModificar.yInicial,
            "yFinal": assetAModificar.yFinal,
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
}//sobrescriu el asset indicat amb les dades noves

async function obtenirAssetEspecific(producte) {
  return new Promise((resolve, reject) => {
    taulaAssets
      .findOne({ id: producte })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//busca si existeix un usuari amb el usuarname i contrasenya proporcionat 

async function crearAsset(assetNou) {
  return new Promise((resolve, reject) => {
    taulaAssets
      .insertOne(assetNou)
      .then((result) => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function obtenirTenda() {
  return new Promise((resolve, reject) => {
    taulaAssets
      .aggregate([{ $match: { Disponible: true } }]).toArray()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//envia tots els assets que estiguin marcats com disponibles

module.exports = {
  obtenirAssets,
  editarAsset,
  obtenirTenda,
  connexioAssets,
  crearAsset,
  obtenirAssetEspecific
}