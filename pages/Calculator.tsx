
import React, { useState } from 'react';
import { User } from '../types';
import { COMPANIES } from '../constants';
import { supabaseService } from '../services/supabaseService';

interface CalculatorProps {
  user: User | null;
  onLoginRequest: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ user, onLoginRequest }) => {
  const [formData, setFormData] = useState({
    company: '',
    type: 'Term',
    age: 25,
    term: 20,
    sumAssured: 1000000,
    frequency: 'Yearly'
  });

  const [result, setResult] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified logic for calculation
    const baseRate = formData.type === 'Term' ? 1.2 : formData.type === 'Health' ? 3.5 : 2.5;
    const ageFactor = formData.age / 10;
    const termFactor = (40 - formData.term) / 10;
    const premium = (formData.sumAssured / 1000) * baseRate * ageFactor * termFactor;
    setResult(Math.round(premium));
  };

  const saveCalculation = async () => {
    if (!user) {
      onLoginRequest();
      return;
    }
    if (result === null) return;

    setIsSaving(true);
    try {
      await supabaseService.addCalculation({
        user_id: user.id,
        company: formData.company || 'Selected Policy',
        policy_type: formData.type,
        age: formData.age,
        term: formData.term,
        sum_assured: formData.sumAssured,
        frequency: formData.frequency,
        annual_premium: result
      });
      alert('Calculation saved to your dashboard!');
    } catch (err) {
      alert('Failed to save calculation.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Premium Calculator</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Get an instant estimate for your insurance premium based on your age, coverage, and policy type.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <form onSubmit={calculate} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Policy Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>Term</option>
                  <option>Health</option>
                  <option>Endowment</option>
                  <option>Savings</option>
                  <option>Motor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Age (Years)</label>
                <input 
                  type="number" 
                  min="18" max="75"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sum Assured (₹)</label>
                <input 
                  type="number" 
                  step="50000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.sumAssured}
                  onChange={e => setFormData({...formData, sumAssured: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Policy Term (Years)</label>
                <input 
                  type="number" 
                  min="5" max="50"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.term}
                  onChange={e => setFormData({...formData, term: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Company (Optional)</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
              >
                <option value="">Any Company</option>
                {COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Calculate My Premium
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
            {result !== null ? (
              <>
                <div className="text-slate-400 text-sm font-bold uppercase tracking-widest">Estimated Yearly Premium</div>
                <div className="text-5xl font-extrabold text-blue-400">₹{result.toLocaleString()}</div>
                <div className="text-slate-500 text-xs">GST applicable as per norms</div>
                <div className="pt-4 w-full">
                  <button 
                    onClick={saveCalculation}
                    disabled={isSaving}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10"
                  >
                    {isSaving ? 'Saving...' : user ? 'Save to Dashboard' : 'Login to Save Result'}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <i className="fas fa-calculator text-5xl text-slate-700"></i>
                <p className="text-slate-400">Fill out the form to see your estimated premium.</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl space-y-3">
            <h4 className="font-bold text-blue-900 flex items-center gap-2">
              <i className="fas fa-info-circle"></i> Why this calculation?
            </h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              This is a preliminary estimate. Final premiums are subject to medical underwriting, lifestyle factors, and specific policy riders chosen at the time of purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
