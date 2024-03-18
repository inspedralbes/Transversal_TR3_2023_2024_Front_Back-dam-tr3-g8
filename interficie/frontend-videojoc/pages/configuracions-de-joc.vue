<script>
import { getProta } from '~/CommunicationsManager';
import { getEnemics } from '~/CommunicationsManager';
export default{
  data(){
    return{
      gameDifficulty: "",
      protagonista:{
        playerName: "Paul.png",
        playerHitPoints: 50,
        playerShieldPoints: 10,
        playerMovementSpeed:5,
        playerAttackSpeed:0,
        playerAttackRange: 0,
        playerAttackDamage:25,
      },
      npc:{
        npcSpriteName: "John.png",
        npcBaseDiffHitPoints: 50,
        npcMovementSpeed:0,
        npcAttackDamage:25
      },
    };
  }, 
  methods:{
      getProtagInfo(){
        getProta();
        console.log("info collected")
      }
  },
  created(){
    this.getProtagInfo();
  }
}
</script>

<template>
  <div class="background">
    <div class="difficulty-settings-tab">
      <div>
        <p>
          Difficulty Level: {{ gameDifficulty }}
        </p>
        <input v-model="gameDifficulty" id="easy-diff" type="radio" value="EASY">
        <label for="easy-diff">EASY</label>
        <input v-model="gameDifficulty" id="mid-diff" type="radio" value="MEDIUM">
        <label for="mid-diff">MEDIUM</label>
        <input v-model="gameDifficulty" id="hard-diff" type="radio" value="HARD">
        <label for="hard-diff">HARD</label>
      </div>
    </div>
    <div class="main-settings-tab">
      <div class="player-settings-tab">
        <div>
          <p><b>PLAYER SETTINGS</b></p>
        </div>
        <div>
          <p>Player Name: {{ protagonista.playerName }}</p>
          <input v-model="protagonista.playerName" type="text">
          <p>Max Hit Points: {{ protagonista.playerHitPoints }}</p>
          <input v-model="protagonista.playerHitPoints" class="player-hit-points" type="range" min="0" max="100" step="10">
          <p>Max Shield Points: {{ protagonista.playerShieldPoints }}</p>
          <input v-model="protagonista.playerShieldPoints" class="player-shield-points" type="range" min="0" max="100" step="10">
          <p>Movement Speed: {{ protagonista.playerMovementSpeed }}</p>
          <input v-model="protagonista.playerMovementSpeed" type="number" min="5" max="25" step="5">
          <p>Attack Speed: {{protagonista.playerAttackSpeed}}</p>
          <input v-model="playerAttackSpeed" type="number" min="5" max="50" step="5">
          <p>Attack Range: {{ protagonista.playerAttackRange }}</p>
          <input v-model="protagonista.playerAttackRange" class="player-attack-range" type="range" min="0" max="100" step="10">
          <p>Attack Damage: {{ protagonista.playerAttackDamage }}</p>
          <input v-model="protagonista.playerAttackDamage" type="number" min="0" step="10">
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
        <div class="npc-indiv-settings">
          <p>Npc Sprite Name: {{ npc.npcSpriteName }}</p>
          <p>Max Hit Points: {{ npc.npcBaseDiffHitPoints }}</p>
          <input v-model="npc.npcBaseDiffHitPoints" class="player-hit-points" type="range" min="0" max="100" step="10">
          <p>Movement Speed: {{ npc.npcMovementSpeed }}</p>
          <input v-model="npcMovementSpeed" type="number" min="5" max="25" step="5">
          <p>Attack Damage: {{ npc.npcAttackDamage }}</p>
          <input v-model="npc.npcAttackDamage" type="number" min="0" step="10">
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

.difficulty-settings-tab{
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
