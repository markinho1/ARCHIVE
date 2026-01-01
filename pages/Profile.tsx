
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 max-w-4xl mx-auto px-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-r from-neutral-800 to-neutral-700 relative">
          <div className="absolute -bottom-16 left-8 md:left-12">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-4 border-neutral-900 bg-neutral-800"
            />
          </div>
        </div>

        <div className="pt-20 px-8 md:px-12 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-serif text-white mb-2">{user.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-neutral-400 text-sm">{user.email}</span>
                <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
                <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider font-bold">
                  {user.role}
                </span>
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="border border-neutral-700 text-neutral-300 px-6 py-2 rounded-lg text-sm uppercase tracking-widest hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Sair da Conta
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
               <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Status da Assinatura</h3>
               <div className="bg-black/40 p-6 rounded-xl border border-neutral-800">
                  <p className="text-neutral-400 text-sm mb-4">Plano Atual</p>
                  <p className="text-2xl text-white font-serif mb-6">Membro Apoiador</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Acesso Ilimitado ao Acervo
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Streaming em 4K (quando disponível)
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Sem Anúncios
                    </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-sm uppercase tracking-widest text-neutral-500 border-b border-neutral-800 pb-2">Ações Rápidas</h3>
               <div className="grid gap-4">
                 <Link to="/donate" className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors group">
                    <span className="text-white font-medium">Gerenciar Doação Mensal</span>
                    <span className="text-neutral-500 group-hover:text-white">→</span>
                 </Link>
                 <Link to="/submit" className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors group">
                    <span className="text-white font-medium">Minhas Contribuições</span>
                    <span className="text-neutral-500 group-hover:text-white">→</span>
                 </Link>
                 <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 mt-4">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Obrigado por apoiar a preservação do cinema. Sua contribuição mantém este projeto vivo.
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
