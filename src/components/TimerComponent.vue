<script setup>
import {computed, ref} from "vue";
import ProgressSpinnerComponent from "@/components/ProgressSpinnerComponent.vue";

const props = defineProps({
  startTime: {
    type: Number,
    default: 25 * 60
  }
});
const time = ref(props.startTime);
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

function addMinutes(value) {
  time.value = time.value + (value * 60);
  initialDistance.value += (value * 60);
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
    intervalId.value = null;
  }
}
function resetTimer() {
  pauseTimer();
  time.value = 60;
  initialDistance.value = time.value;
}
</script>

<template>
<main class="timer-container flex flex-col items-center justify-center gap-4">
  <div class="timer">
    <ProgressSpinnerComponent :percentage="percentage" :size="200" />
    <span class="timer-text">
      {{ displayedTime }}
    </span>
  </div>

  <div class="actions">
    <button id="reset" @click="resetTimer">Reset</button>
    <button id="start" v-if="!intervalId" @click="startTimer">
      <span class="material-symbols-outlined">
        play_arrow
      </span>
    </button>
    <button id="pause" v-if="intervalId" @click="pauseTimer">
      <span class="material-symbols-outlined">
        pause
      </span>
    </button>
    <button id="add-minute" @click="addMinutes(5)">+ 5mn</button>
    <button id="add-5-minute" @click="addMinutes(15)">+ 15mn</button>
  </div>
</main>
</template>

<style scoped>
.timer-container {
  height: 100vh;
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