import { LitElement, html, css } from 'lit';
import { globalStyles } from './global.css.js';
import { listStyles } from './list.styles.js';
import { checklistStyles } from './checklist.css.js';

import { get, set } from 'idb-keyval';

import { addIcon, trashIcon, listIcon } from './icons.js';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class FoodList extends LitElement {
  static get styles() {
    return [
      globalStyles,
      listStyles,
      checklistStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
        }
        .food-entry {
          display: grid;
          grid-template-columns: 55px 4ex 5ex 1fr;
          justify-content: space-between;
          background: var(--primary);
          color: white;
          align-items: center;
          height: 55px;
        }
        .food-entry:nth-child(even) {
          background: var(--accent);
          color: black;
        }
        .food-entry:nth-child(even) svg {
          fill: black;
        }
        .mono {
          padding: 4px;
          font-family: monospace;
        }
        button {
          display: grid;
          place-content: center;
          height: 50px;
          color: white;
          font-size: 1.5em;
          background-color: var(--bold-primary);
        }
        .title {
          flex-grow: 1;
          padding: 4px;
          font-family: sans-serif;
          text-align: right;
          font-size: 1rem;
          background: none;
          align-items: center;
          justify-content: flex-end;
        }
        .header-button {
          width: 50px;
          position: absolute;
          background: none;
        }
        .header-button svg {
          fill: white;
        }
        #ingredient-list {
          left: 4px;
        }
        #generate {
          right: 4px;
        }
        .delete {
          background: none;
        }
        dialog {
          padding: 0;
          flex-direction: column;
        }
        dialog[open] {
          display: flex;
        }
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        #generate-dialog label,
        #generate-dialog input {
          font-size: 25px;
        }
        #generate-dialog label {
          display: grid;
          place-items: center;
          grid-template-columns: 2fr 1fr;
        }
        #amount {
          padding: 4px;
          border: 0;
          text-align: center;
          width: 100%;
        }
        #actions {
          display: flex;
          flex-direction: row;
          gap: 1px;
          background: black;
        }
      `,
    ];
  }

  static get properties() {
    return { plan: Array };
  }

  constructor() {
    super();
    this.plan = [];
    this.today = new Date();
  }

  async firstUpdated() {
    this.generateDialog = this.shadowRoot.querySelector('#generate-dialog');
    this.ingredientListDialog = this.shadowRoot.querySelector('#ingredient-list-dialog');
    this.plan = (await get('plan')) || [];
  }

  updated(changedProperties) {
    if (changedProperties.has('plan')) {
      set('plan', this.plan);
    }
  }

  promptGenerate() {
    this.generateDialog.showModal();
  }

  generate() {
    this.dispatchEvent(
      new CustomEvent('generate-plan', {
        detail: { amount: this.generateDialog.querySelector('#amount').value },
      }),
    );
    this.generateDialog.close();
  }

  delete(foodIndex) {
    return () => {
      this.plan = this.plan.filter((_, index) => index !== foodIndex);
      this.requestUpdate();
    };
  }

  see(recipe) {
    return () => {
      this.dispatchEvent(
        new CustomEvent('see-recipe', { detail: recipe, composed: true, bubbles: true }),
      );
    };
  }

  ingredientList() {
    this.ingredientListDialog.showModal();
  }

  strike({ target }) {
    target.parentElement.classList.toggle('strike');
  }

  dialogClick(event) {
    if (event.target.tagName === 'DIALOG') {
      event.target.close();
    }
  }

  render() {
    return html` <h2>
        <button id="ingredient-list" class="header-button" @click=${this.ingredientList}>
          ${listIcon}
        </button>
        <span>Food Plan</span>
        <button id="generate" class="header-button" @click=${this.promptGenerate}>
          ${addIcon}
        </button>
      </h2>
      <section id="food-plan">
        ${!this.plan.length
          ? html`<h3>There is no plan yet.</h3>`
          : this.plan?.map(
              (food, index) =>
                html`<div class="food-entry">
                  <button class="delete" @click=${this.delete(index)}>${trashIcon}</button>
                  <span class="mono">${daysOfWeek[(this.today.getDay() + index) % 7]}</span>
                  <span class="mono"
                    >(${new Date(new Date().setDate(this.today.getDate() + index)).getDate()})</span
                  >
                  <button class="title" @click=${this.see(food)}>${food?.title}</button>
                </div>`,
            )}
      </section>
      <dialog @click=${this.dialogClick} id="generate-dialog">
        <h2>Generate Food Plan</h2>
        <label><input id="amount" type="number" value="7" /> days</label>
        <div id="actions">
          <button @click=${this.generate}>Generate</button>
          <button @click=${({ target }) => target.closest('dialog').close()}>Cancel</button>
        </div>
      </dialog>
      <dialog @click=${this.dialogClick} id="ingredient-list-dialog">
        <h2>Ingredients</h2>
        <ul>
          ${[...this.plan].slice(0, 3)?.map(food =>
            food.ingredients?.map(
              ingredient => html` <li>
                <label><input type="checkbox" @change=${this.strike} />${ingredient}</label>
              </li>`,
            ),
          )}
        </ul>
      </dialog>`;
  }
}
customElements.define('food-list', FoodList);
