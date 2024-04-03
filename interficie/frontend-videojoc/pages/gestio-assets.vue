<script lang="ts">
import { getTenda } from '~/CommunicationsManager';
export default {
  data() {
    return {
      visible: false,
      assets: [],
      asset: {
        id: 0,
        nom: "",
        tipus: "",
        xInicial: 0,
        xFinal: 0,
        yInicial: 0,
        yFinal: 0,
        disponible: false,
      }
    }
  },
  methods: {
    async getAssets() {
      this.assets = await getTenda();
      console.log(this.assets);
    }
  },
  created() {
    this.getAssets();
  }
}
</script>

<template>
  <div class="background">
    <div class="assets-grid">
      <div class="indiv-asset-info" v-for="asset in assets">
        <div>

          <p>Sprite Name: {{ asset.nom }}</p>
          <p>Sprite Type: {{ asset.tipus }}</p>
          <p>Sprite Type: {{ asset.disponible }}</p>
          <button class="edit-asset-info-button">Configura Info Asset</button>
        </div>
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

.edit-asset-info-button{
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
