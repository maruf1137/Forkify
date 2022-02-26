import * as model from './model.js';
import recipeView from './view/recipe_view.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/PaginationView.js';
import bookmarkView from './view/bookmark-view.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  const id = window.location.hash.slice(1);
  if (!id) return;
  try {
    recipeView.renderSpinner();
    // 0) get search query
    resultView.update(model.getSearchResultsPage());

    // loading recipe
    await model.loadRecipe(id);
    // console.log(model.state);

    // renering recipe
    recipeView.render(model.state.recipe);

    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const loadSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search result
    await model.loadSearch(query);

    // 3) render result
    resultView.render(model.getSearchResultsPage());

    // 4) render the pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 3) render result
  resultView.render(model.getSearchResultsPage(goToPage));

  // 4) render the pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);
  // update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBokmark = function () {
  if (model.state.recipe.bookmarked === false) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // update bookmarks recipe
  recipeView.update(model.state.recipe);

  // render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBokmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);
};

const init = function () {
  bookmarkView.addHandlerRender(controlBokmarks);
  recipeView.addHendelerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBokmark(controlAddBokmark);
  searchView.addHendler(loadSearchResults);
  paginationView.addhandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
