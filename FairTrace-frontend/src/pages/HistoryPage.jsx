import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Shield, ChevronRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [audits, setAudits] = useState([
    { id: 'CASE-8821', date: 'April 26, 2026', result: 'Flagged', score: '88%', model: 'Credit_Risk_v4.pkl' },
    { id: 'CASE-7402', date: 'April 25, 2026', result: 'Clear', score: '94%', model: 'Hiring_Model_Final.pkl' },
    { id: 'CASE-1109', date: 'April 24, 2026', result: 'Critical', score: '62%', model: 'XGBoost_Test_01.pkl' },
  ]);

return (
    <> {/* <--- Add this Fragment opening tag */}
      {/* 1. Search Bar */}
      <div className="max-w-6xl mx-auto px-10 pt-10">
        <div className="relative mb-10">
            <input 
                type="text" 
                placeholder="SEARCH DATABASE FOR CASE ID..." 
                className="w-full bg-transparent border-b border-white/10 py-4 font-mono text-xs tracking-widest outline-none focus:border-cyan transition-all text-white"
            />
            <div className="absolute right-0 bottom-4 text-[10px] text-gray-700 font-mono italic">
                SECURE_QUERY_v4.1
            </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-6xl mx-auto px-10 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan mb-3">
              <Activity size={18} />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Security Module</span>
            </div>
            <h1 className="text-4xl font-heading font-black uppercase tracking-tight text-white">Audit History</h1>
            <p className="text-gray-500 text-sm mt-2">Browse and manage previous forensic examinations.</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-1">Total Examinations</div>
            <div className="text-2xl font-heading font-bold text-white">{audits.length}</div>
          </div>
        </div>

        {/* Audit Grid */}
        <div className="grid gap-6">
          {audits.map((audit, index) => (
            <motion.div 
              key={audit.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/results/${audit.id}`)}
              className="group bg-surface/40 hover:bg-surface/80 border border-white/5 p-8 rounded-2xl transition-all cursor-pointer flex flex-wrap md:flex-nowrap items-center justify-between scanner-effect"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-14 h-14 bg-base rounded-xl border border-white/10 flex items-center justify-center text-gray-600 group-hover:text-cyan group-hover:border-cyan/30 transition-all shadow-inner">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-cyan transition-colors">{audit.id}</h3>
                  <p className="text-xs text-gray-500">{audit.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-12 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right">
                  <p className="text-[10px] font-mono text-gray-600 uppercase mb-2 tracking-widest">Model Examined</p>
                  <p className="text-xs text-gray-400 font-mono italic">{audit.model}</p>
                </div>
                
                <div className="text-center min-w-25">
                  <p className="text-[10px] font-mono text-gray-600 uppercase mb-2 tracking-widest">Verdict</p>
                  <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full border ${
                    audit.result === 'Clear' ? 'text-success border-success/20 bg-success/5' : 
                    audit.result === 'Flagged' ? 'text-amber border-amber/20 bg-amber/5' : 'text-danger border-danger/20 bg-danger/5'
                  }`}>
                    {audit.result}
                  </span>
                </div>
                <ChevronRight className="text-gray-800 group-hover:text-cyan group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </> 
  );
};

export default HistoryPage;