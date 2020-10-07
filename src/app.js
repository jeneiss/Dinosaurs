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
};

document.addEventListener('submit', handleForm);

/**
 * @description Creates object that describes human based on form data
 * @constructor
 * @param {element} form - Form as HTML element
 */
function Human(form) {
  this.name = form.user_name.value;
  this.weight = form.user_weight.value;
  this.diet = form.user_diet.value;
  this.height = {
    feet: parseInt(form.user_height_feet.value),
    inches: parseInt(form.user_height_inches.value)
  }

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
      const heightDiff = Math.round(dino.height/human.heightInFeet());
      return heightDiff;
    },
    compareWeight: function() {},
    compareDiet: function() {}
  })
}

/**
 * @description Loops through object array to append info to DOM
 * @param {array} dinoList - array of objects describing dinosaurs
 */
const addDinoTiles = (dinoList) => {
  //create new div for tiles
  const newDiv = document.createElement('div');
  const mainTiles = document
    .querySelector('.main__content-inner')
    .appendChild(newDiv)
    .classList.add('main__tiles');

  //append tiles to .main__tiles
  dinoList.forEach((dino, index) => {
    document.querySelector('.main__tiles').insertAdjacentHTML('beforeend',
        `
        <div class='main__tiles-inner'>
          <div class='main__tile' data='data-index-${index}'>
            <div class='main__tile-inner'>
              <img src='${dino.imageSrc}' />
              <h4>${dino.species}</h4>
              <p>${dino.where}</p>
              <p>${dino.when}</p>
            </div>
          </div>
        </div>
        `
    );
  });
}
