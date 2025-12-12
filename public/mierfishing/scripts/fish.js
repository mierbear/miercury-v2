'use strict';

const sec = 1000;

const fishContainer = document.querySelector(`.fishes`);
const fishAll = document.querySelectorAll(`.fish`);
const infoStars = document.querySelector(`.stars`);
const infoImg = document.querySelector(`.info-img`);
const infoHeader = document.querySelector(`.info-header`);
const infoSubHeader = document.querySelector(`.info-sub-header`);
const infoDesc = document.querySelector(`.info-description`);
const infoLink = document.querySelector(`.info-link`);
const popup = document.querySelector(`.popup-container`);
const popupText = document.querySelector(`.popup-text`);
const popupTime = document.querySelector(`.popup-time`);
const monologue = document.querySelector(`.monologue`);

const mierImg = document.querySelector(`.mier-img`);
const fishImg = document.querySelector(`.fish-img`);
const playBtn = document.querySelector(`.play`);
const keysDiv = document.querySelector(`.keys`);
const timer = document.querySelector(`.timer`);
const timerText = document.querySelector(`.timer-text`);
const keys = [`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `W`, `A`, `S`, `D`];

let firstKeyInput;
let timerID;
let timeOriginal;
let timeRemaining;
let timerActive = false;
let inputPlayer = [];
let inputMistakes = [];
let inputGame = [];
let currentFish = [];
let currentRound;
let rounds;
let level;
let extraLife = false;
let mierState = 0;
let mierSlide = 0;
let win = false;

const randomizer = (arr) => {
    return arr[Math.trunc((Math.random() * arr.length))];
};

const preloadImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
}

const addKeys = (count) => {
    for (let i = 0; i < count; i++) {
        inputGame.push(randomizer(keys));
    }
};

const showPopup = (fish, time) => {
    popup.style.display = `flex`;
    popup.style.opacity = `1`;
    console.log(fish);
    if (fish[0] === `twelves`) {
        popupText.textContent = `you caught a fish!!`;
    } else if (fish[0] === `eight`) {
        popupText.textContent = `you caught a fish!!`;
    } else if (fish[0] === `jelly`) {
        popupText.textContent = `you caught a jellyfish!!`;
    } else if (fish[0] === `mier`) {
        popupText.textContent = `you caught.. an orca!?!?`;
    } else if (fish[0] === `abri`) {
        popupText.textContent = `you caught a really big turtle!!`;
    } else if (fish[0] === `temer`) {
        popupText.textContent = `you caught a horrifying spider!!`;
    } else if (fish[0] === `floo`) {
        popupText.textContent = `you caught a panda??`;
    } else if (fish[0] === `vert`) {
        popupText.textContent = `you caught a goblin..`;
    } else if (fish[0] === `partack`) {
        popupText.textContent = `you caught.. a penguin??`;
    } else if (fish[0] === `kero`) {
        popupText.textContent = `you caught a ghost.. spooky!!`;
    } else if (fish[0] === `nico`) {
        popupText.textContent = `you caught a bunny!!`;
    } else if (fish[0] === `lance`) {
        popupText.textContent = `you caught a really cool sword!!`;
    } else if (fish[0] === `genki`) {
        popupText.textContent = `you caught a really cute octopus..`;
    } else if (fish[0] === `widow`) {
        popupText.textContent = `you caught an axolotl!!`;
    } else if (fish[0] === `bongli`) {
        popupText.textContent = `you caught something ugly..`;
    } else if (fish[0] === `gigaegg`) {
        popupText.textContent = `you caught something blocky..`;
    } else if (fish[0] === `yobu`) {
        popupText.textContent = `you caught an octopus!!`;
    } else if (fish[0] === `kags`) {
        popupText.textContent = `you caught a stingray!!`;
    } else if (fish[0] === `jett`) {
        popupText.textContent = `you caught a nasty cockroach..`;
    } else if (fish[0] === `truilt`) {
        popupText.textContent = `you caught something pretty!!`;
    } else if (fish[0] === `gfr`) {
        popupText.textContent = `you caught.. an entire crocodile??`;
    } else if (fish[0] === `bluestrings`) {
        popupText.textContent = `you caught a long nosed fish..`;
    } else if (fish[0] === `solis`) {
        popupText.textContent = `you caught.. an anglerfish??`;
    } else if (fish[0] === `phrog`) {
        popupText.textContent = `you caught something really silly looking..`;
    } else {
        popupText.textContent = `you caught ${fish}!!`;
    }
    if (time < .1) {
        popupTime.textContent = `+${time.toFixed(3)} MS LEFT!!!!`;
    } else if (time > .1 && time < .4) {
        popupTime.textContent = `+${time.toFixed(3)} ms left..... YOURE INSANEEE`;
    } else if (time > .4 && time < 1) {
        popupTime.textContent = `+${time.toFixed(3)} ms left... you're crazy lol`;
    } else if (time > 1 && time < 2) {
        popupTime.textContent = `+${time.toFixed(3)} second left! you almost lost it...`;
    } else if (time > 2 && time < 3) {
        popupTime.textContent = `+${time.toFixed(3)} seconds left! almost got away!`;
    } else {
        popupTime.textContent = `+${time.toFixed(3)} seconds left! good work!`;
    }
    setTimeout(() => {
        popup.style.opacity = `0`;
        setTimeout(() => {
            popup.style.display = `none`;
        }, 6000);
    }, 6000);
}

const setMier = () => {
    if (mierState < 7) { mierState++ }
    mierImg.src = `./assets/fish/mier-${mierState}.png`;
    if (mierState > 3) {
        mierSlide += -15;
        mierImg.style.transform = `translateX(${mierSlide}px)`;
        fishImg.style.transform = `translateX(${mierSlide}px)`;
    }
}

const playBtnAppear = () => {
    playBtn.style.display = `flex`;
    setTimeout(() => {
        playBtn.style.opacity = `1`;
        setTimeout(() => {
            playBtn.style.pointerEvents = `all`;
        }, 2000);
    }, 1000);
}

const playBtnDisappear = () => {
    playBtn.style.pointerEvents = `none`;
    playBtn.style.opacity = `0`;
}

const startRound = (level) => {
    if (level === 1) {
        addKeys(1)
    } else if (level === 2) {
        addKeys(2)
    } else if (level === 3) {
        addKeys(3)
    } else if (level === 4) {
        addKeys(4)
    } else if (level === 5) {
        addKeys(5)
    } else if (level === 6) {
        addKeys(6)
    } else if (level === 7) {
        addKeys(7)
    } else if (level === 8) {
        addKeys(8)
    } else if (level === 9) {
        addKeys(9)
    } else if (level === 10) {
        addKeys(10)
    };
    inputGame.forEach((key) => {
        keysDiv.insertAdjacentHTML(`afterbegin`, `<img src="./assets/fish/${key}.png">`);
    })
}

const loseQuotes = [
    `it's over...`,
    `sigh... u_u`,
    `how did it get away...`,
    `skill issue...`,
    `why did i (mier) code it like this...`,
    `i almost had it...`,
    '.·´¯`(>▂<)´¯`·.',
    `T_T`
]

const startTimer = (time) => {
    timerActive = true;
    timeOriginal = time;
    timeRemaining = Number(time);
    timerText.textContent = `${Math.trunc(timeRemaining)}`;
    timer.style.opacity = `1`;
    keysDiv.style.opacity = `1`;
    timer.style.backgroundColor = `rgb(51, 53, 67)`;
    const mierLose = `./assets/fish/mier-9.png`;
    
    updateTimerBar();

    timerID = setInterval(() => {
        if (timeRemaining > 0 && timerActive) {
            timeRemaining -= .01;
            timerText.textContent = `${Math.trunc(timeRemaining)}`;
            updateTimerBar();
            if (timeRemaining < 4 && timeRemaining > 3) {
                timer.style.backgroundColor = `rgb(94, 7, 7)`;
            } else if (timeRemaining < 3 && timeRemaining > 2) {
                timer.style.backgroundColor = `rgb(183, 10, 10)`;
            } else if (timeRemaining < 2 && timeRemaining >= 0) {
                timer.style.backgroundColor = `red`;
            }
        // LOSE
        } else if (timeRemaining <= 0) {
            if (extraLife) {
                timeRemaining += 10
                extraLife = false;
                timer.style.backgroundColor = `rgb(51, 53, 67)`;
            } else {
                stopTimer();
                console.log(`you lose!`);
                playSound(fail());
                timer.style.opacity = `0`;
                keysDiv.style.opacity = `0`;
                currentFish = [];
                inputPlayer = [];
                inputGame = [];
                preloadImage(mierLose, () => {
                    mierImg.src = mierLose;
                });
                monologue.style.display = `flex`;
                monologue.style.opacity = `1`;
                monologue.textContent = randomizer(loseQuotes);
                setTimeout(() => {
                    monologue.style.opacity = `0`;
                    setTimeout(() => {
                        monologue.style.display = `none`;
                    }, 2000);
                }, 8000);
                setTimeout(() => {
                    keysDiv.innerHTML = ``;
                }, 1000);
                playBtn.textContent = `fish...`;
                playBtnAppear();
            }
        }
    }, 10);
};

