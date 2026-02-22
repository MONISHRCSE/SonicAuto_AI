import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CarSelection from './components/CarSelection';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [step, setStep] = useState('login'); // login, selection, dashboard
  const [sessionData, setSessionData] = useState({
    user: null,
    car: null,
    part: null
  });

  const handleLogin = (user) => {
    setSessionData(prev => ({ ...prev, user }));
    setStep('selection');
  };

  const handleSelectionComplete = (selection) => {
    setSessionData(prev => ({ ...prev, car: { make: selection.make, model: selection.model }, part: selection.part }));
    setStep('dashboard');
  };

  const handleBackToSelection = () => {
    setStep('selection');
  };

  return (
    <div className="w-full h-screen bg-void-black text-white selection:bg-electric-cyan selection:text-black font-inter overflow-hidden relative">
      <AnimatePresence mode="wait">
        {step === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
            <Login onLogin={handleLogin} />
          </motion.div>
        )}

        {step === 'selection' && (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
            <CarSelection onComplete={handleSelectionComplete} />
          </motion.div>
        )}

        {step === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0">
            <Dashboard
              initialPart={sessionData.part}
              carDetails={sessionData.car}
              onBack={handleBackToSelection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
