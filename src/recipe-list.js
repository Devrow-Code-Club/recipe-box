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
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        .recipe {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }
        .actions {
          display: flex;
        }
        button {
          aspect-ratio: 1 / 1;
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
    return { recipes: { type: Array } };
  }

  constructor() {
    super();
    this.recipes = [];
    fetch('/_data/static-recipes.json')
      .then(response => response.json())
      .then(recipes => {
        this.recipes = recipes.sort((a, b) => a.title > b.title ? -1 : 1);
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
        ${this.recipes.map(
          recipe => html`<div class="recipe">
            <h3>${recipe.title}</h3>
            <div class="actions">
              <button class="add" @click=${this.add(recipe)}>${addIcon}</button>
              <button class="see" @click=${this.see(recipe)}>${seeIcon}</button>
            </div>
          </div>`,
        )}
      </section>`;
  }
}
customElements.define('recipe-list', RecipeList);
