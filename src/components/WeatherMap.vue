<template>
  <div class="map-border">
    <div class="map-header">
      <img src="/img/umbrella-icon.png" width="15" height="15" /> &nbsp;
      강수량(고정값)
    </div>
    <div class="map-body">
      <img
        class="weather-map-img"
        src="/img/weather-map.png"
        width="270"
        height="270"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.map-border {
  width: 305px;
  height: 305px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  color: white;
}
.map-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.map-body {
  color: white;
  font-size: 26px;
  text-align: left;
  margin-left: 10px;
}
.weather-map-img {
  position: relative;
  top: 13px;
  left: 8px;
}
</style>
