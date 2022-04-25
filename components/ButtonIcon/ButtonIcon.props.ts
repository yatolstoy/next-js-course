import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import up from "./Up.svg";
import close from "./Close.svg";
import menu from "./Hamburger.svg";

export const icons = {
  up,
  close,
  menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconName;
  color: "primary" | "white";
}
