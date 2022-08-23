import ancients from "../data/ancients.js"
import difficulties from "../data/difficulties.js"
import greenCards from "../data/mythicCards/green/index.js"
import brownCards from "../data/mythicCards/brown/index.js"
import blueCards from "../data/mythicCards/blue/index.js"

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

const ancObj = document.querySelector('.ancients-container');
ancObj.onclick=function(element){
  for(let i = 0; i < ancObj.children.length; i++){
    ancObj.children[i].classList.remove('card-active');
  }
  element.target.classList.add('card-active'); 
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

const diffObj = document.querySelector('.difficulty-container');
diffObj.onclick=function(element){
  for(let i = 0; i < diffObj.children.length; i++){
    diffObj.children[i].classList.remove('difficulty-active');
  }
  element.target.classList.add('difficulty-active'); 
}
