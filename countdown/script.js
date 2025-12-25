<<<<<<< refs/remotes/origin/main
const targetDate = new Date("March 9, 2026 00:00:00").getTime();
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const completedMessage = document.getElementById("completedMessage");
const floatingDots = document.getElementById("floatingDots");

function createFloatingDots() {
  const dotCount = 40;

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    const delay = Math.random() * 20;
    const duration = 15 + Math.random() * 20;
    dot.style.animationDelay = `${delay}s`;
    dot.style.animationDuration = `${duration}s`;

    const size = 2 + Math.random() * 4;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    floatingDots.appendChild(dot);
  }
}

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  const size = 5 + Math.random() * 10;
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;

  const color = Math.random() > 0.5 ? "#FFD700" : "#FFA500";
  sparkle.style.background = color;

  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}

function formatNumber(num) {
  return num < 10 ? `0${num}` : num;
}

let lastSeconds = null;
let lastMinutes = null;
let lastHours = null;
let lastDays = null;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    completedMessage.style.display = "block";
    document.querySelector(".countdown-container").style.display = "none";
=======
// Configuration
const START_DATE = new Date("December 8, 2025 00:00:00").getTime();
const TARGET_DATE = new Date("March 9, 2026 00:00:00").getTime();

// DOM Elements
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

let countdownInterval;

// Update Progress Bar - Fixed UI Bug
function updateProgressBar() {
  const now = new Date().getTime();
  const totalDuration = TARGET_DATE - START_DATE;
  const elapsed = Math.max(0, now - START_DATE);
  const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
  
  // Fix progress bar overflow bug
  const safePercent = Math.min(Math.max(progressPercent, 0), 100);
  
  // Update progress bar
  progressFill.style.width = `${safePercent}%`;
  progressMarker.style.left = `${safePercent}%`;
  percentageElement.textContent = `${safePercent.toFixed(5)}%`;
  
  // Update time stats
  const daysElapsed = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, Math.floor((TARGET_DATE - now) / (1000 * 60 * 60 * 24)));
  
  elapsedTimeElement.textContent = `${daysElapsed} days passed`;
  remainingTimeElement.textContent = `${daysRemaining} days left`;
  
  return safePercent;
}

// Update Countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;
  
  if (distance < 0) {
    handleCountdownComplete();
>>>>>>> countdown ui update
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
<<<<<<< refs/remotes/origin/main

  // Remove animation classes first
  daysElement.classList.remove("changed");
  hoursElement.classList.remove("changed");
  minutesElement.classList.remove("changed");
  secondsElement.classList.remove("changed");

  // Force reflow to restart animations
  void daysElement.offsetWidth;
  void hoursElement.offsetWidth;
  void minutesElement.offsetWidth;
  void secondsElement.offsetWidth;

  // Update and animate only when value changes
  if (lastDays !== days) {
    daysElement.classList.add("changed");
    daysElement.textContent = formatNumber(days);
    lastDays = days;
  }

  if (lastHours !== hours) {
    hoursElement.classList.add("changed");
    hoursElement.textContent = formatNumber(hours);
    lastHours = hours;
  }

  if (lastMinutes !== minutes) {
    minutesElement.classList.add("changed");
    minutesElement.textContent = formatNumber(minutes);
    lastMinutes = minutes;
  }

  if (lastSeconds !== seconds) {
    secondsElement.classList.add("changed");
    secondsElement.textContent = formatNumber(seconds);
    lastSeconds = seconds;

    // Create sparkles on seconds change
    const rect = secondsElement.getBoundingClientRect();
    createSparkle(
      rect.left + rect.width / 2 + (Math.random() * 40 - 20),
      rect.top + rect.height / 2 + (Math.random() * 40 - 20)
    );
  }

  // Remove animation classes after animation completes
  setTimeout(() => {
    daysElement.classList.remove("changed");
    hoursElement.classList.remove("changed");
    minutesElement.classList.remove("changed");
    secondsElement.classList.remove("changed");
  }, 800);
}

// Initialize last values
lastSeconds = Math.floor(
  ((targetDate - new Date().getTime()) % (1000 * 60)) / 1000
);
lastMinutes = Math.floor(
  ((targetDate - new Date().getTime()) % (1000 * 60 * 60)) / (1000 * 60)
);
lastHours = Math.floor(
  ((targetDate - new Date().getTime()) % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
);
lastDays = Math.floor(
  (targetDate - new Date().getTime()) / (1000 * 60 * 60 * 24)
);

// Set initial values without animation
daysElement.textContent = formatNumber(lastDays);
hoursElement.textContent = formatNumber(lastHours);
minutesElement.textContent = formatNumber(lastMinutes);
secondsElement.textContent = formatNumber(lastSeconds);

createFloatingDots();

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

const timeUnits = document.querySelectorAll(".time-unit");
timeUnits.forEach((unit) => {
  unit.addEventListener("mouseenter", function (e) {
    const rect = this.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createSparkle(
          rect.left + Math.random() * rect.width,
          rect.top + Math.random() * rect.height
        );
      }, i * 100);
    }
  });

  unit.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });

  unit.addEventListener("touchstart", function (e) {
    this.style.transform = "translateY(-10px) scale(1.05)";
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";

    const rect = this.getBoundingClientRect();
    const touch = e.touches[0];
    createSparkle(touch.clientX - rect.left, touch.clientY - rect.top);
  });

  unit.addEventListener("touchend", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.3)";
  });
});

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.98) {
    createSparkle(e.clientX, e.clientY);
  }
});

document.addEventListener("click", (e) => {
  createSparkle(e.clientX, e.clientY);
});
=======
  
  updateValue(daysElement, days);
  updateValue(hoursElement, hours);
  updateValue(minutesElement, minutes);
  updateValue(secondsElement, seconds);
  
  updateProgressBar();
}

function updateValue(element, value) {
  const formattedValue = value < 10 ? `0${value}` : value;
  if (element.textContent !== formattedValue) {
    element.textContent = formattedValue;
    element.classList.add('changed');
    setTimeout(() => element.classList.remove('changed'), 500);
  }
}

function handleCountdownComplete() {
  clearInterval(countdownInterval);
  
  daysElement.textContent = "00";
  hoursElement.textContent = "00";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
  
  completedMessage.style.display = "block";
  
  // Set progress to 100% with safety check
  progressFill.style.width = "100%";
  progressMarker.style.left = "100%";
  percentageElement.textContent = "100%";
  remainingTimeElement.textContent = "0 days left";
  
  // Add completion animation to progress bar
  progressFill.style.background = "linear-gradient(90deg, #ffd700, #ffa500, #ffd700)";
  progressFill.style.backgroundSize = "200% 100%";
  progressFill.style.animation = "shimmer 1.5s infinite";
}

// Initialize
function init() {
  // Check if elements exist before updating
  if (progressFill && progressMarker) {
    updateProgressBar();
  }
  
  if (daysElement && hoursElement && minutesElement && secondsElement) {
    updateCountdown();
  }
  
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // Update immediately when page becomes visible again
    updateCountdown();
    updateProgressBar();
  }
});
>>>>>>> countdown ui update
