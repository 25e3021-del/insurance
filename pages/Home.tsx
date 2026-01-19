
import React from 'react';
import { COMPANIES } from '../constants';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
            alt="Insurance Professional" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950/90 to-blue-900/40 z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-3xl space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/30 border border-blue-400/50 text-blue-300 text-sm font-bold uppercase tracking-widest animate-pulse">
              25+ Years of Excellence
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.15]">
              S. Sundari <br/>
              <span className="text-blue-400">Senior Insurance Consultant</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              Providing personalized life, health, and general insurance solutions across Chennai. Trusted advisor for LIC, HDFC ERGO, Star Health, and more.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => onNavigate('explore')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-blue-900/50 transition-all hover:-translate-y-1"
              >
                View Best Plans
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
              >
                Book Consultation
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-fit">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-400 uppercase">Call Directly</span>
                <span className="text-lg font-bold">9087353502</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-400 uppercase">Location</span>
                <span className="text-lg font-bold">Padi, Chennai</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Refined */}
      <section className="max-w-7xl mx-auto px-4 -mt-24 relative z-30">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
           <div className="text-center mb-10">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Authorized Partner For</h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {COMPANIES.map(company => (
              <div key={company.id} className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => onNavigate('explore')}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all text-white`} style={{backgroundColor: company.color}}>
                  <i className={`fas ${company.logo}`}></i>
                </div>
                <span className="font-bold text-slate-800 text-sm">{company.name}</span>
                <span className="text-[10px] text-slate-400 font-medium">{company.rating} ★ Rating</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900">Expert Guidance for <br/><span className="text-blue-600">Total Financial Peace</span></h2>
              <p className="text-slate-600 text-lg">Insurance is not just a product, it's a promise. We help you choose the right promises from the right companies.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Claim Assistance', desc: 'Direct support during hospitalizations or tragedies. We handle the paperwork, you handle the recovery.', icon: 'fa-hands-helping', color: 'bg-green-100 text-green-600' },
                { title: 'Policy Audits', desc: 'Review your existing policies to check for gaps in coverage or better premium opportunities.', icon: 'fa-file-invoice-dollar', color: 'bg-amber-100 text-amber-600' },
                { title: 'Home Services', desc: 'Personalized visits in Padi and surrounding Chennai areas for documentation collection.', icon: 'fa-home', color: 'bg-blue-100 text-blue-600' }
              ].map((service, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-800 text-lg">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[3rem] -rotate-3"></div>
            <div className="relative bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-800">Office Information</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><i className="fas fa-clock"></i></div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Working Hours</div>
                    <div className="text-sm font-bold text-slate-700">Mon - Sat: 9:30 AM - 6:30 PM</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><i className="fas fa-map-pin"></i></div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Office Address</div>
                    <div className="text-sm font-bold text-slate-700 leading-tight">No 25, Sathyanagar 2nd Main Road, Padi, Chennai 50</div>
                  </div>
                </div>
                <div className="p-4 bg-blue-600 rounded-2xl flex items-center gap-4 text-white">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><i className="fas fa-phone"></i></div>
                  <div>
                    <div className="text-xs font-bold text-blue-100 uppercase">Helpline</div>
                    <div className="text-lg font-bold">9087353502</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full"></div>
          
          <h2 className="text-4xl font-bold relative z-10">Secure your family's future today.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg relative z-10">Every day without insurance is a risk you shouldn't take. Get a professional consultation from S. Sundari and find the perfect plan within your budget.</p>
          <div className="flex justify-center gap-4 relative z-10">
            <button 
              onClick={() => onNavigate('services')}
              className="px-10 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-xl"
            >
              Get Expert Advice
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
