import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: () => import("../components/MainPage.vue"),
  },
  {
    path: "/test",
    name: "TestPage",
    component: () => import("../components/TestPage.vue"),
  },

  {
    path: "/air",
    name: "AirQuality",
    component: () => import("../components/AirQuality.vue"),
  },
  {
    path: "/feels",
    name: "FeelsLikeTemperature",
    component: () => import("../components/FeelsLikeTemperature.vue"),
  },
  {
    path: "/humidity",
    name: "HumidityInfo",
    component: () => import("../components/HumidityInfo.vue"),
  },
  {
    path: "/moon",
    name: "MoonInfo",
    component: () => import("../components/MoonInfo.vue"),
  },
  {
    path: "/precipitation",
    name: "PrecipitationInfo",
    component: () => import("../components/PrecipitationInfo.vue"),
  },
  {
    path: "/pressure",
    name: "PressureInfo",
    component: () => import("../components/PressureInfo.vue"),
  },

  {
    path: "/sun",
    name: "SunsetSunrise",
    component: () => import("../components/SunsetSunrise.vue"),
  },
  {
    path: "/tmpavg",
    name: "TemperatureAverage",
    component: () => import("../components/TemperatureAverage.vue"),
  },
  {
    path: "/three",
    name: "ThreeDayWeather",
    component: () => import("../components/ThreeDayWeather.vue"),
  },
  {
    path: "/today",
    name: "TodayWeather",
    component: () => import("../components/TodayWeather.vue"),
  },
  {
    path: "/uv",
    name: "UvInfo",
    component: () => import("../components/UvInfo.vue"),
  },
  {
    path: "/visibility",
    name: "VisibilityInfo",
    component: () => import("../components/VisibilityInfo.vue"),
  },
  {
    path: "/weathermap",
    name: "WeatherMap",
    component: () => import("../components/WeatherMap.vue"),
  },
  {
    path: "/wind",
    name: "WindInfo",
    component: () => import("../components/WindInfo.vue"),
  },
  {
    path: "/sidebar",
    name: "SideBar",
    component: () => import("../components/SideBar.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
