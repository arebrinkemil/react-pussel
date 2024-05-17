import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body,
      #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      body {
        font-family: "Open Sans", sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      * {
        box-sizing: border-box;
      }
      button {
        font-family: "Open Sans", sans-serif;
        font-size: 1em;
        cursor: pointer;
        background-color: #f0a500;
        border: none;
        border-radius: 5px;
      }
      button:hover {
        background-color: #f0c100;
      }

      input {
        font-family: "Open Sans", sans-serif;
        text-align: right;
        font-size: 2em;
        padding: 5px;
        border-radius: 5px;
        background-color: transparent;
        border: none;
        width: 50px;
      }

      h1 {
        margin-bottom: 0;
      }
    `}
  />
);

export default GlobalStyles;
