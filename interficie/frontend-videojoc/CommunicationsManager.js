const BASEURL = '';
const localURL = 'http://localhost:3817'



export async function getTenda(){
    const response = await fetch(localURL + '/controlTenda');
    const productes = await response.json();
    return productes
}//recupera tots els productes

export async function getProta(){
    const response = await fetch(localURL + '/statsProta');
    const protagonistaInf = await response.json();
    return protagonistaInf
}//recupera tots els protagonistas

export async function getEnemics(){
    const response = await fetch(localURL + '/statsEnemics');
    const enemicInf = await response.json();
    return enemicInf
}//recupera tots els enemics



export async function postProtagonistaUpdate(protagonista){
    console.log("nou prota: ", protagonista)
    const response = await fetch(localURL + '/actualitzarProtagonista',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(protagonista),
            mode: "cors"
        }
    );
}//enviar objecte protagonista per actualitzar la bbdd

export async function postEnemicUpdate(enemic){

    const response = await fetch(localURL + '/actualitzarEnemic',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(enemic),
            mode: "cors"
        }
    );
}//enviar objecte enemic per actualitzar la bbdd

export async function postAssetUpdate(asset){

    const response = await fetch(localURL + '/actualitzarAsset',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asset),
            mode: "cors"
        }
    );
}//enviar objecte asset per actualitzar la bbdd

//No funciona encara
export async function postEnviarBroadcast(missatge){
    //capçalera;missatge
    const response = await fetch(localURL + '/broadcast',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(missatge),
            mode: "cors"
        }
    );
}//enviar objecte broadcast per informar a android

