export default function ProgressPage() {
  return (
    <>
      <title>Progress - Interview Intelligence™</title>
      <meta name="description" content="Track your interview preparation progress and improvement over time." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Your Progress</h1>
          <p className="text-muted-foreground mb-8">Track your improvement and celebrate your achievements.</p>
          
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Overall Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Communication Skills</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '85%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Technical Knowledge</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '72%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Behavioral Responses</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-2">Practice Sessions</h3>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Total completed</p>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-2">Hours Practiced</h3>
                <p className="text-3xl font-bold text-primary">12.5</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </div>
              
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold mb-2">Improvement</h3>
                <p className="text-3xl font-bold text-primary">+18%</p>
                <p className="text-sm text-muted-foreground">Since last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
