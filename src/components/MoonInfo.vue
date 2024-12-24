<template>
  <div class="moon-border">
    <div class="moon-header">
      <img src="/img/moon-icon.png" width="13" height="13" /> &nbsp; 달
    </div>
    <div class="moon-body">
      <img
        class="moon-img"
        :src="`${moonPhase?.data?.data?.imageUrl}`"
        width="96"
        height="120"
      />
      <div class="bright-side-border">
        <span>밝은 면</span>
        <span class="bright-side-value"> 90%(고정값)</span>
      </div>
      <div class="divider1"></div>
      <div class="next-moonset-border">
        <span>월출</span>
        <span class="next-moonset-value"> 오후 8:03(고정값)</span>
      </div>
      <div class="divider2"></div>
      <div class="next-full-moon-border">
        <span>다음 보름달</span>
        <span class="next-full-moon-value">27일(고정값)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// const axios = require("axios");
const date = new Date();
const get_date = ref(
  JSON.stringify(`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`)
);
const base_date = ref();

if (date.getDate() / 10 < 1) {
  base_date.value =
    get_date.value[1] +
    get_date.value[2] +
    get_date.value[3] +
    get_date.value[4] +
    "-" +
    get_date.value[5] +
    get_date.value[6] +
    "-0" +
    get_date.value[7];
} else {
  base_date.value =
    get_date.value[1] +
    get_date.value[2] +
    get_date.value[3] +
    get_date.value[4] +
    "-" +
    get_date.value[5] +
    get_date.value[6] +
    "-" +
    get_date.value[7] +
    get_date.value[8];
}

const authString = btoa(
  `1d9e1364-c556-4994-b4a4-da9438691e2c:04ce1dbb00dd87fb174dd52294c26e9e9bc5e40d54175243333695ecdcb4f9f8006773ec04c33127790352bca81fb5d96c36fa9765cd8139fb02974cc9cd7126e76cedf4a2fce73a29f55b25879f2b5ab0ffd8c73da8e34adbb4022d0dbfff8a1e89abc7ce12364d1baf8f938ed25630`
);

onMounted(() => {
  getMoonPhase();
});
const moonPhase = ref();
const getMoonPhase = () => {
  axios
    .post(
      "https://api.astronomyapi.com/api/v2/studio/moon-phase",

      {
        format: "png",
        style: {
          moonStyle: "default",
          backgroundStyle: "stars",
          backgroundColor: "red",
          headingColor: "white",
          textColor: "white",
        },
        observer: {
          latitude: 6.56774,
          longitude: 79.88956,
          date: base_date.value,
        },
        view: {
          type: "portrait-simple",
          orientation: "south-up",
        },
      },
      {
        // header
        headers: {
          Authorization: `Basic ${authString}`,
        },
      }
    )
    .then(function (response) {
      // success

      moonPhase.value = response;
    })
    .catch(function (error) {
      // error
      console.log(error);
    })
    .finally(function () {
      // api 호출이 끝나면 무조건 실행
    });
};
</script>

<style scoped>
.moon-border {
  width: 305px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  color: white;
}
.moon-header {
  text-align: left;
  margin-left: 10px;
  margin-top: 6px;
  color: rgb(165, 170, 185);
  font-size: 12px;
  display: flex;
}
.moon-body {
  width: 280px;
  height: 115px;
  position: relative;
  left: 12px;
  display: grid;
  grid-template-columns: 80px 80px 100px;
  grid-template-rows: repeat(5, 20px);
  grid-template-areas:
    "bright-side-border    bright-side-border    moon-img"
    "divider1              divider1              moon-img"
    "next-moonset-border   next-moonset-border   moon-img"
    "divider2              divider2              moon-img"
    "next-full-moon-border next-full-moon-border moon-img";
  font-size: 13px;
}
.divider1 {
  height: 1px;
  width: 160px;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  grid-area: divider1;
  vertical-align: bottom;
}
.divider2 {
  height: 1px;
  width: 160px;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  grid-area: divider2;
}
.bright-side-border {
  grid-area: bright-side-border;
  display: flex;
  justify-content: space-between;
}
.next-moonset-border {
  grid-area: next-moonset-border;
  display: flex;
  justify-content: space-between;
}
.next-full-moon-border {
  grid-area: next-full-moon-border;
  display: flex;
  justify-content: space-between;
}
.bright-side-value {
  color: rgb(165, 170, 185);
}
.next-moonset-value {
  color: rgb(165, 170, 185);
}
.next-full-moon-value {
  color: rgb(165, 170, 185);
}
.moon-img {
  position: relative;
  left: 10px;
}
</style>

<!-- 천체api 
id
1d9e1364-c556-4994-b4a4-da9438691e2c
secret
04ce1dbb00dd87fb174dd52294c26e9e9bc5e40d54175243333695ecdcb4f9f8006773ec04c33127790352bca81fb5d96c36fa9765cd8139fb02974cc9cd7126e76cedf4a2fce73a29f55b25879f2b5ab0ffd8c73da8e34adbb4022d0dbfff8a1e89abc7ce12364d1baf8f938ed25630
 -->
