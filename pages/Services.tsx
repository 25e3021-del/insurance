
import React, { useState } from 'react';
import { User } from '../types';
import { COMPANIES, SERVICE_TYPES } from '../constants';
import { supabaseService } from '../services/supabaseService';

interface ServicesProps {
  user: User | null;
  onNavigate: (page: string) => void;
}

const Services: React.FC<ServicesProps> = ({ user, onNavigate }) => {
  const [formData, setFormData] = useState({
    type: SERVICE_TYPES[0],
    company: 'LIC',
    description: '',
    date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onNavigate('dashboard');
      return;
    }

    setIsSubmitting(true);
    try {
      await supabaseService.addServiceRequest({
        user_id: user.id,
        user_name: user.full_name,
        user_email: user.email,
        user_phone: user.phone || '',
        service_type: formData.type,
        company: formData.company,
        description: formData.description,
        preferred_date: formData.date
      });
      setSuccess(true);
      setFormData({ type: SERVICE_TYPES[0], company: 'LIC', description: '', date: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      alert("Submission failed. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
          <i className="fas fa-lock text-5xl text-blue-200 mb-6"></i>
          <h2 className="text-3xl font-bold text-slate-800">Login Required</h2>
          <p className="text-slate-500 mb-8">Service tracking requires a secure connection to your Supabase account.</p>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">Service & Assistance</h1>
        <p className="text-slate-500">Your requests are securely stored and monitored 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-bounce">
                <i className="fas fa-check-circle"></i>
                Stored in cloud! S. Sundari will be notified.
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Service Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  required
                >
                  {SERVICE_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Insurance Company</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                >
                  {COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Preferred Callback Date</label>
              <input 
                type="date" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Detailed Description</label>
              <textarea 
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Briefly explain your requirement..."
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all disabled:bg-slate-300 shadow-lg shadow-blue-100"
            >
              {isSubmitting ? 'Syncing...' : 'Submit to Cloud'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-bold text-blue-400">Database Active</h3>
            <p className="text-slate-400 text-sm">Your service history is preserved permanently in our Supabase instance.</p>
            <div className="flex items-center gap-3 text-white">
              <i className="fas fa-database"></i>
              <span className="font-bold">Encrypted Storage</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800">Process</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-slate-600">
                <i className="fas fa-cloud-upload-alt text-blue-500"></i>
                <span>Instant upload to project database</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-600">
                <i className="fas fa-bell text-blue-500"></i>
                <span>Admin dashboard notification</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
