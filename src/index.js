import './food-list.js';
import './recipe-list.js';
import './recipe-display.js';

navigator.serviceWorker.register('/sw.js', { type: 'module' }).then(function (registration) {
  console.log('Service Worker Registered');
});

const recipeDialog = document.querySelector('#recipe-dialog');
const recipeDisplay = recipeDialog.querySelector('recipe-display');
const recipeList = document.querySelector('recipe-list');
const foodList = document.querySelector('food-list');

recipeDialog.addEventListener('click', event => {
  if (event.target.tagName === 'DIALOG') {
    recipeDialog.close();
  }
});

recipeDisplay.addEventListener('close-dialog', () => {
  recipeDialog.close();
});

document.body.addEventListener('see-recipe', ({ detail: recipeName }) => {
  recipeDisplay.recipeName = recipeName;
  requestAnimationFrame(() => {
    recipeDialog.showModal();
  });
});

recipeList.addEventListener('add-recipe', ({ detail: recipe }) => {
  foodList.plan = [...foodList.plan, recipe];
});

foodList.addEventListener('generate-plan', ({ detail: { amount } }) => {
  recipeList.random(amount);
});
