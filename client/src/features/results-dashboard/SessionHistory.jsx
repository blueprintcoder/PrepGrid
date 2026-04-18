import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { 
  History, Calendar, Briefcase, TrendingUp, ChevronRight, 
  MessageSquare, User, Loader2, ArrowLeft, Star 
} from 'lucide-react';

const SessionHistory = ({ onBack, onViewResult }) => {
  const { getToken } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = await getToken();
        const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
        const res = await axios.get(`${API_BASE_URL}/api/interview/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSessions(res.data);
      } catch (err) {
        console.error('History Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <Loader2 className="w-12 h-12 text-[#14532D] animate-spin" />
        <p className="text-[#374151] font-bold uppercase tracking-widest text-sm">Retrieving Archive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#14532D] font-bold text-sm transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-[#14532D]" />
          <h2 className="text-3xl font-black text-[#111827] tracking-tight uppercase">Session <span className="text-[#14532D]">History</span></h2>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-[32px] p-20 text-center space-y-4">
          <div className="w-16 h-16 bg-[#F9FAFB] rounded-full flex items-center justify-center mx-auto border border-[#E5E7EB]">
            <Briefcase className="w-8 h-8 text-[#D1D5DB]" />
          </div>
          <h3 className="text-xl font-bold text-[#111827]">No interviews yet</h3>
          <p className="text-[#6B7280] max-w-sm mx-auto">Complete your first mock interview to see your detailed performance history and growth tracking here.</p>
          <button 
            onClick={onBack}
            className="mt-4 bg-[#14532D] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#14532D]/20 hover:bg-[#111827] transition-all"
          >
            Start New Interview
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div 
              key={session._id}
              onClick={() => onViewResult(session._id)}
              className="group bg-white border border-[#E5E7EB] p-6 rounded-[24px] hover:border-[#14532D]/50 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#14532D]/5 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-[#14532D]/5 rounded-2xl flex items-center justify-center group-hover:bg-[#14532D] transition-colors">
                  <Briefcase className="w-6 h-6 text-[#14532D] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#111827] mb-1">{session.role || 'Software Engineer'}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#6B7280]">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(session.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Score: {session.score?.overall || 0}%</span>
                    <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> {session.currentLevel.toUpperCase()} LEVEL</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#F3F4F6]">
                <div className="flex -space-x-2">
                  {(session.stack || []).slice(0, 3).map((tech, i) => (
                    <div key={i} className="px-2.5 py-1 bg-[#F3F4F6] border border-white rounded-full text-[10px] font-bold text-[#4B5563] uppercase tracking-tighter">
                      {tech}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#14532D] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View Report <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
