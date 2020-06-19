const clockControl = (
  timer,
  { setMinutes, startClock, stopClock, setAnimation, setWorkAlert, setAlert }
) => {
  let syncInterval;
  let countDown;
  let secondTimer;

  const setCountDown = () => {
    let workLeft = timer.timeLeft().work;
    let restLeft = timer.timeLeft().rest;
    if (!countDown && workLeft > 0 && workLeft < 15) {
      countDown = setTimeout(function() {
        setWorkAlert(true);
        countDown = setTimeout(function() {
          setWorkAlert(false);
          countDown = null;
        }, 6000);
      }, workLeft * 1000);
    } else if (!countDown && restLeft > 0 && restLeft < 15) {
      countDown = setTimeout(function() {
        setAlert(true);
        if (!timer.setLoop()) {
          stopClock();
          countDown = null;
        } else {
          countDown = setTimeout(function() {
            setAlert(false);
            countDown = null;
          }, 60000);
        }
      }, restLeft * 1000);
    }
  };

  const setSecondTimer = secTo60 => {
    if (!secondTimer && secTo60 <= 11 && secTo60 > 0) {
      let timeOut = secTo60 * 1000 - 200;
      secondTimer = setTimeout(function() {
        resetSecond(true);
        secondTimer = null;
      }, timeOut);
    }
  };

  const syncTime = () => {
    let timeLeft = timer.timeLeft().total;
    syncMinute(timer.timeElapse());
    if (timeLeft < 0) {
      stop();
    } else {
      let secTo60 = timeLeft % 60;
      setSecondTimer(secTo60);
      setCountDown();
    }
  };

  const syncMinute = seconds => {
    let steps = Math.floor(seconds / 10);
    let deg = 1 * steps;
    setMinutes(deg);
  };

  const resetSecond = () => {
    setAnimation(false);
    setTimeout(function() {
      setAnimation(true);
    }, 100);
  };

  const start = () => {
    timer.start();
    syncTime();
    setAnimation(true);
    startClock();
    syncInterval = setInterval(syncTime, 10000);
  };

  const stop = () => {
    clearInterval(syncInterval);
    clearTimeout(countDown);
    clearTimeout(secondTimer);
    timer.stop();
    stopClock();
  };

  const reset = (play = false) => {
    setWorkAlert(false);
    setAlert(false);
    timer.set();
    syncTime();
    resetSecond(false);
    if (play === true) {
      start();
    }
  };

  return { start, stop, reset };
};

export default clockControl;
