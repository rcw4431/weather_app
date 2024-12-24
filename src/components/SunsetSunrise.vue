<template>
  <div class="sun-border">
    <div class="sun-header">
      <img src="/img/sun-set-rise-icon.png" width="15" height="15" /> &nbsp;
      일출 일몰(고정값)
    </div>
    <br />
    <div class="sun-body">
      <div class="sun-set-font">오후 5:12</div>
      <img
        class="sun-set-rise-img"
        src="/img/sun-set-rise-img.png"
        width="145"
        height="40"
      />
      <div class="sun-rise-font">일출: 오전 7:33</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.sun-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  color: white;
}
.sun-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.sun-body {
  color: white;
  font-size: 26px;
  text-align: left;
  margin-left: 10px;
  margin-top: -10px;
}
.sun-set-rise-img {
  position: relative;
  left: -10px;
}
.sun-set-font {
  font-size: 24px;
}
.sun-rise-font {
  font-size: 11px;
}
</style>
