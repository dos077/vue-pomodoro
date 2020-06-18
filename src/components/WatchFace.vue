<template>
  <div class="clock-face">
    <figure class="minute-hand" :style="`transform: rotate(${minHand}deg)`" />
    <figure class="second-hand" :style="'animation: ' + secondAnimation" />
    <figure class="hand-anchor" />

    <dial :dialId="'rest'" />
    <dial :dialId="'work'" />

    <div v-for="i in getSixty()" class="mark" :key="i">
      <span class="dial-target" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Dial from './Dial.vue';

export default {
  name: 'WatchFace',
  components: { Dial },
  computed: {
    ...mapState(['isRunning', 'isAnimate', 'minHand']),
    secondAnimation() {
      return this.isAnimate
        ? 'clock 60s steps(300) infinite '
        : 'none ' + this.isRunning
        ? 'running'
        : 'paused';
    }
  },
  methods: {
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
