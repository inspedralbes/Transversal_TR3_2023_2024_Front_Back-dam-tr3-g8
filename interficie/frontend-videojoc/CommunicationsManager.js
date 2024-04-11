const localURL = 'http://localhost:3817' //preDocker
const broadcastURL = ''//connexio Docker broadcast
const dockerURL = ``//connexio Docker docker
const assetsURL = ''//connexio Docker assets
const usersURL = ''//connexio Docker users
const partidaURL = ''//connexio Docker partida
const awsURl = 'http://ec2-13-51-165-128.eu-north-1.compute.amazonaws.com:3000'


export async function getTenda() {
    const response = await fetch(awsURl + '/controlTenda');
    const productes = await response.json();
    return productes
}//recupera tots els productes

export async function getProta() {
    const response = await fetch(awsURl + '/statsProta');
    const protagonistaInf = await response.json();
    return protagonistaInf
}//recupera tots els protagonistas

export async function getEnemics() {
    const response = await fetch(awsURl + '/statsEnemics');
    const enemicInf = await response.json();
    console.log(enemicInf)
    console.log("--------------------")
    return enemicInf
}//recupera tots els enemics

export async function getSprites() {
    console.log('getting spritesheets')
    const response = await fetch(awsURl + '/mirarSprites');
    const spritesSheets = await response.json();
    return spritesSheets
    console.log('sprites: ', spritesSheets)
}//recupera tots els spritesheets



export async function postProtagonistaUpdate(protagonista) {

    const response = await fetch(awsURl + '/actualitzarProtagonista',
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

export async function postEnemicUpdate(enemic) {
    const response = await fetch(awsURl + '/actualitzarEnemic',
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

export async function postAssetUpdate(asset) {

    const response = await fetch(awsURl + '/actualitzarAsset',
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

export async function postEnviarBroadcast(missatge) {
    //missatge{titol;cos}
    const response = await fetch(awsURl + '/broadcast',
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

export async function postEnviarEmailOdoo(mail) {
    //mail{subjecte, cos}
    console.log('sending odoo email: ', mail)
    const response = await fetch(awsURl + '/mailsOdoo',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail),
            mode: "cors"
        }
    );
    console.log('email sent')
}

export async function postCrearAsset(nouAsset) {
    const response = await fetch(awsURl + '/inserirAsset',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nouAsset),
            mode: "cors"
        }
    );
}

export async function postActualitzarImatge(novaSpriteSheet) {
    //novaSpriteSheet{nom:"el nom de la sprite que rebs", imatge:"la spritesheet codificada a base64"}
    const response = await fetch(awsURl + '/actulitzarSprite',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novaSpriteSheet),
            mode: "cors"
        }
    );
}


