const ajax = ({method, url, callback}) => {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', () => {
    callback(oReq.response);
  })

  oReq.open(method, url);
  oReq.send();
}

class Observer {
  constructor({callback}) {
    this.targetList = [];
    this.callback = callback;
    window.addEventListener('scroll', this.check.bind(this));
  }

  check() {
    this.targetList.forEach((target) => {
      if(!this.isInViewport(target)) return;

      this.callback(target);
    })
  }

  isInViewport(element) {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const {top: elementTop, bottom: elementBottom} = element.getBoundingClientRect();
  
    return elementBottom > 0 && elementTop < viewportHeight;
  }

  observe(target) {
    this.targetList.push(target);
  }

  unobserve(target) {
    this.targetList = this.targetList.filter((targetListItem) => {
      return targetListItem !== target;
    })
  }
}

export {ajax, Observer};