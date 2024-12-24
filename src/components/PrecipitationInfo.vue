<template>
  <div class="precipitation-border">
    <div class="precipitation-header">
      <img src="/img/water_drop.png" width="13" height="13" /> &nbsp; 현재
      강수량
    </div>
    <div class="precipitation-body">
      <span v-for="index in 218" :key="index">
        <span
          v-if="
            weather?.data?.response?.body?.items?.item[index]?.fcstTime ==
              currentHour &&
            weather?.data?.response?.body?.items?.item[index]?.category ===
              'PCP'
          "
        >
          <span
            v-if="
              weather?.data?.response?.body?.items?.item[index]?.fcstValue ===
              '강수없음'
            "
          >
            0mm
          </span>
          <span v-else>{{
            weather?.data?.response?.body?.items?.item[index]?.fcstValue
          }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import qs from "qs";

const date = new Date();
const currentHour = date.getHours() * 100;

const api_key =
  "8IIlgnCcJu4CZutrxEKuNB0HgYB/RMDab5SZqpKl5lnn8Xary99mNeuMcxZZOUWlQ4o1RCbAwGEoPTCHdGNRTw==";
const url_base =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const pageNo = ref("1");
const numOfRows = ref("218");
const dataType = ref("JSON");
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
    get_date.value[5] +
    get_date.value[6] +
    "0" +
    get_date.value[7];
} else {
  base_date.value =
    get_date.value[1] +
    get_date.value[2] +
    get_date.value[3] +
    get_date.value[4] +
    get_date.value[5] +
    get_date.value[6] +
    get_date.value[7] +
    get_date.value[8];
}
const base_time = ref("0500");
const nx = ref("98");
const ny = ref("75");
const weather = ref({});

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
const getWeather = () => {
  axios
    .get(url_base, {
      params: {
        serviceKey: api_key,
        pageNo: pageNo.value,
        numOfRows: numOfRows.value,
        dataType: dataType.value,
        base_date: base_date.value,
        base_time: base_time.value,
        nx: nx.value,
        ny: ny.value,
      },
    })
    .then(function (response) {
      weather.value = response;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};

onMounted(() => {
  getWeather();
});
</script>

<style scoped>
.precipitation-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
}
.precipitation-header {
  color: rgb(165, 170, 185);
  text-align: left;
  margin-top: 6px;
  margin-left: 10px;
  font-size: 12px;
  display: flex;
}
.precipitation-body {
  color: white;
  font-size: 25px;
  text-align: left;
  margin-left: 10px;
  margin-top: 4px;
}
</style>
