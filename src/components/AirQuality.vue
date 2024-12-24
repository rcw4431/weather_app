<template>
  <div class="airquality-border">
    <div class="airquality-header">
      <img src="/img/airquality-icon.png" width="15" height="15" /> &nbsp;
      대기질(고정값)
    </div>
    <div class="airquality-body">
      <div>{{ airqualityValue }}</div>
      <div>{{ airQualityLevel(airqualityValue) }}</div>

      <div class="airquality-bar">
        <div
          class="airquality-bar-dot-border"
          :style="{
            transform: `translateX(${moveDot(airqualityValue)}px)`,
          }"
        >
          <div class="airquality-bar-dot"></div>
        </div>
      </div>
      <div class="small-font">
        현재의 대기질 지수는{{ airqualityValue }} 수준으로
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const airqualityValue = ref(70);
const dotPosition = ref("");
const moveDot = (airqualityValue) => {
  dotPosition.value = (airqualityValue * 0.56).toString();

  return dotPosition.value;
};
const airQualityLevel = (airqualityValue) => {
  if (airqualityValue <= 50) {
    return "좋음";
  } else if (airqualityValue >= 51 && airqualityValue <= 100) {
    return "보통";
  } else if (airqualityValue >= 101 && airqualityValue <= 150) {
    return "민감군 영향";
  } else if (airqualityValue >= 151 && airqualityValue <= 200) {
    return "나쁨";
  } else if (airqualityValue >= 201 && airqualityValue <= 300) {
    return "매우나쁨";
  } else if (airqualityValue >= 300) {
    return "위험";
  }
};
</script>

<style scoped>
.airquality-border {
  width: 305px;
  height: 145px;
  background-color: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
}
.airquality-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.airquality-body {
  color: white;
  font-size: 17px;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  font-weight: 700;
}
.airquality-bar {
  display: inline-block;
  position: relative;
  top: -4px;
  width: 280px;
  height: 4px;

  border-radius: 13px;
  /* background-color: rgb(50, 100, 163); */
  background: linear-gradient(
    to right,
    rgb(72, 146, 243),
    rgb(107, 220, 116),
    rgb(247, 208, 72),
    rgb(224, 156, 59),
    rgb(235, 79, 95),
    rgb(117, 34, 45)
  );
}
.airquality-bar-dot-border {
  width: 8px;
  height: 8px;
  background-color: rgba(66, 113, 173, 0.8);
  border-radius: 50%;
  position: relative;
  top: -2px;
  left: -4px;
}
.airquality-bar-dot {
  width: 4px;
  height: 4px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  top: 2px;
  left: 2px;
}
.small-font {
  font-size: 11px;
  margin-top: 30px;
  font-weight: 400;
}
</style>
