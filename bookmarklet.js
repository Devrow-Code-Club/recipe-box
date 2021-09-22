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
    if(location.host.match(/allrecipes.com/)) return buildRecipeCard("#recipe-main-content", ".recipe-ingred_txt", '.recipe-directions__list--item')
    if(location.host.match(/pamperedchef.com/)) return buildRecipeCard("#recipeName", "#rpIngredients li", '#rpDirections li')
    if(document.querySelector('.wprm-recipe-container')) return buildRecipeCard('.wprm-recipe-name', '.wprm-recipe-ingredient', '.wprm-recipe-instruction')
    return {"message": "Could not extract recipe."};
  }
  const recipeJSON = JSON.stringify(pullRecipeCard(), 2);
  console.log(recipeJSON);
  document.write(`<pre>${recipeJSON}</pre>`);
})()
