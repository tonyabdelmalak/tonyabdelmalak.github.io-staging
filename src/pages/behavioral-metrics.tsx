export default function BehavioralMetricsPage() {
  return (
    <>
      <title>Behavioral Metrics - Interview Intelligence™</title>
      <meta name="description" content="Analyze your behavioral patterns and communication metrics." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Behavioral Metrics</h1>
          <p className="text-muted-foreground mb-8">Detailed analysis of your interview performance and behavioral patterns.</p>
          
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Communication Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clarity Score</span>
                    <span className="text-sm font-medium text-primary">8.5/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence Level</span>
                    <span className="text-sm font-medium text-primary">7.8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium text-primary">2.3s avg</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-4">Body Language</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eye Contact</span>
                    <span className="text-sm font-medium text-primary">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Posture</span>
                    <span className="text-sm font-medium text-primary">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gestures</span>
                    <span className="text-sm font-medium text-primary">Natural</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Recent Performance Trends</h3>
              <p className="text-sm text-muted-foreground mb-4">Your performance over the last 30 days</p>
              <div className="h-48 flex items-end justify-between gap-2">
                {[65, 70, 68, 75, 80, 78, 85, 82, 88, 90].map((height, i) => (
                  <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Areas for Improvement</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Practice handling unexpected questions with more confidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Work on reducing filler words (um, uh, like)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Improve technical depth in system design discussions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
