<script lang="ts" setup></script>

<template>
  <div class="background">
    <NuxtLink to="/main-menu"><NuxtImg class="game-logo" src="/logo-videojoc.png"></NuxtImg></NuxtLink>
  </div>
</template>

<style scoped>
.background {
  margin: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets-nuxt/index-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.game-logo{
  height: 500px;
  margin-right: 450px;
  margin-top: 200px;
}
</style>
