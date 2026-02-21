import { mysqlTable, int, varchar, text, timestamp, decimal, boolean } from 'drizzle-orm/mysql-core';

// Question Categories
export const questionCategories = mysqlTable('question_categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Questions Library
export const questions = mysqlTable('questions', {
  id: int('id').primaryKey().autoincrement(),
  categoryId: int('category_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // behavioral, technical, situational, etc.
  difficulty: varchar('difficulty', { length: 20 }).notNull(), // entry, mid, senior, executive
  industry: varchar('industry', { length: 100 }),
  role: varchar('role', { length: 100 }),
  question: text('question').notNull(),
  sampleAnswer: text('sample_answer'),
  evaluationCriteria: text('evaluation_criteria'),
  tags: text('tags'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Users
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  profilePicture: varchar('profile_picture', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

// Resumes
export const resumes = mysqlTable('resumes', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  targetRole: varchar('target_role', { length: 255 }),
  targetIndustry: varchar('target_industry', { length: 255 }),
  isPrimary: boolean('is_primary').default(false),
  aiOptimizationScore: decimal('ai_optimization_score', { precision: 5, scale: 2 }),
  lastOptimizedAt: timestamp('last_optimized_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Resume Sections
export const resumeSections = mysqlTable('resume_sections', {
  id: int('id').primaryKey().autoincrement(),
  resumeId: int('resume_id').notNull(),
  sectionType: varchar('section_type', { length: 50 }).notNull(), // summary, experience, education, skills, etc.
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(),
  orderIndex: int('order_index').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Interview Scenarios
export const interviewScenarios = mysqlTable('interview_scenarios', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id'),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  targetRole: varchar('target_role', { length: 255 }),
  targetIndustry: varchar('target_industry', { length: 255 }),
  difficulty: varchar('difficulty', { length: 20 }),
  questionIds: text('question_ids'), // JSON array of question IDs
  isTemplate: boolean('is_template').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Practice Sessions
export const practiceSessions = mysqlTable('practice_sessions', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  scenarioId: int('scenario_id'),
  startedAt: timestamp('started_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  duration: int('duration'), // in seconds
  overallScore: decimal('overall_score', { precision: 5, scale: 2 }),
  confidenceScore: decimal('confidence_score', { precision: 5, scale: 2 }),
  clarityScore: decimal('clarity_score', { precision: 5, scale: 2 }),
  relevanceScore: decimal('relevance_score', { precision: 5, scale: 2 }),
  aiFeedback: text('ai_feedback'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Session Recordings
export const sessionRecordings = mysqlTable('session_recordings', {
  id: int('id').primaryKey().autoincrement(),
  sessionId: int('session_id').notNull(),
  recordingType: varchar('recording_type', { length: 20 }).notNull(), // audio, video
  fileUrl: varchar('file_url', { length: 500 }).notNull(),
  duration: int('duration'), // in seconds
  fileSize: int('file_size'), // in bytes
  createdAt: timestamp('created_at').defaultNow(),
});

// Feedback
export const feedback = mysqlTable('feedback', {
  id: int('id').primaryKey().autoincrement(),
  sessionId: int('session_id').notNull(),
  questionId: int('question_id'),
  responseText: text('response_text'),
  responseDuration: int('response_duration'), // in seconds
  aiScore: decimal('ai_score', { precision: 5, scale: 2 }),
  aiFeedback: text('ai_feedback'),
  strengths: text('strengths'),
  improvements: text('improvements'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Coaching Plans
export const coachingPlans = mysqlTable('coaching_plans', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  focusAreas: text('focus_areas'), // JSON array
  weeklyGoals: text('weekly_goals'),
  progressNotes: text('progress_notes'),
  nextReviewDate: timestamp('next_review_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Progress Tracking
export const progressTracking = mysqlTable('progress_tracking', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  metricType: varchar('metric_type', { length: 100 }).notNull(), // confidence, clarity, technical_score, etc.
  metricValue: decimal('metric_value', { precision: 5, scale: 2 }).notNull(),
  improvementPercentage: decimal('improvement_percentage', { precision: 5, scale: 2 }),
  trackedAt: timestamp('tracked_at').defaultNow(),
});

// Achievements
export const achievements = mysqlTable('achievements', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull(),
  achievementType: varchar('achievement_type', { length: 100 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  earnedAt: timestamp('earned_at').defaultNow(),
});

// User Preferences
export const userPreferences = mysqlTable('user_preferences', {
  id: int('id').primaryKey().autoincrement(),
  userId: int('user_id').notNull().unique(),
  theme: varchar('theme', { length: 20 }).default('light'),
  notifications: boolean('notifications').default(true),
  emailDigest: boolean('email_digest').default(true),
  preferredIndustries: text('preferred_industries'), // JSON array
  preferredRoles: text('preferred_roles'), // JSON array
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
