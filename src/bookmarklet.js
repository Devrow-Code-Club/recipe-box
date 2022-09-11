(_ => { 
  const replacers = ["▢", "\n", "\t", " "];
  const replacerRegex = new RegExp(replacers.join("|"), 'gi');
  function santize(x) {
    return x.replace(replacerRegex, "").trim()
  }
  function extractContent(nodes) {
    return Array.from(nodes)
      .map((n) => santize(n.textContent))
      .filter((n) => n);
  }
  function buildRecipeCard(titleSelector, ingredientSelector, directionSelector) {
    const meal = prompt("meal type:", "dinner");
    return {
      title: santize(document.querySelector(titleSelector).textContent),
      source: window.location.href,
      meal,
      ingredients: extractContent(
        document.querySelectorAll(ingredientSelector)
      ),
      directions: extractContent(document.querySelectorAll(directionSelector)),
    };
  }
  function pullRecipeCard() {
    if(document.querySelector('.easyrecipe')) return buildRecipeCard('.ERSName', '.ingredient', '.instruction');
    if(location.host.match(/allrecipes.com/)) return buildRecipeCard(".recipe-main-header h1.heading-content", ".ingredients-item-name", '.instructions-section-item .paragraph')
    if(location.host.match(/pamperedchef.com/)) return buildRecipeCard("#recipeName", "#rpIngredients li", '#rpDirections li')
    if(location.host.match(/food.com/)) return buildRecipeCard(".recipe-title", ".recipe-ingredients__item", '.recipe-directions__step')
    if(document.querySelector('.wprm-recipe-container .recipe-card-container')) return buildRecipeCard('.recipe-card-container', '.recipe-ingredients li', '.recipe-instructions li')
    if(document.querySelector('.wprm-recipe-container')) return buildRecipeCard('.wprm-recipe-name', '.wprm-recipe-ingredient', '.wprm-recipe-instruction')
    if(document.querySelector('body.recipe-template-default')) return buildRecipeCard('.recipe-title', '.recipe-ingredients__list li', '.recipe-directions__list .recipe-directions__item')
    if(document.querySelector('.mv-recipe-card')) return buildRecipeCard('.mv-create-title-primary', '.mv-create-ingredients li', '.mv-create-instructions li')
    if(document.querySelector('.tasty-recipes')) return buildRecipeCard(
      ".tasty-recipes-title, .tasty-recipes h2",
      ".tasty-recipes-ingredients-body li, .tasty-recipe-ingredients li",
      ".tasty-recipes-instructions-body li, .tasty-recipe-instructions li"
    );
    if(document.querySelector('.structured-project-content')) return buildRecipeCard('.recipe-block__header', '.structured-ingredients__list-item', '.section--instructions li')
    if(document.querySelector('[data-app="tasty_ui"]')) return buildRecipeCard('.recipe-name', '.ingredient', '.prep-steps li')
    if(document.querySelector('.tabtitle')) return buildRecipeCard('.tabtitle', '.ingredient', '.instruction')
    if(document.querySelector('body.post-template-default')) return buildRecipeCard('.post-title', '#css_fv_recipe_table td, .ingredients li', '#css_fv_recipe_method li, .instructions li')
    if (document.querySelector(".post.hentry")) return buildRecipeCard(".post-title", "li.ingredient", ".instructions > div > div");
    if (document.querySelector(".o-Recipe")) return buildRecipeCard(".o-AssetTitle__a-HeadlineText",".o-Ingredients__a-Ingredient--CheckboxLabel",".o-Method__m-Step");
    if (document.querySelector("h1.recipe-hed"))
      return buildRecipeCard(
        "h1.recipe-hed",
        ".ingredient-item",
        ".direction-lists li"
      );
    if (document.querySelector(".itr-recipe-title h2"))
      return buildRecipeCard(
        ".itr-recipe-title h2",
        ".itr-ingredients p",
        ".itr-directions p"
      );
    if (document.querySelector(".page-item > .item_header > h1.item_title"))
      return buildRecipeCard(
        "h1.item_title",
        "ul li",
        "ol li"
      );
    if (document.querySelector("#shopify-section-article-template"))
        return buildRecipeCard(
          ".section__title-text.h2",
          ".rk_ingredients ul > *",
          ".rk_directions h4, .rk_directions li"
        );
      return { message: "Could not extract recipe." };
  }
  const recipe = pullRecipeCard();
  if(recipe.message) return alert(recipe.message);
  const recipeJSON = JSON.stringify(recipe, null, 2);
  document.body.innerHTML = `<div style="display:flex;flex-direction:column;width:100%;"><pre>${recipeJSON}</pre><button id="copy">Copy</button></div>`;
  document.querySelector('#copy').addEventListener('click', () => {
    navigator.clipboard.writeText(recipeJSON);
  })
})()
