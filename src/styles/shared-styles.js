import { css } from 'lit';

export const sharedStyles = css`
  :host {
    font-family: Arial, sans-serif;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .back-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    margin-right: 10px;
  }
    h3{
    margin-bottom: 0px;
    }
`;
