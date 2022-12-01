import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      box-sizing: border-box;
      margin: 0 auto;
      justify-content: center;
      ${props}
    }
  `;
};