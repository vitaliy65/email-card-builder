import React, { forwardRef, PropsWithChildren, HTMLAttributes } from "react";

export const Item = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(function Item({ children, ...props }, ref) {
  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
});
