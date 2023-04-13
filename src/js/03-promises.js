import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(e) {
  e.preventDefault();

  const firstDelay = parseInt(refs.firstDelay.value);
  const step = parseInt(refs.delayStep.value);
  const amount = parseInt(refs.amount.value);
  let delay = null;

  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      delay = firstDelay;
    } else {
      delay += step;
    }

    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
