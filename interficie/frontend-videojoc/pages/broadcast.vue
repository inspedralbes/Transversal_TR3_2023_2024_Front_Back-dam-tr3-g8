<script lang="ts" setup></script>

<template>
  <div class="background">
    <div class="broadcast-message-box">
      YEEHAW MESSAGE
      <div>
        <p>
          <b>
            Message Title:
          </b>
        </p>
        <input type="text">

      </div>
      <div>
        <p>
          <b>
            Message Title:
          </b>
        </p>
        <textarea name="text" id="messageText" cols="30" rows="10"></textarea>
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
  padding: 10px;
  display: flex;
  justify-content: center;

}

.page {
  color: white;
}
</style>
