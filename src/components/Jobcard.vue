<template>
  <div v-if="show">
    <b-row class="justify-content-md-center">
      <h3>{{ place }}</h3>
    </b-row>
    <b-row class="justify-content-md-center">
      <h6>3-day Forecast</h6>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-card
        :img-src="data.icon"
        header-tag="header"
        footer-tag="footer"
        style="max-width:20rem"
        class="m-2"
        v-for="data in list"
        :key="data.date"
      >
        <b-card-text>
          <div>
            <label class="ml-2 mr-2">{{ data.date }}</label>
            <label class="ml-2 mr-2">{{ data.day }}</label>
            <h4>{{ data.weather }}</h4>
          </div>
        </b-card-text>
        <template v-slot:footer>
          <em>Min : {{ data.Min }}° Max: {{ data.Max }}°</em>
        </template>
      </b-card>
    </b-row>
    <b-row>
      <div>
        <GmapMap
          :center="center"
          :zoom="7"
          map-type-id="terrain"
          style="width: 400px; height: 300px"
        >
          <GmapMarker
            :position="center"
            :clickable="true"
            :draggable="true"
            @click="center = center"
          />
        </GmapMap>
      </div>
      <b-card style="max-width:20rem" class="m-2" :header="country">
        <b-card-text>
          <label class="ml-2 mr-2">Humidity :{{ humidity }}</label>
          <label class="ml-2 mr-2">Pressure : {{ pressure }}</label>
          <h3>Wind: {{ wind }}</h3>
        </b-card-text>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { eventBus } from "../main.js";

export default {
  data: () => {
    return {
      url: "",
      show: false,
      humidity: "",
      pressure: "",
      wind: "",
      country: "",
      place: "",
      center: {
        lat: "",
        lng: ""
      },
      list: [
        {
          date: "",
          day: "",
          weather: "",
          Max: "",
          Min: "",
          icon: ""
        }
      ],
      datedata: [
        {
          date: "",
          day: ""
        }
      ]
    };
  },
  methods: {
    getWeather() {
      this.datedata = [];
      this.list = [];
      for (var i = 0; i < 3; i++) {
        var today = moment().add(i, "days");
        var fdate = moment(String(today)).format("YYYY-MM-DD");
        var fday = moment(String(today)).format("ddd");
        this.datedata.push({ date: fdate, day: fday });
      }
      axios
        .get(this.url)
        .then(response => {
          console.log(response);
          this.show = true;
          this.place = response.data.city.name;
          this.humidity = response.data.list[0].main.pressure;
          this.pressure = response.data.list[0].main.humidity;
          this.wind = response.data.list[0].wind.speed;
          this.country = "Country:" + response.data.city.country;
          this.center.lat = parseFloat(response.data.city.coord.lat.toFixed(3));
          this.center.lng = parseFloat(response.data.city.coord.lon.toFixed(3));
          // this.currentTemp = response.data.main.temp;
          this.list.splice(0, 1);
          for (var i = 0; i < this.datedata.length; i++) {
            var fdate = this.datedata[i].date;
            var fday = this.datedata[i].day;
            var fweather;
            var ficon;
            var fmin;
            var fmax;
            for (var j = 0; j < response.data.list.length; j++) {
              if (response.data.list[j].dt_txt.includes(fdate)) {
                fweather = response.data.list[j].weather[0].main;
                ficon =
                  "https://openweathermap.org/img/wn/" +
                  response.data.list[j].weather[0].icon +
                  "@2x.png";
                fmin = response.data.list[j].main.temp_min;
                fmax = response.data.list[j].main.temp_max;
              }
            }
            this.list.push({
              date: fdate,
              day: fday,
              weather: fweather,
              Max: fmax,
              Min: fmin,
              icon: ficon
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    eventBus.$on("search", data => {
      this.url =
        "https://api.openweathermap.org/data/2.5/forecast?zip=" +
        data +
        ",jp&units=metric&appid=[APIKEY]";
      this.getWeather();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
