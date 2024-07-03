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

showMessage(0);
