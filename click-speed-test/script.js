let clickCount = 0;
let testStarted = false;
let startTime, endTime;

const startButton = document.getElementById('start-button');
const clickButton = document.getElementById('click-button');
const clickContainer = document.getElementById('click-container');
const result = document.getElementById('result');

startButton.addEventListener('click', startTest);
clickButton.addEventListener('click', handleClick);

function startTest() {
  if (testStarted) return;
  testStarted = true;
  clickCount = 0;
  result.textContent = `Clicks: ${clickCount}`;
  startButton.disabled = true;
  clickContainer.style.display = 'block';
  startTime = Date.now();
  setTimeout(endTest, 5000);
}

function handleClick() {
  if (!testStarted) return;
  clickCount++;
  result.textContent = `Clicks: ${clickCount}`;
}

function endTest() {
  testStarted = false;
  endTime = Date.now();
  const timeTaken = (endTime - startTime) / 1000;
  const score = (clickCount / timeTaken).toFixed(2);
  result.textContent = `Test Over! Clicks per second: ${score}`;
  startButton.disabled = false;
  clickContainer.style.display = 'none';
}
