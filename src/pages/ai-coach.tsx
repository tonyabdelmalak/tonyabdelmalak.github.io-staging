export default function AICoachPage() {
  return (
    <>
      <title>AI Coach - Interview Intelligence™</title>
      <meta name="description" content="Get personalized coaching and feedback from your AI interview coach." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">AI Interview Coach</h1>
          <p className="text-muted-foreground mb-8">Get personalized coaching and real-time feedback on your interview performance.</p>
          
          <div className="rounded-lg border bg-card p-8">
            <h3 className="font-semibold mb-4">Your AI Coach</h3>
            <p className="text-sm text-muted-foreground mb-6">Ask questions, get feedback, and improve your interview skills</p>
            
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">💡 <strong>Tip:</strong> Practice your elevator pitch and get instant feedback</p>
              </div>
              
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">📊 <strong>Analysis:</strong> Review your communication patterns and body language</p>
              </div>
              
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">🎯 <strong>Goals:</strong> Set personalized improvement targets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
