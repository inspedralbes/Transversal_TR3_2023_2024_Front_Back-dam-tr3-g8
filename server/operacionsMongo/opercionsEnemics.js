const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://tr3:password@tr3g8.i9mpnd9.mongodb.net";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "Projecte_videojoc";

export async function obtenirStatsEnemics(){
  return new Promise((resolve, reject) => {
    enemics
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
}

export async function actualitzarStatsEnemic(nouEnemic){
  return new Promise((resolve, reject) => {
    enemicID = parseInt(enemic.id);
    enemics
      .updateOne({ id: enemicID }, { $set: nouEnemic })
      .then((result) => {
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}