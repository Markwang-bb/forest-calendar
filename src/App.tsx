import React from 'react';
import Calendar from './components/Calendar';
import './index.css'; // Import Tailwind CSS

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-pink-400">
      <Calendar />
    </div>
  );
};

export default App;
