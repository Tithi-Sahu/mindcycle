import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">
              Page Not Found
            </h2>
            <p className="mt-2 text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go to Dashboard
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;