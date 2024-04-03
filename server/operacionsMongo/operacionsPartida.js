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
let taulaPartida;

async function connexioPartida() {
    return new Promise((resolve, reject) => {
        client
            .connect()
            .then(() => {
                let database = client.db(dbName);
                taulaPartida = database.collection("partida");
                resolve();
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

async function crearPartida(novaPartida) {
    return new Promise((resolve, reject) => {
        taulaPartida
            .insertOne(novaPartida)
            .then((result) => {
                resolve();
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}//crea una partida amb les dades proporcionades

async function buscarPartida(codiBuscat) {
    return new Promise((resolve, reject) => {
        taulaPartida
        .findOne({ codi: codiBuscat })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
}//busca una sala i retorna la info

async function unirseAPartida(codiBuscat, identificacio) {
    return new Promise((resolve, reject) => {
        taulaPartida
            .find({ codi: codiBuscat })
            .then((result) => {
                updateOne({ codi: codiBuscat }, { j2: identificacio });
                resolve(result);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });

}//busca una partida i uneix el jugador a ella

async function tancarSala(codiAborrar) {
    return new Promise((resolve, reject) => {
        taulaPartida
        .deleteOne({ codi: codiAborrar })
        .then((result) => {
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
}//pasem un codi i borrem la partida

async function generarNouCodiSala() {
    let codiValid = false;
    while (!codiValid) {
        let codiNou = crearCodi()
        codiValid=revisarCodiExistent(codiNou)
    }
    return codiNou
}//crea un codi i comproba que es valid

function crearCodi() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}//crear un codi de 5 digits utilitzant els diferents caracters disponibles

async function revisarCodiExistent(codi) {
    let result = await buscarPartida(codi)
    if (result == {}) {
        return false
    }
    else
        return true
}//comproba si hi ha alguna partida utilitzant el mateix codi per autoritzar/denegar el codi proposat


module.exports = {
    crearPartida,
    connexioPartida,
    buscarPartida,
    unirseAPartida,
    tancarSala,
    generarNouCodiSala
}