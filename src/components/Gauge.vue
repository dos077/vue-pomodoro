<template>
  <figure class="gauge">
    <figure
      id="main-gauge"
      class="ring"
      :style="'clipPath: ' + findClipPath(0, workSec / 10)"
    />
    <figure
      id="rest-gauge"
      class="ring"
      :style="
        'clipPath: ' + findClipPath(workSec / 10, (workSec + restSec) / 10)
      "
    />
    <div v-for="i in getTwelve()" :key="i" class="stop"></div>
  </figure>
</template>

<script>
import { mapState } from 'vuex';
import geometery from '../logic/geometery';

export default {
  name: 'Gauge',
  computed: {
    ...mapState(['workSec', 'restSec'])
  },
  methods: {
    getTwelve() {
      const arr = [];
      for (let i = 0; i < 12; i++) {
        arr.push(i);
      }
      return arr;
    },
    findClipPath: geometery.findClipPath
  }
};
</script>
