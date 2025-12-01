import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MichiWorld from './components/MichiWorld/MichiWorld';
import LoadingScreen from './components/LoadingScreen';
import Terminal from './components/Terminal';
import GirlyTerminal from './components/GirlyTerminal';
import BioPasswordScreen from './components/BioPasswordScreen';
import BioWorld from './components/BioWorld';

const STAGE_LOADING = 'loading';
const STAGE_TERMINAL = 'terminal';
const STAGE_GIRLY_TERMINAL = 'girly_terminal';
const STAGE_BIO_PASSWORD = 'bio_password';
const STAGE_BIOWORLD = 'bioworld';
const STAGE_MICHI_WORLD = 'michi_world';

function App() {
  const [stage, setStage] = useState(() => {
    const terminalType = localStorage.getItem('terminalType');
    return terminalType === 'girly' ? STAGE_GIRLY_TERMINAL : STAGE_LOADING;
  });

  const handleLoadingComplete = () => {
    const skipTerminal = localStorage.getItem('skipTerminal') === 'true';
    const reqPass = localStorage.getItem('reqPass');
    const isPasswordRequired = reqPass === null ? true : reqPass === 'true';
    const terminalType = localStorage.getItem('terminalType') || 'classic';

    if (skipTerminal) {
      if (isPasswordRequired) {
        setStage(STAGE_BIO_PASSWORD);
      } else {
        setStage(STAGE_BIOWORLD);
      }
    } else {
      if (terminalType === 'girly') {
        setStage(STAGE_GIRLY_TERMINAL);
      } else {
        setStage(STAGE_TERMINAL);
      }
    }
  };

  const handleGirlyTerminalComplete = () => {
    const reqPass = localStorage.getItem('reqPass');
    const isPasswordRequired = reqPass === null ? true : reqPass === 'true';

    if (isPasswordRequired) {
      setStage(STAGE_BIO_PASSWORD);
    } else {
      setStage(STAGE_BIOWORLD);
    }
  };

  return (
    <div className={`w-full h-full ${stage === STAGE_TERMINAL || stage === STAGE_GIRLY_TERMINAL ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden'}`}>
      <AnimatePresence mode="wait">
        {stage === STAGE_LOADING && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {stage === STAGE_TERMINAL && (
          <Terminal key="terminal" onComplete={() => setStage(STAGE_BIOWORLD)} />
        )}
        {stage === STAGE_GIRLY_TERMINAL && (
          <GirlyTerminal key="girly_terminal" onComplete={handleGirlyTerminalComplete} />
        )}
        {stage === STAGE_BIO_PASSWORD && (
          <BioPasswordScreen key="bio_password" onComplete={() => setStage(STAGE_BIOWORLD)} />
        )}
        {stage === STAGE_BIOWORLD && (
          <BioWorld key="bioworld" onStartGame={() => setStage(STAGE_MICHI_WORLD)} />
        )}
        {stage === STAGE_MICHI_WORLD && (
          <MichiWorld key="michi_world" onClose={() => setStage(STAGE_BIOWORLD)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
