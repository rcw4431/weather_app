<template>
  <div class="temperature-average-border">
    <div class="temperature-average-header">
      <img src="/img/graph.png" width="15" height="15" /> &nbsp; 평균
    </div>
    <div class="temperature-average-body">
      <div class="">{{ threeDayMxTmp - todayMxTmp }}°</div>
      <div class="avg-info">일일 평균 최고 기온과의 <br />차이</div>
      <div class="flex-container">
        <div>오늘</div>
        <div class="todayMxTmp">최고:{{ todayMxTmp }}°</div>
      </div>
      <div class="flex-container">
        <div>3일</div>
        <div class="threeDayMxTmp">최고:{{ threeDayMxTmp }}°</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import qs from "qs";
const date = new Date();
let toDaytmpAvg = ref(0);
const threeDaytmpAvg = ref(0);
let todayMxTmp = ref(-100);
let threeDayMxTmp = ref(-100);
const api_key =
  "8IIlgnCcJu4CZutrxEKuNB0HgYB/RMDab5SZqpKl5lnn8Xary99mNeuMcxZZOUWlQ4o1RCbAwGEoPTCHdGNRTw==";
const url_base =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const pageNo = ref("1");
const numOfRows = ref("1000");
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

      for (let i = 0; i < 217; i++) {
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
          "TMP"
        ) {
          toDaytmpAvg.value =
            toDaytmpAvg.value +
            Number(
              weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
            );
        }
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
            "TMP" &&
          Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          ) > todayMxTmp.value
        ) {
          todayMxTmp.value = Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          );
        }
      }
      toDaytmpAvg.value = Math.round((toDaytmpAvg.value / 19) * 10) / 10;
      for (let i = 0; i < 797; i++) {
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
          "TMP"
        ) {
          threeDaytmpAvg.value =
            threeDaytmpAvg.value +
            Number(
              weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
            );
        }
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
            "TMP" &&
          Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          ) > threeDayMxTmp.value
        ) {
          threeDayMxTmp.value = Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          );
        }
      }
      threeDaytmpAvg.value = Math.round((threeDaytmpAvg.value / 66) * 10) / 10;
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
.temperature-average-border {
  width: 145px;
  height: 145px;

  background: rgba(66, 113, 173, 0.8);
  border-radius: 13px;
}

.temperature-average-header {
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
  color: rgb(165, 170, 185);
  font-size: 12px;
  display: flex;
}

.temperature-average-body {
  color: white;
  font-size: 24px;
  text-align: left;
  margin-left: 10px;
}
.threeDayMxTmp {
}
.todayMxTmp {
  font-size: 11px;
}
.avg-info {
  font-size: 12px;
  font-weight: 600;
}
.flex-container {
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  margin-right: 5px;
}
</style>
