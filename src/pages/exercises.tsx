export default function ExercisesPage() {
  return (
    <>
      <title>Exercises - Interview Intelligence™</title>
      <meta name="description" content="Practice exercises to improve your interview skills and performance." />
      
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Practice Exercises</h1>
          <p className="text-muted-foreground mb-8">Improve your interview skills with targeted practice exercises.</p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Communication Skills</h3>
              <p className="text-sm text-muted-foreground mb-4">Practice clear and concise communication</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Body Language</h3>
              <p className="text-sm text-muted-foreground mb-4">Improve your non-verbal communication</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Stress Management</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn to stay calm under pressure</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Problem Solving</h3>
              <p className="text-sm text-muted-foreground mb-4">Practice analytical thinking</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Behavioral Questions</h3>
              <p className="text-sm text-muted-foreground mb-4">Master STAR method responses</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Technical Prep</h3>
              <p className="text-sm text-muted-foreground mb-4">Practice technical interview questions</p>
              <button className="text-sm font-medium text-primary hover:underline">Start Exercise →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
