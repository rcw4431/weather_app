<template>
  <div class="background-img">
    <div v-if="currentWeatherImg == '흐림'">
      <div class="overcast-sky-img"></div>
    </div>
    <div v-else-if="currentWeatherImg == '맑음'">
      <div class="sunny-sky-img"></div>
    </div>
    <div v-else-if="currentWeatherImg == '구름 많음'">
      <div class="cloudy-sky-img"></div>
    </div>
    <div v-else-if="currentWeatherImg == '비'">
      <div class="rainy-sky-img"></div>
    </div>
    <div v-else-if="currentWeatherImg == '맑은 밤'">
      <div class="night-sky-img"></div>
    </div>
    <div v-else-if="currentWeatherImg == '구름 많은 밤'">
      <div class="night-cloudy-sky-img"></div>
    </div>
  </div>
  <div class="flex-container">
    <SideBar
      class="sidebar"
      :currentWeather="currentWeather"
      :currentTemperature="currentTemperature"
      :mxTemperature="mxTemperature"
      :mnTemperature="mnTemperature"
      @sidebarWidth="sidebarWidthValue"
    >
    </SideBar>
    <div class="main-page">
      <div
        class="search-container"
        :style="{ right: sidebarWidth - 200 + 'px' }"
      >
        <div
          class="search-border"
          :style="{
            outline: isClicked ? 'rgb(58, 123, 195) solid 4px' : '',
          }"
        >
          <label for="search"
            ><img
              class="search-img"
              src="/img/search.png"
              width="20"
              height="20"
            />
          </label>
          <input
            id="search"
            class="search"
            type="text"
            placeholder="검색"
            autocomplete="off"
          />
        </div>
      </div>
      <!--  -->
      <div
        class="main-page-info"
        :style="{ right: (sidebarWidth - 200) / 2 + 'px' }"
      >
        <p class="main-page-location">부산광역시{{ sidebarWidth }}</p>
        <br />
        <p class="main-page-temperature">{{ currentTemperature }}&nbsp;</p>
        <br />
        <p class="main-page-weather">{{ currentWeather }}&nbsp;</p>
        <br />
        <p class="main-page-mx-mn-temperature">
          최고:{{ mxTemperature }}° 최저:{{ mnTemperature }}°
        </p>
      </div>
      <div
        class="scroll-container"
        :style="{ right: (sidebarWidth - 200) / 2 + 'px' }"
      >
        <div class="main-page-components">
          <TodayWeather
            class="today"
            @currentWeatherValue="currentWeatherValue"
            @currentTemperatureValue="currentTemperatureValue"
          ></TodayWeather>
          <ThreeDayWeather
            class="three-day"
            @mnTemperatureValue="mnTemperatureValue"
            @mxTemperatureValue="mxTemperatureValue"
          ></ThreeDayWeather>
          <HumidityInfo class="humidity"></HumidityInfo>
          <PrecipitationInfo class="precipitation"></PrecipitationInfo>
          <SunsetSunrise class="sun"></SunsetSunrise>
          <PressureInfo class="pressure"></PressureInfo>
          <UvInfo class="uv"></UvInfo>
          <AirQuality class="air"></AirQuality>
          <WeatherMap class="weather-map"></WeatherMap>
          <MoonInfo class="moon"></MoonInfo>
          <VisibilityInfo class="visibility"></VisibilityInfo>
          <FeelsLikeTemperature
            class="feels-like-temperature"
          ></FeelsLikeTemperature>
          <WindInfo class="wind"></WindInfo>
          <TemperatureAverage class="temperature-average"></TemperatureAverage>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ThreeDayWeather from "./ThreeDayWeather.vue";
import TodayWeather from "./TodayWeather.vue";
import HumidityInfo from "./HumidityInfo.vue";
import PrecipitationInfo from "./PrecipitationInfo.vue";
import SunsetSunrise from "./SunsetSunrise.vue";
import PressureInfo from "./PressureInfo.vue";
import UvInfo from "./UvInfo.vue";
import AirQuality from "./AirQuality.vue";
import WeatherMap from "./WeatherMap.vue";
import MoonInfo from "./MoonInfo.vue";
import VisibilityInfo from "./VisibilityInfo.vue";
import FeelsLikeTemperature from "./FeelsLikeTemperature.vue";
import WindInfo from "./WindInfo.vue";
import TemperatureAverage from "./TemperatureAverage.vue";
import SideBar from "./SideBar.vue";
import { ref, onMounted } from "vue";
const sidebarWidth = ref(0);
const sidebarWidthValue = (index) => {
  sidebarWidth.value = index;
};
const currentWeather = ref("");
const currentWeatherImg = ref("");
const currentTemperature = ref("");
const mnTemperature = ref("");
const mxTemperature = ref("");
const mnTemperatureValue = (index) => {
  mnTemperature.value = index;
};
const mxTemperatureValue = (index) => {
  mxTemperature.value = index;
};

const currentWeatherValue = (index) => {
  //메인페이지의 정보에 표시되는 날씨 정보
  if (index == 1) {
    currentWeather.value = "맑음";
  } else if (index == 2) {
    currentWeather.value = "비";
  } else if (index == 3) {
    currentWeather.value = "구름 많음";
  } else if (index == 4) {
    currentWeather.value = "흐림";
  }
  //emit으로 받은 값으로 배경 결정
  if (index == 1) {
    currentWeatherImg.value = "맑음";
  } else if (index == 2) {
    currentWeatherImg.value = "비";
  } else if (index == 3) {
    currentWeatherImg.value = "구름 많음";
  } else if (index == 4) {
    currentWeatherImg.value = "흐림";
  } else if (index == 5) {
    currentWeatherImg.value = "맑은 밤";
  } else if (index == 6) {
    currentWeatherImg.value = "구름 많은 밤";
  }
};

