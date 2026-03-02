let screens = document.querySelectorAll(".screen");
let player = document.getElementById("player");
let progress = document.querySelector(".progress");
let nextBtn = document.querySelector(".next-btn");

let currentScreen = 0;
let currentStep = 0;

function updateProgress() {
  progress.style.width = (currentScreen / (screens.length - 1)) * 100 + "%";
}

function playMusic() {
  let music = screens[currentScreen].getAttribute("data-music");
  player.src = music;
  player.play().catch(()=>{});
}

function resetSteps() {
  let elements = screens[currentScreen].querySelectorAll(".step-content h1, .step-content h2");
  elements.forEach(el => el.classList.remove("visible"));
  currentStep = 0;

  if (elements.length > 0) {
    elements[0].classList.add("visible");
    currentStep = 1;
  }

  // Esconder SIM/NÃO na última tela até a pergunta aparecer
  if (currentScreen === screens.length - 1) {
    let yesBtn = screens[currentScreen].querySelector(".yes");
    let noBtn = screens[currentScreen].querySelector(".no");
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    nextBtn.style.display = "block"; // Próximo aparece até a pergunta
  } else {
    nextBtn.style.display = "block";
  }
}

function showNextStep() {
  let elements = screens[currentScreen].querySelectorAll(".step-content h1, .step-content h2");

  if (currentStep < elements.length) {
    elements[currentStep].classList.add("visible");
    currentStep++;

    // Na última tela: se a pergunta final aparecer, esconde Próximo e mostra SIM/NÃO
    if (currentScreen === screens.length - 1) {
      let question = screens[currentScreen].querySelector("h1:last-of-type");
      if (elements[currentStep - 1] === question) {
        nextBtn.style.display = "none";
        let yesBtn = screens[currentScreen].querySelector(".yes");
        let noBtn = screens[currentScreen].querySelector(".no");
        yesBtn.style.display = "inline-block";
        noBtn.style.display = "inline-block";
      }
    }
  } else {
    nextScreen();
  }
}

function nextScreen() {
  screens[currentScreen].classList.remove("active");
  currentScreen++;

  if (currentScreen >= screens.length) return;

  screens[currentScreen].classList.add("active");
  updateProgress();
  playMusic();
  resetSteps();
}

function love() {
  alert("Agora oficialmente minha namorada 💚");
}

function run(btn) {
  btn.style.position = "absolute";
  btn.style.top = Math.random() * 80 + "vh";
  btn.style.left = Math.random() * 80 + "vw";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") showNextStep();
});

updateProgress();
playMusic();
resetSteps();