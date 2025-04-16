
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-purple/10 text-brand-purple">
          <ShoppingBag className="h-8 w-8" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 text-brand-purple">404</h1>
        
        <p className="text-xl text-gray-600 mb-2">Page Not Found</p>
        
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="bg-brand-purple hover:bg-brand-darkPurple">
          <Link to="/">Return to Shop</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
