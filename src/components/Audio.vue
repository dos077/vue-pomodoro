<template>
  <div />
</template>

<script>
import { mapState } from 'vuex';

const doneBell = new Audio('./bell.mp3');
const workBell = new Audio('./bell.mp3');

export default {
  name: 'AudioPlayer',
  computed: {
    ...mapState(['doneAlert', 'workAlert'])
  },
  watch: {
    doneAlert: {
      handler(newVal) {
        if (newVal) doneBell.play();
        else {
          doneBell.pause();
          doneBell.currentTime = 0;
        }
      }
    },
    workAlert: {
      handler(newVal) {
        if (newVal) workBell.play();
        else {
          workBell.pause();
          workBell.currentTime = 0;
        }
      }
    }
  }
};
</script>
