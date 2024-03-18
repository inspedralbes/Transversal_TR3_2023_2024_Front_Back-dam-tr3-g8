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
    assetID = parseInt(assetAModificar.id);
    taulaAssets
      .updateOne({ id: assetID }, { $set: assetAModificar })
      .then((result) => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}//sobrescriu el asset indicat amb les dades noves

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

module.exports={
  obtenirAssets,
  editarAsset,
  obtenirTenda,
  connexioAssets
}