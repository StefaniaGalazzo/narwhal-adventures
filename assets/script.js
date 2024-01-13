/* ---- GET ELEMEMNTS FROM HTML AND SET GLOBAL VARIABLES---- */
// Game panel
const scoreCounter = document.querySelector(".score-counter");
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
// Livelli
const selectLevel = document.querySelector("#level");
selectLevel.value = "easy";
// Narval CardS
const bonusCard = document.querySelector(".bonus");
const deadCardContainer = document.querySelector("#dead-card-container");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".bodytext");
const closeBtn = document.querySelector(".close");
// End game
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");
// Game Logic info
let score = 0;
const totalCells = 100;
const happyNarvList = [];
const totHappyNarvals = 5;
let totDeadNarvals = 10;
let deadNarvList = [];
// Cards
const badCardsContent = [
  {
    id: 0,
    title: "🤷‍♂️ Not all narv-men (?)🤦‍♂️",
    body: "Scopri che nonostante l'anno sia iniziato da poco si contano già troppi narvicidi. Decidi di dedicarti un attimo all'estinzione della sotto-specie Narwhal Alpha Cishet.",
  },
  {
    id: 1,
    title: "👌Governo (anti)narvala",
    body: "Legge di Bilancio, raddoppia l'Iva sui prodotti per cuccioli e beni di prima necessità delle femmine di narvalo. Hai il mal di pancia dalla rabbia per tre giorni.",
  },
  {
    id: 2,
    title: "👠 Passo falso! 👠",
    body: "Naufraghi in acque in cui l'obiezione di coscienza rischia di far annegare le tue amiche in un mare di sofferenza, privandole delle cure mediche necessarie.",
  },
  {
    id: 3,
    title: "✋ Stop alle famiglie (🌈)",
    body: "Il re dei 7 mari ritira le trascrizioni delle famiglie narva-genitoriali. Perdi tempo nel tentativo di fargli cambiare idea.",
  },
  {
    id: 4,
    title: "☠️ Corsa Senza Meta ☠️",
    body: "Finisci nel vortice acquatico della disoccupazione, perdentdoti alla ricerca di lavoro in un acque ostili.",
  },
  {
    id: 5,
    title: "🦄 Ippocorni in agguato! 🦄",
    body: "Un branco di Ippocorni incantati ti sfida a una gara subacquea. Perdi e sei costretto ad essere loro schiavo per ore.",
  },
  {
    id: 6,
    title: "🙏Ti influenzi!🙏",
    body: "Scopri che i centri per narvale maltrattate ricevono fondi solo dalla Ferragni a Sanremo e non dai governi. Decidi di nuotare fino alla sua villa per organizzare assieme un colpo di Stato.",
  },
  {
    id: 7,
    title: "🦑 Oh calamari! 🦑",
    body: "Enormi calamari sembrano minacciare le acque. Scopri che sono solo ottimi ballerini e ti trovi coinvolto in una spettacolare danza sottomarina.",
  },
  {
    id: 8,
    title: "🎣 Pesca maledetta! 🎣",
    body: "Sei affamato e non riconosci un'esca. Per liberarti devi aspettare gli amici delfini, eterni ritardatari con l'ADHD.",
  },
  {
    id: 9,
    title: "🌀 Vertigini marine! 🌀",
    body: "Provi a trovare senso e coerenza nei discorsi della Meloni. Ti viene il mal di testa.",
  },
  {
    id: 10,
    title: "🌎GOVERNO MODERNO🌏",
    body: "Troppi paesi continuano a muoversi verso un'economia non sostenibile. Questo ti rende molto triste ma sopratutto fa sempre più caldo e la tua corsa rallenta.",
  },
  {
    id: 11,
    title: "🧜 Incantesimo marino! 🧜",
    body: "Un gruppo di sirene e tritoni ti imbuca a una festa e ti sballi come un pesce palla! Rimani fermo tre giorni.",
  },
  {
    id: 12,
    title: "♀️ Improvvisa marea 🌊",
    body: "Il Re dei 7 mari fa sgomberare molte consultorie e centri antiviolenza. Ti unisci alla marea di NUDM e provi a cambiare il mondo terreno.",
  },
  {
    id: 13,
    title: "🔵Profondità ESTREMA🔵",
    body: "In acque cariche di odio, si nega l'esistenza delle persone lgbt+, accusandole di “estremismo”. Ti unisci a una banda di attivisti anarchici e dimentichi la tua destinazione.",
  },
  {
    id: 14,
    title: "🦈 Amico squalo 😊",
    body: "Un tuo amico è in pericolo, rischia essere pescato per delle sciocche abitudini umane. Diventi un eroe ma rallenti il tuo viaggio.",
  },
  {
    id: 15,
    title: "☠️ Oh no! ☠️",
    body: "Accidenti! Baby Narval è stato circondato da un gruppo di 'Bravi Ragazzi' con tante 'buone intenzioni'!",
  },
  {
    id: 16,
    title: "🔴 Omofobia, portami via! 🔴",
    body: "Negli abissi incontri Ariel, ti chiede aiuto per far accettare al padre la sua lesbicità. Nettuno è omofobo e ti fulmina. Rimani fritto per qualche giorno.",
  },
  {
    id: 17,
    title: "✨ Portale magico! ✨",
    body: "Apri una strana porta e finisci trasportato in RuPaul's Drag Race. Se non sfili come una vera drag queen non potrai tornare sui tuoi passi!",
  },
  {
    id: 18,
    title: "🌪️ Oh tempesta! 🌪️",
    body: "Un vortice marino di travolge e rimani a girare e girare e girare e girare e.....",
  },
  {
    id: 19,
    title: "🐙 Polpo di Stato! 🐙",
    body: "Sfidi apertamente il Re dei 7 mari, noto razzista omofobo e misogino. Riesci a farlo fuori ma finisci prigioniero dei suoi seguaci.",
  },
  {
    id: 20,
    title: "☠️ Traffico cornuto! ☠️",
    body: "Ti vogliono rubare il corno per venderlo al mercato nero! Ti nascondi per giorni travestendoti da Elton John.",
  },
  {
    id: 21,
    title: "🌈 SURPRISE 🌈",
    body: "Il caldo ti da alla testa, pensi di essere un unicorno e ti lanci fuori dall'acqua.",
  },
  {
    id: 22,
    title: "☠️ Oh no! ☠️",
    body: "Scambi una caravella portoghese per un biscotto e finisci avvelenato!",
  },
  {
    id: 23,
    title: "🌏 Terra Sospesa ❄️",
    body: "Mentre esplori le acque artiche, l'accelerato scioglimento dei ghiacci minaccia il tuo viaggio.",
  },
  {
    id: 24,
    title: "🧱 Muraglia Virtuale 🖥️",
    body: "Vorresti rilassarti facendo un po' di scrolling sui social ma ti scontri con la crescente censura online.",
  },
  {
    id: 25,
    title: "👱‍♀️ ...in a plastic world 🎶",
    body: "Navigando nei mari del sud, rimani intrappolato in una rete di plastica abbandonata dai pescatori.",
  },
  {
    id: 26,
    title: "🤿 Sotto la Maschera 🎭",
    body: "La crescente discriminazione dei narvali ti costringe a cambiare identità. Vieni scoperto e imprigionato.",
  },
  {
    id: 27,
    title: "🛥️Arca di Noé 🐱",
    body: "Ti senti affondare nel dilagante problema dell'estinzione delle specie. Provi a costruire un'arca per i tuoi amici terrestri.",
  },
  {
    id: 28,
    title: "🫰Traffico d'Ingiustizia💸",
    body: "Ti perdi in un mare di corruzione imbattendoti nel traffico di esseri umani. Abbandoni la tua strada e inizi ad affondare le barche dei trafficanti.",
  },
  {
    id: 29,
    title: "🌳 La Foresta Piange 🌴",
    body: "Mentre nuoti nei mari tropicali, ti imbatti nella deforestazione selvaggia e vieni colpito dell'inquinamento e dai detriti.",
  },
];
const extractNumbers = [];

