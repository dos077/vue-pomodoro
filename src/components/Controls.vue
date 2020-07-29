<template>
  <figure v-if="clockController" class="controls">
    <figure class="btn-main">
      <span
        v-if="!isRunning & !doneAlert"
        id="startClock"
        class="go"
        @click="clockController.start"
      ></span>
      <span
        v-if="isRunning"
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
        <restore-icon :size="iconSize" />
      </span>
    </figure>
  </figure>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import RestoreIcon from 'vue-material-design-icons/Restore.vue';
import createTimer from '../logic/timer';
import clockControls from '../logic/clockControls';

function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

function vmin(v) {
  return Math.min(vh(v), vw(v));
}

const timer = createTimer();

export default {
  name: 'Controls',
  data: () => ({
    clockController: null,
    loopOn: null,
    iconSize: 15
  }),
  components: {
    RestoreIcon
  },
  computed: {
    ...mapState(['isRunning', 'workSec', 'restSec', 'doneAlert'])
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
    const loadedPrefs = timer.load();
    if (loadedPrefs) {
      this.loadPrefs(loadedPrefs);
      this.loopOn = loadedPrefs.loop;
    } else timer.set(this.restSec, this.workSec);
    const mutations = {};
    mutations.startClock = this.startClock;
    mutations.stopClock = this.stopClock;
    mutations.setMinutes = this.setMinutes;
    mutations.setAnimation = this.setAnimation;
    mutations.setAlert = this.setAlert;
    mutations.setWorkAlert = this.setWorkAlert;
    this.clockController = clockControls(timer, mutations);
    this.getIconSize();
    window.addEventListener('resize', this.getIconSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.getIconSize);
  },
  methods: {
    ...mapMutations([
      'startClock',
      'stopClock',
      'setMinutes',
      'setAnimation',
      'setAlert',
      'setWorkAlert',
      'loadPrefs'
    ]),
    loopToggle() {
      this.loopOn = timer.setLoop(true);
    },
    getIconSize() {
      const scaling = 4.5;
      const base = Math.min(15, vmin(2));
      this.iconSize = base * scaling;
    }
  }
};
</script>
