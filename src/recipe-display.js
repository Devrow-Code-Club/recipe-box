import { LitElement, html, css } from 'lit';
import { until } from "lit/directives/until.js";
import { globalStyles } from './global.css.js';
import { checklistStyles } from './checklist.css.js';

import { closeIcon } from './icons.js';

const dishTypeCalories = {
  dinner: 300,
  side: 150,
  breakfast: 350,
  dessert: 100,
  condiment: 50
};

class RecipeDisplay extends LitElement {
  static get styles() {
    return [
      globalStyles,
      checklistStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        h2 {
          padding: 4px 32px 4px 4px;
        }
        h3 {
          padding: 4px;
        }
        h3 {
          margin: 0;
          background-color: var(--primary);
          color: white;
          place-items: flex-start;
        }
        #close {
          position: absolute;
          right: 0;
          top: 0;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
        }
        #close svg {
          fill: white;
        }
        #nutrition {
          display:flex;
          flex-direction:column;
          border-top: 2px solid black;
        }
        #nutrition div {
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          padding: 0 8px;
        }
        #nutrition div:nth-child(even) {
          background-color: var(--bold-primary);
          color: white;
        }
        #nutrition div[indented] {
          padding-left: 16px;
        }
      `,
    ];
  }

  static get properties() {
    return { recipe: Object, nutrition: Object, nutritionPerIngredient: Object };
  }

  constructor() {
    super();
    this.recipe = {};
  }

  updated(changeProperties) {
    if(changeProperties.has('recipe')) this._nutrition();
  }

  strike({ target }) {
    target.parentElement.classList.toggle('strike');
  }

  async _nutrition() {
    if(!this.recipe.ingredients) return;
    const ingredientFractions = new Map();
    const ingredients = this.recipe.ingredients.map(ingredient => {
      const fraction = ingredient.match(/\d? ?\d\/\d/);
      if(fraction) {
        ingredient = ingredient.replace(fraction[0], "1");
        ingredientFractions.set(ingredient.toLowerCase(), eval(fraction[0].replace(' ', '+')));
      };
      return ingredient;
    });
    console.log(ingredients, ingredientFractions);
    const query = ingredients.join(", ");
    /*
        {
          "items": [{
            "sugar_g": 13.3,
            "fiber_g": 4,
            "serving_size_g": 283.495,
            "sodium_mg": 8,
            "name": "onion",
            "potassium_mg": 99,
            "fat_saturated_g": 0.1,
            "fat_total_g": 0.5,
            "calories": 126.7,
            "cholesterol_mg": 0,
            "protein_g": 3.9,
            "carbohydrates_total_g": 28.6
          }]
        }
    */
    const nutritionPerIngredient = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
      method: "GET",
      headers: { "X-Api-Key": "yzK3yNfosvqTlI+2oWmKTQ==D4ZN5Q34kevOt7L0" },
      contentType: "application/json",
    }).then((res) => res.json());
    console.log(nutritionPerIngredient);
    this.nutritionPerIngredient = nutritionPerIngredient.items.map((item) => {
      ingredientFractions.forEach((fraction, ingredient) => {
        if (!ingredient.includes(item.name)) return;
        const itemKeys = Object.keys(item);
        itemKeys.forEach((key) => {
          if (key === "name") return;
          item[key] *= fraction;
        });
      });
      return item;
    });
    console.log
    const overallNutrition = this.nutritionPerIngredient.reduce((accumulation, current) => {
      if(!accumulation) accumulation = {};
      const keys = Object.keys(current);
      for(let key of keys) {
        if(!accumulation[key]) accumulation[key] = 0;
        accumulation[key] += current[key];
      }
      return accumulation;
    }, {})
    overallNutrition.name = this.recipe.title;
    const servings = Math.floor(
      overallNutrition.calories /
        (dishTypeCalories[this.recipe.meal] ?? overallNutrition.calories)
    );
    this.nutrition = Object.fromEntries(Object.entries(overallNutrition).map(([key, value]) => {
      if(key === 'name') return [key, value];
      const servingValue = Math.round(value / servings);
      return [key, servingValue];
    }))
    this.nutrition.servings = servings;
  }

  render() {
    return html` <h2>${this.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        ${this.recipe.ingredients?.map(
          (ingredient) =>
            html`<li class="ingredient">
              <label
                ><input
                  type="checkbox"
                  @change=${this.strike}
                />${ingredient}</label
              >
              <span class="budget"
                >${this.nutritionPerIngredient?.length ?
                  html`
                  <span>${Math.round(
                    this.nutritionPerIngredient?.find((item) =>
                      ingredient.toLowerCase().includes(item.name)
                    )?.serving_size_g
                  )}</span>` : 
                  html`<span>?</span>`
                }g</span
              >
            </li>`
        )}
      </ul>
      <h3>Directions</h3>
      <ol>
        ${this.recipe.directions?.map(
          (direction) =>
            html`<li class="direction">
              <label
                ><input
                  type="checkbox"
                  @change=${this.strike}
                />${direction}</label
              >
            </li>`
        )}
      </ol>
      <div id="nutrition">
        ${this.nutrition
          ? html`
              <div>
                <span>Service Size</span
                ><span>${this.nutrition.serving_size_g}g</span>
              </div>
              <div>
                <span>Servings per Recipe</span
                ><span>${this.nutrition.servings}</span>
              </div>
              <div>
                <span><b>Calories</b></span><span><b>${this.nutrition.calories}</b></span>
              </div>
              <div>
                <span>Fat</span><span>${this.nutrition.fat_total_g}g</span>
              </div>
              <div indented>
                <span>Saturated Fat</span><span>${this.nutrition.fat_saturated_g}g</span>
              </div>
              <div>
                <span>Cholesterol</span
                ><span>${this.nutrition.cholesterol_mg}mg</span>
              </div>
              <div>
                <span>Sodium</span><span>${this.nutrition.sodium_mg}mg</span>
              </div>
              <div>
                <span>Potassium</span
                ><span>${this.nutrition.potassium_mg}mg</span>
              </div>
              <div>
                <span>Carbs</span
                ><span>${this.nutrition.carbohydrates_total_g}g</span>
              </div>
              <div indented>
                <span>Sugar</span><span>${this.nutrition.sugar_g}g</span>
              </div>
              <div indented>
                <span>fiber</span><span>${this.nutrition.fiber_g}g</span>
              </div>
              <div>
                <span>Protein</span><span>${this.nutrition.protein_g}g</span>
              </div>
            `
          : html`<span>Nutrition Incoming</span>`}
      </div>
      <button
        id="close"
        @click=${() => this.dispatchEvent(new CustomEvent("close-dialog"))}
      >
        ${closeIcon}
      </button>`;
  }
}
customElements.define('recipe-display', RecipeDisplay);
