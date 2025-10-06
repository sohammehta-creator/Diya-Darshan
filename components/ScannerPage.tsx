import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeError, Html5QrcodeResult } from 'html5-qrcode';
import { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ScannerPageProps {
  setCurrentPage: (page: Page) => void;
}

const ScannerPage: React.FC<ScannerPageProps> = ({ setCurrentPage }) => {
    const { t } = useLanguage();
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'qr-reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                rememberLastUsedCamera: true,
            },
            /* verbose= */ false
        );

        const onScanSuccess = (decodedText: string, result: Html5QrcodeResult) => {
            scanner.clear();
            // Simulate parsing booking data from the QR code
            try {
                const bookingData = JSON.parse(decodedText);
                if (bookingData.app === 'GujaratDarshan' && bookingData.bookingId) {
                     setScanResult(`Booking ID: ${bookingData.bookingId}\nTemple: ${bookingData.temple}\nDevotees: ${bookingData.devotees}`);
                } else {
                    setErrorMessage(t('scannerError'));
                }
            } catch (error) {
                 setErrorMessage(t('scannerError'));
            }
        };

        const onScanFailure = (error: Html5QrcodeError) => {
            // This can be noisy, so we'll only log it for debugging
            // console.warn(`Code scan error = ${error}`);
        };

        scanner.render(onScanSuccess, onScanFailure);

        return () => {
            // Cleanup function to stop the scanner
            if (scanner && scanner.getState() !== 2 /* NOT_STARTED */) {
                scanner.clear().catch(error => {
                    console.error("Failed to clear html5-qrcode-scanner.", error);
                });
            }
        };
    }, [t]);
    
    const handleScanAgain = () => {
        setScanResult(null);
        setErrorMessage(null);
        // The useEffect will re-render and start the scanner again
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto bg-white dark:bg-warmGray-800 p-6 rounded-xl shadow-lg relative">
                <button onClick={() => setCurrentPage('home')} className="absolute top-4 left-4 flex items-center text-sm font-bold text-amber-dark dark:text-amber-light hover:underline">
                    <ArrowLeftIcon className="w-4 h-4 mr-1"/>
                    Back to Home
                </button>
                 <h1 className="text-3xl font-bold font-serif text-warmGray-900 dark:text-white text-center mb-2">{t('scannerTitle')}</h1>
                 <p className="text-warmGray-500 dark:text-warmGray-400 text-center mb-6">{t('scannerInstruction')}</p>
                
                {scanResult ? (
                    <div className="text-center">
                        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500"/>
                        <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">{t('scannerSuccess')}</h2>
                        <div className="mt-4 p-4 bg-warmGray-100 dark:bg-warmGray-700 rounded-lg text-left">
                            <h3 className="font-bold mb-2">{t('scannerResultTitle')}</h3>
                            <pre className="text-sm whitespace-pre-wrap">{scanResult}</pre>
                        </div>
                        <button onClick={handleScanAgain} className="mt-6 w-full bg-amber-light text-amber-dark font-bold py-2 px-6 rounded-lg hover:bg-amber-dark hover:text-white transition-colors duration-300">
                           {t('scannerScanAgain')}
                        </button>
                    </div>
                ) : (
                    <>
                        <div id="qr-reader" className="w-full"></div>
                        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default ScannerPage;
