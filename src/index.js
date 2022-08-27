import ancients from "../data/ancients.js"
import difficulties from "../data/difficulties.js"
import greenCards from "../data/mythicCards/green/index.js"
import brownCards from "../data/mythicCards/brown/index.js"
import blueCards from "../data/mythicCards/blue/index.js"

let draftPack = []

let pack = {
  firstStage: [],
  secondStage: [],
  thirdStage: [],
}

let dropPack = [];

let difficulty = 'very-easy';

const createAncients = () => {
  let ancContainer = document.querySelector('.ancients-container');

  for (let i = 0; i < ancients.length - 3; i++) {
    let div = document.createElement('div');
    ancContainer.append(div);
    div.classList.add('ancient-card');
    div.style.backgroundImage = `url(${ancients[i].cardFace})`
  }
}

createAncients();

let ancientsId;

let ancObj = document.querySelector('.ancients-container');

ancObj.onclick = function(event) {
  let target = event.target;
  while (target != this) {
    highlightAnc(target);
    return;
  }
  target = target.parentNode;
}

function highlightAnc(node) {
  if (ancientsId) {
    ancientsId.classList.remove('card-active')
  }

  ancientsId = node;
  ancientsId.classList.add('card-active');
}

const createDifficulty = () => {
  let diffContainer = document.querySelector('.difficulty-container');

  for (let i = 0; i < difficulties.length - 3; i++) {
    let div = document.createElement('div');
    diffContainer.append(div);
    div.classList.add('difficulty');
    div.innerHTML = difficulties[i].name;
  }
}

createDifficulty();

let difficultId;

const diffObj = document.querySelector('.difficulty-container');

diffObj.onclick = function(event) {
  let target = event.target;
  while (target != this) {
    highlightDiff(target);
    return;
  }
  target = target.parentNode;
}

function highlightDiff(node) {
  if (difficultId) {
    difficultId.classList.remove('difficulty-active')
  }
  difficultId = node;
  difficultId.classList.add('difficulty-active');
}

const makePack = () => {
  let brownCount = 0;
  let blueCount = 0;
  let greenCount = 0;
  switch (difficulty) {
    case difficulties[0].id:
      // take green cards in draft
      for (let i = 0 ; i < greenCards.length; i++) {
        if (greenCards[i].difficulty === difficulties[1].id) {
          draftPack.push(greenCards[i])
        }
      }
      // take brown cards in draft
      for (let j = 0; j < brownCards.length; j++) {
        if (brownCount < 5) {
          if (brownCards[j].difficulty === difficulties[1].id) {
            draftPack.push(brownCards[j]);
            brownCount++;
          }  
        } 
        if (brownCount == 5) {
          let count = 0;
          // take additional cards from normal difficulty to draft cause easy cards end
          for (let k = 0; k < brownCards.length; k++) {
            if (brownCards[k].difficulty == difficulties[2].id) {
              if (count < 4) {
                draftPack.push(brownCards[k]);
                count++;
              }
            }
          }
        }
      }
      //take blue cards in draft
      for (let v = 0; v < blueCards.length; v++) {
        if (blueCount != 2) {
          if (blueCards[v].difficulty == difficulties[1].id) {
            draftPack.push(blueCards[v]);       
            blueCount++;
          }
        } if (blueCount == 2) {
          break
        }
      }
      draftPack.sort(() => Math.random() - 0.5)
    }
}
makePack();

//console.log(draftPack)

const makeFirstStage = () => {
  switch ('azathoth') {
    case 'azathoth':
      let brownCount = 0;
      let blueCount = 0;
      let greenCount = 0;
      for (let i = 0; i < draftPack.length; i++) {
        if (draftPack[i].color === 'green' && !(pack.firstStage.includes(draftPack[i]))) {
          if (greenCount < 1) {
            pack.firstStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 1) {
            break
          }        
        }
      }
      for (let j = 0; j < draftPack.length; j++) {
        if (draftPack[j].color === 'blue' && !(pack.firstStage.includes(draftPack[j]))) {
          if (blueCount < 1) {
            pack.firstStage.push(draftPack[j])
            blueCount++;
          } if (blueCount == 2) {
            break
          }
        }
      }
      for (let k = 0; k < draftPack.length; k++) {
        if (draftPack[k].color === 'brown' && !(pack.firstStage.includes(draftPack[k]))) {
          if (brownCount < 2) {
            pack.firstStage.push(draftPack[k])
            brownCount++;
          } if (brownCount == 3) {
            break
          }
        }
      }
  }
}
const makeSecondStage = () => {
  switch ('azathoth') {
    case 'azathoth':
      let brownCount = 0;
      let blueCount = 0;
      let greenCount = 0;
      for (let i = 0; i < draftPack.length; i++) {
        if (draftPack[i].color === 'green' && !(pack.firstStage.includes(draftPack[i]))) {
          if (greenCount < 2) {
            pack.secondStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 3) {
            break
          }        
        }
        if (draftPack[i].color === 'blue' && !(pack.firstStage.includes(draftPack[i]))) {
          if (blueCount < 1) {
            pack.secondStage.push(draftPack[i])
            blueCount++;
          } if (blueCount == 2) {
            break
          }
        }
        if (draftPack[i].color === 'brown' && !(pack.firstStage.includes(draftPack[i]))) {
          if (brownCount < 3) {
            pack.secondStage.push(draftPack[i])
            brownCount++;
          } if (brownCount == 4) {
            break
          }
        }
      }
  }
}

