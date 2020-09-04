export const copy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getRandom = (min, max) => {
  return min + Math.random() * (max - min);
};

export const getRandomFloor = (min, max) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const setResize = (func) => {
  if (window.onresize) {
    const resize = window.onresize
    window.onresize = () => {
      resize();
      func();
    };
  } else {
    window.onresize = func;
  }
};

export const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  console.log(flag)
  return flag;
};