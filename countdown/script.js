const START_DATE = new Date("December 8, 2025 00:00:00").getTime();
const TARGET_DATE = new Date("March 9, 2026 00:00:00").getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const completedMessage = document.getElementById("completedMessage");
const percentageElement = document.getElementById("percentage");
const progressFill = document.getElementById("progressFill");
const progressMarker = document.getElementById("progressMarker");
const elapsedTimeElement = document.getElementById("elapsedTime");
const remainingTimeElement = document.getElementById("remainingTime");

let countdownInterval = null;
let previousTime = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

function updateProgressBar() {
  const now = Date.now();
  const totalDuration = TARGET_DATE - START_DATE;
  const elapsed = Math.max(0, now - START_DATE);

  let progressPercent = Math.min((elapsed / totalDuration) * 100, 100);

  if (progressPercent < 0) progressPercent = 0;
  if (progressPercent > 100) progressPercent = 100;

  progressFill.style.width = `${progressPercent}%`;
  progressMarker.style.left = `${progressPercent}%`;
  percentageElement.textContent = `${progressPercent.toFixed(6)}%`;

  const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.floor((TARGET_DATE - now) / (1000 * 60 * 60 * 24));

  elapsedTimeElement.textContent = `${Math.max(0, daysElapsed)} days`;
  remainingTimeElement.textContent = `${Math.max(0, daysRemaining)} days`;

  return progressPercent;
}

function updateCountdown() {
  const now = Date.now();
  const distance = TARGET_DATE - now;

  if (distance <= 0) {
    handleCountdownComplete();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  updateTimeElement(daysElement, days, previousTime.days);
  updateTimeElement(hoursElement, hours, previousTime.hours);
  updateTimeElement(minutesElement, minutes, previousTime.minutes);
  updateTimeElement(secondsElement, seconds, previousTime.seconds);

  previousTime = { days, hours, minutes, seconds };

  updateProgressBar();
}

function updateTimeElement(element, newValue, previousValue) {
  const formattedValue = newValue < 10 ? `0${newValue}` : `${newValue}`;

  if (element.textContent !== formattedValue && previousValue !== null) {
    element.textContent = formattedValue;
    element.classList.add("changed");

    setTimeout(() => {
      element.classList.remove("changed");
    }, 500);
  } else if (previousValue === null) {
    element.textContent = formattedValue;
  }
}

function handleCountdownComplete() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  daysElement.textContent = "00";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";

  completedMessage.style.display = "block";

  progressFill.style.width = "100%";
  progressMarker.style.left = "100%";
  percentageElement.textContent = "100%";
  remainingTimeElement.textContent = "0 days";

  progressFill.style.animation = "shimmer 1s infinite linear";
}

function initializeCountdown() {
  updateProgressBar();
  updateCountdown();

  countdownInterval = setInterval(updateCountdown, 1000);
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  } else {
    updateProgressBar();
    updateCountdown();

    if (!countdownInterval) {
      countdownInterval = setInterval(updateCountdown, 1000);
    }
  }
}

document.addEventListener("DOMContentLoaded", initializeCountdown);
document.addEventListener("visibilitychange", handleVisibilityChange);

window.addEventListener("focus", () => {
  if (document.visibilityState === "visible") {
    updateCountdown();
    updateProgressBar();
  }
});

window.addEventListener("error", (event) => {
  console.error("Countdown Timer Error:", event.error);

  daysElement.textContent = "91";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  percentageElement.textContent = "0.0%";
});
