import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { questions, questionCategories } from '../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    // Check if already seeded
    const existingCategories = await db.select().from(questionCategories);
    if (existingCategories.length > 0) {
      return res.json({ message: 'Database already seeded', categories: existingCategories.length });
    }

    // Seed categories
    const categoryData = [
      { name: 'Behavioral', description: 'Questions about past experiences and behaviors', icon: 'Users' },
      { name: 'Technical', description: 'Technical skills and knowledge assessment', icon: 'Code' },
      { name: 'Situational', description: 'Hypothetical scenario-based questions', icon: 'Lightbulb' },
      { name: 'Leadership', description: 'Leadership and management capabilities', icon: 'Crown' },
      { name: 'Problem Solving', description: 'Analytical and critical thinking questions', icon: 'Brain' },
      { name: 'Communication', description: 'Communication and interpersonal skills', icon: 'MessageSquare' },
    ];

    await db.insert(questionCategories).values(categoryData);
    const categoryIds = await db.select().from(questionCategories);

    // Seed questions
    const questionData = [
      {
        categoryId: categoryIds[0].id, // Behavioral
        type: 'behavioral',
        difficulty: 'mid',
        industry: 'general',
        role: 'general',
        question: 'Tell me about a time when you had to deal with a difficult team member.',
        sampleAnswer: 'Use the STAR method: Describe the Situation, Task, Action you took, and Result. Focus on conflict resolution, communication, and maintaining team productivity.',
        evaluationCriteria: 'Conflict resolution skills, emotional intelligence, communication, professionalism',
        tags: 'teamwork,conflict,communication',
      },
      {
        categoryId: categoryIds[0].id, // Behavioral
        type: 'behavioral',
        difficulty: 'senior',
        industry: 'general',
        role: 'general',
        question: 'Describe a situation where you had to make a difficult decision with incomplete information.',
        sampleAnswer: 'Explain your decision-making process, risk assessment, stakeholder consultation, and how you mitigated uncertainty. Emphasize analytical thinking and leadership.',
        evaluationCriteria: 'Decision-making, risk management, analytical thinking, leadership',
        tags: 'decision-making,leadership,risk',
      },
      {
        categoryId: categoryIds[1].id, // Technical
        type: 'technical',
        difficulty: 'mid',
        industry: 'technology',
        role: 'software-engineer',
        question: 'Explain the difference between REST and GraphQL APIs.',
        sampleAnswer: 'REST uses multiple endpoints with fixed data structures, while GraphQL uses a single endpoint with flexible queries. Discuss pros/cons: REST is simpler and cacheable, GraphQL reduces over-fetching and under-fetching.',
        evaluationCriteria: 'Technical knowledge, ability to explain complex concepts, understanding of trade-offs',
        tags: 'api,rest,graphql,backend',
      },
      {
        categoryId: categoryIds[1].id, // Technical
        type: 'technical',
        difficulty: 'senior',
        industry: 'technology',
        role: 'software-engineer',
        question: 'How would you design a system to handle 1 million concurrent users?',
        sampleAnswer: 'Discuss load balancing, horizontal scaling, caching strategies (Redis/CDN), database sharding, microservices architecture, and monitoring. Consider CAP theorem trade-offs.',
        evaluationCriteria: 'System design knowledge, scalability understanding, architectural thinking',
        tags: 'system-design,scalability,architecture',
      },
      {
        categoryId: categoryIds[2].id, // Situational
        type: 'situational',
        difficulty: 'mid',
        industry: 'general',
        role: 'general',
        question: 'What would you do if you disagreed with your manager\'s decision on a project direction?',
        sampleAnswer: 'Express your concerns professionally with data/reasoning, listen to their perspective, propose alternatives, and ultimately support the final decision while documenting concerns if necessary.',
        evaluationCriteria: 'Professional maturity, communication, respect for hierarchy, problem-solving',
        tags: 'conflict,management,communication',
      },
      {
        categoryId: categoryIds[2].id, // Situational
        type: 'situational',
        difficulty: 'entry',
        industry: 'general',
        role: 'general',
        question: 'How would you handle a situation where you\'re assigned a task you\'ve never done before?',
        sampleAnswer: 'Research and learn independently, ask clarifying questions, seek mentorship, break down the task into smaller steps, and communicate progress regularly.',
        evaluationCriteria: 'Learning agility, resourcefulness, communication, initiative',
        tags: 'learning,initiative,problem-solving',
      },
      {
        categoryId: categoryIds[3].id, // Leadership
        type: 'leadership',
        difficulty: 'senior',
        industry: 'general',
        role: 'manager',
        question: 'How do you motivate a team that\'s facing repeated setbacks?',
        sampleAnswer: 'Acknowledge challenges, celebrate small wins, provide clear vision, offer support and resources, maintain transparency, and focus on learning from failures.',
        evaluationCriteria: 'Leadership, emotional intelligence, resilience, team management',
        tags: 'leadership,motivation,team-management',
      },
      {
        categoryId: categoryIds[3].id, // Leadership
        type: 'leadership',
        difficulty: 'executive',
        industry: 'general',
        role: 'executive',
        question: 'Describe your approach to building and scaling high-performing teams.',
        sampleAnswer: 'Discuss hiring for culture fit and skills, creating psychological safety, setting clear goals, providing growth opportunities, fostering collaboration, and measuring performance.',
        evaluationCriteria: 'Strategic thinking, people management, organizational development',
        tags: 'leadership,team-building,strategy',
      },
      {
        categoryId: categoryIds[4].id, // Problem Solving
        type: 'case-study',
        difficulty: 'senior',
        industry: 'general',
        role: 'general',
        question: 'How many gas stations are there in the United States?',
        sampleAnswer: 'Use Fermi estimation: ~330M people, ~250M cars, average 1 fill-up/week, 10 cars/hour/station, 12 hours/day operation. Calculate: 250M fills/week ÷ 7 days ÷ 12 hours ÷ 10 cars = ~300K stations. (Actual: ~150K)',
        evaluationCriteria: 'Analytical thinking, structured problem-solving, estimation skills, communication',
        tags: 'estimation,analytical,case-study',
      },
      {
        categoryId: categoryIds[4].id, // Problem Solving
        type: 'problem-solving',
        difficulty: 'mid',
        industry: 'general',
        role: 'general',
        question: 'A client reports that a feature is broken. Walk me through your troubleshooting process.',
        sampleAnswer: 'Reproduce the issue, gather details (browser, steps, error messages), check logs, isolate variables, test hypotheses systematically, communicate findings, and implement/verify fix.',
        evaluationCriteria: 'Systematic thinking, debugging methodology, communication, customer focus',
        tags: 'troubleshooting,debugging,customer-service',
      },
      {
        categoryId: categoryIds[5].id, // Communication
        type: 'communication',
        difficulty: 'mid',
        industry: 'general',
        role: 'general',
        question: 'How would you explain a complex technical concept to a non-technical stakeholder?',
        sampleAnswer: 'Use analogies, avoid jargon, focus on business impact, use visuals, check for understanding, and tailor explanation to their background and needs.',
        evaluationCriteria: 'Communication clarity, empathy, adaptability, business acumen',
        tags: 'communication,stakeholder-management,technical-translation',
      },
      {
        categoryId: categoryIds[5].id, // Communication
        type: 'communication',
        difficulty: 'entry',
        industry: 'general',
        role: 'general',
        question: 'Tell me about a time when you had to deliver bad news to a client or stakeholder.',
        sampleAnswer: 'Be direct but empathetic, provide context, take responsibility if applicable, offer solutions or alternatives, and maintain professionalism throughout.',
        evaluationCriteria: 'Communication skills, emotional intelligence, professionalism, problem-solving',
        tags: 'communication,difficult-conversations,professionalism',
      },
    ];

    await db.insert(questions).values(questionData);

    res.json({
      message: 'Database seeded successfully',
      categories: categoryData.length,
      questions: questionData.length,
    });
  } catch (error) {
    console.error('Failed to seed database:', error);
    res.status(500).json({ error: 'Failed to seed database', message: String(error) });
  }
}
