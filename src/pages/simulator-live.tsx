import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Square, Mic, Sparkles, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
  id: number;
  question: string;
  type: string;
  difficulty: string;
  sampleAnswer: string | null;
  evaluationCriteria: string | null;
}

interface SessionQuestion {
  question: Question;
  answer: string;
  duration: number;
  feedback?: string;
}

export default function SimulatorLivePage() {
  const [sessionActive, setSessionActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('mid');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState<SessionQuestion[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (sessionActive && questionStartTime === null) {
      setQuestionStartTime(Date.now());
    }
  }, [sessionActive, currentQuestionIndex]);

  const startSession = async () => {
    if (!selectedCategory) {
      setMessage({ type: 'error', text: 'Please select a category' });
      return;
    }

    try {
      // Fetch questions for the session
      const response = await fetch(
        `/api/questions?category=${selectedCategory}&difficulty=${selectedDifficulty}`
      );
      const data = await response.json();

      if (data.questions.length === 0) {
        setMessage({ type: 'error', text: 'No questions found for this category' });
        return;
      }

      // Take first 5 questions for the session
      setQuestions(data.questions.slice(0, 5));
      setSessionActive(true);
      setCurrentQuestionIndex(0);
      setSessionQuestions([]);
      setSessionComplete(false);
      setQuestionStartTime(Date.now());
      setMessage(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to start session' });
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
      setMessage({ type: 'error', text: 'Microphone access denied' });
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
      setMessage({ type: 'error', text: 'Please provide an answer' });
      return;
    }

    stopRecording();

    const duration = questionStartTime ? Math.floor((Date.now() - questionStartTime) / 1000) : 0;
    const currentQuestion = questions[currentQuestionIndex];

    setIsAnalyzing(true);
    setMessage(null);

    try {
      // Get AI feedback
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are an expert interview coach. Analyze this interview answer and provide constructive feedback. Focus on: structure (STAR method for behavioral), clarity, relevance, and specific improvements. Keep feedback concise (3-4 sentences).`,
            },
            {
              role: 'user',
              content: `Question: ${currentQuestion.question}\n\nCandidate's Answer: ${currentAnswer}\n\nProvide feedback on this answer.`,
            },
          ],
        }),
      });

      const data = await response.json();
      const feedback = data.response || 'No feedback available';

      // Save question with answer and feedback
      const newSessionQuestion: SessionQuestion = {
        question: currentQuestion,
        answer: currentAnswer,
        duration,
        feedback,
      };

      setSessionQuestions([...sessionQuestions, newSessionQuestion]);

      // Move to next question or complete session
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer('');
        setQuestionStartTime(Date.now());
      } else {
        setSessionComplete(true);
        setSessionActive(false);
        await saveSession([...sessionQuestions, newSessionQuestion]);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to analyze answer' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveSession = async (completedQuestions: SessionQuestion[]) => {
    try {
      const totalDuration = completedQuestions.reduce((sum, q) => sum + q.duration, 0);
      const avgScore = 75; // Placeholder - would calculate from AI feedback

      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // MVP default user
          duration: totalDuration,
          overallScore: avgScore,
          questions: completedQuestions.map((q) => ({
            questionId: q.question.id,
            answer: q.answer,
            duration: q.duration,
            feedback: q.feedback,
          })),
        }),
      });

      setMessage({ type: 'success', text: 'Session saved successfully!' });
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const elapsedTime = questionStartTime ? Math.floor((Date.now() - questionStartTime) / 1000) : 0;

  return (
    <>
      <title>Live Simulator - Interview Intelligence™</title>
      <meta name="description" content="Practice interviews in real-time with AI-powered simulation." />

      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Live Interview Simulator</h1>
            <p className="text-muted-foreground">
              Practice real-time interviews with AI feedback and performance tracking
            </p>
          </div>

          {message && (
            <Alert className={`mb-6 ${message.type === 'error' ? 'border-destructive' : 'border-primary'}`}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {!sessionActive && !sessionComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Start Practice Session</CardTitle>
                <CardDescription>Select your interview focus and difficulty level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory?.toString()} onValueChange={(v) => setSelectedCategory(parseInt(v))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Behavioral</SelectItem>
                        <SelectItem value="2">Technical</SelectItem>
                        <SelectItem value="3">Situational</SelectItem>
                        <SelectItem value="4">Leadership</SelectItem>
                        <SelectItem value="5">Problem Solving</SelectItem>
                        <SelectItem value="6">Communication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Difficulty</label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={startSession} className="w-full" size="lg">
                  <Play className="h-5 w-5 mr-2" />
                  Start Session (5 Questions)
                </Button>
              </CardContent>
            </Card>
          )}

          {sessionActive && currentQuestion && (
            <div className="space-y-6">
              {/* Progress */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Question */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{currentQuestion.type}</Badge>
                    <Badge variant="outline">{currentQuestion.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here... (or use voice recording)"
                    rows={8}
                    className="resize-none"
                  />
                  <div className="flex gap-2">
                    {!isRecording ? (
                      <Button onClick={startRecording} variant="outline">
                        <Mic className="h-4 w-4 mr-2" />
                        Start Recording
                      </Button>
                    ) : (
                      <Button onClick={stopRecording} variant="destructive">
                        <Square className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                    <Button onClick={submitAnswer} disabled={isAnalyzing} className="flex-1">
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Submit & Get Feedback
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {sessionComplete && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <CardTitle>Session Complete!</CardTitle>
                </div>
                <CardDescription>Review your performance and feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sessionQuestions.map((sq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <Badge variant="outline">{sq.duration}s</Badge>
                      </div>
                      <CardDescription>{sq.question.question}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Your Answer:</h4>
                        <p className="text-sm text-muted-foreground">{sq.answer}</p>
                      </div>
                      {sq.feedback && (
                        <div className="bg-muted p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            AI Feedback:
                          </h4>
                          <p className="text-sm">{sq.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                <Button onClick={() => window.location.reload()} className="w-full">
                  Start New Session
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
