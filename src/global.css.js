import { css } from 'lit';

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  :host {
    --primary: hsla(205, 28%, 40%, 1);
    --accent: hsla(32, 100%, 75%, 1);
    --bold-primary: hsla(225, 41%, 29%, 1);
    --muted-primary: hsla(182, 21%, 50%, 1);
    --muted-accent: hsla(53, 19%, 63%, 1);
  }
  h2 {
    margin: 0;
    padding: 4px 0;
    font-family: 'Chelsea Market', cursive;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--muted-primary);
  }

  h3 {
    padding: 8px 4px;
    margin: 0;
    font-size: 1.25em;
    display: grid;
    place-items: center;
    flex-grow: 1;
    background: var(--primary);
    color: white;
    flex: 1;
  }
  button {
    border: none;
    background: none;
    flex-grow: 1;
    cursor: pointer;
  }
`;
