import { css } from 'lit';

export const checklistStyles = css`
  ul,
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  li {
    padding: 4px 8px;
  }
  label {
    display: flex;
    gap: 8px;
  }
  .strike {
    text-decoration: line-through;
  }
  label:has(> input:checked) {
    text-decoration: line-through;
  }
  li:nth-child(even) {
    background-color: var(--muted-accent);
  }
  input {
    align-self: center;
  }
`;
