import { HTMLAttributes } from "react";

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classes = ["card", className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}
