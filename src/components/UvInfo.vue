<template>
  <div class="uv-border">
    <div class="uv-header">
      <img src="/img/sun-icon.png" width="15" height="15" /> &nbsp;
      자외선(고정값)
    </div>
    <div class="uv-body">
      <div class="uv-value-font">{{ uvValue }}</div>
      <div class="uv-level-font">{{ uvLevel(uvValue) }}</div>
      <div class="uv-bar">
        <div
          class="uv-bar-dot-border"
          :style="{
            transform: `translateX(${moveDot(uvValue)}px)`,
          }"
        >
          <div class="uv-bar-dot"></div>
        </div>
      </div>
      <div class="small-font">
        남은 하루 동안 자외선<br />
        {{ uvLevelInfo(uvValue) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const uvValue = ref(2);
const dotPosition = ref();
const moveDot = (uvValue) => {
  dotPosition.value = (uvValue * 11.3636).toString();
  return dotPosition.value;
};

const uvLevel = (uvValue) => {
  if (uvValue < 3) {
    return "낮음";
  } else if (uvValue >= 3 && uvValue < 6) {
    return "보통";
  } else if (uvValue >= 6 && uvValue < 8) {
    return "높음";
  } else if (uvValue >= 8 && uvValue < 11) {
    return "매우높음";
  } else if (uvValue >= 11) {
    return "위험";
  }
};

const uvLevelInfo = (uvValue) => {
  if (uvValue < 3) {
    return "지수가 낮겠습니다.";
  } else if (uvValue >= 3 && uvValue < 6) {
    return "지수는 보통 수준입니다";
  } else if (uvValue >= 6 && uvValue < 8) {
    return "지수가 높겠습니다";
  } else if (uvValue >= 8 && uvValue < 11) {
    return "지수가 매우 높겠습니다";
  } else if (uvValue >= 11) {
    return "지수는 위험 수준입니다";
  }
};
</script>

<style scoped>
.uv-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  color: white;
}
.uv-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.uv-body {
  color: white;
  font-size: 22px;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}
.uv-bar {
  display: inline-block;
  position: relative;
  top: -4px;
  width: 125px;
  height: 3px;
  border: 1px;
  border-radius: 13px;
  /* background-color: rgb(50, 100, 163); */
  background: linear-gradient(
    to right,
    rgb(111, 212, 93),
    rgb(247, 208, 72),
    rgb(224, 156, 59),
    rgb(235, 79, 95),
    rgb(181, 94, 227)
  );
}
.uv-bar-dot-border {
  width: 6px;
  height: 6px;
  background-color: rgba(66, 113, 173, 0.8);
  border-radius: 50%;
  position: relative;
  top: -1.5px;
  left: -3px;
}
.uv-bar-dot {
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  top: 1.5px;
  left: 1.5px;
}
.small-font {
  font-size: 11px;
}
.uv-value-font {
  font-size: 27px;
}
.uv-level-font {
  font-size: 14px;
}
</style>
