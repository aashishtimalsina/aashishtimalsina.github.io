
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from '@/components/Layout';

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-6 max-w-lg px-4">
          <h1 className="text-8xl font-display font-bold text-primary">404</h1>
          <h2 className="text-2xl font-medium">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
