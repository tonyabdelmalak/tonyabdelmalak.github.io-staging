import { r as reactExports, j as jsxDevRuntimeExports } from "./vendor-Cu2fM0-2.js";
import { f as cn } from "./main-deerAjmx.js";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "textarea",
      {
        className: cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      },
      void 0,
      false,
      {
        fileName: "/app/src/components/ui/textarea.tsx",
        lineNumber: 10,
        columnNumber: 7
      },
      void 0
    );
  }
);
Textarea.displayName = "Textarea";
export {
  Textarea as T
};
