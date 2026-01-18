import React, { createContext, useContext, useState } from 'react';
import { translations, getTranslation } from './translations';

// Contexte de langue
const LanguageContext = createContext();

// Provider de langue
export function LanguageProvider({ children }) {
    // Langue par défaut : hébreu
    const [language, setLanguage] = useState('he');

    // Fonction pour basculer la langue
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'he' ? 'fr' : 'he');
    };

    // Fonction pour obtenir une traduction
    const t = (key) => getTranslation(language, key);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
