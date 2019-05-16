<template>
  <div class="columns">
    <div class="column col-6">
      <div class="v-columns">
        <div class="column">
          <TheTime/>
        </div>
        <div class="column">
          <TheEvents/>
        </div>
      </div>
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
import TheEvents from "~/components/TheEvents.vue";

@Component({
  components: {
    TheWeather,
    TheTime,
    TheEvents
  }
})
export default class extends Vue {
  // @State people: Person;
}
</script>

<style lang="scss">
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.d-table {
  display: table;
}
.d-table-cell {
  display: table-cell;
}
.v-columns {
  display: flex;
  align-content: stretch;
  flex-direction: column;
  height: 100%;

  .column {
    padding: 1rem;
    &:first-child {
      padding-top: 0;
    }
  }
}
</style>
