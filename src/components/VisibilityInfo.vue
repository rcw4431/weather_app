<template>
  <div class="visivility-border">
    <div class="visivility-header">
      <img src="/img/eye-icon.png" width="15" height="15" /> &nbsp;
      가시거리(고정값)
    </div>
    <div class="visivility-body">
      {{ visivilityValue }}km
      <div class="small-font">{{ visivilityLevel(visivilityValue) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const visivilityValue = ref(28);
const visivilityLevel = (visivilityValue) => {
  if (visivilityValue >= 20 && visivilityValue <= 31) {
    return "가시거리가 매우 좋습니다.";
  }
};
</script>

<style scoped>
.visivility-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
}
.visivility-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.visivility-body {
  color: white;
  font-size: 26px;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}
.small-font {
  font-size: 11px;
  margin-top: 55px;
}
</style>
