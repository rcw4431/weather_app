<template>
  <div class="temperature-average-border">
    <div class="temperature-average-header">
      <img src="/img/graph.png" width="15" height="15" /> &nbsp; 평균
    </div>
    <div class="temperature-average-body">
      <div v-if="(mxTmpArr[0] - tmpAvg) % 1 != 0">
        {{ (mxTmpArr[0] - tmpAvg).toFixed(1) }}°
      </div>
      <div v-else>{{ mxTmpArr[0] - tmpAvg }}°</div>
      <div class="avg-info">일일 평균 최고 기온과의 <br />차이</div>
      <div class="flex-container">
        <div>오늘</div>
        <div class="mxTmpArr">최고:{{ mxTmpArr[0] }}°</div>
      </div>
      <div class="flex-container">
        <div>3일 최고 평균</div>
        <div v-if="tmpAvg % 1 != 0" class="tmpAvg">
          최고: {{ tmpAvg.toFixed(1) }}°
        </div>
        <div v-else>최고:{{ tmpAvg * 1 }}°</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import qs from "qs";
let arr = ref([]);

for (let i = 0; i < 3; i++) {
  arr.value[i] = i;
}
const date = new Date();

const api_key =
  "8IIlgnCcJu4CZutrxEKuNB0HgYB/RMDab5SZqpKl5lnn8Xary99mNeuMcxZZOUWlQ4o1RCbAwGEoPTCHdGNRTw==";
const url_base =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const pageNo = ref("1");
const numOfRows = ref("797");
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

const mxTmpArr = ref([0, 0, 0]);

let tmpAvg = ref(0);
onMounted(() => {
  getWeather();
});

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
      for (let i = 0; i < 797; i++) {
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
          "TMX"
        ) {
          mxTmpArr.value[(i - 120) / 290] =
            Math.round(
              weather.value?.data?.response?.body?.items?.item[i]?.fcstValue *
                10
            ) / 10;
        }
      }
      tmpAvg.value = (
        (mxTmpArr.value[0] + mxTmpArr.value[1] + mxTmpArr.value[2]) /
        3
      ).toFixed(1);
    })

    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};
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
.mxTmpArr {
}
.tmpAvg {
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
