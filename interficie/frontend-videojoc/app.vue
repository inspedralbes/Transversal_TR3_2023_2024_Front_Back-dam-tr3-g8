<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>  
</template>

<script setup lang="ts">
   const layout = "tab-selector-bar";
</script>

<style>
body {
  margin: 0
}
</style>