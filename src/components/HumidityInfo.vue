<template>
  <div class="humidity-border">
    <div class="humidity-header">
      <img src="/img/humidity.png" width="15" height="15" /> &nbsp; 습도
    </div>

    <div class="humidity-body">
      <span v-for="index in 218" :key="index">
        <span
          v-if="
            weather?.data?.response?.body?.items?.item[index - 60]?.fcstTime ==
              currentHour &&
            weather?.data?.response?.body?.items?.item[index - 60]?.category ===
              'REH'
          "
        >
          {{
            weather?.data?.response?.body?.items?.item[index - 60]?.fcstValue
          }}%
        </span>
      </span>
      <div class="small-font">현재 이슬점이 -8° 입니다.<br />(고정값)</div>
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
.humidity-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
}
.humidity-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}

.humidity-body {
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
