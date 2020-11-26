<template>
  <div class="the-time">
    <div class="date">{{ date }}</div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";

@Component({})
export default class TheTime extends Vue {
  @Provide("date") date: string = "";
  @Provide("time") time: string = "";

  private interval!: NodeJS.Timer;

  mounted() {
    this.$_update();
    // Update every 10 seconds.
    this.interval = setInterval(this.$_update, 1000 * 10);
  }

  destroy() {
    clearTimeout(this.interval);
  }

  private $_update() {
    this.time = this.$_getTime();
    this.date = this.$_getDate();
  }

  private $_getDate(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const date = new Date();
    return date.toLocaleDateString(process.env.LANG, options);
  }

  private $_getTime(): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const date = new Date();
    return date.toLocaleDateString(process.env.LANG, options).split(" ")[1];
  }
}
</script>

<style lang="scss" scoped>
.the-time {
  .time {
    font-size: 3em;
    line-height: 1;
  }
  .date {
    font-size: 2em;
  }
}
</style>
