import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

  body {
    padding: 0;
    margin: 0;
    font-family: neue-haas-grotesk-display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: 400;
    color: ${props => props.theme.color.colorFgPrimary};
    background-color: ${props => props.theme.color.colorBgPrimary};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  table {
    border-spacing: 0;
  }
`