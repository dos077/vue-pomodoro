const validatePrefs = ({ restTime, workTime, loop }) => {
  if (restTime !== null && workTime !== null && loop !== null) {
    return { restTime, workTime, loop };
  }
  return false;
};

const savePrefs = prefs => {
  const validated = validatePrefs(prefs);
  if (!validated) {
    throw Error('invalid presets');
  } else {
    localStorage.timerPreset = JSON.stringify(validated);
  }
};

const loadPrefs = () => {
  if (localStorage.timerPreset) {
    const validated = validatePrefs(JSON.parse(localStorage.timerPreset));
    if (!validated) throw Error('invalid saved presets');
    else return validated;
  }
  return false;
};

const createTimer = () => {
  let restTime;
  let workTime;
  let endTime;
  let totalTime;
  let loop = false;

  const set = (rest = restTime, work = workTime) => {
    restTime = rest;
    workTime = work;
    totalTime = rest + work;
    endTime = null;
    savePrefs({ restTime, workTime, loop });
  };

  const load = () => {
    const loadedPrefs = loadPrefs();
    if (loadedPrefs) {
      restTime = loadedPrefs.restTime;
      workTime = loadedPrefs.workTime;
      loop = loadedPrefs.loop;
      return loadedPrefs;
    }
    return false;
  };

  const start = () => {
    endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + totalTime);
  };

  const timeLeft = () => {
    let work = workTime;
    let rest = restTime;
    const now = new Date();
    if (endTime) {
      if (loop) {
        totalTime = restTime + workTime;
        while (endTime < now) {
          endTime.setSeconds(endTime.getSeconds() + totalTime);
        }
      }
      totalTime = Math.round((endTime - now) / 1000);
      if (totalTime > rest) {
        work = totalTime - rest;
      } else {
        work = 0;
        rest = totalTime;
      }
    }
    return { rest, work, total: totalTime };
  };

  const timeElapse = () => {
    return restTime + workTime - timeLeft().total;
  };

  const stop = () => {
    timeLeft();
    endTime = null;
  };

  const setLoop = toggle => {
    if (toggle) {
      loop = !loop;
      savePrefs({ restTime, workTime, loop });
    }
    return loop;
  };

  return { set, load, start, stop, timeLeft, timeElapse, setLoop };
};

export default createTimer;
