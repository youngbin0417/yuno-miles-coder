import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground"></div>
    </div>
  );
};

export default Spinner;