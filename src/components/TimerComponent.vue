<script setup>
import {computed, ref} from "vue";
import ProgressSpinnerComponent from "@/components/ProgressSpinnerComponent.vue";

const time = ref(120);
const intervalId = ref(null);
const initialDistance = ref(time.value);
const displayedTime = computed(() => {
  const format = (value) => value.toString().replace(/([,.])\d+/, '').padStart(2, '0');
  if (time.value % 3600 === 0) {
    return `${format(time.value / 3600)}:00:00`;
  }

  const hours = time.value >= 3600 ? format(time.value / 3600) : '00';
  let remainder = time.value % 3600;
  if (remainder % 60 === 0) {
    return `${hours}:${format(remainder / 60)}:00`
  }

  const minutes = remainder >= 60 ? format(remainder / 60) : '00';
  remainder = remainder % 60;
  if (remainder > 0) {
    return `${hours}:${minutes}:${format(remainder)}`;
  }
});
const percentage = computed(() => {
  return (time.value * 100) / initialDistance.value;
});

function addOneMinute() {
  time.value = time.value + 60;
  initialDistance.value += 60;
}
function addFiveMinutes() {
  time.value = time.value + (60 * 5);
  initialDistance.value += (60 * 5);
}
function startTimer() {
  intervalId.value = setInterval(() => {
    if (time.value === 0) {
      pauseTimer();
      return;
    }
    time.value--;
  }, 1000);
}

function pauseTimer() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
}
function resetTimer() {
  pauseTimer();
  time.value = 60;
  initialDistance.value = time.value;
}
</script>

<template>
<main class="container">
  <div class="timer">
    <ProgressSpinnerComponent :percentage="percentage" :size="200" />
    <span class="timer-text">
      {{ displayedTime }}
    </span>
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
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: .5rem;
}

.timer {
  font-size: 30px;
  position: relative;
}
.timer .timer-text {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
</style>