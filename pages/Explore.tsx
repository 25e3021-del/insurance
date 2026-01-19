import React, { useState, useMemo } from 'react';
import { Policy, Company } from '../types';

interface ExploreProps {
  policies: Policy[];
  companies: Company[];
  onNavigate: (page: string) => void;
}

const Explore: React.FC<ExploreProps> = ({ policies, companies, onNavigate }) => {
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const types = useMemo(() => Array.from(new Set(policies.map(p => p.type))), [policies]);

  const filteredPolicies = useMemo(() => {
    return policies.filter(p => {
      const matchCompany = filterCompany === 'all' || p.company === filterCompany;
      const matchType = filterType === 'all' || p.type === filterType;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCompany && matchType && matchSearch;
    });
  }, [policies, filterCompany, filterType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Explore Insurance Solutions</h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed">
          In-depth details for LIC, HDFC, and Star Health policies. Professional quotes are personalized based on your age, lifestyle, and health history.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Search Plans</label>
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search by plan name or feature..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Company</label>
          <select 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium"
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
          >
            <option value="all">All Partners</option>
            {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Policy Category</label>
          <select 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-medium"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Categories</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Policy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredPolicies.map(policy => (
          <div key={policy.id} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-slate-100 transition-all flex flex-col overflow-hidden group">
            <div className="p-10 space-y-8 flex-grow">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl">
                    <i className={`fas ${policy.type === 'Health' ? 'fa-heartbeat' : policy.type === 'Term' ? 'fa-umbrella' : 'fa-vault'}`}></i>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {policy.type} Insurance
                    </span>
                  </div>
                </div>
                {policy.is_popular && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    <i className="fas fa-star mr-1"></i> Best Seller
                  </span>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-3xl font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">{policy.name}</h3>
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                   {policy.company} Limited
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Detailed Coverage
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{policy.detailed_info}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Eligibility Criteria
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{policy.eligibility}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div> High-Impact Features
                    </h4>
                    <ul className="space-y-3">
                      {policy.features.map((f, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <i className="fas fa-check text-blue-500 mt-0.5"></i>
                          <span className="font-semibold">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div> Tax Advantage
                    </h4>
                    <div className="text-xs text-slate-400 bg-purple-50 p-3 rounded-xl border border-purple-100 leading-relaxed italic">
                      {policy.tax_benefits}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-950 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Consultation Status</div>
                <div className="text-sm font-bold text-blue-400">Personalized Quote Available</div>
              </div>
              <button 
                onClick={() => onNavigate('services')}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/40 active:scale-95 text-sm"
              >
                Request Consultation with S. Sundari
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto flex items-center justify-center text-slate-300 text-4xl">
             <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-700 tracking-tight">No policies matched your filters</h3>
          <p className="text-slate-400 text-sm">Try broader keywords or search for categories like 'Health' or 'Term'.</p>
          <button 
            onClick={() => {setFilterCompany('all'); setFilterType('all'); setSearchQuery('');}}
            className="mt-2 text-blue-600 font-bold hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;