const makeThirdStage = () => {
  switch ('azathoth') {
    case 'azathoth':
      let brownCount = 0;
      let blueCount = 0;
      let greenCount = 0;
      for (let i = 0; i < draftPack.length; i++) {
        if (draftPack[i].color === 'green' && !(pack.firstStage.includes(draftPack[i])) && !(pack.secondStage.includes(draftPack[i]))) {
          if (greenCount < 2) {
            pack.thirdStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 3) {
            break
          }        
        }
        if (draftPack[i].color === 'brown' && !(pack.firstStage.includes(draftPack[i])) && !(pack.secondStage.includes(draftPack[i]))) {
          if (brownCount < 4) {
            pack.thirdStage.push(draftPack[i])
            brownCount++;
          } if (brownCount == 5) {
            break
          }
        }
      }
  }
}

makeFirstStage();
makeSecondStage();
makeThirdStage();

//console.log(pack)

const deckContainer = document.querySelector('.deck-container'); 

const makeShuffleBtn = () => {
  let shuffleBtn = document.createElement('span');
  deckContainer.append(shuffleBtn);
  shuffleBtn.classList.add('shuffle-button');
  shuffleBtn.textContent = 'Замешать колоду'
}
makeShuffleBtn();

let captionsText = ['Первая стадия', 'Вторая стадия', 'Третья стадия'];

const makeCurrState = () => {
  let currState = document.createElement('div');
  let deck = document.createElement('div');
  let lastCard = document.createElement('div');
  deckContainer.append(deck);
  deckContainer.append(currState);
  deckContainer.append(lastCard);
  deck.classList.add('deck');
  deck.style.display = 'none';
  currState.style.display = 'none';
  lastCard.style.display = 'none';
  lastCard.classList.add('last-card');
  deck.style.backgroundImage =`url(../assets/mythicCardBackground.png)`;
  currState.classList.add('current-state');
  for (let i = 0; i < Object.keys(pack).length; i++) {
    let stage = document.createElement('div');
    let dotContainer = document.createElement('div');
    let caption = document.createElement('span');
    currState.appendChild(stage);
    stage.classList.add('stage-container');
    stage.appendChild(dotContainer);
    dotContainer.classList.add('dots-container');
    dotContainer.appendChild(caption);
    caption.classList.add('stage-text');
    caption.innerHTML = captionsText[i];
  }
}
makeCurrState();

const makeDots = () => {
  let container = document.querySelectorAll('.dots-container');
  container.forEach(x => {
    let dot1 = document.createElement('div');
    let dot2 = document.createElement('div');
    let dot3 = document.createElement('div');
    x.appendChild(dot1);
    x.appendChild(dot2);
    x.appendChild(dot3);
    dot1.classList.add('dot');
    dot1.classList.add('green');
    dot2.classList.add('dot');
    dot2.classList.add('brown');
    dot3.classList.add('dot');
    dot3.classList.add('blue');
  })
  container.forEach(x => {
    x.style.display = 'none';
  })
}

makeDots();

let numObj = Object.keys(pack)
let dots = document.querySelectorAll('.dot');

