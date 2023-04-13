import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let deltaTime = null;

refs.startBtn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      deltaTime = selectedDates[0] - Date.now();
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartBtn() {
  refs.startBtn.disabled = true;

  const startTime = Date.now();
  const intervalID = setInterval(() => {
    const currentTime = Date.now();
    const second = currentTime - startTime;
    const timedifference = deltaTime - second;
    const convertedTime = convertMs(timedifference);
    updateClockField(convertedTime);
    if (timedifference < 1000) {
      clearInterval(intervalID);
      refs.startBtn.disabled = false;
      console.log('все');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockField(time) {
  refs.daysField.textContent = addLeadingZero(time.days);
  refs.hoursField.textContent = addLeadingZero(time.hours);
  refs.minutesField.textContent = addLeadingZero(time.minutes);
  refs.secondsField.textContent = addLeadingZero(time.seconds);
}

refs.startBtn.style.cssText = ` 
  background-color: red;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;