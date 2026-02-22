import { API_BASE } from '@/lib/api-client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Code, Lightbulb, Crown, MessageSquare, Users, Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
  id: number;
  categoryId: number;
  question: string;
  type: string;
  difficulty: string;
  industry: string | null;
  role: string | null;
  sampleAnswer: string | null;
  evaluationCriteria: string | null;
  tags: string | null;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
}

const iconMap: Record<string, any> = {
  Users,
  Code,
  Lightbulb,
  Crown,
  Brain,
  MessageSquare,
};

export default function ExercisesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [analyzingAnswer, setAnalyzingAnswer] = useState(false);

  useEffect(() => {
    loadCategories();
    loadQuestions();
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [selectedCategory, selectedDifficulty]);

  const loadCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/questions/categories');
      if (!response.ok) {
        // Use fallback categories if API fails
        setCategories([
          { id: 1, name: 'Behavioral', description: 'Behavioral interview questions', icon: 'Users' },
          { id: 2, name: 'Technical', description: 'Technical interview questions', icon: 'Code' },
          { id: 3, name: 'Problem Solving', description: 'Problem-solving questions', icon: 'Lightbulb' },
          { id: 4, name: 'Leadership', description: 'Leadership questions', icon: 'Crown' },
          { id: 5, name: 'Situational', description: 'Situational questions', icon: 'Brain' },
          { id: 6, name: 'Communication', description: 'Communication questions', icon: 'MessageSquare' },
        ]);
        return;
      }
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Use fallback categories
      setCategories([
        { id: 1, name: 'Behavioral', description: 'Behavioral interview questions', icon: 'Users' },
        { id: 2, name: 'Technical', description: 'Technical interview questions', icon: 'Code' },
        { id: 3, name: 'Problem Solving', description: 'Problem-solving questions', icon: 'Lightbulb' },
        { id: 4, name: 'Leadership', description: 'Leadership questions', icon: 'Crown' },
        { id: 5, name: 'Situational', description: 'Situational questions', icon: 'Brain' },
        { id: 6, name: 'Communication', description: 'Communication questions', icon: 'MessageSquare' },
      ]);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty);
      
      const response = await fetch(`${API_BASE}/questions?${params.toString()}`);
      
      if (!response.ok) {
        // Use fallback data if API fails
        console.warn('API failed, using fallback data');
        const fallbackQuestions = getFallbackQuestions();
        setQuestions(fallbackQuestions);
        setError('Using demo data. Database not yet connected.');
        return;
      }
      
      const data = await response.json();
      setQuestions(data.questions || []);
      
      if (data.questions?.length === 0) {
        setError('No questions found. Try different filters.');
      }
    } catch (error) {
      console.error('Failed to load questions:', error);
      const fallbackQuestions = getFallbackQuestions();
      setQuestions(fallbackQuestions);
      setError('Using demo data. Database not yet connected.');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackQuestions = (): Question[] => {
    const allQuestions: Question[] = [
      {
        id: 1,
        categoryId: 1,
        question: 'Tell me about a time when you had to work with a difficult team member.',
        type: 'behavioral',
        difficulty: 'mid',
        industry: null,
        role: null,
        sampleAnswer: 'Use STAR method: Describe the situation, your task, actions taken, and results achieved.',
        evaluationCriteria: 'Conflict resolution, communication, teamwork',
        tags: 'teamwork,conflict-resolution',
      },
      {
        id: 2,
        categoryId: 1,
        question: 'Describe a situation where you had to meet a tight deadline.',
        type: 'behavioral',
        difficulty: 'entry',
        industry: null,
        role: null,
        sampleAnswer: 'Focus on time management, prioritization, and results.',
        evaluationCriteria: 'Time management, prioritization, stress handling',
        tags: 'time-management,deadlines',
      },
      {
        id: 3,
        categoryId: 2,
        question: 'Explain the difference between REST and GraphQL APIs.',
        type: 'technical',
        difficulty: 'mid',
        industry: 'Technology',
        role: 'Software Engineer',
        sampleAnswer: 'REST uses multiple endpoints, GraphQL uses a single endpoint with flexible queries.',
        evaluationCriteria: 'Technical knowledge, clarity of explanation',
        tags: 'api,backend',
      },
      {
        id: 4,
        categoryId: 2,
        question: 'What is the difference between var, let, and const in JavaScript?',
        type: 'technical',
        difficulty: 'entry',
        industry: 'Technology',
        role: 'Frontend Developer',
        sampleAnswer: 'var is function-scoped, let and const are block-scoped. const cannot be reassigned.',
        evaluationCriteria: 'JavaScript fundamentals',
        tags: 'javascript,fundamentals',
      },
      {
        id: 5,
        categoryId: 3,
        question: 'How would you approach debugging a production issue that you cannot reproduce locally?',
        type: 'problem-solving',
        difficulty: 'senior',
        industry: 'Technology',
        role: null,
        sampleAnswer: 'Check logs, monitoring tools, reproduce in staging, use feature flags, etc.',
        evaluationCriteria: 'Problem-solving approach, systematic thinking',
        tags: 'debugging,production',
      },
      {
        id: 6,
        categoryId: 4,
        question: 'Tell me about a time when you had to lead a team through a major change.',
        type: 'leadership',
        difficulty: 'senior',
        industry: null,
        role: 'Manager',
        sampleAnswer: 'Focus on change management, communication, team motivation.',
        evaluationCriteria: 'Leadership, change management, communication',
        tags: 'leadership,change-management',
      },
      {
        id: 7,
        categoryId: 5,
        question: 'What would you do if you disagreed with your manager\'s decision?',
        type: 'situational',
        difficulty: 'mid',
        industry: null,
        role: null,
        sampleAnswer: 'Express concerns professionally, provide data, respect final decision.',
        evaluationCriteria: 'Professional communication, respect for hierarchy',
        tags: 'conflict,communication',
      },
      {
        id: 8,
        categoryId: 6,
        question: 'How do you handle receiving critical feedback?',
        type: 'behavioral',
        difficulty: 'entry',
        industry: null,
        role: null,
        sampleAnswer: 'Listen actively, ask clarifying questions, create action plan.',
        evaluationCriteria: 'Emotional intelligence, growth mindset',
        tags: 'feedback,growth',
      },
      {
        id: 9,
        categoryId: 2,
        question: 'Explain how you would optimize a slow database query.',
        type: 'technical',
        difficulty: 'senior',
        industry: 'Technology',
        role: 'Backend Engineer',
        sampleAnswer: 'Analyze query plan, add indexes, optimize joins, consider caching.',
        evaluationCriteria: 'Database knowledge, optimization skills',
        tags: 'database,performance',
      },
      {
        id: 10,
        categoryId: 1,
        question: 'Describe a time when you failed and what you learned from it.',
        type: 'behavioral',
        difficulty: 'mid',
        industry: null,
        role: null,
        sampleAnswer: 'Be honest, focus on learning and growth, show self-awareness.',
        evaluationCriteria: 'Self-awareness, learning ability, honesty',
        tags: 'failure,learning',
      },
      {
        id: 11,
        categoryId: 3,
        question: 'How would you design a URL shortening service like bit.ly?',
        type: 'system-design',
        difficulty: 'senior',
        industry: 'Technology',
        role: 'Software Engineer',
        sampleAnswer: 'Discuss hashing, database design, scalability, caching.',
        evaluationCriteria: 'System design, scalability thinking',
        tags: 'system-design,scalability',
      },
      {
        id: 12,
        categoryId: 4,
        question: 'How do you motivate team members who are underperforming?',
        type: 'leadership',
        difficulty: 'mid',
        industry: null,
        role: 'Manager',
        sampleAnswer: 'Understand root cause, provide support, set clear goals, regular feedback.',
        evaluationCriteria: 'Leadership, empathy, coaching',
        tags: 'leadership,motivation',
      },
      {
        id: 13,
        categoryId: 6,
        question: 'How would you explain a complex technical concept to a non-technical stakeholder?',
        type: 'communication',
        difficulty: 'mid',
        industry: 'Technology',
        role: null,
        sampleAnswer: 'Use analogies, avoid jargon, focus on business impact.',
        evaluationCriteria: 'Communication, simplification, empathy',
        tags: 'communication,stakeholder-management',
      },
    ];

    // Filter by selected category and difficulty
    return allQuestions.filter(q => {
      const categoryMatch = selectedCategory === 'all' || q.categoryId === parseInt(selectedCategory);
      const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  };

  const startPractice = (question: Question) => {
    setCurrentQuestion(question);
    setUserAnswer('');
    setAiFeedback(null);
    setPracticeMode(true);
  };

  const getAIFeedback = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    setAnalyzingAnswer(true);
    try {
      const response = await fetch(`${API_BASE}/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are an expert interview coach. Analyze the candidate's answer to the interview question and provide constructive feedback. Focus on: 1) Content quality, 2) Structure (STAR method if applicable), 3) Specific strengths, 4) Areas for improvement, 5) Actionable suggestions. Be encouraging but honest.`,
            },
            {
              role: 'user',
              content: `Interview Question: "${currentQuestion.question}"\n\nCandidate's Answer: "${userAnswer}"\n\nEvaluation Criteria: ${currentQuestion.evaluationCriteria || 'General interview response quality'}\n\nSample Answer Guidance: ${currentQuestion.sampleAnswer || 'N/A'}\n\nPlease provide detailed feedback on this answer.`,
            },
          ],
        }),
      });

      const data = await response.json();
      setAiFeedback(data.choices[0].message.content);
    } catch (error) {
      console.error('Failed to get AI feedback:', error);
      setAiFeedback('Sorry, I encountered an error analyzing your answer. Please try again.');
    } finally {
      setAnalyzingAnswer(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'entry': return 'bg-green-500/10 text-green-500';
      case 'mid': return 'bg-blue-500/10 text-blue-500';
      case 'senior': return 'bg-purple-500/10 text-purple-500';
      case 'executive': return 'bg-red-500/10 text-red-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (practiceMode && currentQuestion) {
    return (
      <>
        <title>Practice Exercise - Interview Intelligence™</title>
        <meta name="description" content="Practice your interview response and get AI-powered feedback." />
        
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <Button variant="ghost" onClick={() => setPracticeMode(false)} className="mb-6">
              ← Back to Exercises
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline">{currentQuestion.type}</Badge>
                      <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                      {currentQuestion.industry && (
                        <Badge variant="secondary">{currentQuestion.industry}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Answer</label>
                  <Textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here... Use the STAR method (Situation, Task, Action, Result) for behavioral questions."
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Tip: Aim for 1-2 minutes of speaking time (150-300 words)
                  </p>
                </div>

                <Button
                  onClick={getAIFeedback}
                  disabled={!userAnswer.trim() || analyzingAnswer}
                  className="w-full"
                  size="lg"
                >
                  {analyzingAnswer ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Your Answer...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get AI Feedback
                    </>
                  )}
                </Button>

                {aiFeedback && (
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription className="mt-2">
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-wrap">{aiFeedback}</div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {currentQuestion.sampleAnswer && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-2">Sample Answer Guidance</h4>
                    <p className="text-sm text-muted-foreground">{currentQuestion.sampleAnswer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Exercises - Interview Intelligence™</title>
      <meta name="description" content="Practice exercises to improve your interview skills and performance." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Practice Exercises</h1>
            <p className="text-muted-foreground">Improve your interview skills with our AI-powered question library</p>
          </div>

          {/* Error Message */}
          {error && (
            <Alert className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {categories.map((category) => {
              const Icon = iconMap[category.icon || 'Users'];
              const categoryQuestions = questions.filter(q => q.categoryId === category.id);
              
              return (
                <Card key={category.id} className="hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedCategory(category.id.toString())}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-xs">
                          {categoryQuestions.length} questions
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id.toString() === selectedCategory)?.name || 'Questions'}
              <span className="text-muted-foreground text-base ml-2">({questions.length})</span>
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : questions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No questions found. Try adjusting your filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {questions.map((question) => (
                  <Card key={question.id} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{question.question}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            {question.industry && question.industry !== 'general' && (
                              <Badge variant="secondary">{question.industry}</Badge>
                            )}
                            {question.role && question.role !== 'general' && (
                              <Badge variant="secondary">{question.role}</Badge>
                            )}
                          </div>
                        </div>
                        <Button onClick={() => startPractice(question)}>
                          Practice
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
