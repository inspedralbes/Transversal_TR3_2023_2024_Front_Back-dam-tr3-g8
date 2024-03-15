<script lang="ts" setup></script>

<template>
  <div class="background">
    <div class="broadcast-message-box">
      YEEHAW MESSAGE
      <button class="broadcast-message-button">
        YA ALLAH
      </button>
      <div>
        <p>
          <b>
            Message Title:
          </b>
        </p>
        <input class="message-title-area" type="text">
      </div>
      <div>
        <p>
          <b>
            Message Text:
          </b>
        </p>
        <textarea class="message-text-area" name="text" id="messageText" cols="65" rows="13"></textarea>
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
  height: 450px;
  width: 600px;

}

.broadcast-message-button {
  border: 1px solid black;
  border-radius: 5px;
  padding: 3px;
  background-color: white;
  opacity: 0.75;
  margin-left: 380px;
}

.message-title-area{
  width: 595px;
  height: 25px;
}

.message-text-area{
  max-width: 595px;
  max-height: 290px;
}

</style>
