import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, figcaption, blockquote, dl, dd {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }

  input, textarea, select, button {
    font: inherit;
  }

  body {
    line-height: 1.5;
    font-family: Arial, sans-serif;
  }
`;

export default GlobalStyle;