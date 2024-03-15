<script lang="ts" setup></script>

<template>
  <div class="background">
    <NuxtLink to="/main-menu">Main Menu</NuxtLink>
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
</style>
