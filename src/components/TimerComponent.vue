<script setup>
import {addMinutes, differenceInMilliseconds, format, setHours, setMinutes, setSeconds, subSeconds} from "date-fns";
import {computed, ref} from "vue";
import ProgressSpinnerComponent from "@/components/ProgressSpinnerComponent.vue";

const time = ref(setSeconds(setMinutes(setHours(new Date(), 0), 1), 0));
const intervalId = ref(null);
const percentage = ref(100);
const initialDistance = ref(0);
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
  initialDistance.value = differenceInMilliseconds(new Date(), time.value);
  percentage.value = 100;
  intervalId.value = setInterval(() => {
    if (time.value.getSeconds() === 0 && time.value.getMinutes() === 0 && time.value.getHours() === 0) {
      pauseTimer();
      return;
    }
    time.value = subSeconds(time.value, 1);
    const distance = differenceInMilliseconds(time.value, new Date());
    percentage.value = Math.floor((distance * 100) / initialDistance.value);
  }, 1000);
}

function pauseTimer() {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
}
function resetTimer() {
  // pauseTimer();
  // time.value = setSeconds(setMinutes(setHours(new Date(), 0), 1), 0);
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