const updateTimerBar = () => {
    const percentage = (Math.trunc(timeRemaining) / timeOriginal) * 50;
    timer.style.width = `${percentage}%`;
};

const stopTimer = () => {
    clearInterval(timerID);
    timerActive = false;
};

const putMonologue = (fish) => {
    if (fish === `bongli`) {
        return `...<br>what an ugly looking fish..`;
    } else if (fish === `gigaegg`) {
        return `am i in minecraft?`;
    } else if (fish === `nico`) {
        return `woah!<br>there a bunnies in the sea?`;
    } else if (fish === `phrog`) {
        return `what a silly looking fish lol`;
    } else if (fish === `yobu`) {
        return `cool octopus!<br>i better not touch this..`;
    } else if (fish === `jett`) {
        return `nasty ass bug..`;
    } else if (fish === `genki`) {
        return `so cute!!`;
    } else if (fish === `eight`) {
        return `why is it blowing air??`;
    } else if (fish === `floo`) {
        return `woah! a panda fish!`;
    } else if (fish === `twelves`) {
        return `cool looking fish..`;
    } else if (fish === `partack`) {
        return `a penguin??<br>i hope its ok..`;
    } else if (fish === `bluestrings`) {
        return `this looks like a fish that lies..`;
    } else if (fish === `jelly`) {
        return `i shouldnt touch this..`;
    } else if (fish === `truilt`) {
        return `wow..<br>so colorful!`;
    } else if (fish === `kags`) {
        return `a stingray??`;
    } else if (fish === `widow`) {
        return `axolotl woah..`;
    } else if (fish === `kero`) {
        return `this is giving me the creeps..`;
    } else if (fish === `temer`) {
        return `what is this abomination??`;
    } else if (fish === `vert`) {
        return `you ugly as hell!!`;
    } else if (fish === `solis`) {
        return `that is horrifying..`;
    } else if (fish === `gfr`) {
        return `i got a crocodile!!`;
    } else if (fish === `abri`) {
        return `a big fat turtle!!`;
    } else if (fish === `lance`) {
        return `i got a cool sword!!`;
    } else if (fish === `mier`) {
        return `really big fish..`;
    } else {
        return `Unknown fish!`;
    }
};


const startFishing = (l, r, time, f) => {
    level = l;
    rounds = r;
    currentFish.push(f);
    currentRound = 0;
    mierSlide = 0;
    mierState = 2;
    mierImg.src = `./assets/fish/mier-2.png`;
    // mierImg.style.transition = `all .5s ease;`;

    startRound(level + difficulty[3]);
    startTimer(time + difficulty[2]);

    const keyFirst = document.querySelector(`.keys img`);
    firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
    console.log("First key set to:", firstKeyInput);
    keyFirst.style.transform = `scale(1.2)`;
};

const handleKeyPress = (event) => {
    console.log(event.key);

    const mierWin = `./assets/fish/mier-11.png`;
    const mierWin2 = `./assets/fish/mier-12.png`;
    const activeFish = `./assets/fish/fish/${currentFish}Fish.png`

    // WRONG KEY
    if (event.key !== firstKeyInput && event.key !== firstKeyInput.toLowerCase()) {
        updateMistakes();
        console.log(`wrong!`);
        playSound(wrong());
        timeRemaining -= difficulty[5];
        timerText.textContent = `${Math.trunc(timeRemaining)}`;
        updateTimerBar();
        keysDiv.style.animation = `wrong .1s ease-in-out`;
        setTimeout(() => {
            keysDiv.style.animation = `none`;
        }, 100);
    }

    // RIGHT KEY
    if (event.key === firstKeyInput || event.key === firstKeyInput.toLowerCase()) {
        updateHitCount();
        console.log("correct");
        playSound(hit());
        inputPlayer.push(event.key);
        console.log(inputPlayer);

        // REMOVE FIRST KEY
        keysDiv.removeChild(keysDiv.firstChild);

        // WIN ROUND
        if (inputPlayer.length === inputGame.length) {
            currentRound++;
            playSound(reel());
            playSound(splash());
            inputPlayer = [];
            inputGame = [];
            setMier();

            if (currentRound !== rounds) {
                startRound(level + difficulty[3]); 
                timer.style.width = `50%`;
                stopTimer();
                // CF [ KEYS, ROUNDS, TIME ]
                console.log(timeRemaining);
                console.log((((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));

                startTimer(timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1]));
            // WIN LEVEL
            } else { 
                updateFishCount();
                playSound(success());
                playSound(pull());
                monologue.innerHTML = putMonologue(currentFish[0]);
                stopTimer();
                setTimeout(() => {
                    timer.style.opacity = `0`;
                }, 500);
                playBtn.textContent = `fish!!!`;
                playBtnAppear();
                fishImg.style.display = `flex`;
                setTimeout(() => {
                    fishImg.style.transform = `none`;
                }, 0);
                mierImg.style.transform = `none`;

                preloadImage(mierWin, () => {
                    mierImg.src = `./assets/fish/mier-11.png`;
                });
                preloadImage(activeFish, () => {
                    fishImg.src = activeFish;
                });
                preloadImage(mierWin2, () => {
                    setTimeout(() => {
                        mierImg.src = mierWin2;
                        fishImg.style.transform = `translateX(-6%) translateY(14.6%)`;
                        monologue.style.display = `flex`;
                        monologue.style.opacity = `1`;
                        setTimeout(() => {
                            monologue.style.opacity = `0`;
                            setTimeout(() => {
                                monologue.style.display = `none`;
                            }, 2000);
                        }, 8000);
                    }, 2500);
                });
                const cf = document.querySelector(`.${currentFish[0]}`);
                const cfImg = cf.querySelector(`img`);
                if (!cf.classList.contains(`unlocked`)) {
                    catalogBtn.src = `./assets/fish/catalogNotif.png`
                }
                cf.classList.add(`unlocked`);
                cfImg.src = `./assets/fish/fishCatalog/${currentFish}.png`;
                console.log(`you caught it!!`);
                unlockFish(currentFish);
                updateChances(fishNames[currentFish]);
                showPopup(currentFish, timeRemaining);
                setTimeout(() => {
                    // WIN GAME
                    if (!checkCert && !win && !cheatedStatus) {
                        winStats = [fishCaught, fishHooked, hitCount, mistakes, savedDifficulty, diffChange];
                        localStorage.setItem(`winStats`, JSON.stringify(winStats));
                        checkWin(fishContainer, 'unlocked');
                    }
                }, 4000);
            }
        }

        if (inputPlayer.length !== inputGame.length) {
            firstKeyInput = document.querySelector(`.keys img`).src.split(`/`).pop().split(`.`).shift();
            const keyFirst = document.querySelector(`.keys img`);
            keyFirst.style.transform = `scale(1.2)`;
        }
    }
};

let winCaught;
let winHooked;
let winCount;
let winMistakes;
let winDiff;
let winDiffChange;
let winStats = [];

document.addEventListener(`keydown`, (event) => {
    if (timerActive) {
        handleKeyPress(event);
    }
});

fishAll.forEach((fish, index) => {
    fish.addEventListener(`click`, () => {
        if (fish.classList.contains(`unlocked`)) {
            const selectedFish = fishObjects[index];
            if (selectedFish.stars === `★★★★★`) {
                infoStars.style.animation = `rainbow .5s ease-in-out infinite`;
            } else {
                infoStars.style.animation = `gold 2s ease-in-out infinite`;
            }
            infoStars.textContent = selectedFish.stars;
            infoStars.style.fontSize = `4vh`;
            infoImg.src = selectedFish.img;
            infoHeader.textContent = selectedFish.h;
            infoSubHeader.textContent = selectedFish.sh;
            infoDesc.innerHTML = selectedFish.desc;
            infoLink.textContent = selectedFish.name;
            infoLink.href = selectedFish.link;
            
            catalogInfo.style.display = `flex`;
        } else {
            infoImg.src = `./assets/fish/fishCatalog/locked-2.png`;
            infoStars.textContent = ``;
            infoHeader.textContent = ``;
            infoSubHeader.textContent = ``;
            infoDesc.textContent = `catch this fish first!`;
            infoLink.textContent = ``;
            
            catalogInfo.style.display = `flex`;
        }
    })
});

