import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import toast from 'react-hot-toast';
import { DONATION_GOALS } from '../constants';

const Donate: React.FC = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<'once' | 'monthly'>('once');
  const [selectedGoalId, setSelectedGoalId] = useState<string>(DONATION_GOALS[0].id);
  const [showPixModal, setShowPixModal] = useState(false);

  const presets = [20, 50, 100, 200];

  const handlePayment = (method: 'PIX' | 'PayPal') => {
    const finalAmount = amount || 0;
    
    if (finalAmount <= 0) {
      toast.error('Por favor, selecione um valor para doar.');
      return;
    }

    if (method === 'PIX') {
      setShowPixModal(true);
      toast.success('Gerando código PIX...');
    } else {
      toast.loading('Redirecionando para PayPal...', { duration: 2000 });
      // Simulando redirecionamento
      setTimeout(() => {
         window.open('https://paypal.com', '_blank');
      }, 1500);
    }
  };

  const copyPixCode = () => {
    const mockPixCode = `00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540${amount?.toFixed(2)}5802BR5913Lume Cinema6008Brasilia62070503***6304E2CA`;
    navigator.clipboard.writeText(mockPixCode);
    toast.success('Código PIX copiado!');
  };

  return (
    <div className="pt-32 pb-32 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-serif mb-6">Financiamento de Preservação</h1>
        <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
          Sem culpa. Sem pressão. O Lume Cinema é 100% financiado por espectadores como você. 
          Ajude-nos a manter a história acessível para todos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Donation Form */}
        <div className="space-y-10">
          {/* Donation Type Toggle */}
          <div className="flex bg-neutral-900 rounded-sm p-1 border border-neutral-800">
            <button 
              onClick={() => setType('once')}
              className={`flex-1 py-3 text-xs uppercase tracking-widest transition-all ${type === 'once' ? 'bg-white text-black font-bold' : 'text-neutral-500'}`}
            >
              Única
            </button>
            <button 
              onClick={() => setType('monthly')}
              className={`flex-1 py-3 text-xs uppercase tracking-widest transition-all ${type === 'monthly' ? 'bg-white text-black font-bold' : 'text-neutral-500'}`}
            >
              Mensal
            </button>
          </div>

          {/* Goal Selection - ONLY for One-time */}
          {type === 'once' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Escolha o destino da sua doação</h3>
              <div className="grid gap-3">
                {DONATION_GOALS.map(goal => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoalId(goal.id)}
                    className={`flex items-center gap-4 p-4 border rounded-lg text-left transition-all ${
                      selectedGoalId === goal.id 
                        ? 'border-white bg-white/5' 
                        : 'border-neutral-800 hover:border-neutral-600 bg-black'
                    }`}
                  >
                    <span className="text-2xl">{goal.icon}</span>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${selectedGoalId === goal.id ? 'text-white' : 'text-neutral-400'}`}>
                        {goal.title}
                      </h4>
                    </div>
                    {selectedGoalId === goal.id && (
                      <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Amount Selection */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {presets.map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-4 border text-lg font-serif transition-all ${amount === val ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
                >
                  R$ {val}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">R$</span>
              <input 
                type="number" 
                placeholder="Outro Valor" 
                className="w-full bg-black border border-neutral-800 px-10 py-4 text-white focus:outline-none focus:border-neutral-600 placeholder-neutral-600"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="pt-6 border-t border-neutral-900">
             <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Método de Pagamento</h3>
             <div className="grid grid-cols-2 gap-4">
               <button 
                onClick={() => handlePayment('PIX')}
                className="flex items-center justify-center gap-2 bg-[#32BCAD] hover:bg-[#2da396] text-white py-4 rounded transition-colors group"
               >
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M8.5,14.5L9.5,13.5L8.5,12.5L10,11L8.5,9.5L9.5,8.5L11,10L12.5,8.5L13.5,9.5L12,11L13.5,12.5L12.5,13.5L11,12L9.5,13.5L8.5,14.5Z" transform="rotate(45, 12, 12)"/></svg>
                 <span className="font-bold tracking-wide">PIX</span>
               </button>
               <button 
                onClick={() => handlePayment('PayPal')}
                className="flex items-center justify-center gap-2 bg-[#003087] hover:bg-[#002566] text-white py-4 rounded transition-colors"
               >
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M14.06,12.29C13.88,14.39 12.19,16.03 9.77,16.03H6.85C6.54,16.03 6.27,16.24 6.22,16.54L5.3,22.36C5.27,22.56 5.44,22.73 5.64,22.73H8.38C8.69,22.73 8.96,22.52 9.01,22.22L9.67,18.06L9.69,17.93C9.74,17.63 10.01,17.42 10.32,17.42H10.74C13.68,17.42 16.09,16.23 16.78,12.91C17.07,11.53 16.89,10.32 16.14,9.39C16.19,9.38 16.23,9.38 16.28,9.38C19.74,9.38 22.03,11.45 21.46,15.68C20.93,19.64 17.5,21.93 13.56,21.93H9.21L9.63,19.29L8.79,24.59H5.64C4.84,24.59 4.16,23.97 4.09,23.18L4.05,22.94L4.04,22.92L6.15,9.54C6.22,9.1 6.6,8.77 7.05,8.77H10.5C14.77,8.77 17.13,10.64 16.56,14.82L15.93,14.82L16.43,11.58C16.63,10.34 16.32,9.31 15.54,8.5C14.76,7.69 13.5,7.29 11.75,7.29H7.28L8.14,1.86C8.21,1.42 8.59,1.09 9.04,1.09H13.63C16.82,1.09 19.14,2.37 19.58,5.55C19.69,6.33 19.63,7.11 19.41,7.87L14.06,12.29Z" /></svg>
                 <span className="font-bold tracking-wide">PayPal</span>
               </button>
             </div>
          </div>
          
        </div>

        {/* Goals Progress */}
        <div className="space-y-12 h-full flex flex-col justify-center">
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
            <h3 className="text-sm uppercase tracking-widest text-neutral-500 mb-8 pb-4 border-b border-neutral-800">Progresso das Metas (BRL)</h3>
            <div className="space-y-10">
              {DONATION_GOALS.map(goal => {
                const percentage = Math.round((goal.current / goal.target) * 100);
                return (
                  <div key={goal.id} className="space-y-3 group">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3">
                        <span className="text-xl filter grayscale group-hover:grayscale-0 transition-all">{goal.icon}</span>
                        <span className="text-base font-medium text-white group-hover:text-neutral-200 transition-colors">{goal.title}</span>
                      </div>
                      <span className="text-xs text-neutral-500 font-mono">
                        <span className="text-white">R$ {goal.current.toLocaleString('pt-BR')}</span> / R$ {goal.target.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${type === 'once' && selectedGoalId === goal.id ? 'bg-white shadow-[0_0_10px_white]' : 'bg-neutral-500'}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-[10px] text-neutral-600 uppercase tracking-widest">{percentage}% Concluído</p>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-8 mt-8 border-t border-neutral-800">
              <p className="text-neutral-500 italic text-sm leading-relaxed">
                "Este projeto começou sem dinheiro, apenas com amor pelo cinema. 
                Operamos com 100% de transparência. Cada Real é reinvestido em custos de servidor, 
                expansão de legendas e esforços de restauração de filmes."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal PIX */}
      {showPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowPixModal(false)}></div>
          <div className="relative bg-neutral-900 border border-neutral-800 p-8 rounded-2xl max-w-md w-full text-center animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPixModal(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-serif mb-2 text-white">Pagamento via PIX</h3>
            <p className="text-neutral-400 mb-6">Escaneie o QR Code abaixo para doar <strong className="text-white">R$ {amount?.toFixed(2)}</strong></p>
            
            <div className="bg-white p-4 rounded-xl inline-block mb-6">
              <QRCode value={`00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540${amount?.toFixed(2)}5802BR5913Lume Cinema6008Brasilia62070503***6304E2CA`} size={200} />
            </div>

            <div className="space-y-4">
               <button 
                onClick={copyPixCode}
                className="w-full bg-[#32BCAD] hover:bg-[#2da396] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                 </svg>
                 Copiar Código Pix
               </button>
               <p className="text-xs text-neutral-500">
                 O pagamento será processado instantaneamente.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;