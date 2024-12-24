<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import qs from "qs";
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
