import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Eye, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MetricsData {
  communication: {
    clarity: number;
    confidence: number;
    responseTime: number;
  };
  bodyLanguage: {
    eyeContact: string;
    posture: string;
    gestures: string;
  };
  performanceTrend: number[];
  improvements: string[];
  strengths: string[];
}

export default function BehavioralMetricsPage() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching metrics data
    setTimeout(() => {
      setData({
        communication: {
          clarity: 8.5,
          confidence: 7.8,
          responseTime: 2.3,
        },
        bodyLanguage: {
          eyeContact: 'Excellent',
          posture: 'Good',
          gestures: 'Natural',
        },
        performanceTrend: [65, 70, 68, 75, 80, 78, 85, 82, 88, 90],
        improvements: [
          'Practice handling unexpected questions with more confidence',
          'Work on reducing filler words (um, uh, like)',
          'Improve technical depth in system design discussions',
          'Develop stronger closing statements for behavioral questions',
        ],
        strengths: [
          'Excellent use of STAR method in behavioral responses',
          'Strong technical communication skills',
          'Natural and engaging storytelling ability',
          'Good pace and clarity in explanations',
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Behavioral Metrics - Interview Intelligence™</title>
      <meta name="description" content="Analyze your behavioral patterns and communication metrics." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Behavioral Metrics</h1>
            <p className="text-muted-foreground">Detailed analysis of your interview performance and behavioral patterns.</p>
          </div>

          {/* Communication & Body Language Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication Analysis
                </CardTitle>
                <CardDescription>Your verbal communication metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Clarity Score</span>
                    <span className="text-lg font-bold text-primary">{data.communication.clarity}/10</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-lg font-bold text-primary">{data.communication.confidence}/10</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Response Time</span>
                    <span className="text-lg font-bold text-primary">{data.communication.responseTime}s avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Body Language
                </CardTitle>
                <CardDescription>Non-verbal communication assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Eye Contact</span>
                    <span className="text-sm font-medium text-primary">{data.bodyLanguage.eyeContact}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Posture</span>
                    <span className="text-sm font-medium text-primary">{data.bodyLanguage.posture}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Gestures</span>
                    <span className="text-sm font-medium text-primary">{data.bodyLanguage.gestures}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Trend */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trends
              </CardTitle>
              <CardDescription>Your performance over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-1">
                {data.performanceTrend.map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-primary rounded-t transition-all duration-300 hover:bg-primary/80 relative group" 
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap">
                      {height}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Improvements Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-green-600" />
                  Your Strengths
                </CardTitle>
                <CardDescription>What you're doing well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>Focus areas to enhance your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <span className="text-orange-600 font-bold mt-0.5">•</span>
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Personalized recommendations based on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Focus Area: Technical Depth</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your technical responses are clear but could benefit from more depth. Consider practicing system design questions and explaining trade-offs in your solutions.
                  </p>
                  <Link to="/exercises?category=technical">
                    <Button size="sm" variant="outline">Practice Technical Questions</Button>
                  </Link>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">💬 Communication Tip</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're doing great with the STAR method! To level up, try adding more quantifiable results and specific metrics to your stories.
                  </p>
                  <Link to="/ai-coach">
                    <Button size="sm" variant="outline">Get AI Coaching</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link to="/simulator-live">
              <Button size="lg">Start Practice Session</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
