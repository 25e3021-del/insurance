
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
              <i className="fas fa-shield-alt text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-white">S. Sundari</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Senior Insurance Consultant with 25+ years of expertise. Specializing in family protection, wealth creation, and hassle-free claim settlements.
          </p>
          <div className="pt-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Office Hours</div>
            <p className="text-xs text-slate-400">Mon - Sat: 9:30 AM to 6:30 PM</p>
            <p className="text-xs text-slate-400">Sunday: Closed</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Expertise</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">Life Insurance (LIC)</button></li>
            <li><button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors">Health (Star/HDFC ERGO)</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Wealth Planning</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Claim Assistance</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Quick Actions</h4>
          <ul className="space-y-3 text-sm">
            <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Nominee Update</button></li>
            <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">User Dashboard</button></li>
            <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">Privacy Policy</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Direct Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 group">
              <i className="fas fa-map-marker-alt mt-1 text-blue-500 group-hover:scale-110 transition-transform"></i>
              <span>No 25, Sathyanagar 2nd Main Road, Padi, Chennai 50</span>
            </li>
            <li className="flex items-center gap-3 group">
              <i className="fas fa-phone-alt text-blue-500 group-hover:scale-110 transition-transform"></i>
              <a href="tel:9087353502" className="hover:text-white transition-colors font-medium">9087353502</a>
            </li>
            <li className="flex items-center gap-3 group">
              <i className="fas fa-envelope text-blue-500 group-hover:scale-110 transition-transform"></i>
              <a href="mailto:sundarisubramani98@gmail.com" className="hover:text-white transition-colors overflow-hidden text-ellipsis">sundarisubramani98@gmail.com</a>
            </li>
            <li className="pt-4 flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><i className="fab fa-whatsapp"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2024 S. Sundari Insurance Consultancy. Registered IRDAI Point of Sales. All logos are property of respective insurance companies.</p>
        <p className="mt-2 text-blue-500 italic">"For urgent assistance outside office hours, please call or email."</p>
      </div>
    </footer>
  );
};

export default Footer;
