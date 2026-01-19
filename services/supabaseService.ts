
import { createClient } from '@supabase/supabase-js';
import { User, ServiceRequest, Calculation } from '../types';

const supabaseUrl = 'https://yyrjtwtjkrafwfhczonn.supabase.co';
const supabaseKey = 'sb_publishable_ksgOjgP6q2TF8mO00H-lHQ_JpywMyA3';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseService = {
  // --- AUTHENTICATION ---
  signUp: async (email: string, name: string, phone: string) => {
    // 1. Check if the user is the Admin/Owner
    if (email.toLowerCase() === 'haveadaygooday@gmail.com') {
      const { data: owner, error: ownerErr } = await supabase
        .from('owner')
        .select('*')
        .eq('email', email)
        .single();
      
      if (owner) {
        return {
          id: owner.id.toString(),
          email: owner.email,
          full_name: 'S. Sundari (Admin)',
          role: 'admin',
          phone: owner.phone || '',
          created_at: owner.created_at
        } as User;
      }
    }

    // 2. Check standard users table
    const { data: existing, error: fetchErr } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      // If found, update phone if provided and different
      if (phone && existing.phone !== phone) {
        await supabase.from('users').update({ phone }).eq('id', existing.id);
      }

      return {
        id: existing.id.toString(),
        email: existing.email,
        full_name: existing.name,
        phone: phone || existing.phone,
        role: 'client',
        created_at: existing.created_at
      } as User;
    }

    // 3. Insert new user if not exists
    const { data: newUser, error: insertErr } = await supabase
      .from('users')
      .insert([{
        name,
        email,
        phone,
        password: 'user_protected', // In production, use Supabase Auth for real passwords
        join_date: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (insertErr) throw insertErr;
    
    return {
      id: newUser.id.toString(),
      email: newUser.email,
      full_name: newUser.name,
      phone: newUser.phone,
      role: 'client',
      created_at: newUser.created_at
    } as User;
  },

  // --- SERVICE REQUESTS ---
  getServiceRequests: async (userId?: string) => {
    let query = supabase.from('service_requests').select('*').order('created_at', { ascending: false });
    
    if (userId && !isNaN(parseInt(userId))) {
      query = query.eq('user_id', parseInt(userId));
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    return (data || []).map(r => ({
      ...r,
      id: r.id.toString(),
      user_id: r.user_id?.toString() || '',
      service_type: r.service_type,
      company: r.insurance_company,
      description: r.service_details,
      preferred_date: r.service_date,
      status: r.status || 'pending'
    })) as ServiceRequest[];
  },

  addServiceRequest: async (req: any) => {
    const { error } = await supabase.from('service_requests').insert([{
      user_id: parseInt(req.user_id),
      user_name: req.user_name,
      user_email: req.user_email,
      user_phone: req.user_phone,
      service_type: req.service_type,
      insurance_company: req.company,
      service_date: req.preferred_date || new Date().toISOString().split('T')[0],
      service_time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      service_details: req.description,
      status: 'pending'
    }]);

    if (error) throw error;
  },

  updateRequestStatus: async (id: string, status: ServiceRequest['status']) => {
    const { error } = await supabase
      .from('service_requests')
      .update({ status })
      .eq('id', parseInt(id));
      
    if (error) throw error;
  },

  addCalculation: async (calc: any) => {
    const { error } = await supabase.from('calculations').insert([{
      user_id: parseInt(calc.user_id),
      company: calc.company,
      policy_type: calc.policy_type,
      age: calc.age,
      term: calc.term,
      sum_assured: calc.sum_assured,
      frequency: calc.frequency,
      annual_premium: calc.annual_premium
    }]);

    if (error) throw error;
  }
};
