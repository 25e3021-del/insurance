
import React, { useState, useEffect } from 'react';
import { User, ServiceRequest, Calculation } from '../types';
import { supabaseService } from '../services/supabaseService';

interface AdminProps {
  user: User | null;
  onNavigate: (page: string) => void;
}

const Admin: React.FC<AdminProps> = ({ user, onNavigate }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      onNavigate('home');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const r = await supabaseService.getServiceRequests();
      setRequests(r);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: ServiceRequest['status']) => {
    await supabaseService.updateRequestStatus(id, status);
    loadData();
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Control Center</h1>
          <p className="text-slate-500">Manage all service requests and user interactions from one central hub.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={loadData}
            className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">All Service Requests</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{requests.length} Total</span>
        </div>
        
        {loading ? (
          <div className="p-20 text-center text-slate-400">Loading request data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{req.user_name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">ID: {req.user_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{req.service_type}</div>
                      <div className="text-[10px] text-blue-600 font-bold uppercase">{req.company}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-slate-600">
                      {req.description}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        req.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        req.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        req.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        className="bg-slate-100 border-none rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value as any)}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {requests.length === 0 && !loading && (
          <div className="p-20 text-center text-slate-300">
            <i className="fas fa-inbox text-5xl mb-4"></i>
            <p className="text-xl">No requests to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
