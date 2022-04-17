const https = require('https');
function getRecipes() {
  return new Promise((resolve, reject) => {
    https.get('https://whale-m88-staging.begin.app/recipes', (response) => {
      let recipes = '';
      response.on('data', (chunk) => {
        recipes += chunk
      });
      response.on('end', () => {
        recipes = JSON.parse(recipes).map(r => {
          const recipe = JSON.parse(r.recipe);
          recipe.key = r.key;
          return recipe
        });
        console.log(recipes);
        resolve(recipes);
      })
    }).on('error', (error) => {
      reject(error);
    })
  })
}
module.exports = getRecipes();