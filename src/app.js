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

  //remove form from html on submit
  //create human object
  const human = new Human(form);

  //create dino objects
  const dinoList = createDinoObjects(Dinos, human);
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

  this.heightInFeet = () => {
    return this.height.inches/12 + this.height.feet;
  }
}

/**
 * @description Loops through dinos to create dinosaur objects with additional methods
 * @param {array} Dinos - Array of objects that describe dinosaurs
 * @param {object} human - Object that describes a human
 * @returns {array} - Array of objects that describe dinosaurs
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
    compareHeight: () => {
      const heightDiff = Math.round(dino.height/human.heightInFeet());
      return heightDiff;
    },
    compareWeight: () => {},
    compareDiet: () => {}
  })
}
