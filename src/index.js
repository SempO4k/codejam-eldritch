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
            console.log(v)
            blueCount++;
          }
        } if (blueCount == 2) {
          break
        }
        // let pushCount = 0;
        // console.log(`count before ${pushCount}`)
        // if (blueCards[v].difficulty == difficulties[1].id) {
        //   if (pushCount != 2) {
        //   } else {
        //     console.log(`count after ${count2}`)
        //     console.log(`card ${blueCards[v]}`)
        //     count2++;
        //     pushCount++;
        //   }            
        // }
      }
  }
}

makePack();
console.log(draftPack)
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