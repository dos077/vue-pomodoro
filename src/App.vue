<template>
  <div class="main centerd">
    <div class="clock-container">
      <watch-face />
    </div>
  </div>
</template>

<script>
import WatchFace from './components/WatchFace.vue';

export default {
  name: 'App',

  components: {
    WatchFace
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import './styles/pomodoro.scss';
</style>
