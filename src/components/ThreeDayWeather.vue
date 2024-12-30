<template>
  <div class="weather-border">
    <div class="weather-header">
      <img src="/img/calendar.png" width="15" height="15" /> &nbsp; 3일간의
      일기예보
    </div>
    <div class="header-divider"></div>
    <br />

    <div class="weather-body" v-for="i in arr" :key="i">
      <div class="days">{{ daysArr[i] }}</div>

      <div class="weather-img">
        <div v-if="threeDayWeather[i] == 1">
          <img src="/img/sunny.png" width="20" height="20" />
        </div>
        <div v-if="threeDayWeather[i] == 2">
          <img src="/img/rainy.png" width="23" height="21" />
        </div>
        <div v-if="threeDayWeather[i] == 3">
          <img src="/img/cloudy.png" width="25" height="17" />
        </div>
        <div v-if="threeDayWeather[i] == 4">
          <img src="/img/overcast.png" width="25" height="17" />
        </div>
      </div>
      <div class="mn-tmp">{{ mnTmpArr[i] }}°</div>
      <div class="tmp-bar"></div>
      <div class="mx-tmp">{{ mxTmpArr[i] }}°</div>

      <div class="body-divider"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import axios from "axios";
import qs from "qs";
let arr = ref([]);

for (let i = 0; i < 3; i++) {
  arr.value[i] = i;
}
const date = new Date();
const getTodayWeekday = (fcstDate) => {
  const DateString = String(fcstDate);
  const dd = ref(
    DateString[0] +
      DateString[1] +
      DateString[2] +
      DateString[3] +
      "," +
      DateString[4] +
      DateString[5] +
      "," +
      DateString[6] +
      DateString[7]
  );

  const day = new Date(dd.value);

  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return days[day.getDay()];
};

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

const daysArr = ref(["오늘", "", ""]);
const threeDayWeather = ref([0, 0, 0]);
const mnTmpArr = ref([0, 0, 0]);
const mxTmpArr = ref([0, 0, 0]);

let sunny = ref(0);
let rainy = ref(0);
let cloudy = ref(0);
let overcast = ref(0);

let todayMnTmp = ref(100);

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
        if ((i - 216) % 290 == 0) {
          threeDayWeather.value[(i - 216) / 290] = getWeatherImg();
          // mnTmpArr.value[(i - 216) / 290] = todayMnTmp;
          // mxTmpArr.value[(i - 216) / 290] = todayMxTmp;
          sunny.value = 0;
          rainy.value = 0;
          cloudy.value = 0;
          overcast.value = 0;
        }
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
          "SKY"
        ) {
          getThreeDayWeather(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          );
        }
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.fcstValue !==
            "강수없음" &&
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
            "PCP"
        ) {
          getThreeDayWeather(2);
        }
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
          "TMN"
        ) {
          mnTmpArr.value[(i - 11) / 290] =
            Math.round(
              weather.value?.data?.response?.body?.items?.item[i]?.fcstValue *
                10
            ) / 10;
        }
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

      weather.value = response;
      for (let i = 0; i < 217; i++) {
        if (
          weather.value?.data?.response?.body?.items?.item[i]?.category ===
            "TMP" &&
          Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          ) < todayMnTmp.value
        ) {
          todayMnTmp.value = Number(
            weather.value?.data?.response?.body?.items?.item[i]?.fcstValue
          );
        }
      }
      mnTmpArr.value[0] = todayMnTmp.value;
      emit("mnTemperatureValue", todayMnTmp.value);
      emit("mxTemperatureValue", mxTmpArr.value[0]);
      for (let i = 1; i < 3; i++) {
        daysArr.value[i] = getTodayWeekday(
          weather.value?.data?.response?.body?.items?.item[i * 290]?.fcstDate
        );
      }
    })

    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};

const getThreeDayWeather = (SKY) => {
  if (SKY == 1) {
    sunny.value++;
  } else if (SKY == 3) {
    cloudy.value++;
  } else if (SKY == 4) {
    overcast.value++;
  } else {
    rainy.value++;
  }
};

const getWeatherImg = () => {
  if (
    rainy.value >= sunny.value &&
    rainy.value >= cloudy.value &&
    rainy.value >= overcast.value
  ) {
    return 2;
  } else if (
    sunny.value >= rainy.value &&
    sunny.value >= cloudy.value &&
    sunny.value >= overcast.value
  ) {
    return 1;
  } else if (
    cloudy.value >= sunny.value &&
    cloudy.value >= rainy.value &&
    cloudy.value >= overcast.value
  ) {
    return 3;
  } else if (
    overcast.value >= sunny.value &&
    overcast.value >= rainy.value &&
    overcast.value >= cloudy.value
  ) {
    return 4;
  }
};

const emit = defineEmits(["mnTemperatureValue,mxTemperatureValue"]);
</script>

<style scoped>
.weather-header {
  text-align: left;
  margin-top: 6px;
  top: 6px;
  position: relative;
  margin-left: 10px;
  color: rgb(165, 170, 185);
  font-size: 12px;
  display: flex;
}

.weather-border {
  width: 305px;
  height: 465px;

  background: rgba(66, 113, 173, 0.8);
  border-radius: 13px;
}

.weather-body {
  display: grid;
  grid-template-columns: 10px 60px 10px 50px 30px 110px 30px;
  grid-template-rows: 40px 1px;
  grid-template-areas:
    ".       days    .       weather-img  mn-tmp  tmp-bar mx-tmp"
    "divider divider divider divider      divider divider divider";
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  top: -20px;
}

.days {
  color: white;
  font-weight: 600;
  grid-area: days;
  text-align: left;
  justify-items: start;
  display: flex;
  justify-content: flex-start;
}

.mn-tmp {
  position: relative;

  font-weight: 800;
  color: rgb(122, 176, 242);

  grid-area: mn-tmp;
}

.mx-tmp {
  position: relative;
  font-weight: 800;

  color: white;
  grid-area: mx-tmp;
}

.tmp-bar {
  display: inline-block;
  position: relative;

  width: 100px;
  height: 3px;
  border: 1px;
  border-radius: 13px;

  background: linear-gradient(
    to right,
    rgb(122, 200, 239),
    rgb(123, 202, 232),
    rgb(171, 222, 173),
    rgb(199, 211, 144)
  );
  grid-area: tmp-bar;
}

.weather-img {
  position: relative;

  grid-area: weather-img;
}
.header-divider {
  height: 1px;
  width: 285px;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  position: relative;
  margin-top: 10px;
  left: 10px;
}

.body-divider {
  height: 1px;
  width: 285px;
  background-color: rgb(137, 179, 234);
  box-shadow: 0px;
  position: relative;
  grid-area: divider;
}
</style>
