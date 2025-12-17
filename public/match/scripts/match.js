'use strict';

const sec = 1000;

const start       = document.querySelector(`.start`);
const start2      = document.querySelector(`.start2`);
const desk        = document.querySelector(`.desk`);
const card        = document.querySelectorAll(`.card`);
const overlay     = document.querySelector(`.overlay`);
const win         = document.querySelector(`.win`);
const scoreEl     = document.querySelector(`.score`);
const highscoreEl = document.querySelector(`.highscore`);

// prioritizing making it easy to tweak game variables
const names = [
    'mierangel', 
    'abri', 
    'bluestrings',
    'floo', 
    'confetti', 
    'genki',
    'jelly', 
    'jett', 
    'lance', 
    'miertyrant',
    'nico', 
    'partack', 
    'pp', 
    'temer', 
    'twelves',
    'vert', 
    'widow',
    'yobu', 
    'kags', 
    'phrog', 
    'the', 
    'davy',
];

const scoreCorrect   = 20
const scoreIncorrect =  3

let score = 0;
let highscore = 0;

// credits

const creditNames = names.filter(name => name !== `miertyrant` && name !== `pp` && name !== `bluestrings`);

const creditLinks = [
    'https://x.com/miermirth', 
    'https://www.instagram.com/23.bleu/', 
    'https://x.com/fbrush_', 
    'https://x.com/96Ghosts', 
    'https://x.com/GoodbyeCricket',
    'https://x.com/sr__jelly', 
    'https://x.com/Jett1586', 
    '#', 
    'https://x.com/nixnnixie', 
    '#',
    '#',
    'https://x.com/HymanGi_12',
    'https://x.com/vertuously', 
    'https://www.instagram.com/widow_ghost/',
    'https://www.instagram.com/yooyobu/', 
    '#', 
    '#', 
    'https://x.com/BonbliStar', 
    'https://x.com/gigaegg2',
];

const creditLinkNames = [
    'mier', 
    'abri', 
    'floo', 
    'confetti', 
    'genki',
    'sr_jelly', 
    'jett', 
    'lance', 
    'nico', 
    'partack', 
    'temer', 
    '12s',
    'vert', 
    'widow_ghost',
    'yobu', 
    'kags', 
    'phrog', 
    'bonbli', 
    'gigaegg',
];

const creditImg = document.querySelector(`.credit-img`);
const creditName = document.querySelector(`.credit-name`);
const arrowLeft = document.querySelector(`.arrow-left`);
const arrowRight = document.querySelector(`.arrow-right`);
let currentImg = 0;

const updateCredit = () => {
    creditImg.src = `./assets/pp/${creditNames[currentImg]}.png`;
    creditName.textContent = `${creditLinkNames[currentImg]}`;
    creditName.href = `${creditLinks[currentImg]}`;
    creditName.rel = `noopener noreferrer`;
    creditName.target = `_blank`;
}

arrowRight.addEventListener(`click`, function() {
    currentImg++;
    if (currentImg >= creditNames.length) {
        currentImg = 0;
    }   
    updateCredit();
    console.log(currentImg);
})

arrowLeft.addEventListener(`click`, function() {
    if (currentImg === 0) {
        currentImg = creditNames.length - 1;
    } else {
        currentImg--;
    }
    updateCredit();
    console.log(currentImg);
})


function playFlipSound() {
    const flipFX = new Audio('./assets/flip.mp3');
    flipFX.play();
}
function playFlip2Sound() {
    const flipFX2 = new Audio('./assets/flip2.mp3');
    flipFX2.play();
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const resetGame = () => {
    setScore(100)
}

const updateScore = () => {
    scoreEl.textContent = String(score);
    highscoreEl.textContent = String(highscore);
}

const setScore = (amount) => {
    score = amount
    scoreEl.textContent = String(score);
}

const setHighscore = () => {
    if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = String(highscore);
        localStorage.setItem(`matchHighScore`, JSON.stringify(score));
    }
}

const savedHighScore = JSON.parse(localStorage.getItem(`matchHighScore`));

const loadProgress = () => {
    if (savedHighScore) {
        highscore = savedHighScore;
        highscoreEl.textContent = String(savedHighScore);
    }
}

loadProgress();

const startGame = () => {
    resetGame();
    
    let cards = [...names, ...names];
    shuffleArray(cards);

    win.style.display = `none`;
    desk.innerHTML = ""
    for (let i = 0; i < cards.length; i++) {
        desk.insertAdjacentHTML("beforeend", `
            <div class="slot">
                <img class="${cards[i]} incorrect card" src="./assets/pp/${cards[i]}.png">
            </div>
        `);
    }
};

start.addEventListener(`click`, function() {
    startGame();
    const newCards = desk.querySelectorAll(`.card`);

    start.textContent = `reset`;
    overlay.style.display = `flex`;
    
    newCards.forEach(function(card) {
        card.style.animation = `fade-in 1s ease-in`;
        card.style.transition = `none`;
    });
    setTimeout(() => {
        newCards.forEach(function(card) {
            card.style.animation = `flip 2s ease`;
            setTimeout(() => {
                card.src = `./assets/pp/blank.png`;
                card.style.transform = `rotateY(180deg)`;
                card.style.transition = `all 1s ease`;
                setTimeout(() => {
                    overlay.style.display = `none`;
                }, 1200)
            }, 1000);
        });
    }, sec * 1.5);

    let selectedCards = [];
    const incorrect = document.querySelectorAll(`.incorrect`);

    newCards.forEach(function(card) {
        card.addEventListener(`click`, function() {
            let cardName = card.classList[0];

            playFlipSound();
            card.classList.add(`clicked`, `current`);
            card.style.animation = `none`;
            card.style.transform = `rotateY(0deg)`;
            
            setTimeout(() => {
                card.src = `./assets/pp/${cardName}.png`;
            }, sec * .3);

            selectedCards.push(cardName);
            console.log(selectedCards);


            if (selectedCards.length !== 2) { return }

            overlay.style.display = `flex`;            
            

            const currentHand = document.querySelectorAll(`.current`);
            if (selectedCards[0] === selectedCards[1]) {
                setScore(score + scoreCorrect)
                selectedCards = [];

                currentHand.forEach(function(card) {
                    card.classList.add(`correct`);
                    card.classList.remove(`incorrect`, `current`, `clicked`);
                    
                    card.style.animation = `win-glow 5s ease-in-out infinite`;
                    overlay.style.display = `none`;
                });

                if (Array.from(newCards).every(card => card.classList.contains(`correct`))) {
                    setHighscore()

                    win.style.display = `flex`;
                    overlay.style.display = `flex`;
                    start.textContent = `play again?`;

                }
            } else {
                selectedCards = [];
                setScore(score - scoreIncorrect)
                                
                setTimeout(() => {
                    playFlip2Sound();
                    currentHand.forEach(function(incCard) {
                        incCard.classList.remove(`current`, `clicked`);
                        
                        incCard.style.animation = `flip .6s ease`;
                        setTimeout(() => {
                            incCard.src = `./assets/pp/blank.png`;
                            incCard.style.transform = `rotateY(180deg)`;
                            overlay.style.display = `none`;
                        }, 300);
                    });
                }, 800);
                
            };
        });
    });
});