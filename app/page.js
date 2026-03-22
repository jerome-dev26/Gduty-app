"use client"; // This MUST be the first line

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const generateSlots = (interval) => {
  const times = [];
  let start = 0; 
  while (start < 1440) {
    const h = Math.floor(start / 60).toString().padStart(2, '0');
    const m = (start % 60).toString().padStart(2, '0');
    times.push(`${h}:${m}`);
    start += interval;
  }
  return times;
};

export default function TimetableGrid({ userProfile: propProfile }) {
  const [userProfile, setUserProfile] = useState(propProfile || null);
  const [guards, setGuards] = useState([]); // State for the guards list
  const [slots, setSlots] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [interval, setInterval] = useState(75);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function fetchData() {
      try {
        // A. Fetch Profile (using maybeSingle to avoid coercion error)
        const { data: profileData } = await supabase
          .from('profiles') 
          .select('*')
          .maybeSingle();

        if (profileData) {
          setUserProfile(profileData);
        } else {
          // Fallback if table is empty
          setUserProfile({ station_id: 'T1', unique_name: 'Local_Admin' });
        }

        // B. Fetch Guards List for the dropdowns
        const { data: guardsData } = await supabase
          .from('guards') // Replace with your actual guards table name
          .select('id, name')
          .order('name', { ascending: true });

        if (guardsData) setGuards(guardsData);

      } catch (err) {
        console.error("Fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [propProfile]);

  useEffect(() => {
    setSlots(generateSlots(interval));
  }, [interval]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-slate-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4 mx-auto"></div>
          <p>Syncing with Supabase...</p>
        </div>
      </div>
    );
  }

  const canEditTMain = userProfile?.station_id === 'T1';

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8 font-sans transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="bg-blue-700 p-4 rounded-lg shadow-lg text-center min-w-[100px]">
          <span className="block text-xs uppercase opacity-70">Sat</span>
          <span className="text-3xl font-bold tracking-tighter">21/03</span>
        </div>
        
        <div className="text-right">
          <h2 className="text-xl font-light uppercase tracking-widest text-blue-400">
            Station {userProfile?.station_id || 'N/A'}
          </h2>
          <p className="text-[10px] text-slate-500 italic">
            Last Edited: 14:15 by {userProfile?.unique_name || 'System'}
          </p>
        </div>
      </div>

      {/* T-MAIN SECTION */}
      <div className="grid grid-cols-2 gap-1 mb-6 border-4 border-blue-900/30 rounded-lg overflow-hidden">
        <div className="bg-slate-900 p-4 text-center">
          <span className="text-[10px] text-blue-500 uppercase block">T-Main (P1)</span>
          <input 
            disabled={!canEditTMain}
            className="bg-transparent text-xl font-bold text-center outline-none disabled:opacity-50"
            defaultValue="P1"
          />
        </div>
        <div className="bg-slate-900 p-4 text-center">
          <span className="text-[10px] text-blue-500 uppercase block">T-Main (P2)</span>
          <input 
            disabled={!canEditTMain}
            className="bg-transparent text-xl font-bold text-center outline-none disabled:opacity-50"
            defaultValue="P2"
          />
        </div>
      </div>

      {/* Dynamic Grid */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
        <table className="w-full">
          <tbody className="divide-y divide-slate-800">
            {slots.map(slot => (
              <tr key={slot} className="hover:bg-slate-800/50">
                <td className="p-4 text-sm font-mono text-slate-400 border-r border-slate-800">{slot}</td>
                <td className="p-2">
                  <select 
                    className="w-full bg-[#020617] border border-slate-700 p-2 rounded text-sm focus:border-blue-500"
                    value={assignments[slot] || ""}
                    onChange={(e) => setAssignments({...assignments, [slot]: e.target.value})}
                  >
                    <option value="">Select Guard...</option>
                    {guards.map(guard => (
                      <option key={guard.id} value={guard.id}>
                        {guard.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}