// Posiziono randomicamente le celle per le card bonus
while (happyNarvList.length < totHappyNarvals) {
  const number = Math.floor(Math.random() * totalCells) + 1;
  if (!happyNarvList.includes(number) && !deadNarvList.includes(number))
    happyNarvList.push(number);
}

/* ---- START GAME DESIGN - CREATE GRID ----*/
let isCellEven = false;
let isRowEven = false;
function startGame() {
  generateDeadCell();
  generateRandomCard();
  for (let i = 1; i <= totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    isCellEven = i % 2 === 0;

    // Stile scacchiera
    if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven))
      cell.classList.add("cell-dark");
    if (i % 10 === 0) isRowEven = !isRowEven;

    // QUANDO clicco su una casella
    cell.addEventListener("click", function () {
      // SE è già cliccata
      if (
        cell.classList.contains("cell-clicked") ||
        cell.classList.contains("dead-narv") ||
        cell.classList.contains("happy-narv")
      )
        return;
      //   SE è un deadNarval
      if (deadNarvList.includes(i)) {
        // decrese score
        score -= 5;
        // show dead narv cell
        cell.classList.add("dead-narv", "cell-clicked");
        // cell.classList.add("dead-narv");
        /**************** show dead card */
        extraction();
      } else if (happyNarvList.includes(i)) {
        // bonus score and show popup
        cell.classList.add("happy-narv", "cell-clicked");
        // cell.classList.add("happy-narv"); // DA CREARE
        bonusCard.classList.remove("hide");
        score += 15;
      } else {
        cell.classList.add("cell-clicked");
        score += 3;
      }
      // ---- HANDLE SCORE AND ENDGAME ---- //
      // Verifico se tutte le celle delle bad cards sono state cliccate
      const allBadCardsClicked = document.querySelectorAll(
        `.dead-narv.cell-clicked`
      );
      console.log(allBadCardsClicked, "allbads clicked");
      console.log(totDeadNarvals, "totDeadNarvals");

      // Chiamo endGame con isVictory impostato su false se tutte le bad cards sono state cliccate
      if (allBadCardsClicked.length === totDeadNarvals && score > 0) {
        endGame(true, "You found your way home despite adversities!");
        console.log("game end");
      }

      if (score <= 0) {
        score = 0;
        scoreCounter.innerText = String(score).padStart(5, 0);
        endGame((isVictory = false));
      }
      if (score > 0) {
        scoreCounter.innerText = String(score).padStart(5, 0);
      }

      // controllo se le celle sono tutte cliccate
      const clickedCells = document.querySelectorAll(".cell-clicked");
      console.log(clickedCells.length, "clicked");
      // const totNarvCells =
      totalCells - (deadNarvList.length + 1) - (happyNarvList.length + 1);
      if (
        clickedCells.length === totalCells ||
        totalCells === clickedCells.length
      ) {
        endGame((isVistory = true));
      }
    });
    grid.appendChild(cell);
  }
}
/*-- end game design --*/
startGame();
/* ---- FUNZIONI ----*/
// Generate random badCard in game grid
function generateRandomCard() {
  const nums = new Set();
  while (nums.size !== totDeadNarvals) {
    nums.add(Math.floor(Math.random() * totDeadNarvals));
  }
  console.log(totDeadNarvals, "badcards ");
}
// Posiziono randomicamente le celle deadNarv
function generateDeadCell() {
  deadNarvList = [];
  while (deadNarvList.length < totDeadNarvals) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!deadNarvList.includes(number)) {
      deadNarvList.push(number);
    }
  }
  console.log(deadNarvList, "deadNarvList");
}
// CLOSE POPUP
function closePopup() {
  deadCardContainer.classList.add("hide");
  bonusCard.classList.add("hide");
}
//estraction random deads card
function extraction() {
  let randomNum = Math.floor(Math.random() * badCardsContent.length);
  let invalidNum = extractNumbers.find((n) => n === randomNum);
  if (invalidNum) {
    extraction();
  } else {
    extractNumbers.push(randomNum);
    cardTitle.innerText = badCardsContent[randomNum].title;
    cardText.innerText = badCardsContent[randomNum].body;
    deadCardContainer.classList.remove("hide");
  }
}
// SHOW END GAME LAYOUT
/*il gioco finisce quando:
isVistori true:
clicco su tutte le caselle evitando di cliccare su tutte le deadnarv
clicco su tutte le caselle deadnarv ma il mio punteggio è ancora superiore a 0
isVistore false:
clicco su tutte le caselle morte e il mio score è <= 0
*/
function endGame(isVictory, extraText) {
  if (isVictory === true) {
    endGameScreen.classList.add("win");
    endGameText.innerHTML = `YOU<br>WIN<br>${extraText}`;
  } else {
    revealAllDead();
  }
  endGameScreen.classList.remove("hide");
}
// reveal all narvs
function revealAllDead() {
  // Recupero tutte le celle
  const cells = document.querySelectorAll(".cell");
  for (let i = 1; i <= cells.length; i++) {
    // controllo se la cella è una bomba
    if (deadNarvList.includes(i)) {
      const cellToReveal = cells[i - 1];
      cellToReveal.classList.add("dead-narv");
    }
  }
}
// Play again
function playAgain() {
  location.reload();
}
/*end func*/

/* ---- EVENTS -----*/
// CAMBIO LIVELLO
selectLevel.onchange = () => {
  // selectedLevel = selectLevel.value;
  switch (selectLevel.value) {
    case "easy":
      totDeadNarvals = 10;
      break;
    case "medium":
      totDeadNarvals = 20;
      break;
    case "hard":
      totDeadNarvals = 30;
      break;
    default:
      totDeadNarvals = 10;
      break;
  }
  generateDeadCell();
  generateRandomCard();
};

// PLAY AGAIN
playAgainButton.addEventListener("click", playAgain);
// Close popup
deadCardContainer.addEventListener("click", closePopup);
bonusCard.addEventListener("click", closePopup);
