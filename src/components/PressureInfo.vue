<template>
  <div class="pressure-border">
    <div class="pressure-header">
      <img src="/img/pressure-icon.png" width="15" height="15" /> &nbsp;
      기압(고정값)
    </div>
    <div class="pressue-body">
      <!-- <img
        class="pressure-img"
        src="/img/pressure-img.png"
        width="110"
        height="110"
      /> -->
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.pressure-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  color: white;
}
.pressure-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.pressure-body {
  color: white;
  font-size: 26px;
  text-align: left;
  margin-left: 10px;
}
</style>
