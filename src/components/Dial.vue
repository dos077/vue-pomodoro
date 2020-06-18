<template>
  <figure
    :id="dialId + 'Dial'"
    class="dial"
    @mousedown="onDrag"
    @touchstart="onDrag"
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
import geometery from '../logic/geometery';

const { findRotation } = geometery;

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
    ...mapMutations(['dragStart', 'dragEnd', 'dragEnter']),
    onDrag() {
      this.dragStart(this.dialId);
      document.addEventListener('mouseup', this.doneDrag);
      document.addEventListener('touchend', this.doneDrag);
      document.addEventListener('touchmove', this.touchMoveHandler);
    },
    touchMoveHandler(evt) {
      const x = evt.changedTouches[0].pageX;
      const y = evt.changedTouches[0].pageY;
      const element = document.elementFromPoint(x, y);
      if (element && element.parentNode) {
        const deg = findRotation(element.parentNode);
        this.dragEnter(deg);
      }
    },
    doneDrag() {
      this.dragEnd();
      document.removeEventListener('mouseup', this.dragEnd);
      document.removeEventListener('touchend', this.doneDrag);
      document.removeEventListener('touchmove', this.touchMoveHandler);
    }
  }
};
</script>
