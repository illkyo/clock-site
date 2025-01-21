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

function makeDigitalClock() {

  function createDesign() {
    const digitsContainer = document.createElement('div')
    digitsContainer.classList.add('digits');

    let itemsList = ['hour', 'dots', 'minute'];

    for (let i = 0; i < itemsList.length; i++) {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add(itemsList[i]);

      if (i === 1) {
        for (let i = 0; i < 2; i++) {
          const dot = document.createElement('div');
          dot.classList.add('dot');

          itemContainer.appendChild(dot);
        }
      } else {
        const one = document.createElement('div');
        one.classList.add('one');
        const two = document.createElement('div');
        two.classList.add('two');
  
        let digits = [one, two];
  
        for (let i = 0; i < digits.length; i++) {
          const top = document.createElement('div');
          top.classList.add('top');
          const bottom = document.createElement('div');
          bottom.classList.add('bottom');
  
          digits[i].appendChild(top);
          digits[i].appendChild(bottom);
        }
  
        itemContainer.appendChild(one);
        itemContainer.appendChild(two);
      }

      digitsContainer.appendChild(itemContainer);
    }

    clockOuter.appendChild(digitsContainer);
  }

  createDesign();
  
  function makeDigits(timeUnit) {
    for (let i = 0; i < timeUnit.children.length; i++) {
      for (let j = 0; j < timeUnit.children[i].children.length; j++) {
        const digitPosition = timeUnit.children[i].children[j];
        const radius = digitPosition.offsetWidth / 2;
        for(let k = 1; k <= 4; k++) {
          if ((digitPosition.classList.item(0) === 'bottom') && (k === 3)) {
            continue
          }
          const digitLine = document.createElement('span');
          digitLine.classList.add('digit-line');
      
          digitPosition.appendChild(digitLine);
      
          const rotation = 360/4;
      
          const value = `rotate(${k*rotation}deg) translate(${radius-60}px) rotate(90deg)`;
          digitLine.style.transform = value;
        }
      }
    }
  }

  const hour = document.querySelector('.hour');
  const minute = document.querySelector('.minute');

  makeDigits(hour);
  makeDigits(minute);
}

changeClockBtn.addEventListener('click', () => {
  clockOuter.textContent = '';
  if (clockOuter.classList.item(1) === 'analog') {
    clockOuter.classList.remove('analog');
    clockOuter.classList.add('digital');
    makeDigitalClock();
  } else {
    clockOuter.classList.remove('digital');
    clockOuter.classList.add('analog');
    makeAnalogClock();
  }
})
