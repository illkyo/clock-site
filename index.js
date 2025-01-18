const hourHand = document.querySelector('.hour-hand');
const clockBtn = document.querySelector('.clock-btn');
const colorBtn = document.querySelector('.color-btn');

let stopped = false;

function makeClock() {
  const clockOuter = document.querySelector('.clock-outer');
  const radius = clockOuter.offsetWidth / 2;

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

      const rotation = 360/60;

      item.style.transform = `rotate(${i*rotation}deg) translate(${radius-40}px) rotate(90deg)`;
      number.style.transform = `rotate(${-(i*rotation)}deg)`;

    } else {
      const line = document.createElement('span');
      line.classList.add('line');
  
      item.appendChild(line);
      clockOuter.appendChild(item);

      const rotation = 360/60;

      item.style.transform = `rotate(${i*rotation}deg) translate(${radius-15}px) rotate(90deg)`;
    }
  }
}

makeClock();

// function updateClock(hour) {
//   hourHand.classList.remove(hourHand.classList.item(1));
//   const addClass = 'hour-' + ((hour > 12) ? (hour - 12).toString() : hour.toString());
//   hourHand.classList.add(addClass);
// }

// updateClock(new Date().getHours());

// let intervalId = setInterval(() => {
//   console.log('1 Hour Passed. Updating Clock');
//   updateClock(new Date().getHours());
// }, 3600000);

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