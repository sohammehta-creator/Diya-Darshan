import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { OmIcon } from './icons/OmIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call an API service here.
    console.log(`Password reset requested for: ${email}`);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-warmGray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <OmIcon className="w-16 h-16 mx-auto text-amber" />
          <h1 className="mt-4 text-3xl font-bold font-serif text-warmGray-900 dark:text-white">
            {t('forgotPasswordTitle')}
          </h1>
          <p className="mt-2 text-warmGray-500 dark:text-warmGray-400">
            {submitted ? t('forgotPasswordSuccess') : t('forgotPasswordDescription')}
          </p>
        </div>

        {submitted ? (
          <div className="text-center">
            <CheckCircleIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <button
              type="button"
              onClick={onBackToLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-saffron to-orange-light hover:shadow-xl transition-all duration-300"
            >
              {t('backToLoginLink')}
            </button>
          </div>
        ) : (
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
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-saffron to-orange-light hover:shadow-xl transition-all duration-300"
              >
                {t('forgotPasswordButton')}
              </button>
            </div>
          </form>
        )}

        {!submitted && (
           <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="font-medium text-amber-dark dark:text-amber-light hover:text-amber-dark/80 dark:hover:text-amber-light/80"
                >
                  {t('backToLoginLink')}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;