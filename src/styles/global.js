import { createGlobalStyle } from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    background-color: #9b65e6;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }
`;

export default GlobalStyle;
