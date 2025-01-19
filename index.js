const changeClockBtn = document.querySelector('.change-clock');

const clockOuter = document.querySelector('.clock-outer');

function makeAnalogClock() {
  const hourHand = document.createElement('div');
  hourHand.classList.add('hour-hand');

  const minuteHand = document.createElement('div');
  minuteHand.classList.add('minute-hand');

  const secondsHand = document.createElement('div');
  secondsHand.classList.add('seconds-hand');

  clockOuter.appendChild(hourHand);
  clockOuter.appendChild(minuteHand);
  clockOuter.appendChild(secondsHand);

  const radius = clockOuter.offsetWidth / 2;
  const rotation = 360/60;

  for(let i = 1; i <= 60; i++) {
    const item = document.createElement('div');
    item.classList.add('item');

    if (i % 5 === 0) {
      const line = document.createElement('span');
      line.classList.add('number-line');

      const number = document.createElement('h1');
      number.textContent = i / 5;
      number.classList.add('number');

      item.appendChild(line);
      item.appendChild(number);

      clockOuter.appendChild(item);

      item.style.transform = `rotate(${i*rotation}deg) translate(${radius-40}px) rotate(90deg)`;
      number.style.transform = `rotate(${-(i*rotation)}deg)`;

    } else {
      const line = document.createElement('span');
      line.classList.add('line');
  
      item.appendChild(line);
      clockOuter.appendChild(item);

      item.style.transform = `rotate(${i*rotation}deg) translate(${radius-15}px) rotate(90deg)`;
    }
  }

  function initializeClock(dateObj) {
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
  
    secondsHand.style.transform = `rotate(${(seconds-15)*rotation}deg)`;
    minuteHand.style.transform = `rotate(${(minute-15)*rotation}deg)`;
    const hourRotationValue = ((hour-15)*(rotation+24)) + ((minute)*0.5);
    hourHand.style.transform = `rotate(${hourRotationValue}deg)`;
  }
  
  initializeClock(new Date());
  
  setInterval(() => {
    initializeClock(new Date());
  }, 1000);
  
}

makeAnalogClock();

changeClockBtn.addEventListener('click', () => {
  clockOuter.textContent = '';
  if (clockOuter.classList.item(1) === 'analog') {
    clockOuter.classList.remove('analog');
  } else {
    clockOuter.classList.add('analog');
    makeAnalogClock();
  }
})
