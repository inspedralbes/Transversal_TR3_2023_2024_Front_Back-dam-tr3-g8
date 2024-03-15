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


export async function obtenirAssets() {
  return new Promise((resolve, reject) => {
    assets
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

export async function editarAsset(assetAModificar) {
  return new Promise((resolve, reject) => {
    assetID = parseInt(assetAModificar.id);
    assets
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

export async function obtenirTenda() {
  return new Promise((resolve, reject) => {
    assets
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

