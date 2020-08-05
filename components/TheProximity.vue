<template>
  <div class="the-proximity">
    <span class="shape shape__dot" v-show="isSignalEnabled"></span>
    <!-- <socket-status :status="socketStatus"></socket-status> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { mapState } from "vuex";
import { namespace } from "vuex-class";
import { ProximityState } from "~/types/proximity";
import socket from "socket.io";

const proximity = namespace("proximity");

@Component({})
export default class TheProximity extends Vue {
  @proximity.State state!: ProximityState;
  @proximity.Getter isSignalEnabled;

  private socket: any;

  mounted() {
    this.socket = this.$nuxtSocket({
      channel: "/proximity",
      reconnection: false
    });
    this.socket.on("connect", () => {
      console.log("WS proximity connected");
    });
  }
}
</script>

<style lang="scss" scoped>
.the-proximity {
  .shape {
    display: inline-block;
    height: 25px;
    width: 25px;
  }
  .shape__dot {
    background-color: red;
    border-radius: 50%;
  }
}
</style>
