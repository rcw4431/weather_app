<template>
  <div class="wind-border">
    <div class="wind-header">
      <img src="/img/wind.png" width="15" height="15" /> &nbsp; 바람
    </div>
    <div class="wind-body">
      <div class="divider"></div>
      <span v-for="index in 218" :key="index" class="">
        <div
          class="azimuth"
          v-if="
            weather?.data?.response?.body?.items?.item[index]?.fcstTime ==
              currentHour &&
            weather?.data?.response?.body?.items?.item[index]?.category ===
              'VEC'
          "
        >
          <div class="azimuth-text-border">
            <p class="azimuth-text">
              {{
                windDirectionCal(
                  weather?.data?.response?.body?.items?.item[index]?.fcstValue
                )
              }}
            </p>
          </div>
          <img
            class="azimuth-img"
            src="/img/azimuth.png"
            width="130"
            height="130"
          />
          <div
            v-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '북'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(90deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '북북동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(112.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '북동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(135deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '동북동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(157.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(180deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '동남동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(202.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '남동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(225deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '남남동'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(247.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '남'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(270deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '남남서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(292.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '남서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(315deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '서남서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(337.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(360deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '서북서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(22.5deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '북서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(45deg)"
            />
          </div>
          <div
            v-else-if="
              windDirectionCal(
                weather?.data?.response?.body?.items?.item[index]?.fcstValue
              ) === '북북서'
            "
          >
            <img
              class="arrow-img"
              src="/img/arrow.png"
              width="100"
              height="40"
              style="transform: rotate(77.5deg)"
            />
          </div>
        </div>
        <div
          v-else-if="
            weather?.data?.response?.body?.items?.item[index]?.fcstTime ==
              currentHour &&
            weather?.data?.response?.body?.items?.item[index]?.category ===
              'WSD'
          "
        >
          <div class="flex-container">
            <div class="wind-value">
              {{ weather?.data?.response?.body?.items?.item[index]?.fcstValue }}
            </div>
            <div class="grid-container">
              <div class="ms-font">m/s</div>
              <div class="wind-direction-font">바람</div>
            </div>
          </div>
        </div>
        <!-- <div
          v-else-if="
            weather.response?.body?.items?.item[index]?.fcstTime ==
              currentHour &&
            weather.response?.body?.items?.item[index]?.category === 'UUU'
          "
        >
          <div class="grid-container">
            <div class="wind-value-font">
              {{ weather.response?.body?.items?.item[index]?.fcstValue }}
            </div>

            <div class="ms-font">m/s</div>
            <br />
            <div class="wind-direction-font">동서성분 바람</div>
          </div>
        </div>

        <div
          v-else-if="
            weather.response?.body?.items?.item[index]?.fcstTime ==
              currentHour &&
            weather.response?.body?.items?.item[index]?.category === 'VVV'
          "
        >
          <div class="grid-container">
            <div class="wind-value-font">
              {{ weather.response?.body?.items?.item[index]?.fcstValue }}
            </div>

            <div class="ms-font">m/s</div>
            <br />
            <div class="wind-direction-font">남북성분 바람</div>
          </div>
        </div> -->
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
const windDirection = ref();

const azimuth = [
  "북",
  "북북동",
  "북동",
  "동북동",
  "동",
  "동남동",
  "남동",
  "남남동",
  "남",
  "남남서",
  "남서",
  "서남서",
  "서",
  "서북서",
  "북서",
  "북북서",
  "북",
];

const windDirectionCal = (deg) => {
  windDirection.value = Math.floor((Number(deg) + 22.5 * 0.5) / 22.5);
  // arrow-img.style.transform = rotateDeg(azimuth[windDirection.value]*22.5);
  return azimuth[windDirection.value];
};
// console.log(windDirection.value);
// const rotateDeg = () => {
//   return windDirection.value * 22.5;
// };

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
.wind-border {
  width: 305px;
  height: 145px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 10px;
  z-index: 0;
}
.wind-header {
  color: rgb(165, 170, 185);
  text-align: left;
  position: relative;
  top: 6px;
  left: 5px;
  font-size: 12px;
  display: flex;
}
.wind-body {
  color: white;
  font-size: 20px;
  text-align: left;
  margin-left: 10px;
}
.azimuth {
  position: relative;
  top: -132px;
}

.azimuth-text-border {
  position: relative;
  left: 195px;
  top: 142px;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  background: rgba(66, 113, 173, 1);
  z-index: 100;
}
.azimuth-text {
  color: white;
  font-size: 15px;
  position: relative;
  left: 0px;
  top: 15px;
  z-index: 101;
}

.azimuth-img {
  position: relative;
  left: 155px;
  top: 52px;
  z-index: 0;
}

.arrow-img {
  transform: rotate(0deg);
  position: relative;
  left: 170px;
  top: -40.5px;
  z-index: 20;
}
.divider {
  height: 1px;
  width: 140px;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  position: relative;
  left: 0px;
  top: 55px;
}
.grid-container {
  display: grid;
  grid-template-columns: 6px 20px;
  grid-template-rows: 15px;
  grid-template-areas:
    ". ms"
    ". wind-direction";
  position: relative;
  top: -235px;
}
.flex-container {
  display: flex;
}
.ms-font {
  color: rgb(165, 170, 185);
  font-size: 13px;
  display: inline-block;
  grid-area: ms;
}
.wind-direction-font {
  font-size: 13px;
  display: inline-block;
  grid-area: wind-direction;
}
.wind-value {
  font-size: 27px;
  font-weight: 700;
  position: relative;
  top: -235px;
}
</style>
