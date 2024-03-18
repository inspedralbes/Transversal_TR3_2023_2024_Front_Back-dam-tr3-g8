const { MongoClient, ServerApiVersion } = require('mongodb');
const uri ="mongodb+srv://usuari:ccF6ByhTUnmLc12K@tr3g8.i9mpnd9.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "Projecte_videojoc";

let taulaEnemic;

async function connexioEnemics() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        let database = client.db(dbName);
        taulaEnemic = database.collection("enemic");
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

 async function obtenirStatsEnemics(){
  return new Promise((resolve, reject) => {
    taulaEnemic
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

 async function actualitzarStatsEnemic(nouEnemic){
  return new Promise((resolve, reject) => {
    enemicID = parseInt(enemic.id);
    taulaEnemic
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

module.exports={
  obtenirStatsEnemics,
  actualitzarStatsEnemic,
  connexioEnemics
}