<template>
  <div>
    <label for="sidebar-hide" class="sidebar-hide-label">
      <img
        class="sidebar-hide-img"
        src="/img/sidebar_hide.png"
        width="25"
        height="17"
      />
    </label>
    <button
      id="sidebar-hide"
      class="sidebar-hide-button"
      @click="sidebarHide()"
    ></button>
  </div>

  <vue-resizable
    class="sidebar"
    :active="['r']"
    :width="200"
    :min-width="140"
    :max-width="290"
    :style="{
      transform: isHide ? '' : 'translateX(-300px)',
      height: '100vh',
      position: 'relative',
    }"
  >
    <div>
      <br />

      <br />
      <br />
      <div v-for="index in 1" :key="index" class="sidebar-components">
        <button class="sidebar-border">
          <div class="location">부산광역시</div>
          <div class="current-time">{{ currentTime }}</div>
          <div class="current-weather">{{ props.currentWeather }}</div>
          <div class="current-temperature">{{ props.currentTemperature }}</div>
          <div class="mx-mn-temperature">
            최고:{{ props.mxTemperature }}° 최저:{{ props.mnTemperature }}°
          </div>
        </button>
        <div class="divider"></div>
      </div>
      <br />
    </div>
  </vue-resizable>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import VueResizable from "vue-resizable";
let isHide = ref(true);
const sidebarHide = () => {
  if (isHide.value == true) {
    isHide.value = false;
  } else {
    isHide.value = true;
  }
};
var date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();

const currentTime = ref("");
if (hours < 12) {
  currentTime.value = "오전 " + hours + ":";
} else if (hours === 12) {
  currentTime.value = "오후 " + hours + ":";
} else {
  currentTime.value = "오후 " + (hours - 12) + ":";
}

if (minutes < 10) {
  currentTime.value = currentTime.value + "0" + minutes;
} else {
  currentTime.value = currentTime.value + minutes;
}

const props = defineProps({
  currentWeather: String,
  currentTemperature: String,
  mxTemperature: String,
  mnTemperature: String,
});

onMounted(() => {});
const isClicked = ref(false);
document.addEventListener("click", (event) => {
  if (event.target.closest(".sidebar-border")) {
    isClicked.value = true;
  }
});
document.addEventListener("mousedown", (event) => {
  if (event.target.closest(".sidebar-border")) {
    isClicked.value = true;
  }
});
console.log();
</script>
<style>
.sidebar {
  /* width: 200px; */
  /* height: 100vh; */
  border-radius: 13px 0px 0px 13px;
  background: rgb(66, 113, 173);
  position: relative;
  transition: 0.2s ease-in;
}
.location {
  color: white;
  font-size: 14px;
  font-weight: 700;
  grid-area: location;
  display: flex;
}
.current-time {
  grid-area: time;
  font-size: 11px;
  font-weight: 700;
  color: rgb(147, 185, 244);
  display: flex;
}
.current-weather {
  grid-area: weather;
  font-size: 11px;
  font-weight: 700;
  color: rgb(141, 174, 200);
  display: flex;
}
.current-temperature {
  grid-area: temperature;
  font-size: 28px;
  font-weight: 500;
  color: rgb(147, 185, 244);
  display: flex;
  justify-content: end;
}
.mx-mn-temperature {
  grid-area: mx-mn;
  font-size: 11px;
  font-weight: 700;
  color: rgb(141, 174, 200);
  display: flex;
  justify-content: end;
}
.divider {
  height: 1px;
  width: 92%;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  position: relative;
  top: 0px;
  margin-left: 3px;
}
.sidebar-border {
  display: grid;
  border-radius: 5px;
  width: 95%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1px);
  grid-template-rows: 16px 23px 19px;
  grid-template-areas:
    "location temperature"
    "time     temperature"
    "weather  mx-mn";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sidebar-border:focus {
  background-color: rgb(130, 154, 186);
}
.sidebar-border:focus .current-time {
  color: rgb(214, 239, 255);
}
.sidebar-border:focus .current-temperature {
  color: rgb(214, 239, 255);
}
.sidebar-border:focus .mx-mn-temperature {
  color: rgb(180, 204, 236);
}
.sidebar-border:focus .current-weather {
  color: rgb(180, 204, 236);
}
.sidebar-hide-label {
  position: absolute;
  width: 40px;
  height: 30px;
  z-index: 100;
  left: 90px;
  top: 20px;
}
.sidebar-hide-label:hover .sidebar-hide-img {
  outline: 6px solid rgba(53, 95, 156, 1);
  border-radius: 1px;
}

.sidebar-hide-img {
  vertical-align: middle;
}

.sidebar-hide-button {
  display: none;
}
.sidebar-components {
  margin-left: 12px;
}
</style>
