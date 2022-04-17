import { LitElement, html, css } from 'lit';
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
    return { recipe: Object };
  }

  constructor() {
    super();
    this.recipe = {};
  }

  strike({ target }) {
    target.parentElement.classList.toggle('strike');
  }

  render() {
    return html` <h2>${this.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        ${this.recipe.ingredients?.map(
          ingredient =>
            html`<li class="ingredient">
              <label><input type="checkbox" @change=${this.strike} />${ingredient}</label>
            </li>`,
        )}
      </ul>
      <h3>Directions</h3>
      <ol>
        ${this.recipe.directions?.map(
          direction =>
            html`<li class="direction">
              <label><input type="checkbox" @change=${this.strike} />${direction}</label>
            </li>`,
        )}
      </ol>
      <button id="close" @click=${() => this.dispatchEvent(new CustomEvent('close-dialog'))}>
        ${closeIcon}
      </button>`;
  }
}
customElements.define('recipe-display', RecipeDisplay);
