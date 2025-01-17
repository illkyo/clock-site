const hourHand = document.querySelector('.hour-hand');
const clockBtn = document.querySelector('.clock-btn');
const colorBtn = document.querySelector('.color-btn');

let stopped = false;

function updateClock(hour) {
  hourHand.classList.remove(hourHand.classList.item(1));
  let addClass = 'hour-' + ((hour > 12) ? (hour - 12).toString() : hour.toString());
  hourHand.classList.add(addClass);
}

updateClock(new Date().getHours());

let intervalId = setInterval(() => {
  console.log('1 Hour Passed. Updating Clock');
  updateClock(new Date().getHours());
}, 3600000);

clockBtn.addEventListener('click', () => {
  if(!stopped) {
    stopped = true;
    clearInterval(intervalId);    
  } else {
    updateClock(new Date().getHours());
    setInterval(() => {
      updateClock(new Date().getHours());
    }, 3600000);
  }
});
