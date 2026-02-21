export default function SimulatorLivePage() {
  return (
    <>
      <title>Live Simulator - Interview Intelligence™</title>
      <meta name="description" content="Practice interviews in real-time with AI-powered simulation." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Live Interview Simulator</h1>
          <p className="text-muted-foreground mb-8">Practice real-time interviews with AI feedback and analysis.</p>
          
          <div className="rounded-lg border bg-card p-8">
            <h3 className="font-semibold mb-4">Start a Practice Session</h3>
            <p className="text-sm text-muted-foreground mb-6">Choose your interview type and begin practicing</p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <button className="rounded-lg border p-4 text-left hover:bg-accent transition-colors">
                <h4 className="font-semibold mb-2">Behavioral Interview</h4>
                <p className="text-sm text-muted-foreground">Practice STAR method responses</p>
              </button>
              
              <button className="rounded-lg border p-4 text-left hover:bg-accent transition-colors">
                <h4 className="font-semibold mb-2">Technical Interview</h4>
                <p className="text-sm text-muted-foreground">Solve coding and system design problems</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
