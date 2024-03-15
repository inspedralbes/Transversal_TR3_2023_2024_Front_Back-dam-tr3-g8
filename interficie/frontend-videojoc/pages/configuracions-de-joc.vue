<script lang="ts" setup></script>

<template>
  <div class="background">
    <div class="settings-selector">
      YEEHAW SETTINGS
      <div>
        <p><b>
            PLAYER SETTINGS
          </b></p>
      </div>
      <div>
        <p><b>
            NPC SETTINGS
          </b></p>
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

.settings-selector {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;
  
}
</style>
