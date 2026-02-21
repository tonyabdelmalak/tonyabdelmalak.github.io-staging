import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Target, TrendingUp, Clock, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalSessions: number;
  averageScore: number;
  hoursPracticed: number;
  improvement: number;
  recentSessions: Array<{
    id: string;
    date: string;
    type: string;
    score: number;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 0,
    averageScore: 0,
    hoursPracticed: 0,
    improvement: 0,
    recentSessions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    // In production, this would call /api/dashboard
    setTimeout(() => {
      setStats({
        totalSessions: 24,
        averageScore: 82,
        hoursPracticed: 12.5,
        improvement: 18,
        recentSessions: [
          { id: '1', date: '2026-02-20', type: 'Live Simulator', score: 88 },
          { id: '2', date: '2026-02-19', type: 'Behavioral Practice', score: 85 },
          { id: '3', date: '2026-02-18', type: 'Technical Interview', score: 79 },
        ],
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Dashboard - Interview Intelligence™</title>
      <meta name="description" content="Your interview preparation dashboard with AI insights and performance metrics." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your interview preparation progress and performance metrics.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSessions}</div>
                <p className="text-xs text-muted-foreground">Practice sessions completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageScore}%</div>
                <p className="text-xs text-muted-foreground">Across all sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Practiced</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.hoursPracticed}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{stats.improvement}%</div>
                <p className="text-xs text-muted-foreground">Since last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link to="/simulator-live">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <Target className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Start Practice</CardTitle>
                    <CardDescription>Begin a new interview simulation</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/exercises">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Browse Questions</CardTitle>
                    <CardDescription>Explore interview questions library</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/ai-coach">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <Activity className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">AI Coach</CardTitle>
                    <CardDescription>Get personalized feedback</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link to="/resume-builder">
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Resume Builder</CardTitle>
                    <CardDescription>Optimize your resume with AI</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>Your latest practice sessions and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentSessions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No sessions yet. Start practicing to see your progress!</p>
                  <Link to="/simulator-live">
                    <Button>Start Your First Session</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{session.type}</p>
                        <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{session.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                    </div>
                  ))}
                  <Link to="/progress">
                    <Button variant="outline" className="w-full">View All Sessions</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
