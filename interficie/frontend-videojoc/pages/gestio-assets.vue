<script lang="ts">
import { getTenda, postAssetUpdate, getSprites } from '~/CommunicationsManager';
export default {
  data() {
    return {
      decodedImgSrc: "",
      visible: false,
      assets: [],
      spritesheets: [],
      assetIndiv: {
        id: 0,
        nom: "",
        tipus: "",
        xInicial: 0,
        xFinal: 0,
        yInicial: 0,
        yFinal: 0,
        disponible: false,
      },
      spritesheet: {
        nom: "",
        imatge: ""
      }
    }
  },
  methods: {
    async getAssets() {
      this.assets = await getTenda();
    },
    async updateAsset(id: number, nom: string, tipus: string, disponible: boolean, xInicial: number, xFinal: number, yInicial: number, yFinal: number) {
      this.assetIndiv.id = id;
      this.assetIndiv.nom = nom;
      this.assetIndiv.tipus = tipus;
      this.assetIndiv.disponible = disponible;
      this.assetIndiv.xInicial = xInicial;
      this.assetIndiv.yInicial = yInicial;
      this.assetIndiv.xFinal = xFinal;
      this.assetIndiv.yFinal = yFinal;
      await postAssetUpdate(this.assetIndiv);
    },
    async getSpritesheets() {
      this.spritesheets = await getSprites();
      console.log(this.spritesheets)
    },
    decodeBase64Image(base64String: string) {
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "image/png" }); // Ajusta el tipo MIME según tu imagen
      return URL.createObjectURL(blob);
    },
    selectPreviousSpritesheet() {

    },
    selectNextSpritesheet() {

    }
  },
  created() {
    this.getAssets();
    this.getSpritesheets();

  }
}
</script>

<template>
  <div class="background">
    <div class="assets-grid">
      <div class="indiv-asset-info" v-for="asset in assets">
        <p>Nom: {{ asset.nom }}</p>
        <p>Tipus: {{ asset.tipus }}</p>
        <p>Disponible: {{ asset.disponible }}</p>
        <button class="edit-asset-info-button" @click="visible = true; assetIndiv = asset">Configura Info
          Asset</button>
      </div>
      <div class="indiv-asset-settings" v-show="visible">
        EASPORTS
        <p>Nom: {{ assetIndiv.nom }}</p>
        <input type="text" v-model="assetIndiv.nom">
        <p>Tipus: {{ assetIndiv.tipus }}</p>
        <input type="text" v-model="assetIndiv.tipus">
        <p>Coordenada X Inicial: {{ assetIndiv.xInicial }}</p>
        <input type="number" v-model="assetIndiv.xInicial" min="0" step="10">
        <p>Coordenada X Final: {{ assetIndiv.xFinal }}</p>
        <input type="number" v-model="assetIndiv.xFinal" min="0" step="10">
        <p>Coordenada Y Inicial: {{ assetIndiv.yInicial }}</p>
        <input type="number" v-model="assetIndiv.yInicial" min="0" step="10">
        <p>Coordenada Y Final: {{ assetIndiv.yFinal }}</p>
        <input type="number" v-model="assetIndiv.yFinal" min="0" step="10">
        <br>
        <input type="checkbox" id="available" v-model="assetIndiv.disponible">
        <label for="available"> {{ assetIndiv.disponible }}</label>
        <br>
        <div class="button-container">
          <button class="edit-asset-info-button" @click="updateAsset(
        assetIndiv.id,
        assetIndiv.nom,
        assetIndiv.tipus,
        assetIndiv.disponible,
        assetIndiv.xInicial,
        assetIndiv.xFinal,
        assetIndiv.yInicial,
        assetIndiv.yFinal
      ); visible = false; console.log('updating asset');">Save</button>
          <button class="edit-asset-info-button" @click="visible = false">Close</button>
        </div>
      </div>
    </div>
    <div class="full-spritesheet-window">
      <div class="indiv-spritesheet-selector">
        <button class="select-previous-spritesheet-button" @click="console.log('previous spritesheet');">Anterior</button>
        <div v-for="spritesheet in spritesheets">
          <img class="spritesheet-view" :src="decodeBase64Image(spritesheet.imatge)" alt="img" height="400px">
        </div>
        <button class="select-next-spritesheet-button" @click="console.log('next spritesheet');">Següent</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets-nuxt/assets-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.assets-grid {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-asset-info-button {
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.indiv-asset-settings {
  border-radius: 10px;
  border: 2px solid black;
  padding: 10px;
  width: 200px;
  margin-left: 300px;
}

.indiv-asset-info {
  padding-left: 15px;
}

.full-spritesheet-window {
  width: 700px;
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.indiv-spritesheet-selector{
  display: flex;
  align-items: center;
}

.select-next-spritesheet-button {
  margin-left: 20px;
  height: 25px;
  border-radius: 10px;
  src: url(../../assets-nuxt/right-arrow.png);
}

.select-previous-spritesheet-button {
  margin-right: 20px;
  height: 25px;
  border-radius: 10px;
  src: url(../../assets-nuxt/left-arrow.png);
}
</style>
