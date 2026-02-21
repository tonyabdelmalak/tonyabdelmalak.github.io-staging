import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgressData {
  overallScore: number;
  skillScores: {
    communication: number;
    technical: number;
    behavioral: number;
    problemSolving: number;
  };
  stats: {
    totalSessions: number;
    hoursPracticed: number;
    improvement: number;
  };
  weeklyProgress: number[];
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    icon: string;
  }>;
}

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching progress data
    setTimeout(() => {
      setData({
        overallScore: 82,
        skillScores: {
          communication: 85,
          technical: 72,
          behavioral: 90,
          problemSolving: 78,
        },
        stats: {
          totalSessions: 24,
          hoursPracticed: 12.5,
          improvement: 18,
        },
        weeklyProgress: [65, 70, 68, 75, 80, 78, 85],
        achievements: [
          {
            id: '1',
            title: 'First Session Complete',
            description: 'Completed your first practice session',
            date: '2026-02-01',
            icon: '🎯',
          },
          {
            id: '2',
            title: '10 Sessions Milestone',
            description: 'Completed 10 practice sessions',
            date: '2026-02-10',
            icon: '🏆',
          },
          {
            id: '3',
            title: 'Perfect Score',
            description: 'Achieved 100% on a practice session',
            date: '2026-02-15',
            icon: '⭐',
          },
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
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>Progress - Interview Intelligence™</title>
      <meta name="description" content="Track your interview preparation progress and improvement over time." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Your Progress</h1>
            <p className="text-muted-foreground">Track your improvement and celebrate your achievements.</p>
          </div>

          {/* Overall Score */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overall Performance Score</CardTitle>
              <CardDescription>Your average score across all practice sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <div className="text-6xl font-bold text-primary">{data.overallScore}%</div>
                  <TrendingUp className="absolute -top-2 -right-8 h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Sessions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{data.stats.totalSessions}</div>
                <p className="text-sm text-muted-foreground">Total completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Practiced</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{data.stats.hoursPracticed}</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Improvement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+{data.stats.improvement}%</div>
                <p className="text-sm text-muted-foreground">Since last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Skill Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skill Breakdown</CardTitle>
              <CardDescription>Your performance across different skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(data.skillScores).map(([skill, score]) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-sm font-medium text-primary">{score}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: `${score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your performance trend over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2">
                {data.weeklyProgress.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-primary rounded-t transition-all duration-500 hover:bg-primary/80" 
                        style={{ height: `${(score / 100) * 200}px` }}
                      />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
                        {score}%
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Milestones you've unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link to="/simulator-live">
              <Button size="lg">Continue Practicing</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
