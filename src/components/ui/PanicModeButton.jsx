import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

const PanicModeButton = () => {
  const navigate = useNavigate();

  const handlePanicClick = () => {
    navigate('/panic-mode');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handlePanicClick}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse"
        size="icon"
      >
        <AlertTriangle className="h-8 w-8" />
      </Button>
    </div>
  );
};

export default PanicModeButton;