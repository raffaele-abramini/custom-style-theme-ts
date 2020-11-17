import styled, { StyledComponent } from "@emotion/styled";
import { applyFromTheme } from "../applyFromTheme";
import { get } from "../getProps";

type Props = {
  variant: "primary" | "secondary";
  size: "big" | "small";
  disabled: boolean;
};

const can = get<Props>();

export const Button = styled.button<Props>`
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

  ${(p) => applyFromTheme(p.theme.Button, p)}
` as StyledComponent<Props> & {
  get: typeof can;
};

Button.defaultProps = {
  size: "big"
};

Button.get = can;
