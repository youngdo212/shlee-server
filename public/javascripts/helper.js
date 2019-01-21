export const ajax = ({method, url, callback}) => {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', () => {
    callback(oReq.response);
  })

  oReq.open(method, url);
  oReq.send();
}

export class Observer {
  constructor(callback) {
    this.targetList = [];
    this.callback = callback;
    this._registerListener();
  }

  _registerListener() {
    window.addEventListener('scroll', () => {
      this.targetList.forEach((target) => {
        this._isVisible(target) && this.callback(target);
      })
    });
  }

  _isVisible(target) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const {top: targetTop, bottom: targetBottom} = target.getBoundingClientRect();
  
    return targetBottom > 0 && targetTop < viewportHeight;
  }

  observe(target) {
    this.targetList.push(target);
    this._isVisible(target) && this.callback(target);
  }

  unobserve(unobservedTarget) {
    this.targetList = this.targetList.filter(target => target !== unobservedTarget);
  }
}