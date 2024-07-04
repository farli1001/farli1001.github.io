const messages = [
  {
    title: "Jaga Kebersihan Air Kita",
    subtitle: "Untuk masa depan yang lebih cerah",
    icon: "💧",
    illustration: "🏞️",
  },
  {
    title: "Hemat Air Setiap Hari",
    subtitle: "Sedikit tindakan, berdampak besar",
    icon: "🚰",
    illustration: "🚿",
  },
  {
    title: "Lindungi Sumber Air",
    subtitle: "Demi kehidupan yang berkelanjutan",
    icon: "🌊",
    illustration: "🌳",
  },
  {
    title: "Daur Ulang untuk Air Bersih",
    subtitle: "Kurangi pencemaran, tingkatkan kejernihan pikiran",
    icon: "♻️",
    illustration: "🏭",
  },
  {
    title: "Air adalah Kehidupan",
    subtitle: "Mari jaga bersama-sama",
    icon: "🌱",
    illustration: "🌍",
  },
];

const messageCard = document.querySelector(".message-card");
const progressBar = document.querySelector(".progress");

function showMessage(index) {
  if (index >= messages.length) index = 0;

  const message = messages[index];
  messageCard.style.opacity = 0;
  messageCard.style.transform = "translateY(20px)";

  setTimeout(() => {
    messageCard.querySelector(".title").textContent = message.title;
    messageCard.querySelector(".subtitle").textContent = message.subtitle;
    messageCard.querySelector(".icon").textContent = message.icon;
    messageCard.querySelector(".illustration").textContent =
      message.illustration;

    messageCard.style.opacity = 1;
    messageCard.style.transform = "translateY(0)";

    progressBar.style.width = "0%";
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 50);
  }, 300);

  setTimeout(() => showMessage(index + 1), 5000);
}

const waterAnimation = document.querySelector(".water-animation");
const waterDrop = document.querySelector(".water-drop");

waterAnimation.addEventListener("mouseenter", () => {
  waterDrop.style.top = "80px";
  waterDrop.style.width = "100px";
  waterDrop.style.height = "20px";
  waterDrop.style.borderRadius = "10px 10px 0 0";
  setTimeout(() => {
    waterAnimation.style.setProperty("--after-height", "20px");
  }, 100);
});

waterAnimation.addEventListener("mouseleave", () => {
  waterDrop.style.top = "0";
  waterDrop.style.width = "20px";
  waterDrop.style.height = "20px";
  waterDrop.style.borderRadius = "50%";
  waterAnimation.style.setProperty("--after-height", "0");
});

function createClouds() {
  const container = document.querySelector(".container");
  for (let i = 0; i < 3; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.top = `${Math.random() * 30 + 5}%`;
    cloud.style.animationDelay = `${Math.random() * 20}s`;
    container.appendChild(cloud);
  }
}

function createBubbles() {
  const container = document.querySelector(".container");
  for (let i = 0; i < 20; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.width = `${Math.random() * 30 + 10}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = `${Math.random() * 4 + 4}s`;
    bubble.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(bubble);
  }
}

function createRippleEffect(e) {
  let ripple = document.createElement("div");
  ripple.className = "ripple";
  document.body.appendChild(ripple);

  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  ripple.style.animation = "none";
  ripple.offsetHeight; // trigger reflow
  ripple.style.animation = null;

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Initialize everything
function init() {
  showMessage(0);
  createClouds();
  createBubbles();
  document.addEventListener("click", createRippleEffect);
}

// Run initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
