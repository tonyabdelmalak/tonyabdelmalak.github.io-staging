export default function InterviewPrepPage() {
  return (
    <>
      <title>Interview Prep - Interview Intelligence™</title>
      <meta name="description" content="Comprehensive interview preparation resources and materials." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Interview Preparation</h1>
          <p className="text-muted-foreground mb-8">Access comprehensive resources to prepare for your interviews.</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Common Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">Practice answers to frequently asked interview questions</p>
              <ul className="space-y-2 text-sm">
                <li>• Tell me about yourself</li>
                <li>• What are your strengths?</li>
                <li>• Describe a challenge you overcame</li>
                <li>• Why do you want this role?</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Industry-Specific Prep</h3>
              <p className="text-sm text-muted-foreground mb-4">Tailored preparation for your target industry</p>
              <ul className="space-y-2 text-sm">
                <li>• Tech & Software</li>
                <li>• Finance & Consulting</li>
                <li>• Healthcare</li>
                <li>• Marketing & Sales</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">STAR Method</h3>
              <p className="text-sm text-muted-foreground mb-4">Master the Situation, Task, Action, Result framework</p>
              <ul className="space-y-2 text-sm">
                <li>• Structure your responses</li>
                <li>• Practice with examples</li>
                <li>• Get AI feedback</li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Company Research</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn how to research and prepare for specific companies</p>
              <ul className="space-y-2 text-sm">
                <li>• Company culture analysis</li>
                <li>• Recent news & developments</li>
                <li>• Role-specific insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
