export function throttle(callback, wait = 1000) {
  let isThrottled = false;

  return function() {
    if (isThrottled) return;

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      callback();
    }, wait);
  }
}

export function raf(callback) {
  let ticking = false;

  return function() {
    if(ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    })
  }
}