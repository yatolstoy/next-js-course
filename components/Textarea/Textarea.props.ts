import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface TextareaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}
