<template>
  <figure
    :id="dialId + 'Dial'"
    class="dial"
    @mousedown="onDrag"
    :style="`transform: rotate(${rotation}deg)`"
  >
    <span
      :id="dialId + 'Point'"
      class="dial-point"
      :style="dragOn ? 'transform: scale(2,3); opacity: 0.6' : ''"
    ></span>
  </figure>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Dial',
  props: {
    dialId: String
  },
  computed: {
    ...mapState(['dragSource', 'restSec', 'workSec', 'dragTarget']),
    dragOn() {
      return this.dragSource && this.dragSource === this.dialId;
    },
    rotation() {
      if (this.dragOn && this.dragTarget) return this.dragTarget;
      if (this.dialId === 'work') return this.workSec / 10;
      return (this.workSec + this.restSec) / 10;
    },
    pointerStyle() {
      const transform = this.dragOn ? 'scale(2,3)' : '';
      const opacity = this.dragOn ? '0.6' : '';
      return `transform: ${transform}, opacity: ${opacity}`;
    }
  },
  methods: {
    ...mapMutations(['dragStart', 'dragEnd']),
    onDrag() {
      this.dragStart(this.dialId);
      window.addEventListener('mouseup', this.doneDrag);
      window.addEventListener('touchend', this.doneDrag);
    },
    doneDrag() {
      this.dragEnd();
      window.removeEventListener('mouseup', this.dragEnd);
      window.removeEventListener('touchend', this.doneDrag);
    }
  }
};
</script>