const fishObjects = [
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/mier.png`,
        h: `Orca`,
        sh: `Orcinus Orca`,
        desc: `Orcas, also known as killer whales, are highly intelligent and social marine mammals that live in complex family groups called pods, often led by older females. They are apex predators, meaning nothing in the ocean preys on them, and their hunting techniques vary depending on their culture—some pods specialize in hunting fish, while others work together to take down seals, sharks, or even large whales. Orcas communicate with unique clicks and calls that act like a cultural language, and each pod has its own distinct “dialect.” They are fast, powerful swimmers and can travel incredible distances, often showing playful behaviors like breaching, tail-slapping, and spy-hopping to observe their surroundings.<br><br>Fun fact: Orcas are so clever that in some regions they intentionally beach themselves on purpose—sliding onto the shore—to grab seals before sliding back into the water, a skill passed down through generations like a learned family tradition.`,
        link: ``,
        name: ``
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/abri.png`,
        h: `Leatherback Turtle`,
        sh: `Dermochelys Coriacea`,
        desc: `Leatherback turtles are the largest of all sea turtles, capable of growing over six feet long and weighing up to 2,000 pounds, yet they move with surprising grace through the ocean. Unlike other sea turtles, they don’t have a hard shell—instead, their backs are covered with a flexible, rubbery, leathery carapace that helps them dive to incredible depths, sometimes reaching more than 1,000 meters. These ancient mariners migrate thousands of miles between feeding and nesting grounds, navigating with remarkable accuracy across entire oceans. Leatherbacks primarily eat jellyfish, using their delicate, backward-facing throat spines to stop the slippery prey from escaping. Despite their size and strength, they are gentle creatures and play a major role in controlling jellyfish populations.<br><br>Fun fact: Leatherback turtles can maintain body temperatures far above the surrounding water thanks to a unique biological “heat-retention” system, allowing them to hunt in cold, nutrient-rich waters where other sea turtles can’t survive.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/fishCatalog/temer.png`,
        h: `Japanese Spider Crab`,
        sh: `Macrocheira Kaempferi`,
        desc: `Japanese spider crabs are the giants of the arthropod world, boasting the longest leg span of any crab—reaching up to 12 feet from claw to claw. Despite their intimidating appearance, they are generally slow and gentle scavengers that inhabit the deep coastal waters around Japan, often living at depths of 150 to 300 meters. Their long, spindly legs help them navigate rocky seafloors, and their bodies are covered in bumps and spines that provide camouflage against predators. These crabs can live remarkably long lives—potentially over 100 years—making them some of the ocean’s most ancient and resilient inhabitants. They play an important ecological role by cleaning up the seafloor as they feed on dead fish and organic debris.<br><br>Fun fact: Japanese spider crabs frequently decorate themselves with sponges, seaweed, and other small organisms, carefully attaching them to their shells like natural armor to blend into their surroundings and avoid predators.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/fishCatalog/twelves.png`,
        h: `Horned Blenny`,
        sh: `Parablennius Intermedius`,
        desc: `Horned blennies are small, charismatic reef fish easily recognized by the fleshy horn-like appendages that protrude above their eyes, giving them a quirky, expressive look. They typically inhabit shallow, rocky coastlines and coral reefs, where they dart among crevices and algae-covered surfaces in search of small invertebrates to eat. Despite their size—usually only a few inches long—they’re bold and highly territorial, often defending their chosen rock or burrow with surprising confidence. Horned blennies use their elongated bodies and strong pectoral fins to “hop” or scoot along rocks, making them appear almost amphibious as they navigate tight spaces. Their vibrant colors and curious personalities make them a favorite among divers and marine photographers.<br><br>Fun fact: Horned blennies are known to change color depending on their mood, surroundings, or social status—males often display brighter, more intense patterns during mating season to attract females and warn off rivals.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/fishCatalog/jelly.png`,
        h: `Cannonball Jellyfish`,
        sh: `Stomolophus Meleagris`,
        desc: `Cannonball jellyfish, named for their round, firm, cannonball-shaped bells, are compact and surprisingly strong swimmers compared to many other jelly species. Typically found in warm coastal waters, they drift in large groups called “smacks,” feeding on plankton and small fish with their short, frilly oral arms. Their simple, pulsing movements help them filter vast amounts of water as they travel, contributing to the balance of local marine ecosystems. Unlike many jellyfish, cannonballs have relatively mild stings and are often considered harmless to humans, which is one reason they are harvested in some regions as a food source. Their sturdy, almost rubbery bodies also make them more resistant to being torn apart by waves or predators.<br><br>Fun fact: Cannonball jellyfish have a mutually beneficial relationship with juvenile longnose spider crabs—tiny crabs often hitch rides inside the jelly’s bell, gaining protection while feeding on parasites and leftovers, turning the jellyfish into a drifting safe house.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/fishCatalog/floo.png`,
        h: `Panda Banggai Cardinalfish`,
        sh: `Pterapogon Kauderni`,
        desc: `Panda Banggai cardinalfish are striking, small reef fish known for their bold black-and-white coloration that resembles a panda’s patterning, making them especially eye-catching in aquaria and shallow tropical waters. Native to the Banggai Islands of Indonesia, they prefer calm seagrass beds and coral branches where they hover motionlessly in small groups, relying on their stillness and stripes for camouflage. Their elegant elongated fins and slow, deliberate swimming style give them a delicate appearance, but they are highly adapted predators of tiny crustaceans and plankton. Sadly, their limited natural range makes them vulnerable to habitat loss and overcollection, placing them among the more at-risk ornamental fish species.<br><br>Fun fact: Unlike most fish, Panda Banggai cardinalfish are paternal mouthbrooders—the males carry the fertilized eggs in their mouths for several weeks, protecting them until the fully formed miniature fish are ready to swim out and fend for themselves.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/fishCatalog/eight.png`,
        h: `Bubble Eye Goldfish`,
        sh: `Carassius Auratus`,
        desc: `Bubble Eye goldfish are one of the most unique and whimsical varieties of fancy goldfish, instantly recognizable by the delicate fluid-filled sacs under their eyes that give them a soft, balloon-like appearance. These sacs grow as the fish matures and require gentle, obstacle-free environments because they can be easily damaged. Bubble Eyes swim slowly due to their unusual anatomy and lack of a dorsal fin, giving them a floating, gliding motion that makes them look almost dreamlike in aquariums. Despite their fragile look, they’re hardy fish when kept in clean, calm water and are known for their gentle, curious personalities. Their elegant colors—ranging from orange and gold to calico patterns—make them a favorite among hobbyists who enjoy their surreal aesthetic.<br><br>Fun fact: Bubble Eye goldfish can regrow their eye sacs if they are accidentally torn—though it takes time, the sacs usually regenerate, showcasing the goldfish’s surprising ability to heal and adapt.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/vert.png`,
        h: `Goblin Shark`,
        sh: `Mitsukurina Owstoni`,
        desc: `Goblin sharks are one of the ocean’s most bizarre and ancient predators, often called “living fossils” because their lineage dates back around 125 million years. They inhabit deep waters—usually over 1,000 meters down—where sunlight barely reaches, giving them their pale, ghostly appearance. Their long, flattened snout is packed with electroreceptors that detect the faint electrical signals of nearby prey. But their most shocking feature is their extendable jaw: when they strike, the jaws shoot forward in a rapid, slingshot-like motion to snatch fish, squid, and crustaceans with rows of needle-like teeth. Their soft, floppy bodies aren’t built for speed, so this lightning-fast jaw mechanism is key to their hunting strategy in the deep sea.<br><br>Fun fact: A goblin shark’s jaw can launch forward up to 10% of its body length—one of the most extreme jaw extensions of any animal on Earth.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/fishCatalog/partack.png`,
        h: `Fiordland Penguin`,
        sh: `Eudyptes Pachyrhynchus`,
        desc: `Fiordland penguins, also known as Tawaki, are one of the rarest and most secretive penguin species, found only along the rugged southwestern coasts and rainforests of New Zealand. Unlike many penguins that live in open, icy landscapes, Fiordland penguins nest in dense, shaded forests or hidden rock crevices, often traveling through waterfalls and slippery terrain to reach their remote breeding sites. They are medium-sized with striking features—bright yellow eyebrows that extend into a sleek crest and a dark blue-black back contrasting with their white belly. These penguins are strong swimmers, diving deep to hunt squid, krill, and small fish, yet their elusive nature makes them difficult to study in the wild.<br><br>Fun fact: Fiordland penguins undertake one of the longest post-breeding migrations of any crested penguin, traveling thousands of kilometers across the open ocean before returning to their hidden rainforest homes.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/kero.png`,
        h: `Ghost Shark`,
        sh: `Callorhinchus Milii`,
        desc: `Ghost sharks, also known as chimaeras, are deep-sea relatives of sharks and rays, belonging to an ancient lineage that dates back over 300 million years. Despite the name, they are not true sharks—ghost sharks have smooth, scaleless skin, long tapering bodies, and large, almost haunting eyes adapted for the low-light depths where they live. They glide gracefully along the seafloor using wing-like pectoral fins, feeding on crustaceans, mollusks, and small fish which they crush with powerful, plate-like teeth. Their eerie, translucent appearance, combined with their preference for deep, cold waters, makes them rarely seen by humans. Their slow movements and ghostly coloration give them an otherworldly presence perfectly suited to the deep ocean’s twilight zones.<br><br>Fun fact: Male ghost sharks have a unique retractable appendage on their forehead called a tentaculum, used to help hold onto females during mating—an anatomical feature found in no other vertebrate group.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/fishCatalog/nico.png`,
        h: `Sea Bunny`,
        sh: `Jorunna Parva`,
        desc: `Sea bunnies, scientifically known as Jorunna parva, are tiny species of sea slugs (nudibranchs) famous for their adorable, bunny-like appearance. Their fluffy-looking “fur” is actually composed of tiny clusters of cilia, which help them sense their surroundings. The two ear-like structures on their head are rhinophores—specialized organs that detect chemicals in the water, helping them find food and mates. Sea bunnies are usually found in the waters around Japan, the Philippines, and the Indian Ocean, grazing on toxic sponges that give them their own chemical defenses. Despite their cute look, they’re only about 1–2 centimeters long, making them easy to miss unless you’re a diver with a sharp eye.<br><br>Fun fact: Sea bunnies can come in several colors—including white, yellow, and orange—and individuals from different regions often have distinct “fur patterns,” making them appear like many unique bunny species, even though they’re all the same creature.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/lance.png`,
        h: `Swordfish`,
        sh: `Xiphias Gladius`,
        desc: `Swordfish are powerful, streamlined ocean predators known for their long, flat, sword-like bills that they use to slash through schools of fish, stunning or injuring prey before swallowing it whole. Built for speed, they can reach bursts of over 60 mph thanks to their muscular bodies, crescent-shaped tails, and a unique ability to warm their brains and eyes, allowing sharper vision in the cold, dark depths where they hunt. Swordfish are highly migratory, traveling thousands of miles across the world’s oceans, diving from warm surface waters down to nearly 2,000 feet in search of squid and fish. Unlike many billfish, adult swordfish lose all their teeth and scales, giving them a smooth, sleek form perfectly optimized for cutting through the water.<br><br>Fun fact: Swordfish can heat their eyes up to 10–15°C warmer than the surrounding water, dramatically improving their reaction time and vision during high-speed chases in deep, cold environments.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/fishCatalog/genki.png`,
        h: `Dumbo Octopus`,
        sh: `Grimpoteuthis Bathynectes`,
        desc: `Dumbo octopuses are deep-sea cephalopods known for the adorable, ear-like fins on either side of their heads, which resemble the large floppy ears of Disney’s Dumbo—hence their name. These creatures live thousands of meters below the surface, where pressure is immense and sunlight never reaches, giving them soft, gelatinous bodies perfectly adapted to the deep ocean’s silent, weightless world. Unlike many other octopuses, they don’t shoot ink or aggressively hunt; instead, they gently flap their fins and pulse their arms to glide gracefully just above the seafloor, feeding on worms, crustaceans, and small mollusks. Their calm, floating movements make them appear almost whimsical against the dark backdrop of the abyss.<br><br>Fun fact: Dumbo octopuses can live at depths over 7,000 meters, making them the deepest-living octopuses ever recorded.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/fishCatalog/widow.png`,
        h: `Axolotl`,
        sh: `Ambystoma Mexicanum`,
        desc: `Axolotls are unique amphibians native to the ancient lake systems of Mexico City, famous for their permanently youthful appearance—a trait called neoteny, which means they keep their gills, fins, and aquatic lifestyle throughout their entire lives instead of metamorphosing into land-dwelling adults. With their feathery external gills, wide smiles, and expressive faces, they’ve become icons of the exotic pet world and scientific research. In the wild, axolotls are stealthy predators that hunt worms, small fish, and crustaceans by rapidly sucking prey into their mouths. Sadly, despite their popularity, wild axolotls are critically endangered due to habitat loss, pollution, and invasive species, surviving now in only a few canals and remnants of Lake Xochimilco.<br><br>Fun fact: Axolotls can regenerate almost anything—limbs, spinal cord, heart tissue, and even parts of their brain—without scarring, making them one of the most remarkable regenerators in the animal kingdom.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/fishCatalog/bongli.png`,
        h: `Blobfish`,
        sh: `Psychrolutes Marcidus`,
        desc: `Blobfish are deep-sea fish that live at extreme depths—often over 2,000–4,000 feet—where the pressure is so intense that their bodies have evolved into soft, gelatinous forms perfectly suited for the environment. Down there, their jelly-like flesh acts like a natural pressure suit, keeping them buoyant without expending much energy. Contrary to their internet reputation, blobfish don’t actually look “blobby” in their natural habitat; they appear more like a normal, smooth-bodied fish. It’s only when they’re brought to the surface—where the pressure is drastically lower—that their bodies expand and collapse into the famous droopy, squishy shape. Blobfish live quiet lives, floating just above the seafloor and eating whatever edible matter drifts by.<br><br>Fun fact: The blobfish was once voted the “World’s Ugliest Animal” in a public poll—an ironic title, considering it only looks that way due to pressure changes humans never see in the deep sea.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★☆☆☆☆`,
        img: `./assets/fish/fishCatalog/gigaegg.png`,
        h: `Boxfish`,
        sh: `Ostraciidae`,
        desc: `Boxfish are small, brightly colored reef fish known for their distinctive, rigid, box-shaped bodies formed by a bony carapace that protects them from predators. Their armor limits how their bodies can bend, so they swim using gentle wiggles of their fins, giving them a hovering, almost robotic movement. Found in warm tropical waters, boxfish come in striking patterns—yellows, blues, spots, and hexagonal markings—that help them blend into coral reefs. Despite their stiff appearance, they’re surprisingly agile, able to make precise turns in tight spaces as they forage for algae, sponges, and small invertebrates. Many species are shy, solitary, and rely heavily on their tough outer shell and ability to secrete toxins to stay safe in the reef.<br><br>Fun fact: Some boxfish produce a special toxin called ostracitoxin that can be released into the water when they’re stressed—powerful enough to harm other fish around them, which is why they must be kept carefully in aquariums.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/fishCatalog/yobu.png`,
        h: `Blue-Ringed Octopus`,
        sh: `Hapalochlaena Lunulata`,
        desc: `Blue-ringed octopuses are small but stunningly beautiful cephalopods, easily recognized by the bright electric-blue rings that flash across their bodies when they feel threatened. Found in tide pools and shallow reefs across Australia and Southeast Asia, they are usually calm, slow-moving creatures that prefer to hide in shells, crevices, and sandy patches. Despite their tiny size—typically only 5 to 8 centimeters—they possess one of the most powerful venoms in the animal kingdom. Their bite delivers tetrodotoxin, a neurotoxin that can paralyze muscles, including those needed for breathing. Blue-ringed octopuses feed mainly on small crabs, shrimp, and occasionally fish, using their saliva to immobilize prey before consuming it. Their gentle behavior contrasts starkly with their deadly potential, making them one of the ocean’s most deceptively dangerous animals.<br><br>Fun fact: The blue rings don’t just glow randomly—they pulse in rapid, high-contrast patterns that are among the fastest warning signals known in the animal world, flashing up to three times per second to tell predators, “Do not touch.”`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/fishCatalog/kags.png`,
        h: `Bluespotted Ribbontail Ray`,
        sh: `Taeniura Lymma`,
        desc: `The bluespotted ribbontail ray is a small, strikingly vibrant species of stingray found in the warm coral reefs of the Indo-Pacific. Its smooth, oval-shaped body is marked with vivid electric-blue spots that stand out sharply against its golden-tan skin, making it one of the most photogenic rays in the ocean. This species prefers shallow sandy areas and reef edges, where it spends much of the day hidden under the sand or resting beneath ledges. At night, it becomes more active, gliding gracefully through the water in search of crabs, shrimp, and small fish to eat. Despite their relatively small size—usually around 30–35 cm across—their tail carries one or two venomous spines used only for self-defense when threatened.<br><br>Fun fact: Bluespotted ribbontail rays often return to the exact same resting spots day after day, showing strong site fidelity and even forming small social groups in certain safe hiding places.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★☆`,
        img: `./assets/fish/fishCatalog/jett.png`,
        h: `Giant Isopod`,
        sh: `Bathynomus Giganteus`,
        desc: `Giant isopods are deep-sea crustaceans that look like oversized pill bugs, reaching lengths of up to 30 centimeters or more—making them some of the largest isopods on Earth. They inhabit the cold, dark depths of the Atlantic, Pacific, and Indian Oceans, where they crawl along the seafloor scavenging dead whales, fish, and other organic matter that drifts down from above. Their tough, segmented exoskeletons and spiny legs help them navigate the rough terrain of the deep sea, while their slow metabolism allows them to survive long periods—sometimes years—without a meal. Though they appear intimidating, they are mostly passive creatures adapted to a world of scarcity and immense pressure.<br><br>Fun fact: Giant isopods can curl into a tight ball just like their tiny land relatives (pill bugs and roly-polies), using their armored plates to protect their vulnerable undersides from potential predators.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/fishCatalog/truilt.png`,
        h: `Rosy-Scales Fairy Wrasse`,
        sh: `Cirrhilabrus Rubrisquamis`,
        desc: `The rosy-scales fairy wrasse is a brilliantly colored reef fish known for its shimmering, iridescent scales that shift between pink, orange, and gold as it moves through the water. Found in deeper coral reefs of the western Pacific, this species is especially eye-catching when males display during courtship, flashing even brighter hues as they dart gracefully around potential mates. Fairy wrasses are fast, agile swimmers, spending much of their time hovering above the reef in search of tiny crustaceans and plankton. They are peaceful, social fish that often form loose groups, relying on their vivid colors and quick reflexes to avoid predators. Their delicate beauty and gentle behavior make them popular among advanced aquarists and underwater photographers.<br><br>Fun fact: Rosy-scales fairy wrasses, like many wrasse species, are protogynous hermaphrodites—meaning individuals start life as females and some later transform into males, changing color, behavior, and even anatomy as they assume dominance in their group.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★☆☆☆`,
        img: `./assets/fish/fishCatalog/phrog.png`,
        h: `Red-Lipped Batfish`,
        sh: `Ogcocephalus Darwini`,
        desc: `Red-lipped batfish are one of the ocean’s most bizarre and charismatic creatures, instantly recognizable by their bright, lipstick-red mouths that stand out sharply against their pale, angular bodies. Found primarily around the Galápagos Islands and Peruvian coasts, these odd fish are terrible swimmers—instead, they “walk” along the seafloor using their adapted pectoral and pelvic fins, which function like awkward little legs. Their flattened bodies and long, horn-like snouts give them an almost alien appearance, and they often remain motionless on sandy bottoms or rocky reefs waiting to ambush small fish, worms, and crustaceans. Batfish also possess a small lure on their snout, similar to an anglerfish’s, which they wiggle to attract prey close enough to snap up.<br><br>Fun fact: As red-lipped batfish age, their ability to swim becomes so poor that adults rely almost entirely on walking along the ocean floor—making them one of the few fish species that have practically abandoned swimming altogether.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/gfr.png`,
        h: `Saltwater Crocodile`,
        sh: `Crocodylus Porosus`,
        desc: `Saltwater crocodiles are the largest living reptiles on Earth, capable of reaching lengths over 20 feet and weighing more than a ton, earning them a fearsome reputation as apex predators. Found throughout Southeast Asia, northern Australia, and surrounding waters, they thrive in both saltwater and freshwater habitats, including rivers, mangroves, and coastal marshes. Their powerful jaws exert some of the strongest bite forces in the animal kingdom, allowing them to take down large prey such as water buffalo, sharks, and even unwary humans. Despite their size, they are incredibly stealthy—often drifting just below the surface with only their eyes and nostrils exposed before launching explosive ambush attacks. Their intelligence, territorial nature, and long lifespans make them dominant and ancient survivors of a lineage millions of years old.<br><br>Fun fact: Saltwater crocodiles regularly swim long distances across open ocean—some tracked individuals have traveled over 600 kilometers by riding ocean currents, proving they’re far more mobile than most people expect.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★☆☆`,
        img: `./assets/fish/fishCatalog/bluestrings.png`,
        h: `Whitemargin Unicornfish`,
        sh: `Naso Annulatus`,
        desc: `The whitemargin unicornfish is a sleek, fast-swimming reef fish known for the sharp, horn-like projection that develops on its forehead as it matures—giving it the classic “unicornfish” name. Found throughout the Indo-Pacific, it inhabits coral-rich slopes and outer reef edges, where it travels in loose schools and grazes on algae growing along the rocks. Its body is typically dark gray to bluish, with a clean white edge along the tail fin that makes it easy to identify from a distance. With a streamlined shape and strong swimming ability, the whitemargin unicornfish can dart quickly through open water, helping it evade predators and cover large feeding territories. Though somewhat shy, they play an important role in keeping algae growth balanced on reefs.<br><br>Fun fact: The “horn” on whitemargin unicornfish isn’t just for show—researchers believe it may help with species recognition or social signaling, especially during schooling and mating displays.`,
        link: ``,
        name: ``,
    },
    {
        stars: `★★★★★`,
        img: `./assets/fish/fishCatalog/solis.png`,
        h: `Anglerfish`,
        sh: `Lophiiformes`,
        desc: `Anglerfish are deep-sea predators famous for the bioluminescent lure that dangles from their heads, glowing in the pitch-black darkness to attract unsuspecting prey. Living thousands of feet below the surface, they have adapted to a world with almost no light and immense pressure, developing enormous mouths filled with needle-like teeth and stomachs capable of swallowing prey nearly as large as themselves. Their bodies are often small and gelatinous, helping them conserve energy in the scarce deep-sea environment. The females are the ones equipped with the lighted lure, while males are tiny in comparison and spend their lives searching for a mate. When they find one, they latch onto her body and eventually fuse with her, sharing blood supply and becoming a permanent source of sperm.<br><br>Fun fact: The glowing lure of an anglerfish isn’t part of the fish itself—it’s produced by symbiotic bacteria that live inside a special organ called the esca, creating one of nature’s most eerie partnerships.`,
        link: ``,
        name: ``,
    },
];

const x = document.querySelector(`.x`);
const x2 = document.querySelector(`.x2`);

const catalogBtn = document.querySelector(`.catalog-btn`);
const settingsBtn = document.querySelector(`.settings-btn`);

const settings = document.querySelector(`.settings-container`);
const catalog = document.querySelector(`.catalog`);
const catalogInfo = document.querySelector(`.fish-info`);

const overlay = document.querySelector(`.overlay`);

let currentMenu;

const showMenu = (menu) => {
    if (currentMenu === menu) {
        menu.style.display = `none`;
        overlay.classList.add(`hidden`);
        currentMenu = null;
    } else  {
        if (currentMenu) {
            currentMenu.style.display = `none`;
        }
        menu.style.display = `flex`;
        overlay.classList.remove(`hidden`)
        currentMenu = menu;
    }
}

catalogBtn.addEventListener(`click`, () => {
    showMenu(catalog);
    catalogBtn.src = `./assets/fish/catalog.png`;
});

settingsBtn.addEventListener(`click`, () => {
    showMenu(settings);
});

x.addEventListener(`click`, () => {
    catalogInfo.style.display = `none`;
});

x2.addEventListener(`click`, () => {
    showMenu(settings);
});

const unlockFish = (fish) => {
    const fishEl = document.querySelector(`.fish.${fish}`);
    fishEl.classList.add(`unlocked`);
    let unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
    if (!unlockedFish.includes(fish)) {
        unlockedFish.push(fish);
    }
    localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
};

const resetBtn = document.querySelector(`.reset-button`);

resetBtn.addEventListener(`click`, () => {
    localStorage.removeItem('unlockedFish');
    localStorage.removeItem('fishPool');
    localStorage.removeItem('fishCaught');
    localStorage.removeItem('fishHooked');
    localStorage.removeItem('diffChange');
    localStorage.removeItem('hitCount');
    localStorage.removeItem('mistakes');
    localStorage.removeItem('cheatedStatus');
    localStorage.removeItem('win');
    fishAll.forEach((fish) => {
        fish.classList.remove(`unlocked`);

        const img = fish.querySelector(`img`);
        img.src = `./assets/fish/fishCatalog/locked.png`;
    });
    location.reload();
});

if (false) {
    startTimer(fish + difficulty[2])
    timeRemaining + (((fishNames[`${currentFish}`][2] * difficulty[4]) * difficulty[0]) + difficulty[1])
    MULTIPLIER || GUARANTEED_BONUS_TIME || EXTRA_TIME || EXTRA_KEYS || MULTIPLIER_2 || MISTAKE_DEDUCTION
}

let difficulty = [2.2,  1.0,  2.0,  2,  0.10,  1.00];

let easy =     [2.6,  1.1,  5.0,  1,  0.15,  0.75];
let medium =   [2.2,  1.0,  3.0,  2,  0.10,  1.00];
let hard =     [1.8,  0.9,  1.5,  2,  0.10,  1.50];
let insane =   [1.4,  0.8,  1.0,  3,  0.09,  2.00];

const difficultyBtns = document.querySelectorAll(`.difficulties button`);
const diffTooltip = document.querySelector(`.diff-tooltip`);

const easyTooltip = document.querySelector(`.easyTooltip`);
const mediumTooltip = document.querySelector(`.mediumTooltip`);
const hardTooltip = document.querySelector(`.hardTooltip`);
const insaneTooltip = document.querySelector(`.insaneTooltip`);
const easyDiff = document.querySelector(`.easy`);
const mediumDiff = document.querySelector(`.medium`);
const hardDiff = document.querySelector(`.hard`);
const insaneDiff = document.querySelector(`.insane`);

const difficulties = {
    easy: easy,
    medium: medium,
    hard: hard,
    insane: insane,
};

const difficultiesObj = [
    {
        lvl: `.easy`,
        tooltip: `.easy-tooltip`,
    },
    {
        lvl: `.medium`,
        tooltip: `.medium-tooltip`,
    },
    {
        lvl: `.hard`,
        tooltip: `.hard-tooltip`,
    },
    {
        lvl: `.insane`,
        tooltip: `.insane-tooltip`,
    },
];

difficultiesObj.forEach(({ lvl, tooltip }) => {
    const btn = document.querySelector(lvl);
    const tip = document.querySelector(tooltip)

    btn.addEventListener(`click`, () => {
        difficultyBtns.forEach((btn) => {
            btn.classList.remove(`current-difficulty`);
        })
        btn.classList.add(`current-difficulty`);
        const diff = btn.classList[0]
        difficulty = difficulties[diff];
        updateDiffCount();
        difficultyShow.textContent = `difficulty: ${diff}`
        localStorage.setItem('selectedDifficulty', diff);
    });

    btn.addEventListener(`mouseenter`, () => {
        tip.style.display = `flex`;
    });
    
    btn.addEventListener(`mouseleave`, () => {
        tip.style.display = `none`;
    });

    btn.addEventListener(`mousemove`, (event) => {
        const tooltipWidth = tip.offsetWidth;
        const tooltipHeight = tip.offsetHeight;
        tip.style.left = `${event.pageX - tooltipWidth / 2}px`;
        tip.style.top = `${event.pageY - tooltipHeight - 5}px`;
    });
})

// [ LEVEL (1-6) - ROUNDS - TIME - NAME ]

//EASY
const nico =    [2, 3, 4, `nico`];
const eight =   [2, 3, 4, `eight`];
const bongli =  [2, 4, 4, `bongli`];
const jelly =   [3, 4, 4, `jelly`];
const phrog =   [2, 3, 4, `phrog`];
const gigaegg = [2, 3, 4, `gigaegg`];
const yobu =    [2, 5, 4, `yobu`];
const floo =    [3, 3, 4, `floo`];
const genki =   [3, 4, 4, `genki`];
const twelves = [3, 4, 4, `twelves`];
const truilt =  [3, 5, 4, `truilt`];

//MEDIUM
const bs =      [4, 6, 7, `bluestrings`];
const kags =    [5, 6, 7, `kags`];
const jett =    [5, 7, 7, `jett`];
const partack = [2, 12, 4, `partack`];
const widow = [3, 10, 4, `widow`];
const temer =   [6, 8, 9, `temer`];

//INSANE
const kero =  [6, 5, 6, `kero`];
const solis = [6, 9, 8, `solis`];
const abri =  [6, 12, 9, `abri`];
const vert =  [6, 7, 7, `vert`];
const lance = [1, 8, 1, `lance`];
const gfr =   [6, 8, 7, `gfr`];
const mier =  [7, 15, 10, `mier`];


const fishNames = {
    bongli: bongli,
    gigaegg: gigaegg,
    nico: nico,
    phrog: phrog,
    yobu: yobu,
    jett: jett,
    genki: genki,
    eight: eight,
    mier: mier,
    floo: floo,
    twelves: twelves,
    partack: partack,
    bluestrings: bs,
    truilt: truilt,
    jelly: jelly,
    kags: kags,
    solis: solis,
    lance: lance,
    widow: widow,
    temer: temer,
    vert: vert,
    kero: kero,
    gfr: gfr,
    abri: abri
};

const fishPool = [
    { fish: bongli,  chance: 5 },
    { fish: eight,   chance: 5 },
    { fish: jelly,   chance: 5 },
    { fish: nico,    chance: 5 },
    { fish: phrog,   chance: 5 },
    { fish: gigaegg, chance: 5 },
    { fish: yobu,    chance: 5 },
    { fish: floo,    chance: 5 },
    { fish: genki,   chance: 5 },
    { fish: truilt,  chance: 5 },
    { fish: twelves, chance: 5 },
    
    { fish: bs,      chance: 2 },
    { fish: jett,    chance: 2 },
    { fish: partack, chance: 2 },
    { fish: kags,    chance: 2 },
    { fish: temer,   chance: 2 },
    { fish: widow,   chance: 2 },
    
    { fish: kero,    chance: .75 },
    { fish: solis,   chance: .75 },
    { fish: abri,    chance: .75 },
    { fish: vert,    chance: .75 },
    { fish: lance,   chance: .75 },
    { fish: gfr,     chance: .75 },
    { fish: mier,    chance: .75 },
];
 

const selectFish = () => {
    const totalWeight = fishPool.reduce((sum, { chance }) => sum + chance, 0);
    const random = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < fishPool.length; i++) {
        cumulativeWeight += fishPool[i].chance;
        if (random < cumulativeWeight) {
            return fishPool[i].fish;
        }
    }
};

const updateChances = (fishCaught) => {
    for (let i = 0; i < fishPool.length; i++) {
        if (fishPool[i].fish[3] === fishCaught[3]) {
            fishPool[i].chance = Math.max(0.1, fishPool[i].chance / 2);
            break;
        }
    }
    localStorage.setItem('fishPool', JSON.stringify(fishPool));
};

playBtn.addEventListener(`click`, () => {
    if (timerActive) { return }
    currentFish = [];
    timer.style.backgroundColor = `rgb(51, 53, 67)`;
    mierImg.style.transform = `none`;
    mierImg.src = `./assets/fish/mier-0.png`
    fishImg.style.transform = `none`;
    fishImg.style.display = `none`;
    fishImg.src = ``;
    playBtnDisappear();
    playSound(start());
    setTimeout(() => {
        mierImg.src = `./assets/fish/mier-1.png`
        playSound(takebait());
        updateFishHooked();
        setTimeout(() => {
            const selected = selectFish();
            startFishing(...selected);
            console.log(...selected);
            // startFishing(...mier);
        }, 700);
    }, (Math.trunc(Math.random() * 7) + 5) * 1000);
    // }, 0);
});

const bird = document.querySelector(`.bird`)

setInterval(() => {
    bird.src = `./assets/fish/bird-0.png`
    setTimeout(() => {
        bird.src = `./assets/fish/bird-1.png`
    }, 500);
}, 3000);

const birdFly = () => {
    bird.style.transition = `none`;
    bird.style.right = `-10vw`;

    setTimeout(() => {
        bird.style.transition = `all 15s ease-in-out`;
        bird.style.right = `110vw`;
    }, 50);
};

setInterval(() => {
    birdFly();
}, 25000);

birdFly();

const cloud0 = document.querySelector(`.cloud-0`);
const cloud1 = document.querySelector(`.cloud-1`);
const cloud2 = document.querySelector(`.cloud-2`);

const clouds = [cloud0, cloud1, cloud2];

const cloudMove = () => {
    const currentCloud = randomizer(clouds);
    currentCloud.style.transition = `all 40s`;
    setTimeout(() => {
        currentCloud.style.left = `100vw`;
    }, 1);
    setTimeout(() => {
        currentCloud.style.transition = `none`;
        currentCloud.style.left = `-80vw`;
    }, 50000);
}

setInterval(() => {
    cloudMove();
}, 50000);

cloudMove();

let beachFX;
let pullFX;
let reelFX;
let splashFX;
let startFX;
let takebaitFX;
let successFX0;
let successFX1;
let successFX2;
let successFX3;
let successFX4;
let failFX;
let hitFX;
let wrongFX;
let laughFX0;
let laughFX1;

const beach = () => {
    beachFX = new Audio('./assets/fish/audio/beach.mp3');
    beachFX.loop = true;
    beachFX.preload = "auto";
    beachFX.play();
};

const beachStop = () => {
    if (beachFX) {
        beachFX.pause();
        beachFX.currentTime = 0;
    }
};

const pull = () => {
    pullFX = new Audio('./assets/fish/audio/pull.mp3');
    pullFX.preload = "auto";
    return pullFX;
};

const reel = () => {
    reelFX = new Audio('./assets/fish/audio/reel.mp3');
    reelFX.preload = "auto";
    return reelFX;
};

const splash = () => {
    splashFX = new Audio('./assets/fish/audio/splash.mp3');
    splashFX.preload = "auto";
    return splashFX;
};

const takebait = () => {
    takebaitFX = new Audio('./assets/fish/audio/takebait.mp3');
    takebaitFX.preload = "auto";
    return takebaitFX;
};

const start = () => {
    startFX = new Audio('./assets/fish/audio/start.mp3');
    startFX.preload = "auto";
    return startFX;
};

const success = () => {
    successFX0 = new Audio('./assets/fish/audio/success0.mp3');
    successFX1 = new Audio('./assets/fish/audio/success1.mp3');
    successFX2 = new Audio('./assets/fish/audio/success2.mp3');
    successFX3 = new Audio('./assets/fish/audio/success3.mp3');
    successFX4 = new Audio('./assets/fish/audio/success4.mp3');
    successFX0.preload = "auto";
    successFX1.preload = "auto";
    successFX2.preload = "auto";
    successFX3.preload = "auto";
    successFX4.preload = "auto";
    const successFX = [successFX0, successFX1, successFX2, successFX3, successFX4,]
    return randomizer(successFX);
};

const fail = () => {
    failFX = new Audio('./assets/fish/audio/fail.mp3');
    failFX.preload = "auto";
    return failFX;
};

const hit = () => {
    hitFX = new Audio('./assets/fish/audio/hit.wav');
    hitFX.preload = "auto";
    return hitFX;
};

const wrong = () => {
    wrongFX = new Audio('./assets/fish/audio/wrong.mp3');
    wrongFX.preload = "auto";
    return wrongFX;
};

const laugh0 = () => {
    laughFX0 = new Audio('./assets/fish/audio/laugh0.mp3');
    laughFX0.preload = "auto";
    return laughFX0;
};

const laugh1 = () => {
    laughFX1 = new Audio('./assets/fish/audio/laugh1.mp3');
    laughFX1.preload = "auto";
    return laughFX1;
};

// const musicBtn = document.querySelector(`.music`);
// let music = true;

// musicBtn.addEventListener(`click`, () => {
//     if (music) {
//         musicBtn.src = `./assets/fish/musicnone.png`;
//         music = false;
//     } else {
//         musicBtn.src = `./assets/fish/music.png`;
//         music = true;
//     }
// });

const sfxBtn = document.querySelector(`.sfx`);
let sfx = true;

sfxBtn.addEventListener(`click`, () => {
    if (sfx) {
        sfxBtn.src = `./assets/fish/soundnone.png`;
        sfx = false;
        beachStop();
    } else {
        sfxBtn.src = `./assets/fish/sound.png`;
        sfx = true;
        beach();
    }
});

const playSound = (sound) => {
    if (sfx) {
        sound.play();
    }
};

const cheatTxt = document.querySelector(`.cheat-text`);
const unlockBtn = document.querySelector(`.unlock-button`);

cheatTxt.addEventListener(`input`, () => {
    if (cheatTxt.value === `im a stupid cheater`) {
        unlockBtn.style.backgroundColor = `white`;
        unlockBtn.style.pointerEvents = `all`;
    } else {
        unlockBtn.style.backgroundColor = `rgb(123, 130, 144)`;
        unlockBtn.style.pointerEvents = `none`;
    }
});

unlockBtn.addEventListener(`click`, () => {
    if (cheatTxt.value === `im a stupid cheater`) {
        cheatedToggle();
        unlockBtn.textContent = `lol`;
        let unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
        fishAll.forEach((fish) => {
            fish.classList.add(`unlocked`);
    
            const img = fish.querySelector(`img`);
            img.src = `./assets/fish/fishCatalog/${fish.classList[1]}.png`;
    
            const fishIdentifier = fish.classList[1];
            if (!unlockedFish.includes(fishIdentifier)) {
                unlockedFish.push(fishIdentifier);
            }
        });
        localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
    }
});

const fishCaughtEl = document.querySelector(`.fish-caught`);
const fishHookedEl = document.querySelector(`.fish-hooked`);

let fishCaught = 0;
let fishHooked = 0;

const updateFishCount = () => {
    fishCaught++;
    fishCaughtEl.textContent = `fish caught: ${fishCaught}`;
    localStorage.setItem(`fishCaught`, JSON.stringify(fishCaught));
};

const updateFishHooked = () => {
    fishHooked++;
    fishHookedEl.textContent = `fish hooked: ${fishHooked}`;
    localStorage.setItem(`fishHooked`, JSON.stringify(fishHooked));
};

const hitCountEl = document.querySelector(`.hit-count`);
const mistakesEl = document.querySelector(`.mistakes`);
const diffChangeEl = document.querySelector(`.difficulty-change-count`);

let hitCount = 0;
let mistakes = 0;
let diffChange = 0;

const updateHitCount = () => {
    hitCount++;
    hitCountEl.textContent = `hit count: ${hitCount}`;
    localStorage.setItem(`hitCount`, JSON.stringify(hitCount));
}

const updateMistakes = () => {
    mistakes++;
    mistakesEl.textContent = `mistakes: ${mistakes}`;
    localStorage.setItem(`mistakes`, JSON.stringify(mistakes));
}

const difficultyShow = document.querySelector(`.difficulty-show`);

const updateDiffCount = () => {
    if (fishHooked > 0) { diffChange++ };
    diffChangeEl.textContent = `difficulty change count: ${diffChange}`;
    localStorage.setItem(`diffChange`, JSON.stringify(diffChange));
}

const cheated = document.querySelector(`.cheated`);
cheated.style.color = `red`;
cheated.style.fontWeight = `bolder`;
cheated.style.fontSize = `3vh`;
cheated.style.textShadow = `-3px 3px 0px rgba(16, 46, 135, 0.333)`;
let cheatedStatus = false;

const cheatedToggle = () => {
    cheated.style.display = `flex`;
    cheatedStatus = true;
    localStorage.setItem(`cheatedStatus`, JSON.stringify(cheatedStatus));
}

const unlockedFish = JSON.parse(localStorage.getItem(`unlockedFish`)) || [];
const savedFishPool = JSON.parse(localStorage.getItem(`fishPool`));
const savedFishCaught = JSON.parse(localStorage.getItem(`fishCaught`));
const savedFishHooked = JSON.parse(localStorage.getItem(`fishHooked`));
const savedHitCount = JSON.parse(localStorage.getItem(`hitCount`));
const savedMistakes = JSON.parse(localStorage.getItem(`mistakes`));
const savedDiffChange = JSON.parse(localStorage.getItem(`diffChange`));
const savedCheatedStatus = JSON.parse(localStorage.getItem(`cheatedStatus`));
const savedWin = JSON.parse(localStorage.getItem(`win`));
const savedWinStats = JSON.parse(localStorage.getItem(`winStats`));
const savedDifficulty = localStorage.getItem(`selectedDifficulty`);

const loadProgress = () => {
    if (savedCheatedStatus) {
        cheatedToggle();
    }

    if (savedDifficulty) {
        difficultyShow.textContent = `difficulty: ${savedDifficulty}`;
        const savedButton = document.querySelector(`.${savedDifficulty}`);
        if (savedButton) {
            difficultyBtns.forEach((btn) => {
                btn.classList.remove(`current-difficulty`);
            })
            savedButton.classList.add(`current-difficulty`);
            difficulty = difficulties[savedDifficulty]; 
        }
    } else {
        localStorage.setItem('selectedDifficulty', `medium`);
    }

    if (savedDiffChange) {
        diffChange = savedDiffChange;
        diffChangeEl.textContent = `difficulty change count: ${savedDiffChange}`;
    } else {
        localStorage.setItem(`diffChange`, `0`);
    }

    if (savedFishPool) {
        fishPool.splice(0, fishPool.length, ...savedFishPool);
    }

    if (savedFishCaught) {
        fishCaught = savedFishCaught;
        fishCaughtEl.textContent = `fish caught: ${savedFishCaught}`;
    }

    if (savedFishHooked) {
        fishHooked = savedFishHooked;
        fishHookedEl.textContent = `fish hooked: ${savedFishHooked}`;
    }

    if (savedHitCount) {
        hitCount = savedHitCount;
        hitCountEl.textContent = `hit count: ${savedHitCount}`;
    }

    if (savedMistakes) {
        mistakes = savedMistakes;
        mistakesEl.textContent = `mistakes: ${savedMistakes}`;
    }

    if (savedWin) {
        win = savedWin;
    }

    if (savedWinStats) {
        winStats = savedWinStats;
    }

    unlockedFish.forEach((fish) => {
        const fishEl = document.querySelector(`.fish.${fish}`);
        if (fishEl) {
            fishEl.classList.add(`unlocked`);
        }
        const fishCatalogueImg = document.querySelector(`.${fish} img`);
        fishCatalogueImg.src = `./assets/fish/fishCatalog/${fish}.png`;
    });
};

// const saveProgress = () => {
//     localStorage.setItem(`fishPool`, JSON.stringify(fishPool));
//     localStorage.setItem(`unlockedFish`, JSON.stringify(unlockedFish));
// }

loadProgress();

const certificate = document.querySelector(`.congrats-container`);
const congrats = document.querySelector(`.congrats-txt`);
let checkCert = false;

const checkWin = (parent, classList) => {
    const children = parent.children 
    const allUnlocked = Array.from(children).every(child => child.classList.contains(classList));
    if (allUnlocked) {
        checkCert = true;
        win = true;
        localStorage.setItem(`win`, JSON.stringify(win));
        const hitPerc = (winStats[0] / winStats[1]) * 100;
        const hitPerc2 = (winStats[2] / (winStats[3] + winStats[2])) * 100;
        congrats.innerHTML = `congrats! you have caught all fish!<br>
        at the time you caught all of them you...<br>
        <br>
        ● caught ${winStats[0]} out of ${winStats[1]} fishes hooked! (${hitPerc.toFixed(2)}%)<br>
        ● hit ${winStats[2]} out of ${winStats[2] + winStats[3]} keys! (${hitPerc2.toFixed(2)}%)<br>
        ● beat the game on ${winStats[4]}!<br>
        ● changed the difficulty ${winStats[5]} times!<br>
        <br>
        ${parseFloat(hitPerc.toFixed(2)) > 86.76 &&
        parseFloat(hitPerc2.toFixed(2)) > 98.94 &&
        winStats[4] === 'insane' &&
        winStats[5] === 0
        ? 'you have bested me...<br>good job hehe :3'
        : 'good work!'}`;

        certificate.style.display = `flex`;
        setTimeout(() => {
            certificate.style.opacity = `1`;
        }, 1);

        document.addEventListener('mousedown', () => {
            certificate.style.opacity = `0`;
            setTimeout(() => {
                certificate.style.display = `none`;
            }, 2000);
        });
    } else {
        console.log(`you havent gotten all of them yet!`);
    }
}

if (win && !cheatedStatus) {
    checkWin(fishContainer, 'unlocked');
}

localStorage.setItem(`!!! i see you`, JSON.stringify(`you lil cheater lol`));

const preloadAssets = (assets) => {
    let loadedCount = 0;
    const totalAssets = assets.length;

    assets.forEach(asset => {
        const img = new Image();
        img.src = asset;
        img.onload = () => {
            loadedCount++;
            startTxt.textContent = `loading assets... (${loadedCount}/${totalAssets})`;
            console.log(`Loaded: ${asset}`);
            if (loadedCount === totalAssets) {
                finishLoading();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load: ${asset}`);
        };
    });
};


