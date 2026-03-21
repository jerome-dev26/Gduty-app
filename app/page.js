"use client"; //This MUST be the first line

import { useState, useEffect } from 'react';

export default function TimetableGrid({ userProfile }) {
  const [slots, setSlots] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [interval, setInterval] = useState(75); // Default 1hr 15m

  useEffect(() => {
    setSlots(generateSlots(interval));
  }, [interval]);

  const canEditTMain = userProfile.station_id === 'T1';

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8 font-sans transition-colors duration-300">
      {/* Header with Date Square */}
      <div className="flex justify-between items-center mb-10">
        <div className="bg-blue-700 p-4 rounded-lg shadow-lg text-center min-w-[100px]">
          <span className="block text-xs uppercase opacity-70">Sat</span>
          <span className="text-3xl font-bold tracking-tighter">21/03</span>
        </div>
        
        <div className="text-right">
          <h2 className="text-xl font-light uppercase tracking-widest text-blue-400">Station {userProfile.station_id}</h2>
          <p className="text-[10px] text-slate-500 italic">Last Edited: 14:15 by {userProfile.unique_name}</p>
        </div>
      </div>
      {/* T-MAIN SECTION (T1 Restricted) */}
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
                    onChange={(e) => setAssignments({...assignments, [slot]: e.target.value})}
                  >
                    <option value="">Select Guard...</option>
                    {/* Guard Names populate here */}
                  </select>
                </td>
              </tr>
            ))}
            {/* The Special Day Row */}
            <tr className="bg-blue-950/20">
              <td className="p-4 font-bold text-slate-300">DAY (1/2)</td>
              <td className="p-2 flex gap-2">
                <select className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-xs"><option>Morning</option></select>
                <select className="flex-1 bg-slate-900 border border-slate-700 p-2 rounded text-xs"><option>Afternoon</option></select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}