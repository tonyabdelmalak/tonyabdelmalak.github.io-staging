import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Brain, FileText, Video, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InterviewPrepPage() {
  const prepCategories = [
    {
      icon: Target,
      title: 'Live Simulator',
      description: 'Practice with AI-powered interview simulations',
      link: '/simulator-live',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      icon: BookOpen,
      title: 'Questions Library',
      description: 'Browse 13+ interview questions across 6 categories',
      link: '/exercises',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    },
    {
      icon: Brain,
      title: 'AI Coach',
      description: 'Get personalized feedback and resume analysis',
      link: '/ai-coach',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create and optimize your resume with AI',
      link: '/resume-builder',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    },
  ];

  const prepTips = [
    {
      title: 'Research the Company',
      description: 'Understand the company culture, values, and recent news',
      icon: '🔍',
    },
    {
      title: 'Practice STAR Method',
      description: 'Structure your answers: Situation, Task, Action, Result',
      icon: '⭐',
    },
    {
      title: 'Prepare Questions',
      description: 'Have 3-5 thoughtful questions ready for the interviewer',
      icon: '❓',
    },
    {
      title: 'Mock Interviews',
      description: 'Practice with our AI simulator to build confidence',
      icon: '🎯',
    },
    {
      title: 'Review Your Resume',
      description: 'Be ready to discuss every point on your resume',
      icon: '📝',
    },
    {
      title: 'Technical Prep',
      description: 'Brush up on relevant technical skills and concepts',
      icon: '💻',
    },
  ];

  return (
    <>
      <title>Interview Prep - Interview Intelligence™</title>
      <meta name="description" content="Comprehensive interview preparation resources and tools." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Interview Preparation</h1>
            <p className="text-muted-foreground">Everything you need to ace your next interview.</p>
          </div>

          {/* Prep Tools Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Preparation Tools</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {prepCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.title} to={category.link}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                          <Icon className={`h-6 w-6 ${category.color}`} />
                        </div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">Get Started →</Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Essential Preparation Tips</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prepTips.map((tip) => (
                <Card key={tip.title}>
                  <CardHeader>
                    <div className="text-3xl mb-2">{tip.icon}</div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interview Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Interview Types We Cover</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Behavioral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tell me about a time when... questions that assess your past experiences and soft skills.
                  </p>
                  <Link to="/exercises?category=behavioral">
                    <Button variant="outline" size="sm" className="w-full">Practice Behavioral</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Technical
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Coding challenges, system design, and technical problem-solving questions.
                  </p>
                  <Link to="/exercises?category=technical">
                    <Button variant="outline" size="sm" className="w-full">Practice Technical</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Case Study
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Business scenarios and analytical thinking questions common in consulting roles.
                  </p>
                  <Link to="/exercises?category=case-study">
                    <Button variant="outline" size="sm" className="w-full">Practice Case Studies</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Start Guide */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>Follow these steps to maximize your preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upload Your Resume</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the AI Coach to analyze your resume and get personalized feedback.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Practice Questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse the questions library and practice answering with AI feedback.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Run Mock Interviews</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the Live Simulator for full interview practice sessions.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track Your Progress</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitor your improvement and focus on areas that need work.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link to="/simulator-live">
              <Button size="lg">Start Practicing Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
