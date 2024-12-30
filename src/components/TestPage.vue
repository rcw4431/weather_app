<template>
  <div @mousedown="mouseDown" class="panel" :style="style"></div>
</template>

<script setup>
import { ref } from "vue";

const style = ref({});
const deg = ref(360);
function mouseDown() {
  style.value.transform = `rotate(${deg.value}deg)`;
}
</script>

<style scoped>
.panel {
  position: absolute;
  left: 50px;
  top: 50px;
  width: 100px;
  height: 100px;
  background-color: yellow;
  transition: all 3s linear;
}
</style>
