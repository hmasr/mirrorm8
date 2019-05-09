<template>
  <div class="the-events">
    <div class="event" v-for="event in eventList" :key="event.id">
      <span class="summary">{{event.summary}}</span> -
      <span class="start-date">{{event.startDateStr}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { State, Action, Getter, namespace } from "vuex-class";
import { load, get } from "~/plugins/gapi.client";
import { GapiEventsState } from "../types";

const events = namespace("gapi.events");

@Component({})
export default class TheEvents extends Vue {
  @State("gapi.events") state!: GapiEventsState;
  @events.Action getEvents;
  @events.Getter eventList;

  async mounted() {
    console.log(this.state);
    await load();
    this.getEvents();
  }
}
</script>

<style lang="scss" scoped>
.the-events {
  .event {
  }
}
</style>
