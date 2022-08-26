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

let difficulty = 'easy';

const createAncients = () => {
  let ancContainer = document.querySelector('.ancients-container');

  for(let i = 0; i < ancients.length; i++) {
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

  for (let i = 0; i < difficulties.length; i++) {
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
  switch ('very-easy') {
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
    }
}
makePack();

const makeFirstStage = () => {
  switch ('azathoth') {
    case 'azathoth':
      let brownCount = 0;
      let blueCount = 0;
      let greenCount = 0;
      for (let i = 0; i < draftPack.length; i++) {
        if (draftPack[i].color === 'green') {
          if (greenCount < 1) {
            pack.firstStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 1) {
            break
          }        
        }
      }
      for (let j = 0; j < draftPack.length; j++) {
        if (draftPack[j].color === 'blue') {
          if (blueCount < 1) {
            pack.firstStage.push(draftPack[j])
            blueCount++;
          } if (blueCount == 2) {
            break
          }
        }
      }
      for (let k = 0; k < draftPack.length; k++) {
        if (draftPack[k].color === 'brown') {
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
        if (draftPack[i].color === 'green') {
          if (greenCount < 2) {
            pack.secondStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 3) {
            break
          }        
        }
        if (draftPack[i].color === 'blue') {
          if (blueCount < 1) {
            pack.secondStage.push(draftPack[i])
            blueCount++;
          } if (blueCount == 2) {
            break
          }
        }
        if (draftPack[i].color === 'brown') {
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
        if (draftPack[i].color === 'green') {
          if (greenCount < 2) {
            pack.thirdStage.push(draftPack[i])
            greenCount++;
          } if (greenCount == 3) {
            break
          }        
        }
        if (draftPack[i].color === 'brown') {
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

const deckContainer = document.querySelector('.deck-container'); 

const makeShuffleBtn = () => {
  let shuffleBtn = document.createElement('span');
  deckContainer.append(shuffleBtn);
  shuffleBtn.classList.add('shuffle-button');
  shuffleBtn.textContent = 'Замешать колоду'
}
makeShuffleBtn();

const makeCurrState = () => {
  let currState = document.createElement('div');
  deckContainer.append(currState);
  currState.classList.add('current-state');
  for (let i = 0; i < Object.keys(pack).length; i++) {
    let stage = document.createElement('div');
    currState.appendChild(stage);
    stage.classList.add('stage-container');
  }
}
makeCurrState();

const makeDots = () => {
  let stage = document.querySelectorAll('.stage-container');
  stage.forEach(x => {
    let dot1 = document.createElement('div');
    let dot2 = document.createElement('div');
    let dot3 = document.createElement('div');
    x.appendChild(dot1);
    x.appendChild(dot2);
    x.appendChild(dot3);
    dot1.classList.add('dot');
    dot1.classList.add('green')
    dot2.classList.add('dot');
    dot2.classList.add('brown')
    dot3.classList.add('dot');
    dot3.classList.add('blue')
  })
  // for (let k = 0; k < 3; k++) {
  // let dot = document.createElement('div');
  // stage.classList.add('stage-container');
  // stage.appendChild(dot);
  // }
}
makeDots();
console.log(pack)
console.log(Object.keys(pack))

// take 5 green cards with diff easy
// take 9 brown cards with diff easy
// take 2 blue cards with diff easy
// if cards not enough you need take normal cards
// case difficulties[1].id:

// console.log(blueCards.length)
//console.log(difficulties[0].id)
//Очень легкий уровень сложности: 
//из набора берутся все карты со снежинками, если карт не хватает то добираются обычные карты
//blue - со снежинками
// if not enough take brown

//сложность вери-изи
//9 коричневых карт
//5 коричневых карт (brown) со снежинкой (difficulty:easy)  и добираются обычные

// !
// ! карты мифов по цвету
// ! green brown blue