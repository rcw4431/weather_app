<template>
  <div class="feels-like-temperature-border">
    <div class="feels-like-temperature-header">
      <img src="/img/thermometer.png" width="10" height="15" /> &nbsp; 체감 온도
    </div>

    <div class="feels-like-temperature-body">
      <span v-for="index in 288" :key="index" class="">
        <div
          v-if="
            weather?.data?.response?.body?.items?.item[index - 60]?.fcstTime ==
            currentHour
          "
        >
          <div
            v-if="
              weather?.data?.response?.body?.items?.item[index - 60]
                ?.category === 'WSD'
            "
          >
            {{
              getWindSpeed(
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue
              )
            }}
          </div>

          <div
            v-if="
              weather?.data?.response?.body?.items?.item[index - 60]
                ?.category === 'TMP'
            "
          >
            {{
              getTemperature(
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue
              )
            }}
          </div>
        </div>
      </span>
      <div>{{ feelsLikeTemperature() }}°</div>

      <div v-if="feelsLikeTemperature() < temperatureValue" class="small-font">
        바람으로 인해 체감 온도가<br />
        실제 온도보다 더 낮게 느껴<br />집니다.
      </div>
      <div v-if="feelsLikeTemperature() > temperatureValue" class="small-font">
        습도로 인해 체감 온도가<br />
        실제 온도보다 더 높게 느껴<br />집니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import qs from "qs";
const WindSpeed = ref();

const temperatureValue = ref();
const getWindSpeed = (index) => {
  WindSpeed.value = index;
};

const getTemperature = (index) => {
  temperatureValue.value = index;
};
const feelsLikeTemperature = () => {
  const wind = ref();
  wind.value = WindSpeed.value;
  return (
    Math.round(
      (13.12 +
        0.6215 * temperatureValue.value -
        11.37 * Math.pow(wind.value, 0.16) +
        0.3965 * Math.pow(wind.value, 0.16) * temperatureValue.value) *
        10
    ) / 10
  );
};
const date = new Date();
const currentHour = date.getHours() * 100;

// console.log(windDirection.value);
// const rotateDeg = () => {
//   return windDirection.value * 22.5;
// };

const api_key =
  "8IIlgnCcJu4CZutrxEKuNB0HgYB/RMDab5SZqpKl5lnn8Xary99mNeuMcxZZOUWlQ4o1RCbAwGEoPTCHdGNRTw==";
const url_base =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const pageNo = ref("1");
const numOfRows = ref("288");
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
.feels-like-temperature-border {
  width: 145px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  z-index: 0;
}
.feels-like-temperature-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}
.feels-like-temperature-body {
  color: white;
  font-size: 26px;
  text-align: left;
  margin-top: 10px;
  margin-left: 10px;
}
.small-font {
  font-size: 11px;
  margin-top: 25px;
}
</style>
