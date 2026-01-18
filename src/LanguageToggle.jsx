import React from 'react';
import { useLanguage } from './LanguageContext';

// Bouton de basculement de langue (discret et élégant)
export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-4 left-4 md:left-6 z-[60] px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-[#B8860B]/70 hover:text-[#B8860B] border border-[#B8860B]/30 hover:border-[#B8860B]/60 rounded-sm bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/95 select-none"
            aria-label={language === 'he' ? 'Switch to French' : 'Passer en hébreu'}
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {language === 'he' ? 'FR' : 'עב'}
        </button>
    );
}
