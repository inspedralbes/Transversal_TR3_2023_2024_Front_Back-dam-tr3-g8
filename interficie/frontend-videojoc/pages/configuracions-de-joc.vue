<script lang="ts" setup>

</script>

<template>
  <div class="background">
    <div class="main-settings-tab">
      YEEHAW SETTINGS TAB 1
      <div class="player-settings-tab">
        <div>
          <p><b>PLAYER SETTINGS</b></p>
        </div>
        <div>
          <p>Player Name</p>
          <p>Max Hit Points(slider)</p>
          <input class="player-hit-points" type="range" min="0" max="250" step="25"> 
          <p>Max Shield Points(slider)</p>
          <input class="player-shield-points" type="range" min="0" max="250" step="25">
          <p>Movement Speed(counter)</p>
          <p>Attack Speed(counter)</p>
          <p>Attack Range(slider)</p>
          <input class="player-attack-range" type="range" step="10">
          <p>Attack Damage(counter)</p>
        </div>
      </div>
    </div>
    <div class="main-settings-tab">
      YEEHAW SETTINGS TAB 2
      <div class="npc-settings-tab">
        <div>
          <p><b>NPC SETTINGS</b></p>
        </div>
        <div class="npc-sprite-grid">
          NPC SPRITE GRID
        </div>
        <div class="npc-indiv-settings">
          <p>Npc name</p>
          <p>Max Hit Points(slider)</p>
          <input class="player-hit-points" type="range">
          <p>Movement Speed(counter)</p>
          <p>Attack Damage(counter)</p>
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
  background-image: url('../../assets-nuxt/configuracions-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.main-settings-tab {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
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
