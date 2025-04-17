<script setup>
import {addMinutes, format, setHours, setMinutes, setSeconds, subSeconds} from "date-fns";
import {computed, ref} from "vue";

const time = ref(setSeconds(setMinutes(setHours(new Date(), 0), 1), 0));
const intervalId = ref(null);
const displayedTime = computed(() => {
  return format(time.value, 'mm:ss');
});

function addOneMinute() {
  time.value = addMinutes(time.value, 1);
}
function addFiveMinutes() {
  time.value = addMinutes(time.value, 5);
}
function startTimer() {
  intervalId.value = setInterval(() => {
    if (time.value.getSeconds() === 0 && time.value.getMinutes() === 0 && time.value.getHours() === 0) {
      pauseTimer();
      return;
    }
    time.value = subSeconds(time.value, 1);
  }, 1000);
}

function pauseTimer() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
}
function resetTimer() {
  pauseTimer();
  time.value = setSeconds(setMinutes(setHours(new Date(), 0), 1), 0);
}
</script>

<template>
<main class="container">
  <div id="timer">
    {{ displayedTime }}
  </div>

  <div class="actions">
    <button id="reset" @click="resetTimer">Reset</button>
    <button id="start" v-if="!intervalId" @click="startTimer">Start</button>
    <button id="pause" v-if="intervalId" @click="pauseTimer">Pause</button>
    <button id="add-minute" @click="addOneMinute">+ 1mn</button>
    <button id="add-5-minute" @click="addFiveMinutes">+ 5mn</button>
  </div>
</main>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#timer {
  font-size: 30px;
}
</style>