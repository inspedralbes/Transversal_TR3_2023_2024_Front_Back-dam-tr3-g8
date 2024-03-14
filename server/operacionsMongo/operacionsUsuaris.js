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

export async function logejarUser(username, passwd) {
    return new Promise((resolve, reject) => {
      usuaris
        .findOne({ username: username},{contrasenya:passwd})
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }