import * as modal from './modal.js';
import recipeView from './view/recipe_view.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renerSpinner();
    // loading recipe
    await modal.loadRecipe(id);
    // console.log(modal.state);

    // renering recipe
    recipeView.render(modal.state.recipe);
  } catch (error) {
    alert(error);
  }
};

['load', 'hashchange'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