let startBeach = false;
const menu = document.querySelector(`.menu`);
const startTxt = document.querySelector(`.start`);
const counterContainer = document.querySelector(`.counter-container`);

const preloadAudio = (audioFiles) => {
    let loadedCount = 0;
    const totalAudio = audioFiles.length;

    audioFiles.forEach(audioSrc => {
        const audio = new Audio(audioSrc);
        audio.preload = "auto";
        audio.oncanplaythrough = () => {
            loadedCount++;
            startTxt.textContent = `loading audio... (${loadedCount}/${totalAudio})`;
            console.log(`Loaded audio: ${audioSrc}`);
            if (loadedCount === totalAudio) {
                finishLoading();
            }
        };
        audio.onerror = () => {
            console.error(`Failed to load audio: ${audioSrc}`);
        };
    });
};

const audioToLoad = [
    `./assets/fish/audio/hit.wav`,
    `./assets/fish/audio/fail.mp3`,
    `./assets/fish/audio/pull.mp3`,
    `./assets/fish/audio/reel.mp3`,
    `./assets/fish/audio/splash.mp3`,
    `./assets/fish/audio/start.mp3`,
    `./assets/fish/audio/takebait.mp3`,
    `./assets/fish/audio/wrong.mp3`,
    `./assets/fish/audio/beach.mp3`,
    `./assets/fish/audio/success0.mp3`,
    `./assets/fish/audio/success1.mp3`,
    `./assets/fish/audio/success2.mp3`,
    `./assets/fish/audio/success3.mp3`,
    `./assets/fish/audio/success4.mp3`,
];


