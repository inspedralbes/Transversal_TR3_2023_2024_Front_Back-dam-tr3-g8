<script lang="ts">
import { postEnviarBroadcast } from '~/CommunicationsManager';
export default{
  data(){
    return{
      missatge:{
        titol: "",
        cos: ""
      }
    }
  },
  methods: {
    async broadcastMissatge(titol: string, cos: string){
      this.missatge.titol = titol;
      this.missatge.cos = cos;
      await postEnviarBroadcast(this.missatge);
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="broadcast-message-box">
      YEEHAW MESSAGE
      <button class="broadcast-message-button" @click="broadcastMissatge(missatge.titol, missatge.cos)"> HEAR YE HEAR YE</button>
      <div>
        <p><b>Message Title:</b></p>
        <input v-model="missatge.titol" name="title" id="messageTitle" class="message-title-area" type="text">
      </div>
      <div>
        <p><b>Message Text:</b></p>
        <textarea v-model="missatge.cos" class="message-text-area" name="text" id="messageText" cols="77" rows="20"></textarea>
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
  background-image: url('../../assets-nuxt/broadcast-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.broadcast-message-box {
  border-radius: 15px;
  border: 2px solid black;
  background-color: lightgrey;
  opacity: 0.75;
  padding: 15px;
  height: 470px;
  width: 590px;
  font-family:'Courier New', Courier, monospace;
}

.broadcast-message-button {
  padding: 3px;
  background-color: white;
  opacity: 0.75;
  margin-left: 460px;
  height: 25px;
  border-radius: 10px;
  font-family:'Courier New', Courier, monospace;
}

.message-title-area {
  width: 580px;
  height: 25px;
}

.message-text-area {
  max-width: 580px;
  max-height: 290px;
}

</style>: string: string
