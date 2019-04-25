<template>
  <section>
    <TheWeather/>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import TheWeather from "~/components/TheWeather.vue";

@Component({
  components: {
    TheWeather
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
