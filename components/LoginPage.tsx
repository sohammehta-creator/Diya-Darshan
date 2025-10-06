import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Role } from '../types';
import { OmIcon } from './icons/OmIcon';

interface LoginPageProps {
  onForgotPassword: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('user');
  const { login, error, isLoading } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, role);
    } catch (err) {
      // Error is handled and displayed by the context
    }
  };

  const roleButtonClasses = (r: Role) => `
    w-full px-4 py-2 text-sm font-bold rounded-md transition-colors duration-300 focus:outline-none
    ${role === r ? 'bg-amber-dark text-white' : 'bg-warmGray-100 dark:bg-warmGray-700 text-warmGray-500 dark:text-warmGray-300 hover:bg-amber-light/20'}
  `;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-warmGray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
            <OmIcon className="w-16 h-16 mx-auto text-amber" />
          <h1 className="mt-4 text-3xl font-bold font-serif text-warmGray-900 dark:text-white">{t('loginTitle')}</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warmGray-700 dark:text-warmGray-300">
              {t('loginEmailLabel')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-warmGray-300 rounded-md shadow-sm placeholder-warmGray-500 focus:outline-none focus:ring-amber focus:border-amber sm:text-sm dark:bg-warmGray-700 dark:border-warmGray-600 dark:text-white"
              placeholder="user@example.com"
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password"  className="block text-sm font-medium text-warmGray-700 dark:text-warmGray-300">
                {t('loginPasswordLabel')}
              </label>
              <div className="text-sm">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="font-medium text-amber-dark dark:text-amber-light hover:text-amber-dark/80 dark:hover:text-amber-light/80"
                >
                  {t('forgotPasswordLink')}
                </button>
              </div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-warmGray-300 rounded-md shadow-sm placeholder-warmGray-500 focus:outline-none focus:ring-amber focus:border-amber sm:text-sm dark:bg-warmGray-700 dark:border-warmGray-600 dark:text-white"
              placeholder="password"
            />
          </div>
           <div>
            <span className="block text-sm font-medium text-warmGray-700 dark:text-warmGray-300">{t('loginRoleLabel')}</span>
            <div className="mt-2 flex p-1 bg-warmGray-100 dark:bg-warmGray-900 rounded-lg">
                <button type="button" onClick={() => setRole('user')} className={roleButtonClasses('user')}>{t('loginRoleUser')}</button>
                <button type="button" onClick={() => setRole('admin')} className={roleButtonClasses('admin')}>{t('loginRoleAdmin')}</button>
            </div>
           </div>

          {error && <p className="text-sm text-red-600 text-center">{t('loginError')}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-saffron to-orange-light hover:shadow-xl disabled:opacity-50 transition-all duration-300"
            >
              {isLoading ? 'Logging in...' : t('loginButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;