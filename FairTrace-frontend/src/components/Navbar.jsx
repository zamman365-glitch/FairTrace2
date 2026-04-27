import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full h-20 px-10 flex justify-between items-center bg-[#05070A] border-b-2 border-[#00D9FF]/20 sticky top-0 z-[100].. shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-3 h-3 bg-[#00D9FF] rounded-full animate-pulse shadow-[0_0_10px_#00D9FF]" />
        <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
          BIAS <span className="text-[#00D9FF]">AUTOPSY</span>
        </h1>
      </div>

      <button 
        onClick={() => navigate('/history')}
        className="px-6 py-2 border border-[#00D9FF]/30 text-[#00D9FF] text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#00D9FF] hover:text-black transition-all rounded"
      >
        Access Archive
      </button>
    </nav>
  );
};

export default Navbar;