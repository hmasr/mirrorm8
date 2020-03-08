<template>
  <div class="the-proximity">
    <span class="shape shape__dot" v-show="isSignalEnabled"></span>
    <!-- <socket-status :status="socketStatus"></socket-status> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { namespace } from "vuex-class";
import { ProximityState } from "~/types/proximity";
import socket from "socket.io";

const proximity = namespace("proximity");

@Component({})
export default class TheProximity extends Vue {
  @proximity.State state!: ProximityState;
  @proximity.Getter isSignalEnabled;

  private socket: any;

  // data() {
  //   return {
  //     socketStatus: Object
  //   };
  // }

  mounted() {
    console.log(this.state);
    console.log(this.isSignalEnabled);
    this.socket = this.$nuxtSocket({
      // name: "proximity",
      channel: "/proximity",
      reconnection: false
      // statusProp: "socketStatus"
    });
    this.socket.on("connect", () => {
      console.log("WS proximity connected");
    });
    this.socket.on("/proximity", ({ sender, event, payload }) => {
      console.log("WS proximity", payload);
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
