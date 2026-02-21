export default function DashboardPage() {
  return (
    <>
      <title>Dashboard - Interview Intelligence™</title>
      <meta name="description" content="Your interview preparation dashboard with AI insights and performance metrics." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Track your interview preparation progress and performance metrics.</p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-2">Recent Sessions</h3>
              <p className="text-sm text-muted-foreground">View your latest practice sessions</p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-2">Performance Score</h3>
              <p className="text-sm text-muted-foreground">Track your improvement over time</p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-2">Upcoming Goals</h3>
              <p className="text-sm text-muted-foreground">Set and achieve your targets</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
