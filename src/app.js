import './app.less';
import 'normalize.css';
import { Dinos } from './dino.json';


/**
 * @description Capture data from submitted form
 * @param {object} e - The event object
 */
const handleForm = (e) => {
  e.preventDefault();
  const form = e.target;

  //create human object
  const human = new Human(form);

  //create dino objects
  const dinoList = createDinoObjects(Dinos, human);

  //remove form from html
  form.classList.add('u-display-none');

  //add dino tiles to DOM
  addDinoTiles(dinoList);

  //add human tile to DOM
  addHumanTile(human);
};

document.addEventListener('submit', handleForm);

/**
 * @description Creates object that describes human based on form data
 * @constructor
 * @param {element} form - Form with user input as HTML element
 */
function Human(form) {
  this.name = form.user_name.value;
  this.location = form.user_location.value;
  this.weight = form.user_weight.value;
  this.diet = form.user_diet.value;
  this.height = {
    feet: parseInt(form.user_height_feet.value),
    inches: parseInt(form.user_height_inches.value)
  }
  this.imageSrc = './images/human.png'

  this.heightInFeet = function() {
    return this.height.inches/12 + this.height.feet;
  }
}

/**
 * @description Loops through dinos to create dinosaur objects with additional methods
 * @param {array} Dinos - Array of objects describing dinosaurs
 * @param {object} human - Object describing a human
 * @returns {array} - Array of objects describing dinosaurs
 */
const createDinoObjects = (Dinos, human) => {
  const dinosaursArr = Dinos.map((dino) => {
    return Dinosaur(dino, human);
  });

  return dinosaursArr;
}

/**
 * @description Functional mixin to create dinosaur objects with addtional methods
 * @param {object} dino - Object describing a dinosaur
 * @param {object} human - Object describing a human
 * @returns {object} - Object describing a dinosaur
 */
const Dinosaur = (dino, human) => {
  return Object.assign(dino, {
    compareHeight: function() {
      if (this.height > human.heightInFeet()) {
        const heightDiff = Math.round(this.height/human.heightInFeet());
        return `The ${this.species} is about ${heightDiff} times taller than you.`;
      } else if (this.height === human.heightInFeet()) {
        return `You are about the same height as the ${this.species}.`;
      } else {
        const heightDiff = Math.round(human.heightInFeet()/this.height);
        return `You are about ${heightDiff} times taller than the ${this.species}.`;
      }
    },
    compareWeight: function() {
      if (this.weight > human.weight) {
        return `The ${this.species} weighs about ${this.weight-human.weight} pounds more than you.`;
      } else if (this.weight === human.weight) {
        return `You weight about the same as ${this.species}.`;
      } else {
        return `You weigh about ${human.weight-this.weight} pounds more than the  ${this.species}.`;
      }
    },
    compareDiet: function() {
      if (this.diet === human.diet) {
        return `You are both ${this.diet}s!`
      } else {
        if (this.diet === 'omnivore') {
          return `Unlike you, the ${this.species} is an ${this.diet}.`
        } else {
          return `Unlike you, the ${this.species} is a ${this.diet}.`
        }
      }
    }
  })
}

/**
 * @description Loops through object array to append info to DOM
 * @param {array} dinoList - array of objects describing dinosaurs
 */
const addDinoTiles = (dinoList) => {
  //create new div for tiles
  const newDiv = document.createElement('div');
  document
    .querySelector('.main__content-inner')
    .appendChild(newDiv)
    .classList.add('main__tiles');

  //append tiles to .main__tiles
  dinoList.forEach((dino, index) => {
    document.querySelector('.main__tiles').insertAdjacentHTML('beforeend',
      `
        <div class='main__tile' data-id='index-${index}'>
          <div class='main__tile-inner'>
            <img src='${dino.imageSrc}' />
            <h4>${dino.species}</h4>
            <p>Location: ${dino.where}</p>
            <p>Time period: ${dino.when}</p>
            <p>${dino.fact}</p>
            <p>${dino.compareHeight()}</p>
            <p>${dino.compareWeight()}</p>
            <p>${dino.compareDiet()}</p>
          </div>
        </div>
      `
    );
  });
}

/**
 * @description Insert human info into DOM
 * @param {object} human - object describing human
 */
const addHumanTile = (human) => {
  document.querySelector('[data-id="index-3"]').insertAdjacentHTML('afterend',
    `
      <div class='main__tile' data-id='human'>
        <div class='main__tile-inner'>
          <img src='${human.imageSrc}' />
          <h4>${human.name}</h4>
          <p>Location: ${human.location}</p>
          <p>Time period: Now</p>
          <p>Height: ${human.height.feet}ft ${human.height.inches}in</p>
          <p>Weight: ${human.weight}</p>
          <p>Diet: ${human.diet}</p>
        </div>
      </div>
    `
  );
}
