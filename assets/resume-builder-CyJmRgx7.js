import { r as reactExports, j as jsxDevRuntimeExports, a5 as Root, a as cva, a6 as FileText, a7 as Plus, N as LoaderCircle, a8 as Save, W as Sparkles, a9 as Trash2 } from "./vendor-Cu2fM0-2.js";
import { f as cn, C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, B as Button, e as Badge } from "./main-deerAjmx.js";
import { T as Textarea } from "./textarea-Cs6fkvGK.js";
import { A as Alert, a as AlertDescription, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./alert-DMslP0O7.js";
import "./preload-DYXzOcNn.js";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      },
      void 0,
      false,
      {
        fileName: "/app/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
      },
      void 0
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Root,
    {
      ref,
      className: cn(labelVariants(), className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "/app/src/components/ui/label.tsx",
      lineNumber: 16,
      columnNumber: 3
    },
    void 0
  )
);
Label.displayName = Root.displayName;
const SECTION_TYPES = [
  { value: "summary", label: "Professional Summary" },
  { value: "experience", label: "Work Experience" },
  { value: "education", label: "Education" },
  { value: "skills", label: "Skills" },
  { value: "certifications", label: "Certifications" },
  { value: "projects", label: "Projects" }
];
const TEMPLATES = [
  { id: "professional", name: "Professional", description: "Clean and corporate" },
  { id: "modern", name: "Modern", description: "Contemporary design" },
  { id: "creative", name: "Creative", description: "Bold and artistic" }
];
function ResumeBuilderPage() {
  const [resumes, setResumes] = reactExports.useState([]);
  const [currentResume, setCurrentResume] = reactExports.useState({
    title: "My Resume",
    targetRole: "",
    targetIndustry: "",
    sections: []
  });
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState("professional");
  const [isOptimizing, setIsOptimizing] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadResumes();
  }, []);
  const loadResumes = async () => {
    try {
      const response = await fetch("/api/resumes");
      if (response.ok) {
        const data = await response.json();
        setResumes(data.resumes || []);
      }
    } catch (error) {
      console.error("Failed to load resumes:", error);
    }
  };
  const addSection = () => {
    setCurrentResume({
      ...currentResume,
      sections: [
        ...currentResume.sections,
        {
          sectionType: "experience",
          title: "",
          content: "",
          orderIndex: currentResume.sections.length
        }
      ]
    });
  };
  const updateSection = (index, field, value) => {
    const updatedSections = [...currentResume.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setCurrentResume({ ...currentResume, sections: updatedSections });
  };
  const removeSection = (index) => {
    const updatedSections = currentResume.sections.filter((_, i) => i !== index);
    setCurrentResume({ ...currentResume, sections: updatedSections });
  };
  const saveResume = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const endpoint = currentResume.id ? `/api/resumes/${currentResume.id}` : "/api/resumes";
      const method = currentResume.id ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentResume)
      });
      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Resume saved successfully!" });
        loadResumes();
        if (!currentResume.id) {
          setCurrentResume(data.resume);
        }
      } else {
        setMessage({ type: "error", text: "Failed to save resume" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error saving resume" });
    } finally {
      setIsSaving(false);
    }
  };
  const optimizeWithAI = async () => {
    if (!currentResume.targetRole) {
      setMessage({ type: "error", text: "Please specify a target role first" });
      return;
    }
    setIsOptimizing(true);
    setMessage(null);
    try {
      const response = await fetch("/api/resumes/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume: currentResume,
          targetRole: currentResume.targetRole,
          targetIndustry: currentResume.targetIndustry
        })
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentResume({
          ...currentResume,
          sections: data.optimizedSections,
          aiOptimizationScore: data.score
        });
        setMessage({ type: "success", text: `Resume optimized! Score: ${data.score}/100` });
      } else {
        setMessage({ type: "error", text: "Failed to optimize resume" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error optimizing resume" });
    } finally {
      setIsOptimizing(false);
    }
  };
  const loadResume = (resume) => {
    setCurrentResume(resume);
  };
  const createNewResume = () => {
    setCurrentResume({
      title: "My Resume",
      targetRole: "",
      targetIndustry: "",
      sections: []
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-background py-12", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 180, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4 max-w-7xl", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 181, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 183, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl font-bold mb-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 184, children: "Resume Builder" }, void 0, false, {
        fileName: "/app/src/pages/resume-builder.tsx",
        lineNumber: 184,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 185, children: "Create professional resumes optimized for your target role with AI-powered suggestions" }, void 0, false, {
        fileName: "/app/src/pages/resume-builder.tsx",
        lineNumber: 185,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/resume-builder.tsx",
      lineNumber: 183,
      columnNumber: 9
    }, this),
    message && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Alert, { className: `mb-6 ${message.type === "error" ? "border-destructive" : "border-primary"}`, "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 191, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDescription, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 192, children: message.text }, void 0, false, {
      fileName: "/app/src/pages/resume-builder.tsx",
      lineNumber: 192,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/resume-builder.tsx",
      lineNumber: 191,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 196, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-1", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 198, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 199, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 200, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 201, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "h-5 w-5", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 202 }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 202,
                columnNumber: 19
              }, this),
              "My Resumes"
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 205, children: "Select or create a new resume" }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 205,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 200,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 207, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: createNewResume, className: "w-full", variant: "outline", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 208, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 209 }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 209,
                columnNumber: 19
              }, this),
              "New Resume"
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 208,
              columnNumber: 17
            }, this),
            resumes.map(
              (resume) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  onClick: () => loadResume(resume),
                  variant: currentResume.id === resume.id ? "default" : "ghost",
                  className: "w-full justify-start",
                  "data-dev-file": "/app/src/pages/resume-builder.tsx",
                  "data-dev-line": 213,
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 219, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 220, children: resume.title }, void 0, false, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 220,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 221, children: resume.targetRole }, void 0, false, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 221,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 219,
                    columnNumber: 21
                  }, this)
                },
                resume.id,
                false,
                {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 213,
                  columnNumber: 17
                },
                this
              )
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 207,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/resume-builder.tsx",
          lineNumber: 199,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "mt-6", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 229, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 230, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 231, children: "Template" }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 231,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 232, children: "Choose a design style" }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 230,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 234, children: TEMPLATES.map(
            (template) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                onClick: () => setSelectedTemplate(template.id),
                variant: selectedTemplate === template.id ? "default" : "outline",
                className: "w-full justify-start",
                "data-dev-file": "/app/src/pages/resume-builder.tsx",
                "data-dev-line": 236,
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-left", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 242, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 243, children: template.name }, void 0, false, {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 243,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 244, children: template.description }, void 0, false, {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 244,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 242,
                  columnNumber: 21
                }, this)
              },
              template.id,
              false,
              {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 236,
                columnNumber: 17
              },
              this
            )
          ) }, void 0, false, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 234,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/resume-builder.tsx",
          lineNumber: 229,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/resume-builder.tsx",
        lineNumber: 198,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 253, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 254, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 255, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 256, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 257, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 258, children: "Resume Editor" }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 258,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 259, children: "Build and optimize your resume" }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 259,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 257,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 261, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: saveResume, disabled: isSaving, variant: "outline", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 262, children: isSaving ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "h-4 w-4 animate-spin", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 264 }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 264,
              columnNumber: 23
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 266 }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 266,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 262,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: optimizeWithAI, disabled: isOptimizing, "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 269, children: [
              isOptimizing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 271 }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 271,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 273 }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 273,
                columnNumber: 23
              }, this),
              "Optimize with AI"
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 269,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 261,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/resume-builder.tsx",
          lineNumber: 256,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/resume-builder.tsx",
          lineNumber: 255,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 280, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 282, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 283, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "title", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 284, children: "Resume Title" }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 284,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Input,
                {
                  id: "title",
                  value: currentResume.title,
                  onChange: (e) => setCurrentResume({ ...currentResume, title: e.target.value }),
                  placeholder: "e.g., Software Engineer Resume",
                  "data-dev-file": "/app/src/pages/resume-builder.tsx",
                  "data-dev-line": 285
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 285,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 292, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 293, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "targetRole", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 294, children: "Target Role" }, void 0, false, {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 294,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Input,
                  {
                    id: "targetRole",
                    value: currentResume.targetRole,
                    onChange: (e) => setCurrentResume({ ...currentResume, targetRole: e.target.value }),
                    placeholder: "e.g., Senior Software Engineer",
                    "data-dev-file": "/app/src/pages/resume-builder.tsx",
                    "data-dev-line": 295
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 295,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 293,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 302, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "targetIndustry", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 303, children: "Target Industry" }, void 0, false, {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 303,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Input,
                  {
                    id: "targetIndustry",
                    value: currentResume.targetIndustry,
                    onChange: (e) => setCurrentResume({ ...currentResume, targetIndustry: e.target.value }),
                    placeholder: "e.g., Technology",
                    "data-dev-file": "/app/src/pages/resume-builder.tsx",
                    "data-dev-line": 304
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 304,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 302,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 292,
              columnNumber: 19
            }, this),
            currentResume.aiOptimizationScore && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 315, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 316, children: [
              "AI Optimization Score: ",
              currentResume.aiOptimizationScore,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 316,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 315,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 282,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 324, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 325, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-semibold", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 326, children: "Resume Sections" }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 326,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: addSection, size: "sm", variant: "outline", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 327, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 328 }, void 0, false, {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 328,
                  columnNumber: 23
                }, this),
                "Add Section"
              ] }, void 0, true, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 327,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 325,
              columnNumber: 19
            }, this),
            currentResume.sections.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center py-12 text-muted-foreground", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 334, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "h-12 w-12 mx-auto mb-4 opacity-50", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 335 }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 335,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 336, children: 'No sections yet. Click "Add Section" to get started.' }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 336,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/resume-builder.tsx",
              lineNumber: 334,
              columnNumber: 19
            }, this) : currentResume.sections.map(
              (section, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 340, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "pt-6 space-y-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 341, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 342, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 space-y-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 343, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 344, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 345, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 346, children: "Section Type" }, void 0, false, {
                        fileName: "/app/src/pages/resume-builder.tsx",
                        lineNumber: 346,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        Select,
                        {
                          value: section.sectionType,
                          onValueChange: (value) => updateSection(index, "sectionType", value),
                          "data-dev-file": "/app/src/pages/resume-builder.tsx",
                          "data-dev-line": 347,
                          children: [
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 351, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 352 }, void 0, false, {
                              fileName: "/app/src/pages/resume-builder.tsx",
                              lineNumber: 352,
                              columnNumber: 39
                            }, this) }, void 0, false, {
                              fileName: "/app/src/pages/resume-builder.tsx",
                              lineNumber: 351,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 354, children: SECTION_TYPES.map(
                              (type) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: type.value, "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 356, children: type.label }, type.value, false, {
                                fileName: "/app/src/pages/resume-builder.tsx",
                                lineNumber: 356,
                                columnNumber: 35
                              }, this)
                            ) }, void 0, false, {
                              fileName: "/app/src/pages/resume-builder.tsx",
                              lineNumber: 354,
                              columnNumber: 37
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/src/pages/resume-builder.tsx",
                          lineNumber: 347,
                          columnNumber: 35
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 345,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 363, children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 364, children: "Title" }, void 0, false, {
                        fileName: "/app/src/pages/resume-builder.tsx",
                        lineNumber: 364,
                        columnNumber: 35
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        Input,
                        {
                          value: section.title,
                          onChange: (e) => updateSection(index, "title", e.target.value),
                          placeholder: "e.g., Senior Developer at Google",
                          "data-dev-file": "/app/src/pages/resume-builder.tsx",
                          "data-dev-line": 365
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/src/pages/resume-builder.tsx",
                          lineNumber: 365,
                          columnNumber: 35
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 363,
                      columnNumber: 33
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 344,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 372, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 373, children: "Content" }, void 0, false, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 373,
                      columnNumber: 33
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      Textarea,
                      {
                        value: section.content,
                        onChange: (e) => updateSection(index, "content", e.target.value),
                        placeholder: "Describe your experience, achievements, or skills...",
                        rows: 4,
                        "data-dev-file": "/app/src/pages/resume-builder.tsx",
                        "data-dev-line": 374
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/resume-builder.tsx",
                        lineNumber: 374,
                        columnNumber: 33
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 372,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/resume-builder.tsx",
                  lineNumber: 343,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Button,
                  {
                    onClick: () => removeSection(index),
                    variant: "ghost",
                    size: "icon",
                    className: "text-destructive",
                    "data-dev-file": "/app/src/pages/resume-builder.tsx",
                    "data-dev-line": 382,
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-4 w-4", "data-dev-file": "/app/src/pages/resume-builder.tsx", "data-dev-line": 388 }, void 0, false, {
                      fileName: "/app/src/pages/resume-builder.tsx",
                      lineNumber: 388,
                      columnNumber: 31
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/resume-builder.tsx",
                    lineNumber: 382,
                    columnNumber: 29
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 342,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 341,
                columnNumber: 25
              }, this) }, index, false, {
                fileName: "/app/src/pages/resume-builder.tsx",
                lineNumber: 340,
                columnNumber: 19
              }, this)
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/resume-builder.tsx",
            lineNumber: 324,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/resume-builder.tsx",
          lineNumber: 280,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/resume-builder.tsx",
        lineNumber: 254,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/pages/resume-builder.tsx",
        lineNumber: 253,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/resume-builder.tsx",
      lineNumber: 196,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/resume-builder.tsx",
    lineNumber: 181,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/src/pages/resume-builder.tsx",
    lineNumber: 180,
    columnNumber: 5
  }, this);
}
export {
  ResumeBuilderPage as default
};
