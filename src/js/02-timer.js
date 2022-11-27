import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimeStyle: document.querySelector('.timer'),
  dataSeconds: document.querySelector('[data-seconds]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataHours: document.querySelector('[data-hours]'),
  dataDays: document.querySelector('[data-days]'),
  startBtn: document.querySelector('[data-start'),
};

refs.startBtn.setAttribute('disabled', true);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let timeDifference = 0;
    let timerId = null;
    if (selectedDates[0].getTime() > options.defaultDate.getTime()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.addEventListener('click', event => {
      timerId = setInterval(() => {
        let date = new Date();
        timeDifference = selectedDates[0].getTime() - date.getTime();
        refs.dataSeconds.textContent = addLeadingZero(
          convertMs(timeDifference).seconds
        );
        refs.dataMinutes.textContent = addLeadingZero(
          convertMs(timeDifference).minutes
        );
        refs.dataHours.textContent = addLeadingZero(
          convertMs(timeDifference).hours
        );
        refs.dataDays.textContent = addLeadingZero(
          convertMs(timeDifference).days
        );
        if (timeDifference < 1000) {
          clearInterval(timerId);
        }
      }, 1000);
    });
  },
};
const flatpickerForUser = new flatpickr('#datetime-picker', options);