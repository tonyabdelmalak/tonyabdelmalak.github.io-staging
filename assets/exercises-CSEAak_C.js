import { r as reactExports, j as jsxDevRuntimeExports, N as LoaderCircle, W as Sparkles, e as MessageSquare, B as Brain, a1 as Crown, a2 as Lightbulb, a3 as Code, a4 as Users } from "./vendor-Cu2fM0-2.js";
import { B as Button, C as Card, a as CardHeader, b as CardTitle, e as Badge, d as CardContent, c as CardDescription } from "./main-DP3epaik.js";
import { A as Alert, a as AlertDescription, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./alert-BkJMrTLP.js";
import { T as Textarea } from "./textarea-BCXKBiwh.js";
import "./preload-DYXzOcNn.js";
const iconMap = {
  Users,
  Code,
  Lightbulb,
  Crown,
  Brain,
  MessageSquare
};
function ExercisesPage() {
  var _a;
  const [categories, setCategories] = reactExports.useState([]);
  const [questions, setQuestions] = reactExports.useState([]);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  const [practiceMode, setPracticeMode] = reactExports.useState(false);
  const [currentQuestion, setCurrentQuestion] = reactExports.useState(null);
  const [userAnswer, setUserAnswer] = reactExports.useState("");
  const [aiFeedback, setAiFeedback] = reactExports.useState(null);
  const [analyzingAnswer, setAnalyzingAnswer] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadCategories();
    loadQuestions();
  }, []);
  reactExports.useEffect(() => {
    loadQuestions();
  }, [selectedCategory, selectedDifficulty]);
  const loadCategories = async () => {
    try {
      const response = await fetch("/api/questions/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };
  const loadQuestions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (selectedDifficulty !== "all") params.append("difficulty", selectedDifficulty);
      const response = await fetch(`/api/questions?${params.toString()}`);
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  };
  const startPractice = (question) => {
    setCurrentQuestion(question);
    setUserAnswer("");
    setAiFeedback(null);
    setPracticeMode(true);
  };
  const getAIFeedback = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;
    setAnalyzingAnswer(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an expert interview coach. Analyze the candidate's answer to the interview question and provide constructive feedback. Focus on: 1) Content quality, 2) Structure (STAR method if applicable), 3) Specific strengths, 4) Areas for improvement, 5) Actionable suggestions. Be encouraging but honest.`
            },
            {
              role: "user",
              content: `Interview Question: "${currentQuestion.question}"

Candidate's Answer: "${userAnswer}"

Evaluation Criteria: ${currentQuestion.evaluationCriteria || "General interview response quality"}

Sample Answer Guidance: ${currentQuestion.sampleAnswer || "N/A"}

Please provide detailed feedback on this answer.`
            }
          ]
        })
      });
      const data = await response.json();
      setAiFeedback(data.choices[0].message.content);
    } catch (error) {
      console.error("Failed to get AI feedback:", error);
      setAiFeedback("Sorry, I encountered an error analyzing your answer. Please try again.");
    } finally {
      setAnalyzingAnswer(false);
    }
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "entry":
        return "bg-green-500/10 text-green-500";
      case "mid":
        return "bg-blue-500/10 text-blue-500";
      case "senior":
        return "bg-purple-500/10 text-purple-500";
      case "executive":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  if (practiceMode && currentQuestion) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 140, children: "Practice Exercise - Interview Intelligence™" }, void 0, false, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 140,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Practice your interview response and get AI-powered feedback.", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 141 }, void 0, false, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-background", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 143, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 144, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", onClick: () => setPracticeMode(false), className: "mb-6", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 145, children: "← Back to Exercises" }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 145,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 149, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 150, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 151, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 152, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-2xl", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 153, children: currentQuestion.question }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 153,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 154, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 155, children: currentQuestion.type }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 155,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { className: getDifficultyColor(currentQuestion.difficulty), "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 156, children: currentQuestion.difficulty }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 156,
                columnNumber: 23
              }, this),
              currentQuestion.industry && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 160, children: currentQuestion.industry }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 160,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 154,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 152,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 151,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 166, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 167, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm font-medium mb-2 block", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 168, children: "Your Answer" }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 168,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Textarea,
                {
                  value: userAnswer,
                  onChange: (e) => setUserAnswer(e.target.value),
                  placeholder: "Type your answer here... Use the STAR method (Situation, Task, Action, Result) for behavioral questions.",
                  className: "min-h-[200px]",
                  "data-dev-file": "/app/src/pages/exercises.tsx",
                  "data-dev-line": 169
                },
                void 0,
                false,
                {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 169,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground mt-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 175, children: "Tip: Aim for 1-2 minutes of speaking time (150-300 words)" }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 175,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 167,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                onClick: getAIFeedback,
                disabled: !userAnswer.trim() || analyzingAnswer,
                className: "w-full",
                size: "lg",
                "data-dev-file": "/app/src/pages/exercises.tsx",
                "data-dev-line": 180,
                children: analyzingAnswer ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 188 }, void 0, false, {
                    fileName: "/app/src/pages/exercises.tsx",
                    lineNumber: 188,
                    columnNumber: 23
                  }, this),
                  "Analyzing Your Answer..."
                ] }, void 0, true, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 187,
                  columnNumber: 19
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "mr-2 h-4 w-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 193 }, void 0, false, {
                    fileName: "/app/src/pages/exercises.tsx",
                    lineNumber: 193,
                    columnNumber: 23
                  }, this),
                  "Get AI Feedback"
                ] }, void 0, true, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 192,
                  columnNumber: 19
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 180,
                columnNumber: 17
              },
              this
            ),
            aiFeedback && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Alert, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 200, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-4 w-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 201 }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 201,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDescription, { className: "mt-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 202, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "prose prose-sm max-w-none", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 203, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "whitespace-pre-wrap", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 204, children: aiFeedback }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 204,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 203,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 202,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 200,
              columnNumber: 17
            }, this),
            currentQuestion.sampleAnswer && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-t pt-6", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 211, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-semibold mb-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 212, children: "Sample Answer Guidance" }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 212,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 213, children: currentQuestion.sampleAnswer }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 213,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 211,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 166,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 144,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 143,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/exercises.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 226, children: "Exercises - Interview Intelligence™" }, void 0, false, {
      fileName: "/app/src/pages/exercises.tsx",
      lineNumber: 226,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Practice exercises to improve your interview skills and performance.", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 227 }, void 0, false, {
      fileName: "/app/src/pages/exercises.tsx",
      lineNumber: 227,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-background", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 229, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 230, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 231, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl font-bold tracking-tight mb-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 232, children: "Practice Exercises" }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 232,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 233, children: "Improve your interview skills with our AI-powered question library" }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 233,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 231,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 237, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: selectedCategory, onValueChange: setSelectedCategory, "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 238, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "w-full sm:w-[200px]", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 239, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "All Categories", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 240 }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 240,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 239,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 242, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "all", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 243, children: "All Categories" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 243,
              columnNumber: 17
            }, this),
            categories.map(
              (cat) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: cat.id.toString(), "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 245, children: cat.name }, cat.id, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 245,
                columnNumber: 17
              }, this)
            )
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 238,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: selectedDifficulty, onValueChange: setSelectedDifficulty, "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 252, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "w-full sm:w-[200px]", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 253, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "All Levels", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 254 }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 254,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 253,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 256, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "all", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 257, children: "All Levels" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 257,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "entry", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 258, children: "Entry Level" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 258,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "mid", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 259, children: "Mid Level" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "senior", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 260, children: "Senior Level" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 260,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "executive", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 261, children: "Executive" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 261,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 256,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 252,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 237,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 267, children: categories.map((category) => {
        const Icon = iconMap[category.icon || "Users"];
        const categoryQuestions = questions.filter((q) => q.categoryId === category.id);
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "hover:border-primary transition-colors cursor-pointer", onClick: () => setSelectedCategory(category.id.toString()), "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 273, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 274, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 275, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-2 rounded-lg bg-primary/10", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 276, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { className: "h-5 w-5 text-primary", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 277 }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 277,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 276,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 279, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 280, children: category.name }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 280,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { className: "text-xs", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 281, children: [
              categoryQuestions.length,
              " questions"
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 281,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 279,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 275,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 274,
          columnNumber: 19
        }, this) }, category.id, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 273,
          columnNumber: 17
        }, this);
      }) }, void 0, false, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 267,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 293, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-semibold mb-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 294, children: [
          selectedCategory === "all" ? "All Questions" : ((_a = categories.find((c) => c.id.toString() === selectedCategory)) == null ? void 0 : _a.name) || "Questions",
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-muted-foreground text-base ml-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 296, children: [
            "(",
            questions.length,
            ")"
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 296,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 294,
          columnNumber: 13
        }, this),
        loading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-12", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 300, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 301 }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 301,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this) : questions.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 304, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "py-12 text-center", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 305, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 306, children: "No questions found. Try adjusting your filters." }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 306,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 305,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 304,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 310, children: questions.map(
          (question) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "hover:border-primary transition-colors", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 312, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 313, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between gap-4", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 314, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 315, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg mb-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 316, children: question.question }, void 0, false, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 316,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 317, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 318, children: question.type }, void 0, false, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 318,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { className: getDifficultyColor(question.difficulty), "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 319, children: question.difficulty }, void 0, false, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 319,
                  columnNumber: 29
                }, this),
                question.industry && question.industry !== "general" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 323, children: question.industry }, void 0, false, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 323,
                  columnNumber: 25
                }, this),
                question.role && question.role !== "general" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 326, children: question.role }, void 0, false, {
                  fileName: "/app/src/pages/exercises.tsx",
                  lineNumber: 326,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/exercises.tsx",
                lineNumber: 317,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 315,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => startPractice(question), "data-dev-file": "/app/src/pages/exercises.tsx", "data-dev-line": 330, children: "Practice" }, void 0, false, {
              fileName: "/app/src/pages/exercises.tsx",
              lineNumber: 330,
              columnNumber: 25
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 314,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 313,
            columnNumber: 21
          }, this) }, question.id, false, {
            fileName: "/app/src/pages/exercises.tsx",
            lineNumber: 312,
            columnNumber: 15
          }, this)
        ) }, void 0, false, {
          fileName: "/app/src/pages/exercises.tsx",
          lineNumber: 310,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/exercises.tsx",
        lineNumber: 293,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/exercises.tsx",
      lineNumber: 230,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/exercises.tsx",
      lineNumber: 229,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/exercises.tsx",
    lineNumber: 225,
    columnNumber: 5
  }, this);
}
export {
  ExercisesPage as default
};
