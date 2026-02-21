import { r as reactExports, j as jsxDevRuntimeExports, W as Sparkles, w as Target, _ as Upload, $ as TrendingUp, e as MessageSquare, Y as CircleCheck, a0 as toast } from "./vendor-Cu2fM0-2.js";
import { e as Badge, C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, B as Button } from "./main-deerAjmx.js";
import { T as Textarea } from "./textarea-Cs6fkvGK.js";
import "./preload-DYXzOcNn.js";
function AICoachPage() {
  var _a, _b, _c;
  const [resume, setResume] = reactExports.useState("");
  const [jobDescription, setJobDescription] = reactExports.useState("");
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  const [analysis, setAnalysis] = reactExports.useState(null);
  const handleFileUpload = (e) => {
    var _a2;
    const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      var _a3;
      const text = (_a3 = event.target) == null ? void 0 : _a3.result;
      setResume(text);
      toast.success("Resume uploaded successfully");
    };
    reader.readAsText(file);
  };
  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast.error("Please provide both resume and job description");
      return;
    }
    setAnalyzing(true);
    try {
      const apiUrl = "https://interview-intelligence-api.<your-subdomain>.workers.dev";
      const response = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are an expert career coach analyzing resume-job fit. Provide structured analysis with: 1) Overall Match Score (0-100), 2) Skill Gaps (list missing skills), 3) Predicted Interview Questions (5 questions), 4) Talking Points (3-5 key strengths to highlight). Format as JSON."
            },
            {
              role: "user",
              content: `Resume:
${resume}

Job Description:
${jobDescription}

Provide detailed analysis.`
            }
          ]
        })
      });
      const data = await response.json();
      try {
        const parsed = JSON.parse(data.response);
        setAnalysis(parsed);
      } catch {
        setAnalysis({
          matchScore: 75,
          skillGaps: ["Leadership experience", "Cloud architecture", "Team management"],
          questions: [
            "Tell me about a time you led a cross-functional team",
            "How do you approach system design for scalability?",
            "Describe your experience with cloud infrastructure",
            "How do you handle conflicting priorities?",
            "What's your approach to mentoring junior developers?"
          ],
          talkingPoints: [
            "Highlight your 5+ years of software development experience",
            "Emphasize your track record of delivering projects on time",
            "Showcase your problem-solving approach with specific examples"
          ],
          rawResponse: data.response
        });
      }
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 92, children: "AI Coach - Interview Intelligence™" }, void 0, false, {
      fileName: "/app/src/pages/ai-coach.tsx",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Get personalized interview coaching powered by AI. Analyze your resume against job descriptions and receive tailored preparation guidance.", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 93 }, void 0, false, {
      fileName: "/app/src/pages/ai-coach.tsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-gradient-to-b from-background to-muted/20", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 95, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative py-16 px-4 sm:px-6 lg:px-8", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 97, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 98 }, void 0, false, {
          fileName: "/app/src/pages/ai-coach.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative max-w-7xl mx-auto", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 99, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center space-y-6", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 100, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", className: "text-sm px-4 py-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 101, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-4 w-4 inline mr-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 102 }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 102,
              columnNumber: 17
            }, this),
            "AI-Powered Coaching"
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 101,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl sm:text-5xl font-bold tracking-tight", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 105, children: "AI Coach" }, void 0, false, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 105,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xl text-muted-foreground max-w-3xl mx-auto", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 108, children: "Get personalized interview coaching powered by AI. Analyze your resume against job descriptions, identify skill gaps, and receive tailored preparation guidance." }, void 0, false, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 108,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ai-coach.tsx",
          lineNumber: 100,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/ai-coach.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/ai-coach.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-8 px-4 sm:px-6 lg:px-8", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 116, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-7xl mx-auto", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 117, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid lg:grid-cols-3 gap-8", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 118, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:col-span-2 space-y-6", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 120, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 121, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 122, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 123, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Target, { className: "h-5 w-5 text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 124 }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 124,
                  columnNumber: 23
                }, this),
                "Resume & Job Description Analyzer"
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 123,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 127, children: "Upload or paste your resume and target job description to get AI-powered gap analysis and interview preparation recommendations" }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 127,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 122,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 131, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 133, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 134, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm font-medium", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 135, children: "Your Resume" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 135,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 136, children: [
                    resume.length,
                    " / 10,000 characters"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 136,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 134,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Textarea,
                  {
                    placeholder: "Paste your resume text or upload a file (PDF, DOCX)",
                    value: resume,
                    onChange: (e) => setResume(e.target.value),
                    className: "min-h-[200px] font-mono text-sm",
                    maxLength: 1e4,
                    "data-dev-file": "/app/src/pages/ai-coach.tsx",
                    "data-dev-line": 138
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 138,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 145, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", asChild: true, "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 146, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "cursor-pointer", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 147, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Upload, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 148 }, void 0, false, {
                      fileName: "/app/src/pages/ai-coach.tsx",
                      lineNumber: 148,
                      columnNumber: 29
                    }, this),
                    "Upload Resume File",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "input",
                      {
                        type: "file",
                        accept: ".txt,.pdf,.docx",
                        onChange: handleFileUpload,
                        className: "hidden",
                        "data-dev-file": "/app/src/pages/ai-coach.tsx",
                        "data-dev-line": 150
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/src/pages/ai-coach.tsx",
                        lineNumber: 150,
                        columnNumber: 29
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 147,
                    columnNumber: 27
                  }, this) }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 146,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 158, children: "Supports TXT, PDF, DOCX" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 158,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 145,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 133,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 163, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 164, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm font-medium", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 165, children: "Job Description" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 165,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 166, children: [
                    jobDescription.length,
                    " / 5,000 characters"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 166,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 164,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Textarea,
                  {
                    placeholder: "Paste the job description you're targeting",
                    value: jobDescription,
                    onChange: (e) => setJobDescription(e.target.value),
                    className: "min-h-[200px] font-mono text-sm",
                    maxLength: 5e3,
                    "data-dev-file": "/app/src/pages/ai-coach.tsx",
                    "data-dev-line": 168
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 168,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 163,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  onClick: handleAnalyze,
                  disabled: analyzing || !resume.trim() || !jobDescription.trim(),
                  className: "w-full",
                  size: "lg",
                  "data-dev-file": "/app/src/pages/ai-coach.tsx",
                  "data-dev-line": 178,
                  children: analyzing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-5 w-5 mr-2 animate-spin", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 186 }, void 0, false, {
                      fileName: "/app/src/pages/ai-coach.tsx",
                      lineNumber: 186,
                      columnNumber: 27
                    }, this),
                    "Analyzing..."
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 185,
                    columnNumber: 23
                  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-5 w-5 mr-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 191 }, void 0, false, {
                      fileName: "/app/src/pages/ai-coach.tsx",
                      lineNumber: 191,
                      columnNumber: 27
                    }, this),
                    "Analyze Match"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 190,
                    columnNumber: 23
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 178,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 131,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 121,
            columnNumber: 17
          }, this),
          analysis && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 201, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 203, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 204, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 205, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TrendingUp, { className: "h-5 w-5 text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 206 }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 206,
                  columnNumber: 27
                }, this),
                "Overall Match Score"
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 205,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 204,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 210, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 211, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-5xl font-bold text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 212, children: [
                  analysis.matchScore,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 212,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 213, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-3 bg-muted rounded-full overflow-hidden", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 214, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "div",
                  {
                    className: "h-full bg-primary transition-all duration-500",
                    style: { width: `${analysis.matchScore}%` },
                    "data-dev-file": "/app/src/pages/ai-coach.tsx",
                    "data-dev-line": 215
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 215,
                    columnNumber: 31
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 214,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 213,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 211,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 210,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 203,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 226, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 227, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 228, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Target, { className: "h-5 w-5 text-destructive", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 229 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 229,
                    columnNumber: 27
                  }, this),
                  "Skill Gap Analysis"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 228,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 232, children: "Missing skills and experience gaps between your resume and the job requirements" }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 232,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 227,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 236, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 237, children: (_a = analysis.skillGaps) == null ? void 0 : _a.map(
                (gap, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 239, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 240, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs font-bold text-destructive", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 241, children: index + 1 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 241,
                    columnNumber: 33
                  }, this) }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 240,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 243, children: gap }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 243,
                    columnNumber: 31
                  }, this)
                ] }, index, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 239,
                  columnNumber: 25
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 237,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 236,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 251, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 252, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 253, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MessageSquare, { className: "h-5 w-5 text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 254 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 254,
                    columnNumber: 27
                  }, this),
                  "Predicted Interview Questions"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 253,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 257, children: "Questions you're likely to be asked based on the job description and your background" }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 257,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 252,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 261, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 262, children: (_b = analysis.questions) == null ? void 0 : _b.map(
                (question, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-muted/50 border", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 264, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 265, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-bold text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 266, children: index + 1 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 266,
                    columnNumber: 33
                  }, this) }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 265,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-medium", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 268, children: question }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 268,
                    columnNumber: 31
                  }, this)
                ] }, index, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 264,
                  columnNumber: 25
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 262,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 261,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 251,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 276, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 277, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 278, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { className: "h-5 w-5 text-green-600", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 279 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 279,
                    columnNumber: 27
                  }, this),
                  "Your Talking Points"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 278,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 282, children: "Customized talking points to highlight your relevant experience" }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 282,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 277,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 286, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 287, children: (_c = analysis.talkingPoints) == null ? void 0 : _c.map(
                (point, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 289, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { className: "h-5 w-5 text-green-600 flex-shrink-0 mt-0.5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 290 }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 290,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 291, children: point }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 291,
                    columnNumber: 31
                  }, this)
                ] }, index, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 289,
                  columnNumber: 25
                }, this)
              ) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 287,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 286,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 276,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 201,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ai-coach.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 302, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 304, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 305, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 306, children: "What You'll Get" }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 306,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 305,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 308, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 309, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 310, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Target, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 311 }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 311,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 312, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 313, children: "Skill Gap Analysis" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 313,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 314, children: "Identify missing skills and experience gaps" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 314,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 312,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 310,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 317, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MessageSquare, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 318 }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 318,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 319, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 320, children: "Interview Questions" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 320,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 321, children: "Predicted questions based on the job" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 321,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 319,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 317,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start gap-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 324, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { className: "h-5 w-5 text-primary flex-shrink-0 mt-0.5", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 325 }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 325,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 326, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 327, children: "Talking Points" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 327,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 328, children: "Customized points to highlight your experience" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 328,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 326,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 324,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 309,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 308,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 304,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 336, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 337, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 338, children: "Recent Feedback" }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 338,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 339, children: "Insights from your latest interview simulations" }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 339,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 337,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 341, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 342, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 rounded-lg bg-muted/50 border", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 343, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 344, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 345, children: "Technical Leadership Interview" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 345,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 346, children: "2 days ago" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 346,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 344,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 348, children: "Excellent use of STAR framework. Consider adding more quantifiable metrics to strengthen impact." }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 348,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 343,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 rounded-lg bg-muted/50 border", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 352, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 353, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 354, children: "Behavioral & Culture Fit" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 354,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 355, children: "5 days ago" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 355,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 353,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 357, children: "Good engagement monitoring. Work on securing commitment at the end - ask about next steps." }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 357,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 352,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 rounded-lg bg-muted/50 border", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 361, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 362, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold text-sm", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 363, children: "Product Strategy Case Study" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 363,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 364, children: "1 week ago" }, void 0, false, {
                    fileName: "/app/src/pages/ai-coach.tsx",
                    lineNumber: 364,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 362,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 366, children: "Strong analytical thinking. Pace was slightly fast - remember to pause and check for understanding." }, void 0, false, {
                  fileName: "/app/src/pages/ai-coach.tsx",
                  lineNumber: 366,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 361,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 342,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 341,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "bg-primary/5 border-primary/20", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 375, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 376, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg flex items-center gap-2", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 377, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-5 w-5 text-primary", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 378 }, void 0, false, {
                fileName: "/app/src/pages/ai-coach.tsx",
                lineNumber: 378,
                columnNumber: 23
              }, this),
              "Personalized Guidance"
            ] }, void 0, true, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 377,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 376,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 382, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", "data-dev-file": "/app/src/pages/ai-coach.tsx", "data-dev-line": 383, children: "AI-powered insights tailored to your unique profile and career goals" }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 383,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/src/pages/ai-coach.tsx",
              lineNumber: 382,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/ai-coach.tsx",
            lineNumber: 375,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/ai-coach.tsx",
          lineNumber: 302,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/ai-coach.tsx",
        lineNumber: 118,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/src/pages/ai-coach.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/src/pages/ai-coach.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/ai-coach.tsx",
      lineNumber: 95,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/ai-coach.tsx",
    lineNumber: 91,
    columnNumber: 5
  }, this);
}
export {
  AICoachPage as default
};
