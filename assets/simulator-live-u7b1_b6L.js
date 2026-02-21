import { r as reactExports, j as jsxDevRuntimeExports, G as Play, H as Clock, J as Mic, K as Square, N as LoaderCircle, W as Sparkles, Y as CircleCheck } from "./vendor-Cu2fM0-2.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, B as Button, e as Badge } from "./main-deerAjmx.js";
import { T as Textarea } from "./textarea-Cs6fkvGK.js";
import { A as Alert, a as AlertDescription, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./alert-DMslP0O7.js";
import "./preload-DYXzOcNn.js";
function SimulatorLivePage() {
  const [sessionActive, setSessionActive] = reactExports.useState(false);
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = reactExports.useState("mid");
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = reactExports.useState(0);
  const [sessionQuestions, setSessionQuestions] = reactExports.useState([]);
  const [currentAnswer, setCurrentAnswer] = reactExports.useState("");
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [questionStartTime, setQuestionStartTime] = reactExports.useState(null);
  const [isAnalyzing, setIsAnalyzing] = reactExports.useState(false);
  const [sessionComplete, setSessionComplete] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const audioChunksRef = reactExports.useRef([]);
  reactExports.useEffect(() => {
    if (sessionActive && questionStartTime === null) {
      setQuestionStartTime(Date.now());
    }
  }, [sessionActive, currentQuestionIndex]);
  const startSession = async () => {
    if (!selectedCategory) {
      setMessage({ type: "error", text: "Please select a category" });
      return;
    }
    try {
      const response = await fetch(
        `/api/questions?category=${selectedCategory}&difficulty=${selectedDifficulty}`
      );
      const data = await response.json();
      if (data.questions.length === 0) {
        setMessage({ type: "error", text: "No questions found for this category" });
        return;
      }
      setQuestions(data.questions.slice(0, 5));
      setSessionActive(true);
      setCurrentQuestionIndex(0);
      setSessionQuestions([]);
      setSessionComplete(false);
      setQuestionStartTime(Date.now());
      setMessage(null);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to start session" });
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      setMessage({ type: "error", text: "Microphone access denied" });
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };
  const submitAnswer = async () => {
    if (!currentAnswer.trim()) {
      setMessage({ type: "error", text: "Please provide an answer" });
      return;
    }
    stopRecording();
    const duration = questionStartTime ? Math.floor((Date.now() - questionStartTime) / 1e3) : 0;
    const currentQuestion2 = questions[currentQuestionIndex];
    setIsAnalyzing(true);
    setMessage(null);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are an expert interview coach. Analyze this interview answer and provide constructive feedback. Focus on: structure (STAR method for behavioral), clarity, relevance, and specific improvements. Keep feedback concise (3-4 sentences).`
            },
            {
              role: "user",
              content: `Question: ${currentQuestion2.question}

Candidate's Answer: ${currentAnswer}

Provide feedback on this answer.`
            }
          ]
        })
      });
      const data = await response.json();
      const feedback = data.response || "No feedback available";
      const newSessionQuestion = {
        question: currentQuestion2,
        answer: currentAnswer,
        duration,
        feedback
      };
      setSessionQuestions([...sessionQuestions, newSessionQuestion]);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer("");
        setQuestionStartTime(Date.now());
      } else {
        setSessionComplete(true);
        setSessionActive(false);
        await saveSession([...sessionQuestions, newSessionQuestion]);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to analyze answer" });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const saveSession = async (completedQuestions) => {
    try {
      const totalDuration = completedQuestions.reduce((sum, q) => sum + q.duration, 0);
      const avgScore = 75;
      await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          // MVP default user
          duration: totalDuration,
          overallScore: avgScore,
          questions: completedQuestions.map((q) => ({
            questionId: q.question.id,
            answer: q.answer,
            duration: q.duration,
            feedback: q.feedback
          }))
        })
      });
      setMessage({ type: "success", text: "Session saved successfully!" });
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };
  const currentQuestion = questions[currentQuestionIndex];
  const elapsedTime = questionStartTime ? Math.floor((Date.now() - questionStartTime) / 1e3) : 0;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("title", { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 201, children: "Live Simulator - Interview Intelligence™" }, void 0, false, {
      fileName: "/app/src/pages/simulator-live.tsx",
      lineNumber: 201,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meta", { name: "description", content: "Practice interviews in real-time with AI-powered simulation.", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 202 }, void 0, false, {
      fileName: "/app/src/pages/simulator-live.tsx",
      lineNumber: 202,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-background py-12", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 204, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-4 max-w-5xl", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 205, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 207, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl font-bold mb-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 208, children: "Live Interview Simulator" }, void 0, false, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 208,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-muted-foreground", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 209, children: "Practice real-time interviews with AI feedback and performance tracking" }, void 0, false, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 209,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 207,
        columnNumber: 11
      }, this),
      message && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Alert, { className: `mb-6 ${message.type === "error" ? "border-destructive" : "border-primary"}`, "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 215, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDescription, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 216, children: message.text }, void 0, false, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 216,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 215,
        columnNumber: 11
      }, this),
      !sessionActive && !sessionComplete && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 221, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 222, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 223, children: "Start Practice Session" }, void 0, false, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 223,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 224, children: "Select your interview focus and difficulty level" }, void 0, false, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 222,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 226, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 227, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 228, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm font-medium mb-2 block", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 229, children: "Category" }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 229,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: selectedCategory == null ? void 0 : selectedCategory.toString(), onValueChange: (v) => setSelectedCategory(parseInt(v)), "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 230, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 231, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Select category", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 232 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 232,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 231,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 234, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "1", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 235, children: "Behavioral" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 235,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 236, children: "Technical" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 236,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "3", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 237, children: "Situational" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 237,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "4", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 238, children: "Leadership" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 238,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "5", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 239, children: "Problem Solving" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 239,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "6", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 240, children: "Communication" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 240,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 234,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 230,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 228,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 244, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "text-sm font-medium mb-2 block", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 245, children: "Difficulty" }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 245,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: selectedDifficulty, onValueChange: setSelectedDifficulty, "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 246, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 247, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 248 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 248,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 247,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 250, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "entry", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 251, children: "Entry Level" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 251,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "mid", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 252, children: "Mid Level" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 252,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "senior", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 253, children: "Senior Level" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 253,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "executive", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 254, children: "Executive" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 254,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 250,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 246,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 244,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 227,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: startSession, className: "w-full", size: "lg", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 259, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Play, { className: "h-5 w-5 mr-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 260 }, void 0, false, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 260,
              columnNumber: 19
            }, this),
            "Start Session (5 Questions)"
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 259,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 226,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 221,
        columnNumber: 11
      }, this),
      sessionActive && currentQuestion && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 268, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 270, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "pt-6", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 271, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 272, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 273, children: [
              "Question ",
              currentQuestionIndex + 1,
              " of ",
              questions.length
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 273,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 276, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "h-4 w-4 text-muted-foreground", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 277 }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 277,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-muted-foreground", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 278, children: [
                Math.floor(elapsedTime / 60),
                ":",
                (elapsedTime % 60).toString().padStart(2, "0")
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 278,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 276,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 272,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full bg-muted rounded-full h-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 283, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "bg-primary h-2 rounded-full transition-all",
              style: { width: `${(currentQuestionIndex + 1) / questions.length * 100}%` },
              "data-dev-file": "/app/src/pages/simulator-live.tsx",
              "data-dev-line": 284
            },
            void 0,
            false,
            {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 284,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 283,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 271,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 270,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 293, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 294, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 295, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 296, children: currentQuestion.type }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 296,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 297, children: currentQuestion.difficulty }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 297,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 295,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-2xl", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 299, children: currentQuestion.question }, void 0, false, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 299,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 294,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 301, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Textarea,
              {
                value: currentAnswer,
                onChange: (e) => setCurrentAnswer(e.target.value),
                placeholder: "Type your answer here... (or use voice recording)",
                rows: 8,
                className: "resize-none",
                "data-dev-file": "/app/src/pages/simulator-live.tsx",
                "data-dev-line": 302
              },
              void 0,
              false,
              {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 302,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 309, children: [
              !isRecording ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: startRecording, variant: "outline", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 311, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Mic, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 312 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 312,
                  columnNumber: 25
                }, this),
                "Start Recording"
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 311,
                columnNumber: 19
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: stopRecording, variant: "destructive", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 316, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Square, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 317 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 317,
                  columnNumber: 25
                }, this),
                "Stop Recording"
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 316,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: submitAnswer, disabled: isAnalyzing, className: "flex-1", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 321, children: isAnalyzing ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 324 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 324,
                  columnNumber: 27
                }, this),
                "Analyzing..."
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 323,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-4 w-4 mr-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 329 }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 329,
                  columnNumber: 27
                }, this),
                "Submit & Get Feedback"
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 328,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 321,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 309,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 301,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 293,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 268,
        columnNumber: 11
      }, this),
      sessionComplete && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 341, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 342, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mb-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 343, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { className: "h-6 w-6 text-primary", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 344 }, void 0, false, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 344,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 345, children: "Session Complete!" }, void 0, false, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 345,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 347, children: "Review your performance and feedback" }, void 0, false, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 347,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 342,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 349, children: [
          sessionQuestions.map(
            (sq, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 351, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 352, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 353, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 354, children: [
                    "Question ",
                    index + 1
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 354,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 355, children: [
                    sq.duration,
                    "s"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 355,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 353,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 357, children: sq.question.question }, void 0, false, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 357,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 352,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 359, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 360, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium mb-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 361, children: "Your Answer:" }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 361,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 362, children: sq.answer }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 362,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 360,
                  columnNumber: 23
                }, this),
                sq.feedback && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-muted p-4 rounded-lg", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 365, children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "text-sm font-medium mb-2 flex items-center gap-2", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 366, children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sparkles, { className: "h-4 w-4", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 367 }, void 0, false, {
                      fileName: "/app/src/pages/simulator-live.tsx",
                      lineNumber: 367,
                      columnNumber: 29
                    }, this),
                    "AI Feedback:"
                  ] }, void 0, true, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 366,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 370, children: sq.feedback }, void 0, false, {
                    fileName: "/app/src/pages/simulator-live.tsx",
                    lineNumber: 370,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/src/pages/simulator-live.tsx",
                  lineNumber: 365,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/src/pages/simulator-live.tsx",
                lineNumber: 359,
                columnNumber: 21
              }, this)
            ] }, index, true, {
              fileName: "/app/src/pages/simulator-live.tsx",
              lineNumber: 351,
              columnNumber: 15
            }, this)
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => window.location.reload(), className: "w-full", "data-dev-file": "/app/src/pages/simulator-live.tsx", "data-dev-line": 376, children: "Start New Session" }, void 0, false, {
            fileName: "/app/src/pages/simulator-live.tsx",
            lineNumber: 376,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/src/pages/simulator-live.tsx",
          lineNumber: 349,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/src/pages/simulator-live.tsx",
        lineNumber: 341,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/src/pages/simulator-live.tsx",
      lineNumber: 205,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/src/pages/simulator-live.tsx",
      lineNumber: 204,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/src/pages/simulator-live.tsx",
    lineNumber: 200,
    columnNumber: 5
  }, this);
}
export {
  SimulatorLivePage as default
};
