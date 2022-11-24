#!C:\Program Files\nodejs\node.exe
import fs from 'fs/promises';
import https from 'https';

function httpRequest(params, postData) {
  return new Promise(function(resolve, reject) {
      var req = https.request(params, function(res) {
          // reject on bad status
          if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          // cumulate data
          var body = [];
          res.on('data', function(chunk) {
              body.push(chunk);
          });
          // resolve on end
          res.on('end', function() {
              try {
                  body = JSON.parse(Buffer.concat(body).toString());
              } catch(e) {
                  reject(e);
              }
              resolve(body);
          });
      });
      // reject on request error
      req.on('error', function(err) {
          // This is not a "Second reject", just a different sort of failure
          reject(err);
      });
      if (postData) {
          req.write(postData);
      }
      // IMPORTANT
      req.end();
  });
}
const dishTypeCalories = {
  dinner: 300,
  side: 150,
  breakfast: 350,
  dessert: 100,
  condiment: 50
};

(async () => {
const recipes = JSON.parse(await fs.readFile('../src/_data/static-recipes.json', 'utf8'));

const recipeNames = recipes.map(recipe => recipe.title).sort();

fs.writeFile('../src/_data/recipesNames.json', JSON.stringify(recipeNames, null, 2), 'utf8');

// for (let recipe of recipes) {
//   try {
//     // if((await fs.stat(`../src/_data/recipes/${recipe.title}.json`).catch(e => false))?.isFile?.()) continue;
//     const ingredientFractions = new Map();
//     const ingredients = recipe.ingredients.map(ingredient => {
//       const fraction = ingredient.match(/\d? ?\d\/\d/);
//       if(fraction) {
//         ingredient = ingredient.replace(fraction[0], "1");
//         ingredientFractions.set(ingredient.toLowerCase(), eval(fraction[0].replace(' ', '+')));
//       };
//       return ingredient;
//     });

//     const query = ingredients.join(", ");
//     const nutritionPerIngredient = await httpRequest({
//         host: `api.calorieninjas.com`,
//         port: 443,
//         method: "GET",
//         path: `/v1/nutrition?query=${encodeURIComponent(query)}`,
//         headers: { "X-Api-Key": "yzK3yNfosvqTlI+2oWmKTQ==D4ZN5Q34kevOt7L0", "content-type": "application/json" },
//     });
//     if(!nutritionPerIngredient.items) throw new Error(`${recipe.title}: ${nutritionPerIngredient.message}`);
//     nutritionPerIngredient.items.map((item) => {
//       let ingredient = recipe.ingredients.find(ingredient => {
//         if(ingredient.name) return false;
//         return ingredient.toLowerCase().includes(item.name)
//       });
//       recipe.ingredients[recipe.ingredients.indexOf(ingredient)] = { name: ingredient, nutrition: item };
//       ingredientFractions.forEach((fraction, ingredient) => {
//         if (!ingredient.includes(item.name)) return;
//         const itemKeys = Object.keys(item);
//         itemKeys.forEach((key) => {
//           if (key === "name") return;
//           item[key] *= fraction;
//         });
//       });
//       return item;
//     });

//     const overallNutrition = nutritionPerIngredient.items.reduce((accumulation, current) => {
//       if(!accumulation) accumulation = {};
//       const keys = Object.keys(current);
//       for(let key of keys) {
//         if(!accumulation[key]) accumulation[key] = 0;
//         accumulation[key] += current[key];
//       }
//       return accumulation;
//     }, {})

//     overallNutrition.name = recipe.title;
//     const servings = Math.floor(
//       overallNutrition.calories /
//         (dishTypeCalories[recipe.meal] ?? overallNutrition.calories)
//     );

//     const nutrition = Object.fromEntries(Object.entries(overallNutrition).map(([key, value]) => {
//       if(key === 'name') return [key, value];
//       const servingValue = Math.round(value / servings);
//       return [key, servingValue];
//     }))
//     nutrition.servings = servings;
//     recipe.nutrition = nutrition;
//     fs.writeFile(`../src/_data/recipes/${recipe.title}.json`, JSON.stringify(recipe, null, 2), 'utf8');
//   } catch(e) {
//     console.error(e);
//   }
//   await new Promise(resolve => setTimeout(resolve, 500));
// }
})();