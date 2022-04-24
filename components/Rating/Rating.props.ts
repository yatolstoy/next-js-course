import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rating: number;
  changeRating?: (rating: number) => void;
  isChangable?: boolean;
  error?: FieldError;
}
