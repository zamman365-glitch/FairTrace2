import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { logs, stageStatus } = useSocket(sessionId);

  // Auto-navigate to results when the last stage is green
  useEffect(() => {
    if (stageStatus.outputLayer === 'completed') {
      const timer = setTimeout(() => navigate(`/results/${sessionId}`), 1500);
      return () => clearTimeout(timer);
    }
  }, [stageStatus.outputLayer, sessionId, navigate]);

  const stages = [
    { id: 'dataCollection', label: 'Data Collection' },
    { id: 'preprocessing', label: 'Preprocessing' },
    { id: 'modelTraining', label: 'Model Training' },
    { id: 'outputLayer', label: 'Output Layer' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 py-10">
      {/* Left: Forensic Pipeline */}
      <section>
        <h2 className="font-heading text-cyan text-sm tracking-[0.3em] mb-12 flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan rounded-full animate-ping" />
          LIVE_AUDIT_PIPELINE
        </h2>
        
        <div className="relative">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center gap-6 mb-16 relative z-10">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 
                ${stageStatus[stage.id] === 'completed' ? 'bg-success border-success' : 
                  stageStatus[stage.id] === 'active' ? 'bg-cyan border-cyan shadow-[0_0_15px_#00D9FF]' : 
                  stageStatus[stage.id] === 'failed' ? 'bg-danger border-danger' : 'bg-transparent border-white/20'}`}
              >
                {stageStatus[stage.id] === 'completed' && <span className="text-base font-bold">✓</span>}
              </div>
              
              <div>
                <p className={`font-heading uppercase tracking-widest text-sm ${stageStatus[stage.id] === 'pending' ? 'text-white/20' : 'text-white'}`}>
                  {stage.label}
                </p>
                <p className="text-[10px] font-mono text-gray-500 mt-1">
                  STATUS: {stageStatus[stage.id].toUpperCase()}
                </p>
              </div>
            </div>
          ))}

          {/* Background Line */}
          <div className="absolute top-4 left-4 w-px h-[85%] bg-white/10 z-0" />
        </div>
      </section>

      {/* Right: Terminal Console */}
      <section className="flex flex-col h-[650px]... bg-surface border border-white/10 rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-danger/20" />
            <div className="w-3 h-3 rounded-full bg-amber/20" />
            <div className="w-3 h-3 rounded-full bg-success/20" />
          </div>
          <span className="text-[10px] font-mono text-gray-500">SESSION: {sessionId?.slice(0, 8)}</span>
        </div>
        
        <div className="p-6 font-mono text-xs overflow-y-auto space-y-2 flex-1 scrollbar-hide select-none">
          {logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              key={i} 
              className="flex gap-4"
            >
              <span className="text-cyan opacity-50">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
              <span className="text-gray-300">{log}</span>
            </motion.div>
          ))}
          {logs.length === 0 && <div className="text-white/10 italic">Waiting for telemetry data...</div>}
        </div>
      </section>
    </div>
  );
};

export default ProgressPage;