<template>
  <div class="columns">
    <div class="column col-6">
      <TheTime/>
    </div>
    <div class="column col-6">
      <div class="float-right">
        <TheWeather/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import TheWeather from "~/components/TheWeather.vue";
import TheTime from "~/components/TheTime.vue";

@Component({
  components: {
    TheWeather,
    TheTime
  }
})
export default class extends Vue {
  // @State people: Person;
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
