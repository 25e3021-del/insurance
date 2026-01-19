import React, { useState, useEffect } from 'react';
import { User, ServiceRequest } from '../types';
import { supabaseService } from '../services/supabaseService';

interface DashboardProps {
  user: User | null;
  onLogin: (u: User) => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogin, onLogout, onNavigate }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const r = await supabaseService.getServiceRequests(user!.id);
      setRequests(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    
    if (authMode === 'register') {
      if (!fullName.trim() || !phone.trim()) {
        alert("Full Name and Mobile Number are required for registration.");
        return;
      }
      if (phone.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
    }
    
    setLoading(true);
    try {
      const u = await supabaseService.signUp(email, fullName || email.split('@')[0], phone);
      onLogin(u);
    } catch (err: any) {
      console.error(err);
      alert(`Authentication failed: ${err.message || 'Check your credentials.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-blue-200">
              <i className={`fas ${authMode === 'login' ? 'fa-lock' : 'fa-user-plus'}`}></i>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              {authMode === 'login' ? 'Client Access' : 'Create Profile'}
            </h2>
            <p className="text-slate-500 text-sm">Join Sundari's Insurance Network in Chennai.</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${authMode === 'login' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${authMode === 'register' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {authMode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-circle-notch animate-spin"></i> Processing...
                </span>
              ) : (
                authMode === 'login' ? 'Continue to Dashboard' : 'Complete Registration'
              )}
            </button>
          </form>
          <div className="text-center pt-2">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              By continuing, you agree to receive insurance policy information and updates via the provided contact details. Your data is stored securely in our private cloud.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl font-bold">
            {user.full_name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{user.full_name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full"><i className="fas fa-envelope text-blue-500"></i> {user.email}</span>
              {user.phone && <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full"><i className="fas fa-phone text-blue-500"></i> {user.phone}</span>}
              <span className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full font-bold uppercase text-[10px] text-blue-600"><i className="fas fa-shield-alt"></i> {user.role}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="px-6 py-2.5 border border-red-100 text-red-600 rounded-full hover:bg-red-50 font-bold text-sm transition-all"
        >
          <i className="fas fa-sign-out-alt mr-2"></i> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
            <i className="fas fa-headset text-8xl"></i>
          </div>
          <div className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Active Requests</div>
          <div className="text-5xl font-bold">{requests.filter(r => r.status !== 'completed').length}</div>
          <p className="text-slate-400 text-sm">Tickets being processed by S. Sundari.</p>
        </div>
        
        <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm space-y-3 md:col-span-2 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-slate-800">Direct Consultancy</h3>
          <p className="text-slate-500 text-sm max-w-lg">Need immediate help with a claim or maturity benefit? Contact S. Sundari directly at <strong>9087353502</strong> for personalized 1-on-1 guidance.</p>
          <div className="pt-2">
            <button onClick={() => onNavigate('services')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
              Create New Request
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Support History</h3>
          <div className="h-px bg-slate-200 flex-grow mx-6 hidden md:block"></div>
        </div>
        <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
           {loading ? (
            <div className="p-20 text-center text-slate-400">
               <i className="fas fa-circle-notch animate-spin text-3xl mb-4"></i>
               <p className="font-medium">Syncing with secure cloud...</p>
            </div>
          ) : requests.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {requests.map(req => (
                <div key={req.id} className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-sm">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <span className="font-bold text-slate-800 text-lg">{req.service_type}</span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1 pl-13">{req.description}</p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-13">
                      <span>{req.company}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>Requested on {new Date(req.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <span className={`text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest ${
                      req.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      req.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {req.status}
                    </span>
                    <i className="fas fa-chevron-right text-slate-300 group-hover:text-blue-500 transition-colors"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-24 text-center text-slate-400 space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-300 text-3xl">
                <i className="fas fa-inbox"></i>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-slate-500">No requests found.</p>
                <p className="text-sm">Start a new request to see it appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;