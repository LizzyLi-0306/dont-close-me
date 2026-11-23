
const closeButton = document.getElementById("closeButton");
const errorFace = document.getElementById("errorFace");
const errorMessage = document.getElementById("errorMessage");
const errorPopup = document.getElementById("errorPopup");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const heartsContainer = document.getElementById("heartsContainer");
const popupHeader = document.getElementById("popupHeader");

const resetButton = document.getElementById("resetButton");

let anger = 0;
let forcedSmile = false;
let affection = 0;
let messageCount = 0;
let isShaking = false;


let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let popupStartX = 0;
let popupStartY = 0;

let foreverTogether = false;

// Update Error's appearance
function updateEmotion() {
  if (foreverTogether) {
  return;
  }
  if (isShaking) {
    return;
  }

  if (forcedSmile) {
    errorFace.textContent = "•ᴗ•";
    errorMessage.textContent = "It's okay. We can stay here forever.";
    closeButton.style.display = "none";
    return;
  }
  
  if (anger >= 6 && affection >= 6) {
  errorFace.textContent = "╬ಠ益ಠ";
  errorMessage.textContent = "I LOVE YOU! SO WHY WON'T YOU STAY?!";
  return;
  }

 
if (anger < 3) {
  if (affection > 0) {
    errorFace.textContent = "♥ᴗ♥";
    errorMessage.textContent = "You talked to me! I'm so happy!";
  } else {
    errorFace.textContent = "•ᴗ•";
    errorMessage.textContent = "Hey! Talk to me!";
  }
}

  else if (anger < 6) {
    errorFace.textContent = "ಠ_ಠ";
    errorMessage.textContent = "Why are you trying to leave?";
  }
  else if (anger < 10) {
    errorFace.textContent = "╬ಠ益ಠ";
    errorMessage.textContent = "STOP CLICKING THAT!";
  }
  else {
    forcedSmile = true;
    errorFace.textContent = "╬ಠ益ಠ";
    errorMessage.textContent = "DON'T YOU DARE LEAVE ME!";
    isShaking = true;

    errorPopup.classList.add("violent-shake");
  }
}

errorPopup.addEventListener("animationend", function (event) {
 if (event.animationName === "violentShake" && forcedSmile) {
  errorPopup.classList.remove("violent-shake");

  isShaking = false;

  errorFace.textContent = "•ᴗ•";
  errorMessage.textContent = "It's okay. We can stay here forever.";
  closeButton.style.display = "none";
}
});

// Listen for close button clicks
closeButton.addEventListener("click", function () {
  anger = Math.min(10, anger + 1);

  console.log("Current anger:", anger);

  updateEmotion();
});


chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = chatInput.value.trim();

  if (message === "") {
    return;
  }
  idleSeconds = 0;
  affection = Math.min(10, affection + 1);
  anger = Math.max(0, anger - 1);
  messageCount += 1;
  updatePopupSize();
  if (affection >= 10) {
  triggerForeverTogether();
}

  console.log("Affection:", affection);
  console.log("Anger:", anger);
  console.log("Messages:", messageCount);

  if (affection >= 10) {
  triggerForeverTogether();
  } else {
  updateEmotion();

  if (!forcedSmile && !(anger >= 6 && affection >= 6)) {
    errorMessage.textContent = "You talked to me! I'm so happy!";
  }
}

  chatInput.value = "";
});



function updatePopupSize() {
  const newWidth = 360 + affection * 20;
  const newHeight = 280 + affection * 20;

  errorPopup.style.width = newWidth + "px";
  errorPopup.style.height = newHeight + "px";
  
  const heartCount = 2 + Math.floor(affection / 2);
  for (let i = 0; i < heartCount; i++) {
  createHeart();
  }
}



function createHeart() {
  const heart = document.createElement("span");

  heart.classList.add("heart");
  heart.textContent = "♥";

  heart.style.left = Math.random() * 80 + 10 + "%";
  heart.style.color = "#ff6b9a";

  heartsContainer.appendChild(heart);

  heart.addEventListener("animationend", function () {
    heart.remove();
  });
}


let idleSeconds = 0;

setInterval(function () {
  idleSeconds += 1;

  console.log("Idle time:", idleSeconds);

  if (idleSeconds >=3) {
    anger = Math.min(10, anger + 1);

    console.log("Error is getting impatient! Anger:", anger);

    updateEmotion();

    idleSeconds = 0;
  }
}, 1000);




popupHeader.addEventListener("mousedown", function (event) {
  if (foreverTogether || event.target === closeButton || isShaking) {
  return;
  }

  if (messageCount < 3) {
    anger = Math.min(10, anger + 1);
    updateEmotion();

    if (!forcedSmile) {
      errorMessage.textContent = "Don't move me! Talk to me first!";
    }

    return;
  }

  isDragging = true;

  dragStartX = event.clientX;
  dragStartY = event.clientY;

  const popupRect = errorPopup.getBoundingClientRect();
  popupStartX = popupRect.left + popupRect.width / 2;
  popupStartY = popupRect.top + popupRect.height / 2;

  errorPopup.classList.add("dragging");
  event.preventDefault();
});


document.addEventListener("mousemove", function (event) {
  if (!isDragging) {
    return;
  }

  const moveX = event.clientX - dragStartX;
  const moveY = event.clientY - dragStartY;

  errorPopup.style.left = popupStartX + moveX + "px";
  errorPopup.style.top = popupStartY + moveY + "px";
});


document.addEventListener("mouseup", function () {
  if (!isDragging) {
    return;
  }

  isDragging = false;

  errorPopup.classList.remove("dragging");

  errorPopup.style.left = "50%";
  errorPopup.style.top = "50%";
});


function triggerForeverTogether() {
  if (foreverTogether) {
    return;
  isDragging = false;
  errorPopup.classList.remove("dragging");
  }

  foreverTogether = true;

  errorPopup.classList.add("forever-together");

  errorFace.textContent = "♥ᴗ♥";
  errorMessage.textContent = "FOREVER TOGETHER. JUST YOU AND ME.";

  closeButton.style.display = "none";
}

resetButton.addEventListener("click", function () {
  window.location.reload();
});

