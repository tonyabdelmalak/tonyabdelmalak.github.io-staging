import { aa as Root2, r as reactExports, ab as Value, j as jsxDevRuntimeExports, ac as Trigger, ad as Icon, ae as ChevronDown, af as Portal, ag as Content2, ah as Viewport, ai as Item, aj as ItemIndicator, n as Check, ak as ItemText, al as ScrollUpButton, am as ChevronUp, an as ScrollDownButton, ao as Label, ap as Separator, a as cva } from "./vendor-Cu2fM0-2.js";
import { f as cn } from "./main-DP3epaik.js";
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Trigger,
    {
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 29,
          columnNumber: 7
        }, void 0) }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 28,
          columnNumber: 5
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 19,
      columnNumber: 3
    },
    void 0
  )
);
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ScrollUpButton,
    {
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
        fileName: "/app/src/components/ui/select.tsx",
        lineNumber: 47,
        columnNumber: 5
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 39,
      columnNumber: 3
    },
    void 0
  )
);
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ScrollDownButton,
    {
      ref,
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
        fileName: "/app/src/components/ui/select.tsx",
        lineNumber: 64,
        columnNumber: 5
      }, void 0)
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 56,
      columnNumber: 3
    },
    void 0
  )
);
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Portal, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Content2,
    {
      ref,
      className: cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectScrollUpButton, {}, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 86,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            ),
            children
          },
          void 0,
          false,
          {
            fileName: "/app/src/components/ui/select.tsx",
            lineNumber: 87,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectScrollDownButton, {}, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 96,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 75,
      columnNumber: 5
    },
    void 0
  ) }, void 0, false, {
    fileName: "/app/src/components/ui/select.tsx",
    lineNumber: 74,
    columnNumber: 3
  }, void 0)
);
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Label,
    {
      ref,
      className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 106,
      columnNumber: 3
    },
    void 0
  )
);
SelectLabel.displayName = Label.displayName;
const SelectItem = reactExports.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Item,
    {
      ref,
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ItemIndicator, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-4 w-4" }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 128,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 127,
          columnNumber: 7
        }, void 0) }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 126,
          columnNumber: 5
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ItemText, { children }, void 0, false, {
          fileName: "/app/src/components/ui/select.tsx",
          lineNumber: 132,
          columnNumber: 5
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 118,
      columnNumber: 3
    },
    void 0
  )
);
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Separator,
    {
      ref,
      className: cn("-mx-1 my-1 h-px bg-muted", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/select.tsx",
      lineNumber: 141,
      columnNumber: 3
    },
    void 0
  )
);
SelectSeparator.displayName = Separator.displayName;
const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/alert.tsx",
      lineNumber: 26,
      columnNumber: 3
    },
    void 0
  )
);
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/alert.tsx",
      lineNumber: 39,
      columnNumber: 3
    },
    void 0
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      className: cn("text-sm [&_p]:leading-relaxed", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/alert.tsx",
      lineNumber: 51,
      columnNumber: 3
    },
    void 0
  )
);
AlertDescription.displayName = "AlertDescription";
export {
  Alert as A,
  Select as S,
  AlertDescription as a,
  SelectTrigger as b,
  SelectValue as c,
  SelectContent as d,
  SelectItem as e
};
