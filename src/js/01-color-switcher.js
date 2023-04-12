function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

const intervalTimer = {
  intervalId: null,

  start() {
    this.intervalId = setInterval(bodyTheme, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

function bodyTheme() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function onClickStartBtn() {
  intervalTimer.start();
  refs.startBtn.setAttribute('disabled', '');
}

function onClickStopBtn() {
  intervalTimer.stop();
  refs.startBtn.removeAttribute('disabled', '');
}
