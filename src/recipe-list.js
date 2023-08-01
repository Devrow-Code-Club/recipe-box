import { LitElement, html, css } from 'lit';
import { globalStyles } from './global.css.js';
import { listStyles } from './list.styles.js';

import { addIcon, seeIcon } from './icons.js';

class RecipeList extends LitElement {
  static get styles() {
    return [
      globalStyles,
      listStyles,
      css`
        section {
          display:flex;
          flex-direction:column;
        }
        .recipes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 4px;
        }
        summary {
          list-style: none;
        }
        .recipe {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          box-shadow: black 2px 2px 4px;
          border-radius: 4px;
          overflow: hidden;
        }
        .actions {
          display: grid;
          grid-template-columns: 50% 50%;
        }
        button, a {
          aspect-ratio: 1 / 1;
          display:grid;
          place-items:center;
        }
        .add {
          background-color: var(--bold-primary);
          color: white;
        }
        .see {
          background-color: var(--accent);
        }
      `,
    ];
  }

  static get properties() {
    return { alphaSortedRecipes: { type: Array } };
  }

  constructor() {
    super();
    this.recipes = [];
    fetch('/recipesNames.json')
      .then(response => response.json()).then(recipes => {
        this.alphaSortedRecipes = Array.from(new Set(recipes.map(r => r.slice(0, 1).toUpperCase()))).map(letter => ([letter, recipes.filter(r => r.toUpperCase().startsWith(letter))]))

      });
  }

  add(recipe) {
    return () => {
      this.dispatchEvent(new CustomEvent('add-recipe', { detail: recipe }));
    };
  }

  see(recipe) {
    return () => {
      this.dispatchEvent(
        new CustomEvent('see-recipe', { detail: recipe, composed: true, bubbles: true }),
      );
    };
  }

  random(amount = 7, meal = 'dinner') {
    const recipesCopy = this.recipes.filter(recipe => recipe.meal === meal);
    for (let i = 0; i < amount; i++) {
      const index = Math.floor(Math.random() * recipesCopy.length);
      this.dispatchEvent(
        new CustomEvent('add-recipe', { detail: recipesCopy.splice(index, 1)[0] }),
      );
    }
  }

  render() {
    return html`<h2>Recipes</h2>
      <section id="recipes">
        ${this.alphaSortedRecipes.map(([letter, recipes]) => html`
        <details>
          <summary>
            <h3>${letter}</h3>
          </summary>
          <div class='recipes'>
          ${recipes.map(
            recipe => html`<div class="recipe">
              <h3>${recipe}</h3>
              <div class="actions">
                <button class="add" @click=${this.add(recipe)}>${addIcon}</button>
                <a class="see" href="recipes/${recipe}/">${seeIcon}</a>
              </div>
            </div>`,
          )}
          </div>
        </details>
        `)}
      </section>`;
  }
}
customElements.define('recipe-list', RecipeList);
