(function () {
  "use strict";

  const card = document.getElementById("card");
  const questionView = document.getElementById("question-view");
  const successView = document.getElementById("success-view");
  const btnYes = document.getElementById("btn-yes");
  const btnNo = document.getElementById("btn-no");
  const escapeArea = document.getElementById("escape-area");
  const SUCCESS_VIDEO_URL = "https://www.youtube.com/shorts/fhIR7yTqwbA";
  const REDIRECT_DELAY_MS = 2000;

  let noOffsetX = 0;
  let noOffsetY = 0;

  function getRandomPosition() {
    const areaRect = escapeArea.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);
    const x = Math.random() * maxX - maxX / 2;
    const y = Math.random() * maxY - maxY / 2;
    return { x, y };
  }

  function moveNoButton() {
    const { x, y } = getRandomPosition();
    noOffsetX = x;
    noOffsetY = y;
    btnNo.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  }

  function clampNoButtonPosition() {
    const areaRect = escapeArea.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();
    const maxX = Math.max(0, (areaRect.width - btnRect.width) / 2);
    const maxY = Math.max(0, (areaRect.height - btnRect.height) / 2);
    noOffsetX = Math.min(maxX, Math.max(-maxX, noOffsetX));
    noOffsetY = Math.min(maxY, Math.max(-maxY, noOffsetY));
    btnNo.style.transform = `translate(calc(-50% + ${noOffsetX}px), calc(-50% + ${noOffsetY}px))`;
  }

  function showConfirmed() {
    questionView.hidden = true;
    successView.hidden = false;
    card.classList.add("card--confirmed");
    card.setAttribute("aria-label", "Resposta confirmada");

    setTimeout(() => {
      window.location.href = SUCCESS_VIDEO_URL;
    }, REDIRECT_DELAY_MS);
  }

  function handleNoEscape(event) {
    event.preventDefault();
    moveNoButton();
  }

  btnYes.addEventListener("click", showConfirmed);

  btnNo.addEventListener("mouseenter", handleNoEscape);
  btnNo.addEventListener("pointerdown", handleNoEscape);
  btnNo.addEventListener("focus", handleNoEscape);
  btnNo.addEventListener("click", handleNoEscape);

  window.addEventListener("resize", clampNoButtonPosition);
})();
