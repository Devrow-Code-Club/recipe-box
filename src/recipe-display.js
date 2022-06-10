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
    return { recipeName: String, recipe: Object, nutrition: Object, nutritionPerIngredient: Object };
  }

  constructor() {
    super();
    this.recipe = {};
  }

  updated(changeProperties) {
    if(changeProperties.has('recipeName')) this.getRecipe(this.recipeName);
  }

  strike({ target }) {
    target.parentElement.classList.toggle('strike');
  }

  async getRecipe(name) {
    this.recipe = await fetch(`/_data/recipes/${name}.json`).then((res) => res.json())
  }

  render() {
    return html` <h2>${this.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        ${this.recipe.ingredients?.map(
          (ingredient) =>
            html`<li class="ingredient">
              <label><input
                  type="checkbox"
                  @change=${this.strike}
                />${ingredient.name}</label>
              <span class="budget">
                  <span>${Math.round(ingredient.nutrition?.serving_size_g)}</span>g</span>
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
          <div>
            <span>Service Size</span
            ><span>${this.recipe.nutrition?.serving_size_g}g</span>
          </div>
          <div>
            <span>Servings per Recipe</span
            ><span>${this.recipe.nutrition?.servings}</span>
          </div>
          <div>
            <span><b>Calories</b></span><span><b>${this.recipe.nutrition?.calories}</b></span>
          </div>
          <div>
            <span>Fat</span><span>${this.recipe.nutrition?.fat_total_g}g</span>
          </div>
          <div indented>
            <span>Saturated Fat</span><span>${this.recipe.nutrition?.fat_saturated_g}g</span>
          </div>
          <div>
            <span>Cholesterol</span
            ><span>${this.recipe.nutrition?.cholesterol_mg}mg</span>
          </div>
          <div>
            <span>Sodium</span><span>${this.recipe.nutrition?.sodium_mg}mg</span>
          </div>
          <div>
            <span>Potassium</span
            ><span>${this.recipe.nutrition?.potassium_mg}mg</span>
          </div>
          <div>
            <span>Carbs</span
            ><span>${this.recipe.nutrition?.carbohydrates_total_g}g</span>
          </div>
          <div indented>
            <span>Sugar</span><span>${this.recipe.nutrition?.sugar_g}g</span>
          </div>
          <div indented>
            <span>fiber</span><span>${this.recipe.nutrition?.fiber_g}g</span>
          </div>
          <div>
            <span>Protein</span><span>${this.recipe.nutrition?.protein_g}g</span>
          </div>
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
