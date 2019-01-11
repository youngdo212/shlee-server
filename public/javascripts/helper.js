const ajax = ({method, url, callback}) => {
  const oReq = new XMLHttpRequest();

  oReq.addEventListener('load', () => {
    callback(oReq.response);
  })

  oReq.open(method, url);
  oReq.send();
}

export {ajax};