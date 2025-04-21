<script setup>
import {computed} from "vue";

const strokeWidth = 5;

const props = defineProps({
  percentage: {type: Number, default: 100},
  size: {type: Number, default: 100},
});
const svgStyle = computed(() => ({width: props.size + 'px', height: props.size + 'px'}));
const viewBox = computed(() => `0 0 ${props.size} ${props.size}`)
const center = computed(() => props.size / 2);
const radius = computed(() => center.value - strokeWidth);
const circumference = computed(() => 2 * Math.PI * radius.value);
const strokeDasharray = computed(() => circumference.value.toFixed(1));
const strokeDashoffset = computed(() => (circumference.value * (1 - props.percentage / 100)).toFixed(1));

</script>

<template>
  <svg v-if="size" :style="svgStyle"
       class="progress-spinner" :viewBox="viewBox">
    <circle class="progress-circle"
            :cx="center" :cy="center" :r="radius"
            :stroke-dasharray="strokeDasharray"
            :stroke-dashoffset="strokeDashoffset" />
  </svg>
</template>

<style scoped>

.progress-circle {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg); /* Start at top */
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.35s ease;
}
</style>