import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface TagProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md";
  color?: "ghost" | "primary" | "red" | "green" | "gray";
  href?: string;
}
