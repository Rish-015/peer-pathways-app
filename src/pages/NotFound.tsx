import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-comfort">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="w-20 h-20 bg-primary-soft rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! This page doesn't exist
          </p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for might have been moved or doesn't exist. 
            Let's get you back to safety.
          </p>
          <div className="space-y-3">
            <Button variant="calm" size="lg" className="w-full" asChild>
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </a>
            </Button>
            <Button variant="ghost" size="lg" className="w-full" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
