<script lang="ts" >
export default{
  data(){
    return{
      assets: [],
      asset: {
        id: 0,
        nom: "",
        tipus: "",
        xInicial: 0,
        xFinal: 0,
        yInicial: 0,
        yFinal: 0,
        disponible: false,
      }
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="assets-list">
      
    </div>
  </div>
</template>

<style scoped>
.background {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets-nuxt/assets-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.assets-list {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 10px;  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
