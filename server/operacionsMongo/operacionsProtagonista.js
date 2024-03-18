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
let taulaJugador;

async function connexioJugador() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then(() => {
        let database = client.db(dbName);
        taulaJugador = database.collection("jugador");
        resolve();
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}


 async function obtenirStatsProta(){
  return new Promise((resolve, reject) => {
    taulaJugador
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

 async function actualitzarStatsProta(nouProta){
  return new Promise(async (resolve, reject) => {
    console.log(nouProta)
    // {"nom":nouProta.nom, "vida":nouProta.vida,"MS":nouProta.MS, "AS":nouProta.AS,"AD":nouProta.AD }
    await taulaJugador
     .updateOne(
      { 
        id: nouProta.id,       
      },
      {
        $set:  {
          "nom": nouProta.nom,
          "vida": nouProta.vida,
          "MS": nouProta.MS,
          "AS": nouProta.AS,
          "AD": nouProta.AD
        }
      }
    )
      .then((result) => {
        console.log(result)
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
  actualitzarStatsProta,
  connexioJugador
}