<template>
  <div class="clock-face">
    <figure class="minute-hand" :style="`transform: rotate(${minHand}deg)`" />
    <figure class="second-hand" :style="'animation: ' + secondAnimation" />
    <figure class="hand-anchor" />

    <dial :dialId="'rest'" />
    <dial :dialId="'work'" />

    <gauge />

    <controls />

    <div v-for="i in getSixty()" class="mark" :key="i">
      <span
        v-if="dragSource !== null"
        class="dial-target"
        @mouseover="dragEnter(i * 6)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Dial from './Dial.vue';
import Gauge from './Gauge.vue';
import Controls from './Controls.vue';

export default {
  name: 'WatchFace',
  components: { Dial, Gauge, Controls },
  computed: {
    ...mapState(['isRunning', 'isAnimate', 'minHand', 'dragSource']),
    secondAnimation() {
      if (!this.isAnimate) return 'none';
      return (
        'clock 60s steps(300) infinite ' +
        (this.isRunning ? 'running' : 'paused')
      );
    }
  },
  methods: {
    ...mapMutations(['dragEnter']),
    getSixty() {
      const arr = [];
      for (let i = 0; i < 60; i++) {
        arr.push(i);
      }
      return arr;
    }
  }
};
</script>
