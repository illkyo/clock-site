const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondsHand = document.querySelector('.seconds-hand');

const clockBtn = document.querySelector('.clock-btn');
const colorBtn = document.querySelector('.color-btn');

const clockOuter = document.querySelector('.clock-outer');
const radius = clockOuter.offsetWidth / 2;
const rotation = 360/60;

let stopped = false;

function makeClock() {
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
}

makeClock();

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

// setInterval(() => {
//   let hourRotationValue = hourHand.getAttribute('style').split(' ')[1].split('d')[0].split('(')[1];
//   if (Number(hourRotationValue) >= 360) {
//     hourRotationValue = 0;
//   }
//   hourHand.style.transform = `rotate(${Number(hourRotationValue)+0.5}deg)`;
// }, 60000);

// clockBtn.addEventListener('click', () => {
//   if(!stopped) {
//     stopped = true;
//     clearInterval(intervalId);    
//   } else {
//     updateClock(new Date().getHours());
//     setInterval(() => {
//       updateClock(new Date().getHours());
//     }, 3600000);
//   }
// });