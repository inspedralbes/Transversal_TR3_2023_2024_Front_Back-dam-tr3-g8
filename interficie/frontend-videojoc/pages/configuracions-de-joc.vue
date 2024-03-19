<script>
import { getProta } from '~/CommunicationsManager';
import { getEnemics } from '~/CommunicationsManager';
export default {
  data() {
    return {
      gameDifficulty: "",
      infoProta: [],
      infoEnemics: [],
      protagonista: {
        playerName: "Paul.png",
        playerHitPoints: 50,
        playerShieldPoints: 10,
        playerMovementSpeed: 5,
        playerAttackSpeed: 0,
        playerAttackRange: 0,
        playerAttackDamage: 25,
      },
      npc: {
        npcSpriteName: "John.png",
        npcBaseDiffHitPoints: 50,
        npcMovementSpeed: 0,
        npcAttackDamage: 25
      },
    };
  },
  methods: {
    async getProtagInfo() {
      this.infoProta = await getProta();
    },
    async getNpcInfo() {
      this.infoEnemics = await getEnemics();
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
          <input v-model="prota.nom" type="text">
          <p>Max Hit Points: {{ prota.vida }}</p>
          <input v-model="prota.vida" class="player-hit-points" type="range" min="0" max="100" step="10">
          <p>Max Shield Points: {{ protagonista.playerShieldPoints }}</p>
          <input v-model="protagonista.playerShieldPoints" class="player-shield-points" type="range" min="0" max="100"
            step="10">
          <p>Movement Speed: {{ prota.MS }}</p>
          <input v-model="prota.MS" type="number" min="5" max="25" step="5">
          <p>Attack Speed: {{ prota.AS }}</p>
          <input v-model="prota.AS" type="number" min="5" max="50" step="5">
          <p>Attack Range: {{ protagonista.playerAttackRange }}</p>
          <input v-model="protagonista.playerAttackRange" class="player-attack-range" type="range" min="0" max="100"
            step="10">
          <p>Attack Damage: {{ prota.AD }}</p>
          <input v-model="prota.AD" type="number" min="0" step="10">
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
        </div>
        <div class="npc-indiv-settings" v-for="enemic in infoEnemics">
          <p>Npc Sprite Name: {{ enemic.nom }}</p>
          <p>Max Hit Points: {{ enemic.vida }}</p>
          <input v-model="enemic.vida" class="player-hit-points" type="range" min="0" max="100" step="10">
          <p>Movement Speed: {{ enemic.MS }}</p>
          <input v-model="enemic.MS" type="number" min="5" max="25" step="5">
          <p>Attack Damage: {{ enemic.AD }}</p>
          <input v-model="enemic.AD" type="number" min="0" step="10">
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
}

.main-settings-tab {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.9;
  padding: 10px;
  width: 700PX;
}

.npc-indiv-settings {
  border-radius: 10px;
  border: 2px solid black;
  padding: 10px;
  width: 200px;
}
</style>
