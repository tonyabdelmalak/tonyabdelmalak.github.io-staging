import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">ReflectivAI</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered interview preparation and performance platform for career excellence.
            </p>
            <a
              href="mailto:support@interviewintelligence.ai"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@interviewintelligence.ai
            </a>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/interview-simulator" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Interview Simulator
                </Link>
              </li>
              <li>
                <Link to="/ai-coach" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  AI Coach
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Exercises
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/coaching-modules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Coaching Modules
                </Link>
              </li>
              <li>
                <Link to="/behavioral-metrics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Behavioral Metrics
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.godaddy.com/legal/agreements/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Interview Intelligence™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