const fillDots = () => {
  let brownCount1 = 0;
  let blueCount1 = 0;
  let greenCount1 = 0;
  let brownCount2 = 0;
  let blueCount2= 0;
  let greenCount2 = 0;
  let brownCount3 = 0;
  let blueCount3 = 0;
  let greenCount3 = 0;
  for (let i = 0; i < Object.values(pack).length; i++ ) {
    for (let j = 0; j < Object.values(pack)[i].length; j++) {
      if (pack.firstStage.length != 0) {
        if (Object.keys(pack)[i] === numObj[0]) {
          if (Object.values(pack)[i][j].color === 'green' && numObj[0]) {
            greenCount1++;
          }
          if (Object.values(pack)[i][j].color === 'blue' && numObj[0]) {
            blueCount1++;
          }
          if (Object.values(pack)[i][j].color === 'brown' && numObj[0]) {
            brownCount1++;
          }
          for (let k = 0; k < dots.length - 6; k++) {
            if (dots[k].classList.contains('green')) {
              dots[k].textContent = greenCount1;
            }
            if (dots[k].classList.contains('blue')) {
              dots[k].textContent = blueCount1;
            }
            if (dots[k].classList.contains('brown')) {
              dots[k].textContent = brownCount1;
            }
          }
        }  
      } else {
        for (let k = 0; k < dots.length - 6; k++) {
          if (dots[k].classList.contains('green')) {
            dots[k].textContent = 0;
          }
          if (dots[k].classList.contains('blue')) {
            dots[k].textContent = 0;
          }
          if (dots[k].classList.contains('brown')) {
            dots[k].textContent = 0;
          }
        }
      }
      if (pack.secondStage.length != 0) {
        if (Object.keys(pack)[i] === numObj[1]) {
          if (Object.values(pack)[i][j].color === 'green' && numObj[1]) {
            greenCount2++;
          }
          if (Object.values(pack)[i][j].color === 'blue' && numObj[1]) {
            blueCount2++;
          }
          if (Object.values(pack)[i][j].color === 'brown' && numObj[1]) {
            brownCount2++;
          }
          for (let k = 3; k < dots.length - 3; k++) {
            if (dots[k].classList.contains('green')) {
              dots[k].textContent = greenCount2;
            }
            if (dots[k].classList.contains('blue')) {
              dots[k].textContent = blueCount2;
            }
            if (dots[k].classList.contains('brown')) {
              dots[k].textContent = brownCount2;
            }
          }
        }
      } else {
        for (let k = 3; k < dots.length - 3; k++) {
          if (dots[k].classList.contains('green')) {
            dots[k].textContent = '0';
          }
          if (dots[k].classList.contains('blue')) {
            dots[k].textContent = '0';
          }
          if (dots[k].classList.contains('brown')) {
            dots[k].textContent = '0';
          }
        }
      }
      if (pack.thirdStage.length != 0) {
        if (Object.keys(pack)[i] === numObj[2]) {
          if (Object.values(pack)[i][j].color === 'green' && numObj[2]) {
            greenCount3++;
          }
          if (Object.values(pack)[i][j].color === 'blue' && numObj[2]) {
            blueCount3++;
          }
          if (Object.values(pack)[i][j].color === 'brown' && numObj[2]) {
            brownCount3++;
          }
          for (let k = 6; k < dots.length; k++) {
            if (dots[k].classList.contains('green')) {
              dots[k].textContent = greenCount3;
            }
            if (dots[k].classList.contains('blue')) {
              dots[k].textContent = blueCount3;
            }
            if (dots[k].classList.contains('brown')) {
              dots[k].textContent = brownCount3;
            }
          }
        }
      } else {
        for (let k = 6; k < dots.length; k++) {
          if (dots[k].classList.contains('green')) {
            dots[k].textContent = '0';
          }
          if (dots[k].classList.contains('blue')) {
            dots[k].textContent = '0';
          }
          if (dots[k].classList.contains('brown')) {
            dots[k].textContent = '0';
          }
        }

      }
    }
  }
}


let stack = [];

const addInStack = () => {
  for (let i = 0; i < Object.values(pack).length; i++ ) {
    for (let j = 0; j < Object.values(pack)[i].length; j++) {
      stack.unshift(Object.values(pack)[i][j])
    }
  }
}

addInStack()

let lastCrd = document.querySelector('.last-card');
document.querySelector('.deck').addEventListener('click', () => {
  let operation = stack.pop();
  if (pack.firstStage.includes(operation)) {
    pack.firstStage.shift();
    lastCrd.style.backgroundImage = `url(${operation.cardFace})`;
    fillDots();
  }
  if (pack.secondStage.includes(operation)) {
    pack.secondStage.shift();
    lastCrd.style.backgroundImage = `url(${operation.cardFace})`;
    fillDots();
  }
  if (pack.thirdStage.includes(operation)) {
    pack.thirdStage.shift();
    lastCrd.style.backgroundImage = `url(${operation.cardFace})`;
    fillDots();
    if (stack.length === 0) {
      for (let k = 6; k < dots.length; k++) {
        if (dots[k].classList.contains('green')) {
          dots[k].textContent = '0';
        }
        if (dots[k].classList.contains('blue')) {
          dots[k].textContent = '0';
        }
        if (dots[k].classList.contains('brown')) {
          dots[k].textContent = '0';
        }
      }
      document.querySelector('.deck').style.display = `none`;
    }
  }
  console.log('execute', operation);
})

const openDeck = () => {
  document.querySelectorAll('.dots-container').forEach(x => {
    x.style.display = 'flex';
  })
  document.querySelector('.deck').style.display = 'flex';
  document.querySelector('.current-state').style.display = 'flex';
  document.querySelector('.last-card').style.display = 'block';
  fillDots();
  document.querySelector('.shuffle-button').style.display = 'none';
}

document.querySelector('.shuffle-button').addEventListener('click', openDeck);