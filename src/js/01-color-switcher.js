const refs = {
    bodyColor: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
  };
  refs.stopBtn.setAttribute('disabled', true);
  const getRandomHexColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  let timerId = null;
  
  refs.startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
      refs.startBtn.setAttribute('disabled', true);
      refs.stopBtn.removeAttribute('disabled');
      refs.bodyColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  refs.stopBtn.addEventListener('click', () => {
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
    clearInterval(timerId);
  });
