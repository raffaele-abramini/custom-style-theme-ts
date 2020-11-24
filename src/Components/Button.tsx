import styled from "@emotion/styled";
import { applyFromTheme } from "../lib/applyFromTheme";
import { decorate } from "../lib/decorateStyledComponent";

type Props = {
  variant: "primary" | "secondary";
  size: "big" | "small";
  disabled: boolean;
};

const Button = decorate<Props>(styled.button<Props>`
  display: block;
  border: none;
  margin: 5px;
  padding: 10px;
  // some styles here
  ${(p) =>
    p.size === "small" &&
    `
  font-size: 8px;
  `}
  ${(p) =>
    p.variant === "primary" &&
    `
  background: lightBlue; 
  `}
  ${(p) =>
    p.variant === "secondary" &&
    `
  background: orange;
  `}

  ${applyFromTheme(
    "Button"
  )} /* important to call this function here to fetch and apply the custom rules from the Theme */
`);

Button.defaultProps = {
  size: "big",
  variant: "primary",
  disabled: false
};

export { Button };
