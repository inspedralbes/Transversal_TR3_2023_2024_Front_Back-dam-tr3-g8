<script lang="ts" setup></script>

<template>
  <section>
    <div>
      <div class="selector-bar">
        <v-btn class="tab-selector-button">
          <NuxtLink to="/main-menu">Main Menu</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink to="/serveis-i-processos">Serveis i Processos</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink to="/broadcast">Broadcast</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink to="/gestio-assets">Assets</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink to="/gestio-odoo">Odoo</NuxtLink>
        </v-btn>
        <v-btn class="tab-selector-button">
          <NuxtLink to="/configuracions-de-joc">Settings</NuxtLink>
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
}

</style>
