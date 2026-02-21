import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Target, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Interview Intelligence™
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Master Interview Performance
              <span className="block text-primary mt-2">Under Pressure</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Welcome to Interview Intelligence™ - AI-powered interview preparation and performance platform designed to help you detect signals, navigate objections, and secure opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  View Performance Report
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/simulator-live">Try Live Simulator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Daily Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle>AI Daily Insights</CardTitle>
              </div>
              <CardDescription>Personalized recommendations powered by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-lg">
                  Your objection handling score dropped to 38/100. When challenged, you're getting defensive instead of reframing with evidence.
                </p>
                <Badge variant="destructive">Category: Skill Decline</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
            <p className="text-muted-foreground text-lg">Start your coaching journey</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-2" />
                <CardTitle>AI Coach</CardTitle>
                <CardDescription>
                  Get personalized interview coaching and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/ai-coach">Start Coaching</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Interview Simulator</CardTitle>
                <CardDescription>
                  Practice Signal Intelligence™ in realistic interview scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/simulator-live">Launch Simulator</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Exercises</CardTitle>
                <CardDescription>
                  Practice with interactive interview skill-building exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/exercises">View Exercises</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Coaching Modules</CardTitle>
                <CardDescription>
                  Structured learning paths for interview mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/coaching-modules">Explore Modules</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interview Intelligence Capabilities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interview Intelligence Capabilities</h2>
            <p className="text-muted-foreground text-lg mb-2">8 core capabilities for interview excellence</p>
            <p className="text-sm text-muted-foreground italic">
              Insights are based on observable interaction patterns. AI supports interpretation; humans decide responses.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Interview Signal Awareness', link: '/metrics/interview-signal-awareness' },
              { num: 2, title: 'Signal Interpretation', link: '/metrics/signal-interpretation' },
              { num: 3, title: 'Candidate Value Framing', link: '/metrics/candidate-value-framing' },
              { num: 4, title: 'Interviewer Engagement Monitoring', link: '/metrics/interviewer-engagement' },
              { num: 5, title: 'Interview Objection Navigation', link: '/metrics/interview-objection-navigation' },
              { num: 6, title: 'Conversation Management', link: '/metrics/conversation-management' },
              { num: 7, title: 'Adaptive Response', link: '/metrics/adaptive-response' },
              { num: 8, title: 'Commitment Gaining', link: '/metrics/commitment-gaining' },
            ].map((capability) => (
              <Card key={capability.num} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{capability.num}</span>
                    </div>
                    <CardTitle className="text-base">{capability.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link to={capability.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            All capabilities work together as an integrated system
          </p>
        </div>
      </section>
    </div>
  );
}
