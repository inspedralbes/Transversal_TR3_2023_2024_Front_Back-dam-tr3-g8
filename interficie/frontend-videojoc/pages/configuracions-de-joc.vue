<script>
import { getProta } from '~/CommunicationsManager';
import { getEnemics } from '~/CommunicationsManager';
import { postProtagonistaUpdate } from '~/CommunicationsManager';
import { postEnemicUpdate } from '~/CommunicationsManager';
export default {
  data() {
    return {
      visible: false,
      gameDifficulty: "",
      infoProta: [],
      infoEnemics: [],
      protagonista: {
        id: 0,
        nom: "",
        vida: 0,
        MS: 0,
        AS: 0,
        AD: 0,
      },
      npc: {
        id: 0,
        nom: "",
        vida: 50,
        MS: 0,
        AD: 25
      },
    };
  },
  methods: {
    async getProtagInfo() {
      this.infoProta = await getProta();
    },
    async updateProtaInfo(id, nom, vida, MS, AS, AD) {
      console.log(nom)
      this.protagonista.id = id;
      this.protagonista.nom = nom;
      this.protagonista.vida = vida;
      this.protagonista.MS = MS;
      this.protagonista.AS = AS;
      this.protagonista.AD = AD;
      await postProtagonistaUpdate(this.protagonista);
    },
    async getNpcInfo() {
      this.infoEnemics = await getEnemics();
    },
    async updateNpcInfo(id, nom, vida, MS, AD) {
      this.npc.id = id;
      this.npc.nom = nom;
      this.npc.vida = vida;
      this.npc.MS = MS,
        this.npc.AD = AD;
      await postEnemicUpdate(this.npc);
    }
  },
  created() {
    this.getProtagInfo();
    this.getNpcInfo();
  }
}
</script>

<template>
  <div class="background">
    <div class="difficulty-settings-tab">
      <div>
        <p>
          Difficulty Level: {{ gameDifficulty.toUpperCase() }}
        </p>
        <input v-model="gameDifficulty" id="easy-diff" type="radio" value="easy">
        <label for="easy-diff">EASY</label>
        <input v-model="gameDifficulty" id="mid-diff" type="radio" value="medium">
        <label for="mid-diff">MEDIUM</label>
        <input v-model="gameDifficulty" id="hard-diff" type="radio" value="hard">
        <label for="hard-diff">HARD</label>
      </div>
    </div>
    <div class="main-settings-tab">
      <div class="player-settings-tab">
        <div>
          <p><b>PLAYER SETTINGS</b></p>
        </div>
        <div v-for="prota in infoProta">
          <p>Player Name: {{ prota.nom }}</p>
          <input name="nom" id="protaNom" v-model="prota.nom" type="text">
          <p>Max Hit Points: {{ prota.vida }}</p>
          <input name="vida" id="protaVida" v-model="prota.vida" class="player-hit-points" type="range" min="0"
            max="250" step="25">
          <p>Movement Speed: {{ prota.MS }}</p>
          <input name="MS" id="protaMS" v-model="prota.MS" type="number" min="5" max="25" step="5">
          <p>Attack Speed: {{ prota.AS }}</p>
          <input name="AS" id="protaAS" v-model="prota.AS" type="number" min="5" max="50" step="5">
          <p>Attack Damage: {{ prota.AD }}</p>
          <input name="AD" id="protaAD" v-model="prota.AD" type="number" min="0" step="10">
          <div>
            <button class="update-prota-info-button"
              @click="updateProtaInfo(1, prota.nom, prota.vida, prota.MS, prota.AS, prota.AD)">Update Player
              Info</button>
          </div>
        </div>
      </div>
    </div>
    <div class="main-settings-tab">
      <div class="npc-settings-tab">
        <div>
          <p><b>NPC SETTINGS</b></p>
        </div>
        <div class="npc-sprite-grid">
          NPC SPRITE GRID
          <div class="indiv-npc-info" v-for="enemic in infoEnemics">
            <div>
              <p>{{ enemic.nom }}</p>
              <button class="npc-more-info-button" @click="visible = true">
                More Info
              </button>
            </div>
            <div class="indiv-npc-settings" v-show="visible">
              <p>Npc Name: {{ enemic.nom }}</p>
              <p>Max Hit Points: {{ enemic.vida }}</p>
              <input v-model="enemic.vida" class="player-hit-points" type="range" min="0" max="250" step="25">
              <p>Movement Speed: {{ enemic.MS }}</p>
              <input v-model="enemic.MS" type="number" min="5" max="25" step="5">
              <p>Attack Damage: {{ enemic.AD }}</p>
              <input v-model="enemic.AD" type="number" min="0" step="10">
              <div>
                <button class="update-prota-info-button"
                  @click="updateNpcInfo(1, enemic.nom, enemic.vida, enemic.MS, enemic.AD)">Update Npc Info</button>
              </div>
              <div>
                <button class="npc-info-button" @click="visible = false">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets-nuxt/configuracions-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.difficulty-settings-tab {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.9;
  padding: 10px;
  width: 250px;
  margin-bottom: 470px;
  font-family: 'Courier New', Courier, monospace;

}

.main-settings-tab {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.9;
  padding: 10px;
  width: 700PX;
  font-family: 'Courier New', Courier, monospace;
}

.indiv-npc-settings {
  border-radius: 10px;
  border: 2px solid black;
  padding: 10px;
  width: 200px;
}

.indiv-npc-info {
  display: flex;
  justify-content: space-between  ;
}

.update-prota-info-button {
  margin-top: 15px;
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.npc-info-button {
  margin-top: 15px;
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.npc-more-info-button{
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
