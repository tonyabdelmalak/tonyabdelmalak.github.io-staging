import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from './pages/index';
import Spinner from './components/Spinner';

const SpinnerFallback = () => (
  <div className="flex justify-center py-8 h-screen items-center">
    <Spinner />
  </div>
);

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
const ResumeBuilderPage = lazy(() => import('./pages/resume-builder'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <Suspense fallback={<SpinnerFallback />}><DashboardPage /></Suspense>,
  },
  {
    path: '/simulator-live',
    element: <Suspense fallback={<SpinnerFallback />}><SimulatorLivePage /></Suspense>,
  },
  {
    path: '/ai-coach',
    element: <Suspense fallback={<SpinnerFallback />}><AICoachPage /></Suspense>,
  },
  {
    path: '/interview-prep',
    element: <Suspense fallback={<SpinnerFallback />}><InterviewPrepPage /></Suspense>,
  },
  {
    path: '/exercises',
    element: <Suspense fallback={<SpinnerFallback />}><ExercisesPage /></Suspense>,
  },
  {
    path: '/progress',
    element: <Suspense fallback={<SpinnerFallback />}><ProgressPage /></Suspense>,
  },
  {
    path: '/behavioral-metrics',
    element: <Suspense fallback={<SpinnerFallback />}><BehavioralMetricsPage /></Suspense>,
  },
  {
    path: '/resume-builder',
    element: <Suspense fallback={<SpinnerFallback />}><ResumeBuilderPage /></Suspense>,
  },
  {
    path: '*',
    element: <Suspense fallback={<SpinnerFallback />}><NotFoundPage /></Suspense>,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/dashboard' | '/simulator-live' | '/ai-coach' | '/interview-prep' | '/exercises' | '/progress' | '/behavioral-metrics' | '/resume-builder';

export type Params = Record<string, string | undefined>;
