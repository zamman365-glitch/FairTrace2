import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (sessionId) => {
  const [logs, setLogs] = useState([]);
  const [stageStatus, setStageStatus] = useState({
    dataCollection: 'pending',
    preprocessing: 'pending',
    modelTraining: 'pending',
    outputLayer: 'pending',
  });

  useEffect(() => {
    if (!sessionId) return;
    // --- SIMULATOR LOGIC ---
    const stages = ['dataCollection', 'preprocessing', 'modelTraining', 'outputLayer'];
    const mockLogs = [
      "Initializing connection to Bias Engine...",
      "Extracting features from CSV dataset...",
      "Identifying protected attributes: gender, race...",
      "Analyzing class distribution...",
      "Running DPD and EOD calculations...",
      "Training forensic shadow model...",
      "Generating bias amplification heatmap...",
      "Finalizing autopsy report..."
    ];

    let currentStageIndex = 0;

    const interval = setInterval(() => {
      if (currentStageIndex < stages.length) {
        const currentStage = stages[currentStageIndex];
        
        // 1. Set current stage to active
        setStageStatus(prev => ({ ...prev, [currentStage]: 'active' }));
        setLogs(prev => [...prev, `[SYSTEM] ${mockLogs[currentStageIndex * 2]}`]);

        // 2. Wait a bit, then set it to completed
        setTimeout(() => {
          setStageStatus(prev => ({ ...prev, [currentStage]: 'completed' }));
          setLogs(prev => [...prev, `[SUCCESS] ${mockLogs[currentStageIndex * 2 + 1]}`]);
          currentStageIndex++;
        }, 2000);
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
    // -----------------------
  }, [sessionId]);

  return { logs, stageStatus };
};