<template>
  <div class="the-events">
    <div class="event" v-for="(event, key) of eventList" :key="event.id">
      <div class="event__date">
        <div
          v-if="
            key == 0 ||
              !isSameDay(event.date.start, eventList[key - 1].date.start)
          "
        >
          <div class="day-name">{{ getWeekDay(event.date.start) }}</div>
          <div class>{{ getDay(event.date.start) }}</div>
        </div>
      </div>
      <div class="event__description">
        <div class="summary">{{ event.summary }}</div>
        <div class="time">
          {{ getTime(event.date.start) }} - {{ getTime(event.date.end) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { namespace } from "vuex-class";
import { GapiEventsState } from "~/types/gapi.calendar";

const events = namespace("gapi.calendar");

@Component({})
export default class TheEvents extends Vue {
  @events.State state!: GapiEventsState;
  @events.Action getEvents;
  @events.Getter eventList;

  async mounted() {
    await this.$gapi.initialize();
    await this.$gapi.authenticate();
    this.getEvents();
  }

  isSameDay(d1: Date, d2: Date): boolean {
    if (!d1 || !d2) {
      return false;
    }
    const result =
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    return result;
  }

  methods() {
    return {
      getWeekDay: this.getWeekDay,
      getDay: this.getDay,
      getTime: this.getTime
    };
  }

  getTime(date: Date, format = "2-digit"): string {
    return date.toLocaleTimeString(process.env.LANG, {
      hour: format,
      minute: format
    });
  }

  getWeekDay(date: Date, format = "short"): string {
    return this.format(date, {
      weekday: format
    });
  }

  getDay(date: Date, format = "2-digit"): string {
    return this.format(date, { day: format });
  }

  format(date: Date, options: Intl.DateTimeFormatOptions) {
    return date.toLocaleDateString(process.env.LANG, options);
  }
}
</script>

<style lang="scss" scoped>
.the-events {
  .event {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 1.2;

    .event__date {
      font-size: 1.8rem;
      text-transform: capitalize;
      padding: 0 0.5em 0 0;
      min-width: 70px;
    }

    .event__description {
      font-size: 1.2rem;
      vertical-align: middle;
      height: 100%;
      .summary {
        font-weight: bold;
        width: 100%;
      }
      .time {
        width: 100%;
      }
    }
  }
}
</style>
