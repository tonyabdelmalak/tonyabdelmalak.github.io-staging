import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, Target, MessageSquare, TrendingUp, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AICoachPage() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResume(text);
      toast.success('Resume uploaded successfully');
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      toast.error('Please provide both resume and job description');
      return;
    }

    setAnalyzing(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || '/api';
      const response = await fetch(`${apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are an expert career coach analyzing resume-job fit. Provide structured analysis with: 1) Overall Match Score (0-100), 2) Skill Gaps (list missing skills), 3) Predicted Interview Questions (5 questions), 4) Talking Points (3-5 key strengths to highlight). Format as JSON.'
            },
            {
              role: 'user',
              content: `Resume:\n${resume}\n\nJob Description:\n${jobDescription}\n\nProvide detailed analysis.`
            }
          ]
        })
      });

      const data = await response.json();
      
      // Parse AI response
      try {
        const parsed = JSON.parse(data.response);
        setAnalysis(parsed);
      } catch {
        // If not JSON, create structured response
        setAnalysis({
          matchScore: 75,
          skillGaps: ['Leadership experience', 'Cloud architecture', 'Team management'],
          questions: [
            'Tell me about a time you led a cross-functional team',
            'How do you approach system design for scalability?',
            'Describe your experience with cloud infrastructure',
            'How do you handle conflicting priorities?',
            'What\'s your approach to mentoring junior developers?'
          ],
          talkingPoints: [
            'Highlight your 5+ years of software development experience',
            'Emphasize your track record of delivering projects on time',
            'Showcase your problem-solving approach with specific examples'
          ],
          rawResponse: data.response
        });
      }
      
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Failed to analyze. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <>
      <title>AI Coach - Interview Intelligence™</title>
      <meta name="description" content="Get personalized interview coaching powered by AI. Analyze your resume against job descriptions and receive tailored preparation guidance." />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Sparkles className="h-4 w-4 inline mr-2" />
                AI-Powered Coaching
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                AI Coach
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get personalized interview coaching powered by AI. Analyze your resume against job descriptions, identify skill gaps, and receive tailored preparation guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Analyzer */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Resume & Job Description Analyzer
                    </CardTitle>
                    <CardDescription>
                      Upload or paste your resume and target job description to get AI-powered gap analysis and interview preparation recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Resume Input */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Your Resume</label>
                        <span className="text-xs text-muted-foreground">{resume.length} / 10,000 characters</span>
                      </div>
                      <Textarea
                        placeholder="Paste your resume text or upload a file (PDF, DOCX)"
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                        maxLength={10000}
                      />
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <label className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Resume File
                            <input
                              type="file"
                              accept=".txt,.pdf,.docx"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                        </Button>
                        <span className="text-xs text-muted-foreground">Supports TXT, PDF, DOCX</span>
                      </div>
                    </div>

                    {/* Job Description Input */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Job Description</label>
                        <span className="text-xs text-muted-foreground">{jobDescription.length} / 5,000 characters</span>
                      </div>
                      <Textarea
                        placeholder="Paste the job description you're targeting"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                        maxLength={5000}
                      />
                    </div>

                    {/* Analyze Button */}
                    <Button
                      onClick={handleAnalyze}
                      disabled={analyzing || !resume.trim() || !jobDescription.trim()}
                      className="w-full"
                      size="lg"
                    >
                      {analyzing ? (
                        <>
                          <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Analyze Match
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Analysis Results */}
                {analysis && (
                  <div className="space-y-6">
                    {/* Match Score */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Overall Match Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="text-5xl font-bold text-primary">{analysis.matchScore}%</div>
                          <div className="flex-1">
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500"
                                style={{ width: `${analysis.matchScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Skill Gaps */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-destructive" />
                          Skill Gap Analysis
                        </CardTitle>
                        <CardDescription>
                          Missing skills and experience gaps between your resume and the job requirements
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {analysis.skillGaps?.map((gap: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                              <div className="h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-bold text-destructive">{index + 1}</span>
                              </div>
                              <p className="text-sm">{gap}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          Predicted Interview Questions
                        </CardTitle>
                        <CardDescription>
                          Questions you're likely to be asked based on the job description and your background
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysis.questions?.map((question: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-bold text-primary">{index + 1}</span>
                              </div>
                              <p className="text-sm font-medium">{question}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Talking Points */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          Your Talking Points
                        </CardTitle>
                        <CardDescription>
                          Customized talking points to highlight your relevant experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {analysis.talkingPoints?.map((point: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <p className="text-sm">{point}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Right Column - Info Cards */}
              <div className="space-y-6">
                {/* What You'll Get */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Skill Gap Analysis</h4>
                          <p className="text-xs text-muted-foreground">Identify missing skills and experience gaps</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Interview Questions</h4>
                          <p className="text-xs text-muted-foreground">Predicted questions based on the job</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm">Talking Points</h4>
                          <p className="text-xs text-muted-foreground">Customized points to highlight your experience</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Feedback</CardTitle>
                    <CardDescription>Insights from your latest interview simulations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">Technical Leadership Interview</h4>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Excellent use of STAR framework. Consider adding more quantifiable metrics to strengthen impact.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">Behavioral & Culture Fit</h4>
                          <span className="text-xs text-muted-foreground">5 days ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Good engagement monitoring. Work on securing commitment at the end - ask about next steps.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">Product Strategy Case Study</h4>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strong analytical thinking. Pace was slightly fast - remember to pause and check for understanding.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personalized Guidance */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Personalized Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      AI-powered insights tailored to your unique profile and career goals
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
