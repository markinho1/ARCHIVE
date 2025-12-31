
import React, { useState } from 'react';
import { DONATION_GOALS } from '../constants';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<'once' | 'monthly'>('once');

  const presets = [10, 25, 50, 100];

  return (
    <div className="pt-32 pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-serif mb-6">Preservation Funding</h1>
        <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          No guilt. No pressure. Archive Cinema is 100% funded by viewers like you. 
          Help us keep history accessible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Donation Form */}
        <div className="space-y-10">
          <div className="flex bg-neutral-900 rounded-sm p-1 border border-neutral-800">
            <button 
              onClick={() => setType('once')}
              className={`flex-1 py-3 text-xs uppercase tracking-widest transition-all ${type === 'once' ? 'bg-white text-black font-bold' : 'text-neutral-500'}`}
            >
              One-Time
            </button>
            <button 
              onClick={() => setType('monthly')}
              className={`flex-1 py-3 text-xs uppercase tracking-widest transition-all ${type === 'monthly' ? 'bg-white text-black font-bold' : 'text-neutral-500'}`}
            >
              Monthly Patron
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {presets.map(val => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-4 border text-lg font-serif transition-all ${amount === val ? 'bg-white text-black border-white' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
              >
                ${val}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
            <input 
              type="number" 
              placeholder="Custom Amount" 
              className="w-full bg-black border border-neutral-800 px-8 py-4 text-white focus:outline-none focus:border-neutral-600"
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>

          <button className="w-full bg-white text-black py-6 text-sm font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors">
            Proceed with {type === 'once' ? 'Donation' : 'Subscription'}
          </button>
          
          <div className="flex justify-center gap-8 opacity-40">
            <span className="text-[10px] uppercase tracking-widest">PayPal</span>
            <span className="text-[10px] uppercase tracking-widest">Stripe</span>
            <span className="text-[10px] uppercase tracking-widest">Ko-Fi</span>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="space-y-12">
          <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-8 border-b border-neutral-800 pb-4">Where your money goes</h3>
          {DONATION_GOALS.map(goal => {
            const percentage = Math.round((goal.current / goal.target) * 100);
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-serif text-white">{goal.title}</span>
                  <span className="text-xs text-neutral-500">${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}</span>
                </div>
                <div className="h-0.5 w-full bg-neutral-900 overflow-hidden">
                  <div className="h-full bg-neutral-400" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}
          
          <div className="pt-8 border-t border-neutral-900">
            <p className="text-neutral-500 italic text-sm leading-relaxed">
              "This project started with no money, only love for cinema. 
              We operate with 100% transparency. Every dollar is reinvested into server costs, 
              subtitle expansion, and film restoration efforts."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
