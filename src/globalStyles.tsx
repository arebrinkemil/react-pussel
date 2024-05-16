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
    `}
  />
);

export default GlobalStyles;
