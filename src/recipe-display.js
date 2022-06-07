import { LitElement, html, css } from 'lit';
import { until } from "lit/directives/until.js";
import { globalStyles } from './global.css.js';
import { checklistStyles } from './checklist.css.js';

import { closeIcon } from './icons.js';

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
      `,
    ];
  }

  static get properties() {
    return { recipe: Object, nutritionPerIngredient: Object };
  }

  constructor() {
    super();
    this.recipe = {};
  }

  strike({ target }) {
    target.parentElement.classList.toggle('strike');
  }

  async nutrition() {
    if(!this.recipe.ingredients) return;
    const { ingredients } = this.recipe;
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
    this.nutritionPerIngredient = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
      method: "GET",
      headers: { "X-Api-Key": "yzK3yNfosvqTlI+2oWmKTQ==D4ZN5Q34kevOt7L0" },
      contentType: "application/json",
    }).then((res) => res.json());
    const nutrition = this.nutritionPerIngredient.items.reduce((accumulation, current) => {
      if(!accumulation) accumulation = {};
      const keys = Object.keys(current);
      for(let key of keys) {
        if(!accumulation[key]) accumulation[key] = 0;
        accumulation[key] += current[key];
      }
      return accumulation;
    }, {})
    nutrition.name = this.recipe.title;
    return html`<pre id='nutrition'>${JSON.stringify(nutrition, '', 2)}</pre>`;
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
                >${this.nutritionPerIngredient.items.find((item) =>
                  ingredient.includes(item.name)
                ).serving_size_g}g</span
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
      <div>${until(this.nutrition(), html`Nutrition Incoming`)}</div>
      <button
        id="close"
        @click=${() => this.dispatchEvent(new CustomEvent("close-dialog"))}
      >
        ${closeIcon}
      </button>`;
  }
}
customElements.define('recipe-display', RecipeDisplay);
