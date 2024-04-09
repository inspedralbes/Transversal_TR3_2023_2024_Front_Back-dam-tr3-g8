<script lang="ts" setup></script>

<template>
  <div class="background">
    <div class="service-selector">
      POL GUAPO
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets-nuxt/serveis-background.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.service-selector {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