const currentTemperatureValue = (index) => {
  currentTemperature.value = index + "°";
};
onMounted(() => {});

const isClicked = ref(false);

document.addEventListener("click", (event) => {
  if (event.target.closest(".search")) {
    isClicked.value = true;
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".search")) {
    isClicked.value = false;
  }
});
// const dateBuilder = () => {
//   let d = new Date();
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const days = ["월", "화", "수", "목", "금", "토", "일"];
//   const day = days[d.getDay()];
//   const date = d.getDate();
//   const month = months[d.getMonth()];
//   const year = d.getFullYear();
//   return `${day} ${date} ${month} ${year}`;
// };
</script>

<style scoped>
.background-img {
  position: absolute;
  z-index: -100;
}
.sunny-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/sunny_sky.png");
  background-size: 100% 100%;
  background-attachment: fixed;
  margin-left: -3px;
}

.overcast-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/overcast_sky.png");
  background-size: 100% 100%;
  background-attachment: fixed;
}
.cloudy-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/cloudy_sky.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.night-cloudy-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/night_cloudy_sky.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.night-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/night_sky.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.rainy-sky-img {
  width: 100vw;
  height: 100vh;
  background-image: url("/public/img/rainy_sky.gif");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
}
.flex-container {
  display: flex;
}
.scroll-container {
  height: 72vh;
  overflow-y: scroll;
  white-space: nowrap;
  position: relative;
}
.main-page {
  /* width: calc(100vw - 200px); */
  width: calc(100vw - 620px);
  height: 100vh;
  display: inline-block;
  position: relative;
  justify-items: center;
  left: 200px;
}
.main-page-components {
  display: grid;
  grid-template-columns: repeat(6, 145px);
  grid-template-rows: repeat(5, 145px);
  gap: 15px;
  grid-template-areas:
    "today today today today today today"
    "three-day three-day air air weather-map weather-map"
    "three-day three-day wind wind weather-map weather-map"
    "three-day three-day uv sun feels-like-temperature precipitation"
    "moon moon humidity visibility pressure temperature-average";
  width: 1000px;
  height: 785px;

  position: relative;
  justify-content: center;
}
@media screen and (max-width: 1200px) {
  .main-page-components {
    width: 700px;
    height: calc(89vh - 100px);
    grid-template-columns: repeat(4, 145px);
    grid-template-rows: repeat(7, 145px);
    gap: 15px;
    grid-template-areas:
      "today today today today"
      "three-day three-day weather-map weather-map"
      "three-day three-day weather-map weather-map"
      "three-day three-day air air"
      "moon moon wind wind"
      "uv sun feels-like-temperature precipitation"
      "visibility humidity pressure temperature-average";
    justify-content: center;
  }
  .scroll-container {
    height: 78vh;
    width: 700px;
  }
}
.scroll-container::-webkit-scrollbar {
  display: none;
}
.search-container {
  display: flex;
  justify-content: end;
  width: calc(100vw - 200px);
  position: relative;
  margin-top: 10px;
  height: 30px;
}
.search {
  width: 160px;
  height: 15px;
  border-radius: 4px;
  box-shadow: 0px;
  border: 0px;
  top: -3px;
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  display: inline-block;
}
.search:focus {
  outline: none;
}
.search-border {
  width: 200px;
  height: 25px;
  border-radius: 4px;
  box-shadow: 0px;

  background-color: rgba(19, 61, 126, 0.8);
  position: relative;
  display: inline-block;
  left: -10px;
}

.search-img {
  position: relative;
  display: inline-block;
  top: 3px;
  left: -3px;
}

.today {
  grid-area: today;
}
.three-day {
  grid-area: three-day;
}
.humidity {
  grid-area: humidity;
}
.precipitation {
  grid-area: precipitation;
}
.sun {
  grid-area: sun;
}
.pressure {
  grid-area: pressure;
}
.uv {
  grid-area: uv;
}
.air {
  grid-area: air;
}
.weather-map {
  grid-area: weather-map;
}
.moon {
  grid-area: moon;
}
.visibility {
  grid-area: visibility;
}
.feels-like-temperature {
  grid-area: feels-like-temperature;
}
.wind {
  grid-area: wind;
}
.temperature-average {
  grid-area: temperature-average;
}
.sidebar {
  position: absolute;
}
.location {
  color: white;
}
.main-page-info {
  color: white;
  position: relative;
  height: 200px;
}
.main-page-location {
  font-size: 35px;
  font-weight: 400;
  display: inline;
}
.main-page-temperature {
  font-size: 65px;
  font-weight: 100;
  display: inline;
  position: relative;
  top: -20px;
  left: 5px;
}
.main-page-weather {
  font-weight: 600;
  display: inline;
  position: relative;
  top: -40px;
}
.main-page-mx-mn-temperature {
  font-weight: 600;
  display: inline;
  position: relative;
  top: -40px;
}

* {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
<!-- 작가 bamdewanto 출처 Freepik -->
<!-- 작가 hannazasimova 출처 Freepik -->
<!-- <a href="https://www.flaticon.com/kr/free-icons/-" title="습도 센서 아이콘">습도 센서 아이콘 제작자: Tanah Basah - Flaticon</a> -->
