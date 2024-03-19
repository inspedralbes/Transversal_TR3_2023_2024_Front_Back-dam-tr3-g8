const { MongoClient, ServerApiVersion } = require('mongodb');
//const uri = "mongodb+srv://usuari:ccF6ByhTUnmLc12K@tr3g8.i9mpnd9.mongodb.net/";
const uri ="mongodb://usuari:ccF6ByhTUnmLc12K@ac-6peobmd-shard-00-00.i9mpnd9.mongodb.net:27017,ac-6peobmd-shard-00-01.i9mpnd9.mongodb.net:27017,ac-6peobmd-shard-00-02.i9mpnd9.mongodb.net:27017/?ssl=true&replicaSet=atlas-su9plh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=TR3G8"
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "Projecte_videojoc";
let taulaBroadcast;

async function connexioBroadcast() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        let database = client.db(dbName);
        taulaBroadcast = database.collection("Broadcasts");
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

async function crearBroadcast(missatge) {
    return new Promise((resolve, reject) => {
        taulaBroadcast
        .insertOne(missatge)
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
    connexioBroadcast,
    crearBroadcast
}