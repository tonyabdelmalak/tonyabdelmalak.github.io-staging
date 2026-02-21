import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';

// Lazy load components for code splitting (except HomePage for instant loading)
const isDevelopment = import.meta.env.MODE === 'development';
const NotFoundPage = isDevelopment ? lazy(() => import('../dev-tools/src/PageNotFound')) : lazy(() => import('./pages/_404'));
const DashboardPage = lazy(() => import('./pages/dashboard'));
const SimulatorLivePage = lazy(() => import('./pages/simulator-live'));
const AICoachPage = lazy(() => import('./pages/ai-coach'));
const InterviewPrepPage = lazy(() => import('./pages/interview-prep'));
const ExercisesPage = lazy(() => import('./pages/exercises'));
const ProgressPage = lazy(() => import('./pages/progress'));
const BehavioralMetricsPage = lazy(() => import('./pages/behavioral-metrics'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/simulator-live',
    element: <SimulatorLivePage />,
  },
  {
    path: '/ai-coach',
    element: <AICoachPage />,
  },
  {
    path: '/interview-prep',
    element: <InterviewPrepPage />,
  },
  {
    path: '/exercises',
    element: <ExercisesPage />,
  },
  {
    path: '/progress',
    element: <ProgressPage />,
  },
  {
    path: '/behavioral-metrics',
    element: <BehavioralMetricsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/dashboard' | '/simulator-live' | '/ai-coach' | '/interview-prep' | '/exercises' | '/progress' | '/behavioral-metrics';

export type Params = Record<string, string | undefined>;
