<template>
  <figure v-if="clockController" class="controls">
    <figure class="btn-main">
      <span
        v-if="!isRunning"
        id="startClock"
        class="go"
        @click="clockController.start"
      ></span>
      <span
        v-else
        id="stopClock"
        class="stop"
        @click="clockController.stop"
      ></span>
    </figure>
    <figure class="btn-reset">
      <span
        v-if="!isRunning"
        id="resetClock"
        class="stop"
        @click="clockController.reset"
      ></span>
    </figure>
    <figure class="btn-loop">
      <span
        id="loopClock"
        class="loop"
        :class="loopOn ? 'go' : 'stop'"
        @click="loopToggle"
      >
        🗘
      </span>
    </figure>
  </figure>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import createTimer from '../logic/timer';
import clockControls from '../logic/clockControls';

const timer = createTimer();

export default {
  name: 'Controls',
  data: () => ({
    clockController: null,
    loopOn: null
  }),
  computed: {
    ...mapState(['isRunning', 'workSec', 'restSec'])
  },
  watch: {
    workSec: {
      handler(newWork) {
        timer.set(this.restSec, newWork);
        this.clockController.reset();
      }
    },
    restSec: {
      handler(newRest) {
        timer.set(newRest, this.workSec);
        this.clockController.reset();
      }
    }
  },
  mounted() {
    timer.set(this.restSec, this.workSec);
    const mutations = {};
    mutations.startClock = this.startClock;
    mutations.stopClock = this.stopClock;
    mutations.setMinutes = this.setMinutes;
    mutations.setAnimation = this.setAnimation;
    this.clockController = clockControls(timer, mutations);
  },
  methods: {
    ...mapMutations(['startClock', 'stopClock', 'setMinutes', 'setAnimation']),
    loopToggle() {
      this.loopOn = timer.setLoop(true);
    }
  }
};
</script>
