
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Page } from '../types';
import { StarIcon } from './icons/StarIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { submitFeedback } from '../services/feedbackService';

interface FeedbackPageProps {
  setCurrentPage: (page: Page) => void;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
    setIsSubmitting(true);
    await submitFeedback({ rating, comments });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-warmGray-800 p-8 rounded-xl shadow-lg">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
          <h1 className="text-3xl font-bold font-serif text-warmGray-900 dark:text-white mt-4">{t('feedbackSuccessTitle')}</h1>
          <p className="mt-2 text-warmGray-500 dark:text-warmGray-400">{t('feedbackSuccessMessage')}</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-6 bg-amber-light text-amber-dark font-bold py-2 px-6 rounded-lg hover:bg-amber-dark hover:text-white transition-colors duration-300 dark:bg-amber-dark dark:text-amber-light dark:hover:bg-amber-light dark:hover:text-amber-dark"
          >
            {t('feedbackBackButton')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-serif text-warmGray-900 dark:text-white text-center mb-4">{t('feedbackTitle')}</h1>
        <p className="text-lg text-warmGray-500 dark:text-warmGray-400 text-center mb-8">{t('feedbackDescription')}</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-warmGray-800 p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label className="block text-sm font-medium text-warmGray-700 dark:text-warmGray-300 mb-2">{t('feedbackRatingLabel')}</label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`w-8 h-8 cursor-pointer transition-colors ${
                      (hoverRating || rating) >= star ? 'text-amber' : 'text-warmGray-300 dark:text-warmGray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-warmGray-700 dark:text-warmGray-300">{t('feedbackCommentsLabel')}</label>
            <textarea
              id="comments"
              name="comments"
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-warmGray-300 rounded-md shadow-sm placeholder-warmGray-500 focus:outline-none focus:ring-amber focus:border-amber sm:text-sm dark:bg-warmGray-700 dark:border-warmGray-600 dark:text-white"
              placeholder="Tell us more..."
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-saffron to-orange-light hover:shadow-xl disabled:opacity-50 transition-all duration-300"
            >
              {isSubmitting ? 'Submitting...' : t('feedbackSubmitButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;