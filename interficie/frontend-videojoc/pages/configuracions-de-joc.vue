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
      enemicsMostrats:[],
      enemicsFacil:[],
      enemicsNormal:[],
      enemicsDificil:[],
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
        vida: 0,
        MS: 0,
        AD: 0
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
      console.log(this.infoEnemics);
      for(let i = 0; i< this.infoEnemics.length; i++){
        console.log(this.infoEnemics[i])
        if(this.infoEnemics[i].dificultat == 1){
          console.log("enemic facil afegit")
          this.enemicsFacil.push(this.infoEnemics[i])
        } else if(this.infoEnemics[i].dificultat == 2) {
          console.log("enemic normal afegit")
          this.enemicsNormal.push(this.infoEnemics[i])
        }else if(this.infoEnemics[i].dificultat == 3) {
          console.log("enemic dificil afegit")
          this.enemicsDificil.push(this.infoEnemics[i])
        }
      }
    },
    async updateNpcInfo(id, nom, vida, MS, AD) {
      this.npc.id = id;
      this.npc.nom = nom;
      this.npc.vida = vida;
      this.npc.MS = MS,
        this.npc.AD = AD;
      await postEnemicUpdate(this.npc);
    },
    difficultyChecker(difficulty){
      if(difficulty == "facil"){
        console.log("enemics facils")
        this.enemicsMostrats = this.enemicsFacil
        console.log(this.enemicsMostrats)
        this.visible = false;
      } else if(difficulty == "normal"){
        console.log("enemics normals")
        this.enemicsMostrats = this.enemicsNormal
        console.log(this.enemicsMostrats)
        this.visible = false;
      } else if(difficulty == "dificil"){
        console.log("enemics dificils")
        this.enemicsMostrats = this.enemicsDificil
        console.log(this.enemicsMostrats)
        this.visible = false;
      } else if(difficulty == "reset"){
        this.enemicsMostrats = this.infoEnemics
        console.log(this.enemicsMostrats)
        this.visible = false;
      }
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
          Nivell de Dificultat: {{ gameDifficulty.toUpperCase() }}
        </p>
        <input v-model="gameDifficulty" id="easy-diff" type="radio" value="facil" @click="difficultyChecker('facil')">
        <label for="easy-diff">FACIL</label>
        <input v-model="gameDifficulty" id="mid-diff" type="radio" value="normal" @click="difficultyChecker('normal')">
        <label for="mid-diff">NORMAL</label>
        <input v-model="gameDifficulty" id="hard-diff" type="radio" value="dificil" @click="difficultyChecker('dificil')">
        <label for="hard-diff">DIFICIL</label>
        <button class="difficulty-filter-reset-button" @click="difficultyChecker('reset')">RESET</button>
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
            <button class="update-info-button"
              @click="updateProtaInfo(prota.id, prota.nom, prota.vida, prota.MS, prota.AS, prota.AD)">Update Player
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
          <div class="indiv-npc-info" v-for="enemic in enemicsMostrats">
            <div>
              <p>{{ enemic.nom }}</p>
              <button class="npc-more-info-button" @click="visible = true; npc = enemic; console.log('indiv info: ',npc.nom, npc.vida);" >
                More Info
              </button>
            </div>
          </div>
          <div class="indiv-npc-settings" v-show="visible">
            <p>Npc Name: {{ npc.nom }}</p>
            <p>Max Hit Points: {{ npc.vida }}</p>
            <input v-model="npc.vida" class="player-hit-points" type="range" min="0" max="250" step="25">
            <p>Movement Speed: {{ npc.MS }}</p>
            <input v-model="npc.MS" type="number" min="5" max="25" step="5">
            <p>Attack Damage: {{ npc.AD }}</p>
            <input v-model="npc.AD" type="number" min="0" step="10">
            <div>
              <button class="update-info-button"
                @click="updateNpcInfo(npc.id, npc.nom, npc.vida, npc.MS, npc.AD); visible = false">Update Npc Info</button>
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
  width: 300px;
  margin-left: 25px;
  margin-bottom: 600px;
  font-family: 'Courier New', Courier, monospace;

}

.main-settings-tab {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.9;
  padding: 10px;
  width: 700px;
  font-family: 'Courier New', Courier, monospace;
  height: 450px;
}

.indiv-npc-settings {
  border-radius: 10px;
  border: 2px solid black;
  padding: 10px;
  width: 200px;
  margin-left: 475px;
  margin-top: -160px;
}

.indiv-npc-info {
  display: flex;
  justify-content: space-between;
}

.update-info-button {
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

.difficulty-filter-reset-button{
  margin-left: 7px;
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
