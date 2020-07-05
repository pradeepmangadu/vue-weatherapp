<template>
  <div id="app" class="mx-auto">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-form inline @submit="onSubmit">
          <label class="mr-3" for="inline-form-input-name">Post Code</label>
          <b-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="000-0000"
            v-model="pincode"
          ></b-input>
          <b-button variant="primary" type="submit">Submit</b-button>
        </b-form>
      </b-row>
      <b-row class="justify-content-md-center">
        <job-card class="mt-3"></job-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import JobCard from "./components/Jobcard";
import { eventBus } from "./main.js";
export default {
  name: "App",
  components: {
    "job-card": JobCard,
  },
  data() {
    return {
      pincode: "",
      start: false,
    };
  },
  mounted() {
    // this.fetchData();
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.start = true;
      eventBus.$emit("search", this.pincode);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
