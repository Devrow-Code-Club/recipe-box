(_ => { 
  function extractContent(nodes) {
    return Array.from(nodes).map(n => n.textContent.trim()).filter(n => n)
  }
  function buildRecipeCard(titleSelector, ingredientSelector, directionSelector) {
    return {
      title: document.querySelector(titleSelector).textContent,
      ingredients: extractContent(document.querySelectorAll(ingredientSelector)),
      directions: extractContent(document.querySelectorAll(directionSelector))
    }
  }
  function pullRecipeCard() {
    if(document.querySelector('.easyrecipe')) return buildRecipeCard('.ERSName', '.ingredient', '.instruction');
    if(location.host.match(/allrecipes.com/)) return buildRecipeCard(".recipe-main-header h1.heading-content", ".ingredients-item-name", '.instructions-section-item .paragraph')
    if(location.host.match(/pamperedchef.com/)) return buildRecipeCard("#recipeName", "#rpIngredients li", '#rpDirections li')
    if(location.host.match(/food.com/)) return buildRecipeCard(".recipe-title", ".recipe-ingredients__item", '.recipe-directions__step')
    if(document.querySelector('.wprm-recipe-container')) return buildRecipeCard('.wprm-recipe-name', '.wprm-recipe-ingredient', '.wprm-recipe-instruction')
    if(document.querySelector('body.recipe-template-default')) return buildRecipeCard('.recipe-title', '.recipe-ingredients__list li', '.recipe-directions__list .recipe-directions__item')
    if(document.querySelector('.mv-recipe-card')) return buildRecipeCard('.mv-create-title-primary', '.mv-create-ingredients li', '.mv-create-instructions li')
    if(document.querySelector('.tasty-recipes')) return buildRecipeCard('.tasty-recipes-title', '.tasty-recipes-ingredients-body li', '.tasty-recipes-instructions-body li')
    if(document.querySelector('.structured-project-content')) return buildRecipeCard('.recipe-block__header', '.structured-ingredients__list-item', '.section--instructions li')

    return {"message": "Could not extract recipe."};
  }
  const recipeJSON = JSON.stringify(pullRecipeCard(), null, 2);
  console.log(recipeJSON);
  document.body.innerHTML = `<pre>${recipeJSON}</pre>`;
})()
