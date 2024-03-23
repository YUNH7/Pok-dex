import { css, Global } from "@emotion/react";

const style = css`
  body {
    color: #000000;
    line-height: 1;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
    color: inherit;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    line-height: 1;
  }

  img,
  svg {
    display: block;
  }

  button {
    border: none;
    background: inherit;
    cursor: pointer;
  }
`;

function GlobalStyle() {
  return <Global styles={style} />;
}

export default GlobalStyle;
