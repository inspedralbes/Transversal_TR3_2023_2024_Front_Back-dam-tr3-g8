<script lang="ts" setup></script>

<template>
  <div>
    <div class="selector-bar">
      <v-btn class="tab-selector-button">
        <NuxtLink to="/main-menu">Main Menu</NuxtLink>
      </v-btn>
      <v-btn class="tab-selector-button">
        <NuxtLink to="/gestio-assets">Assets</NuxtLink>
      </v-btn>
      <v-btn class="tab-selector-button">
        <NuxtLink to="/gestio-odoo">Odoo</NuxtLink>
      </v-btn>
      <v-btn class="tab-selector-button">
        <NuxtLink to="/broadcast">Broadcast</NuxtLink>
      </v-btn>
      <v-btn class="tab-selector-button">
        <NuxtLink to="/serveis-i-processos">Serveis i Processos</NuxtLink>
      </v-btn>
      <v-btn class="tab-selector-button">
        <NuxtLink to="/configuracions-de-joc">Settings</NuxtLink>
      </v-btn>
    </div>
    <slot />
  </div>
</template>

<style>
.tab-selector-button{
  border-radius: 15px;
  border: 2px solid black;
  padding: 10px;
}

.selector-bar {
  padding: 30px;
}

</style>
