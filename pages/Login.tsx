
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      if (isLogin) {
        await login(email);
      } else {
        if (!name) {
          toast.error('Informe seu nome.');
          return;
        }
        await register(name, email);
      }
      navigate('/profile');
    } catch (error) {
      toast.error('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
         <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&grayscale" 
            className="w-full h-full object-cover opacity-20"
            alt="Cinema background"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 p-8 md:p-12 rounded-2xl shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-white mb-2">
              {isLogin ? 'Bem-vindo de Volta' : 'Junte-se ao Lume'}
            </h1>
            <p className="text-neutral-500 text-sm uppercase tracking-widest">
              {isLogin ? 'Acesse seu perfil de membro' : 'Preservação começa com você'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-neutral-700 focus:border-white rounded-lg px-4 py-3 text-white outline-none transition-colors"
                  placeholder="Seu Nome"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-neutral-700 focus:border-white rounded-lg px-4 py-3 text-white outline-none transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                 <label className="text-xs uppercase tracking-widest text-neutral-400 ml-1">Senha</label>
                 {isLogin && <a href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">Esqueceu?</a>}
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-neutral-700 focus:border-white rounded-lg px-4 py-3 text-white outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
            <p className="text-neutral-400 text-sm">
              {isLogin ? 'Não tem uma conta?' : 'Já é membro?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-white font-semibold hover:underline"
              >
                {isLogin ? 'Cadastre-se' : 'Faça Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
