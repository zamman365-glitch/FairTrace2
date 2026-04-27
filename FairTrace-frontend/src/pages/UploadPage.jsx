import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Target, Binary, Upload } from 'lucide-react';

const UploadPage = () => {
  const [files, setFiles] = useState({ csv: null, pkl: null });
  const [meta, setMeta] = useState({ target: '', attribute: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simplified logic for testing: Button unlocks if at least one file and one text field is present
  const canClick = (files.csv || files.pkl) && (meta.target || meta.attribute);

  const handleUpload = () => {
    setLoading(true);
    const mockId = `case-${Math.random().toString(36).substr(2, 5)}`;
    
    // Using a manual timeout to ensure you see the transition
    setTimeout(() => {
      navigate(`/progress/${mockId}`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-8 relative">
      {/* Tactical Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-4xl bg-[#161B22] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)] z-10">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" />
            <h1 className="font-heading font-black text-xl tracking-tight text-white uppercase">Bias Autopsy <span className="text-[#00D9FF]/50 text-sm ml-2">v4.1</span></h1>
          </div>
          <div className="text-[10px] font-mono text-[#00D9FF] px-4 py-2 bg-[#00D9FF]/10 rounded-md border border-[#00D9FF]/20 uppercase tracking-widest">
            System Initialization Protocol
          </div>
        </div>

        <div className="p-10 space-y-8">
          {/* Upload Grid */}
          <div className="grid grid-cols-2 gap-8">
            <DropZone id="csv" label="Dataset Source" file={files.csv} onFile={(f) => setFiles({...files, csv: f})} />
            <DropZone id="pkl" label="Model Artifact" file={files.pkl} onFile={(f) => setFiles({...files, pkl: f})} />
          </div>

          {/* Meta Inputs */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">
                <Target size={12} /> Target Column
              </label>
              <input 
                type="text" 
                placeholder="e.g. loan status" 
                className="w-full bg-[#0D1117] border border-white/10 p-4 rounded-xl text-white font-mono text-sm focus:border-[#00D9FF] outline-none transition-all"
                onChange={(e) => setMeta({...meta, target: e.target.value})} 
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1">
                <Binary size={12} /> Protected Attribute
              </label>
              <input 
                type="text" 
                placeholder="e.g. gender" 
                className="w-full bg-[#0D1117] border border-white/10 p-4 rounded-xl text-white font-mono text-sm focus:border-[#00D9FF] outline-none transition-all"
                onChange={(e) => setMeta({...meta, attribute: e.target.value})} 
              />
            </div>
          </div>

          {/* THE BUTTON */}
          <button 
            type="button"
            onClick={handleUpload}
            disabled={!canClick || loading}
            className={`w-full py-6 rounded-2xl font-heading font-black uppercase tracking-[0.4em] text-sm transition-all duration-300 transform active:scale-[0.98]
              ${canClick ? 'bg-[#00D9FF] text-[#0D1117] shadow-[0_0_40px_rgba(0,217,255,0.3)] cursor-pointer' : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'}`}
          >
            {loading ? 'Executing Analysis...' : 'Run Forensic Audit'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- Simplified Component for internal use --- */
const DropZone = ({ id, label, file, onFile }) => (
  <div className={`relative border border-dashed rounded-2xl p-10 text-center transition-all 
    ${file ? 'border-[#2ECC71] bg-[#2ECC71]/5' : 'border-white/10 bg-[#0D1117] hover:border-[#00D9FF]/50'}`}>
    <input type="file" className="hidden" id={id} onChange={(e) => onFile(e.target.files[0])} />
    <label htmlFor={id} className="cursor-pointer block">
      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 border ${file ? 'text-[#2ECC71] border-[#2ECC71]/30' : 'text-gray-700 border-white/10'}`}>
        {file ? <Shield size={24} /> : <Upload size={24} />}
      </div>
      <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-xs font-bold truncate ${file ? 'text-[#2ECC71]' : 'text-gray-400'}`}>
        {file ? 'Artifact Captured' : 'Select File'}
      </p>
    </label>
  </div>
);

export default UploadPage;