<template>
  <div class="weather-container">
    <div class="weather-header-border">
      <div class="weather-header">
        <img
          class="wall-clock-img"
          src="/img/wall_clock.png"
          weight="15"
          height="15"
        />&nbsp;시간별 일기예보
      </div>
      <label class="left-scroll-label" for="leftMove">
        <img
          class="left-scroll-img"
          src="/img/left-scroll.png"
          width="17"
          height="30"
        />
      </label>
      <button class="leftMove" id="leftMove" @click="leftMove"></button>

      <label class="right-scroll-label" for="rightMove">
        <img
          class="right-scroll-img"
          src="/img/right-scroll.png"
          width="17"
          height="30"
        />
      </label>
      <button class="rightMove" id="rightMove" @click="rightMove"></button>
    </div>

    <div class="divider"></div>
    <div class="weather-body-border">
      <div v-for="index in arr" :key="index" class="weather-body">
        <div
          v-if="
            weather?.data?.response?.body?.items?.item[index - 60]?.category ===
              'TMP' ||
            weather?.data?.response?.body?.items?.item[index - 60]?.category ===
              'SKY'
          "
        >
          <div
            v-if="
              weather?.data?.response?.body?.items?.item[index - 60]
                ?.category === 'TMP'
            "
            class="time-font"
          >
            {{
              formatTime(
                weather?.data?.response?.body?.items?.item[index - 60]?.fcstTime
              )
            }}
          </div>
          <br />
          <!-- 날씨 이미지 선택, 날씨 emit -->
          <div
            v-if="
              weather?.data?.response?.body?.items?.item[index - 60]
                ?.category === 'SKY'
            "
            class="weather-img"
          >
            <div
              v-if="
                // index - 58은 POP
                weather?.data?.response?.body?.items?.item[index - 58]
                  ?.fcstValue != 0
              "
            >
              <img src="/img/rainy.png" width="23" height="21" />
              <div class="probability-font">
                {{
                  weather?.data?.response?.body?.items?.item[index - 58]
                    ?.fcstValue
                }}%
                <div
                  v-if="
                    weather?.data?.response?.body?.items?.item[index - 56]
                      ?.fcstValue !== '강수없음' &&
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstTime == currentHour
                  "
                >
                  {{ emitWeather(2) }}
                </div>
                <div
                  v-else-if="
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstTime == currentHour
                  "
                >
                  {{
                    emitWeather(
                      weather?.data?.response?.body?.items?.item[index - 60]
                        ?.fcstValue
                    )
                  }}
                </div>
              </div>
            </div>
            <div
              v-else-if="
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue == 1
              "
            >
              <div
                class="moon-img"
                v-if="
                  weather?.data?.response?.body?.items?.item[index - 60]
                    ?.fcstTime > 1700 ||
                  weather?.data?.response?.body?.items?.item[index - 60]
                    ?.fcstTime < 600
                "
              >
                <img src="/img/moon.png" width="15" height="17" />
                <div
                  v-if="
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstValue == 4 &&
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstTime == currentHour
                  "
                >
                  {{ emitWeather(6) }}
                </div>
                <div
                  v-else-if="
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstTime == currentHour
                  "
                >
                  {{ emitWeather(5) }}
                </div>
              </div>
              <div v-else class="sunny-img">
                <img src="/img/sunny.png" width="20" height="20" />
                <div
                  v-if="
                    formatTime(
                      weather?.data?.response?.body?.items?.item[index - 60]
                        ?.fcstTime
                    ) === '지금'
                  "
                >
                  {{
                    emitWeather(
                      weather?.data?.response?.body?.items?.item[index - 60]
                        ?.fcstValue
                    )
                  }}
                </div>
              </div>
            </div>
            <div
              v-else-if="
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue == 3
              "
            >
              <img src="/img/cloudy.png" width="36" height="26" />
              <div
                v-if="
                  weather?.data?.response?.body?.items?.item[index - 60]
                    ?.fcstTime == currentHour
                "
              >
                {{
                  emitWeather(
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstValue
                  )
                }}
              </div>
            </div>
            <div
              v-else-if="
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue == 4
              "
            >
              <img src="/img/overcast.png" width="36" height="26" />
              <div
                v-if="
                  weather?.data?.response?.body?.items?.item[index - 60]
                    ?.fcstTime == currentHour
                "
              >
                {{
                  emitWeather(
                    weather?.data?.response?.body?.items?.item[index - 60]
                      ?.fcstValue
                  )
                }}
              </div>
            </div>
          </div>

          <br />
          <!-- 시간별 기온 -->
          <div
            v-if="
              weather?.data?.response?.body?.items?.item[index - 60]
                ?.category === 'TMP'
            "
          >
            <div class="temperature-font">
              {{
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstValue
              }}°
            </div>

            <div
              v-if="
                weather?.data?.response?.body?.items?.item[index - 60]
                  ?.fcstTime == currentHour
              "
            >
              {{
                emitTmp(
                  weather?.data?.response?.body?.items?.item[index - 60]
                    ?.fcstValue
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import axios from "axios";
import qs from "qs";

const leftMove = () => {
  document
    .querySelector(".weather-body-border")
    .scrollTo({ left: 0, behavior: "smooth" });
};
const rightMove = () => {
  document
    .querySelector(".weather-body-border")
    .scrollTo({ left: 10000, behavior: "smooth" });
};
const emit = defineEmits(["currentWeatherValue", "currentTemperatureValue"]);
const emitWeather = (index) => {
  emit("currentWeatherValue", index);
};

const emitTmp = (index) => {
  emit("currentTemperatureValue", index);
};
const date = new Date();
const getHour = (24 - date.getHours() + 1) * 12;
const arr = new Array(getHour);
const currentHour = date.getHours() * 100;
var i;
var j = 0;

for (i = 288 - getHour; i < 288; i++) {
  arr[j] = i;
  j++;
}

const formatTime = (time) => {
  //time은 시간을 1600 처럼 표현 date.getHours()은 16처럼 표현하기 때문에 * 100

  if (time == date.getHours() * 100) {
    return "지금";
  } else if (time < 1200 && time > 0) {
    return "오전" + time / 100 + "시";
  } else if (time == 0 || time == 1200) {
    return "오후 12시";
  } else {
    return "오후" + (time - 1200) / 100 + "시";
  }
};

const api_key =
  "8IIlgnCcJu4CZutrxEKuNB0HgYB/RMDab5SZqpKl5lnn8Xary99mNeuMcxZZOUWlQ4o1RCbAwGEoPTCHdGNRTw==";
const url_base =
  "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const pageNo = ref("1");
const numOfRows = ref("229");
const dataType = ref("JSON");
//날짜를 받아서 base_date에 넣기
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
.weather-container:hover
  .weather-header-border
  .right-scroll-label
  .right-scroll-img {
  visibility: visible;
}

.weather-container:hover
  .weather-header-border
  .left-scroll-label
  .left-scroll-img {
  visibility: visible;
}
.leftMove {
  display: none;
}
.rightMove {
  display: none;
}

.left-scroll-img {
  visibility: hidden;
}

.left-scroll-label {
  display: inline-block;
  width: 25px;
  height: 50px;
  position: relative;
  top: 60px;
  left: -473px;
}

.right-scroll-img {
  visibility: hidden;
}
.right-scroll-label {
  display: inline-block;
  width: 25px;
  height: 50px;
  position: relative;
  top: 60px;
  left: 473px;
}

.weather-header-border {
  width: 945px;
  height: 35px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 13px 13px 0px 0px;
  top: 0px;
  position: sticky;
  z-index: 100;
}

.wall-clock-img {
  position: relative;
  top: 3px;
}
.weather-header {
  text-align: left;
  position: relative;
  top: 5px;
  margin-left: 10px;
  color: rgb(165, 170, 185);
  font-size: 12px;
}

.weather-body-border {
  width: 945px;
  height: 110px;
  background: rgba(66, 113, 173, 0.8);
  border-radius: 0px 0px 13px 13px;
  overflow-x: scroll;
  overflow-y: scroll;
  white-space: nowrap;
  position: relative;
  top: -1px;
}
@media screen and (max-width: 1200px) {
  .weather-body-border,
  .weather-header-border {
    width: 625px;
  }
  .left-scroll-img {
    position: relative;
  }
  .right-scroll-img {
    position: relative;
  }
  .left-scroll-label {
    display: inline-block;
    width: 25px;
    height: 50px;
    position: relative;
    top: 60px;
    left: -312px;
  }
  .right-scroll-label {
    display: inline-block;
    width: 25px;
    height: 50px;
    position: relative;
    top: 60px;
    left: 312px;
  }
}

.weather-body-border::-webkit-scrollbar {
  display: none;
}

.weather-body {
  display: inline-block;
  color: white;
  position: relative;
  top: 10px;
}

.weather-img {
  position: relative;
  left: -45px;
}

.time-font {
  height: 22px;
  width: 63px;
  font-size: 12px;
  font-weight: 700;
}
.divider {
  height: 1px;
  width: 932px;
  background-color: rgb(137, 179, 234);
  position: relative;
  box-shadow: 0px;
  left: 10px;
  top: -5px;
  z-index: 1000;
}
@media screen and (max-width: 1200px) {
  .divider {
    width: 612px;
  }
}
.probability-font {
  color: rgb(119, 197, 241);
  font-size: 11px;
  font-weight: 900;
}
.temperature-font {
  font-weight: 700;
  font-size: 15px;
}
.sunny-img {
  position: relative;
  left: 3px;
  top: -9px;
}
.moon-img {
  position: relative;
  left: 4px;
  top: -11px;
}
</style>
