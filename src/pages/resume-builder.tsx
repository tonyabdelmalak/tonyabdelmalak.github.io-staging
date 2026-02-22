import { API_BASE } from '@/lib/api-client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Sparkles, Save, Plus, Trash2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Resume {
  id?: number;
  title: string;
  targetRole: string;
  targetIndustry: string;
  sections: ResumeSection[];
  aiOptimizationScore?: number;
}

interface ResumeSection {
  id?: number;
  sectionType: string;
  title: string;
  content: string;
  orderIndex: number;
}

const SECTION_TYPES = [
  { value: 'summary', label: 'Professional Summary' },
  { value: 'experience', label: 'Work Experience' },
  { value: 'education', label: 'Education' },
  { value: 'skills', label: 'Skills' },
  { value: 'certifications', label: 'Certifications' },
  { value: 'projects', label: 'Projects' },
];

const TEMPLATES = [
  { id: 'professional', name: 'Professional', description: 'Clean and corporate' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design' },
  { id: 'creative', name: 'Creative', description: 'Bold and artistic' },
];

export default function ResumeBuilderPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume>({
    title: 'My Resume',
    targetRole: '',
    targetIndustry: '',
    sections: [],
  });
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const response = await fetch(`${API_BASE}/resumes');
      if (response.ok) {
        const data = await response.json();
        setResumes(data.resumes || []);
      }
    } catch (error) {
      console.error('Failed to load resumes:', error);
    }
  };

  const addSection = () => {
    setCurrentResume({
      ...currentResume,
      sections: [
        ...currentResume.sections,
        {
          sectionType: 'experience',
          title: '',
          content: '',
          orderIndex: currentResume.sections.length,
        },
      ],
    });
  };

  const updateSection = (index: number, field: string, value: string) => {
    const updatedSections = [...currentResume.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setCurrentResume({ ...currentResume, sections: updatedSections });
  };

  const removeSection = (index: number) => {
    const updatedSections = currentResume.sections.filter((_, i) => i !== index);
    setCurrentResume({ ...currentResume, sections: updatedSections });
  };

  const saveResume = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const endpoint = currentResume.id ? `/api/resumes/${currentResume.id}` : '/api/resumes';
      const method = currentResume.id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentResume),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: 'Resume saved successfully!' });
        loadResumes();
        if (!currentResume.id) {
          setCurrentResume(data.resume);
        }
      } else {
        setMessage({ type: 'error', text: 'Failed to save resume' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving resume' });
    } finally {
      setIsSaving(false);
    }
  };

  const optimizeWithAI = async () => {
    if (!currentResume.targetRole) {
      setMessage({ type: 'error', text: 'Please specify a target role first' });
      return;
    }

    setIsOptimizing(true);
    setMessage(null);
    try {
      const response = await fetch(`${API_BASE}/resumes/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: currentResume,
          targetRole: currentResume.targetRole,
          targetIndustry: currentResume.targetIndustry,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentResume({
          ...currentResume,
          sections: data.optimizedSections,
          aiOptimizationScore: data.score,
        });
        setMessage({ type: 'success', text: `Resume optimized! Score: ${data.score}/100` });
      } else {
        setMessage({ type: 'error', text: 'Failed to optimize resume' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error optimizing resume' });
    } finally {
      setIsOptimizing(false);
    }
  };

  const loadResume = (resume: Resume) => {
    setCurrentResume(resume);
  };

  const createNewResume = () => {
    setCurrentResume({
      title: 'My Resume',
      targetRole: '',
      targetIndustry: '',
      sections: [],
    });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Resume Builder</h1>
          <p className="text-muted-foreground">
            Create professional resumes optimized for your target role with AI-powered suggestions
          </p>
        </div>

        {message && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-destructive' : 'border-primary'}`}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Saved Resumes */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Resumes
                </CardTitle>
                <CardDescription>Select or create a new resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={createNewResume} className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Resume
                </Button>
                {resumes.map((resume) => (
                  <Button
                    key={resume.id}
                    onClick={() => loadResume(resume)}
                    variant={currentResume.id === resume.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <div className="text-left">
                      <div className="font-medium">{resume.title}</div>
                      <div className="text-xs text-muted-foreground">{resume.targetRole}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Template Selection */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Template</CardTitle>
                <CardDescription>Choose a design style</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {TEMPLATES.map((template) => (
                  <Button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                    className="w-full justify-start"
                  >
                    <div className="text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs text-muted-foreground">{template.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Resume Editor</CardTitle>
                    <CardDescription>Build and optimize your resume</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveResume} disabled={isSaving} variant="outline">
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </Button>
                    <Button onClick={optimizeWithAI} disabled={isOptimizing}>
                      {isOptimizing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Optimize with AI
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Resume Title</Label>
                    <Input
                      id="title"
                      value={currentResume.title}
                      onChange={(e) => setCurrentResume({ ...currentResume, title: e.target.value })}
                      placeholder="e.g., Software Engineer Resume"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="targetRole">Target Role</Label>
                      <Input
                        id="targetRole"
                        value={currentResume.targetRole}
                        onChange={(e) => setCurrentResume({ ...currentResume, targetRole: e.target.value })}
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetIndustry">Target Industry</Label>
                      <Input
                        id="targetIndustry"
                        value={currentResume.targetIndustry}
                        onChange={(e) =>
                          setCurrentResume({ ...currentResume, targetIndustry: e.target.value })
                        }
                        placeholder="e.g., Technology"
                      />
                    </div>
                  </div>
                  {currentResume.aiOptimizationScore && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        AI Optimization Score: {currentResume.aiOptimizationScore}/100
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Sections */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Resume Sections</h3>
                    <Button onClick={addSection} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>

                  {currentResume.sections.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No sections yet. Click "Add Section" to get started.</p>
                    </div>
                  ) : (
                    currentResume.sections.map((section, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6 space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Section Type</Label>
                                  <Select
                                    value={section.sectionType}
                                    onValueChange={(value) => updateSection(index, 'sectionType', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {SECTION_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                          {type.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={section.title}
                                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                                    placeholder="e.g., Senior Developer at Google"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Content</Label>
                                <Textarea
                                  value={section.content}
                                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                                  placeholder="Describe your experience, achievements, or skills..."
                                  rows={4}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={() => removeSection(index)}
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
