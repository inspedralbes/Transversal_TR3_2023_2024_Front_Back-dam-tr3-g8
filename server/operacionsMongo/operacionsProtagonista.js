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

export async function obtenirStatsProta(){
  return new Promise((resolve, reject) => {
    jugador
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

export async function actualitzarStatsProta(nouProta){
  return new Promise((resolve, reject) => {
    protaID = parseInt(nouProta.id);
    jugador
      .updateOne({ id: protaID }, { $set: nouProta })
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
  obtenirStatsProta,
  actualitzarStatsProta
}