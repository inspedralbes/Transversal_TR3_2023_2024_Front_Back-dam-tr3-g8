<script lang="ts" setup></script>

<template>
  <div class="background">
    <div> 
      <div class="odoo-info">
        CORREUS
      </div>
      <div class="odoo-info">
        ESTADISTIQUES
      </div>
    </div>
    <div>
      <div class="odoo-info">
        PRODUCTES
      </div>
      <div class="odoo-info">
        ...
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
  background-image: url('../../assets-nuxt/odoo-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.odoo-info {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
