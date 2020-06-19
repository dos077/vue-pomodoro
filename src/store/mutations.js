import geometery from '../logic/geometery';

const { isInRange } = geometery;

export default {
  dragStart: (state, source) => {
    state.dragSource = source;
  },
  dragEnd: state => {
    if (state.dragTarget !== null) {
      if (state.dragSource === 'work') state.workSec = state.dragTarget * 10;
      else state.restSec = state.dragTarget * 10 - state.workSec;
    }
    state.dragSource = null;
    state.dragTarget = null;
  },
  dragEnter: (state, target) => {
    const { dragSource, workSec, restSec } = state;
    if (isInRange(target, dragSource, restSec, workSec))
      state.dragTarget = target;
  },
  startClock: state => {
    state.isRunning = true;
  },

  stopClock: state => {
    state.isRunning = false;
  },
  setAnimation: (state, status) => {
    state.isAnimate = status;
  },
  setMinutes: (state, min) => {
    state.minHand = min;
  },
  setAlert: (state, newStatus) => {
    state.doneAlert = newStatus;
  },
  setWorkAlert: (state, newStatus) => {
    state.workAlert = newStatus;
  },
  loadPrefs: (state, prefs) => {
    state.restSec = prefs.restTime;
    state.workSec = prefs.workTime;
  }
};