const assetsToLoad = [
    `./assets/fish/W.png`,
    `./assets/fish/A.png`,
    `./assets/fish/S.png`,
    `./assets/fish/D.png`,
    `./assets/fish/ArrowUp.png`,
    `./assets/fish/ArrowLeft.png`,
    `./assets/fish/ArrowDown.png`,
    `./assets/fish/ArrowRight.png`,
    `./assets/fish/fish/mierFish.png`,
    `./assets/fish/fish/abriFish.png`,
    `./assets/fish/fish/flooFish.png`,
    `./assets/fish/fish/eightFish.png`,
    `./assets/fish/fish/vertFish.png`,
    `./assets/fish/fish/yobuFish.png`,
    `./assets/fish/fish/phrogFish.png`,
    `./assets/fish/fish/lanceFish.png`,
    `./assets/fish/fish/nicoFish.png`,
    `./assets/fish/fish/jellyFish.png`,
    `./assets/fish/fish/temerFish.png`,
    `./assets/fish/fish/twelvesFish.png`,
    `./assets/fish/fish/bongliFish.png`,
    `./assets/fish/fish/gigaeggFish.png`,
    `./assets/fish/fish/jettFish.png`,
    `./assets/fish/fish/genkiFish.png`,
    `./assets/fish/fish/widowFish.png`,
    `./assets/fish/fish/keroFish.png`,
    `./assets/fish/fish/partackFish.png`,
    `./assets/fish/fish/kagsFish.png`,
    `./assets/fish/fish/bluestringsFish.png`,
    `./assets/fish/fish/truiltFish.png`,
    `./assets/fish/fish/solisFish.png`,
    `./assets/fish/fish/gfrFish.png`,
    `./assets/fish/mier-0.png`,
    `./assets/fish/mier-1.png`,
    `./assets/fish/mier-2.png`,
    `./assets/fish/mier-3.png`,
    `./assets/fish/mier-4.png`,
    `./assets/fish/mier-5.png`,
    `./assets/fish/mier-6.png`,
    `./assets/fish/mier-7.png`,
    `./assets/fish/mier-9.png`,
    `./assets/fish/mier-10.png`,
    `./assets/fish/mier-11.png`,
    `./assets/fish/mier-12.png`,
];

preloadAudio(audioToLoad);
preloadAssets(assetsToLoad);
let loadCount = 0

const finishLoading = () => {
    loadCount++
    if (loadCount === 2) {
        console.log('All assets preloaded!');
        startTxt.textContent = `click to start!`
        document.addEventListener('mousedown', () => {
            startGame();
        }, { once: true });
    }
}

const startGame = () => {
    if (!startBeach) {
        beach();
        playBtn.style.top = `20vh`;
        menu.style.right = `2.5vh`;
        counterContainer.style.left = `2.5vh`;
        startTxt.style.opacity = `0`;
        setTimeout(() => {
            startTxt.style.display = `none`;
        }, 2000);
        startBeach = true;
    }
};