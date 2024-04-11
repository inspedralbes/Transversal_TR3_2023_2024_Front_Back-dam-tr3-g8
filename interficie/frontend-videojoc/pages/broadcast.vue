<script lang="ts">
import { postEnviarBroadcast, postEnviarEmailOdoo } from '~/CommunicationsManager';
export default {
  data() {
    return {
      missatge: {
        titol: "",
        cos: ""
      },
      correuOdoo: {
        asunto: "",
        cos: ""
      }
    }
  },
  methods: {
    async broadcastMissatge(titol: string, cos: string) {
      this.missatge.titol = titol;
      this.missatge.cos = cos;
      await postEnviarBroadcast(this.missatge);
    },
    async emailOdoo(asunto: string, cos: string) {
      this.correuOdoo.asunto = asunto;
      this.correuOdoo.cos = cos;
      await postEnviarEmailOdoo(this.correuOdoo);
    }

  }
}
</script>

<template>
  <div class="background">
    <div class="broadcast-message-box">
      <span><b>Emissió Missatge</b></span>
      <div>
        <div>
          <p><b>Títol:</b></p>
          <input v-model="missatge.titol" name="title" id="messageTitle" class="message-title-area" type="text">
        </div>
        <div>
          <p><b>Cos:</b></p>
          <textarea v-model="missatge.cos" class="message-text-area" name="text" id="messageText" cols="77"
            rows="20"></textarea>
        </div>
        <div class="broadcast-button-container">

          <button class="broadcast-message-button" @click="broadcastMissatge(missatge.titol, missatge.cos)"><b>EMET
              MISSATGE CAP A ANDROID</b></button>
          <button class="broadcast-message-button" @click="emailOdoo(missatge.titol, missatge.cos)"><b>EMET MISSATGE CAP
              A ODOO</b></button>
        </div>
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
  font-family: 'Courier New', Courier, monospace;
}

.broadcast-button-container{
  display: flex;
  justify-content: space-evenly;
}

.broadcast-message-button {
  padding: 3px;
  background-color: white;
  opacity: 0.75;
  height: 25px;
  border-radius: 10px;
  font-family: 'Courier New', Courier, monospace;
}

.message-title-area {
  width: 580px;
  height: 25px;
}

.message-text-area {
  max-width: 580px;
  max-height: 290px;
}
</style>: string: string: any: any
