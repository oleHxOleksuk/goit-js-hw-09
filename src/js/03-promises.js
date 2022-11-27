import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name=delay]'),
  step: document.querySelector('[name=step]'),
  amount: document.querySelector('[name=amount]'),
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', forCreatePromise);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
  return promise;
}

function forCreatePromise(event) {
  event.preventDefault();
  let step = Number(refs.step.value);
  let delay = Number(refs.delay.value);
  let amount = Number(refs.amount.value);
  for (let position = 0; position < amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        // Fulfill
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // Reject
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
}