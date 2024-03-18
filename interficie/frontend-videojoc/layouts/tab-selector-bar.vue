<script lang="ts">
export default{
  data(){

  }
} 
</script>

<template>
  <section>
    <div>
      <div class="selector-bar">
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/main-menu">Main Menu</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/serveis-i-processos">Serveis i Processos</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/broadcast">Broadcast</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/gestio-assets">Assets</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/gestio-odoo">Odoo</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink class="tab-link" to="/configuracions-de-joc">Settings</NuxtLink>
        </v-btn>
      </div>
      <slot />
    </div>
  </section>
</template>

<style>
.tab-selector-button {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;
  
}

.selector-bar {
  display: flex;
  justify-content: space-evenly;
  padding: 50px;
  position: fixed;
  z-index: 100; 
  max-width: 1000px;
}

.tab-link{
  color: black;
  font-family:'Courier New', Courier, monospace;
}
</style>
