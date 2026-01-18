// Dictionnaire de traductions Hébreu / Français
export const translations = {
    he: {
        // Hero section
        saveTheDate: "שמרו את התאריך",
        viewInvitation: "צפו בהזמנה",
        days: "ימים",
        hours: "שעות",
        min: "דקות",
        sec: "שניות",

        // Menu
        menu: {
            familles: "משפחות",
            ceremonie: "טקס",
            lieu: "מקום",
            rsvp: "אישור הגעה"
        },

        // Mobile bottom bar
        mobileNav: {
            accueil: "בית",
            famille: "משפחה",
            lieu: "מקום",
            rsvp: "אישור"
        },

        // Date and location
        date: "יום שלישי 10 במרץ 2026",
        venue: "אולם אודאון • עמק חפר",

        // Familles section
        hebrewVerse: "קול ששון וקול שמחה קול חתן וקול כלה",
        thankHashem: "מודים להשם על השמחה להזמינכם לחתונת ילדיהם ונכדיהם",
        houppaInvite: "ומזמינים אתכם לחופה שתיערך ביום",
        dateHebrew: "יום שלישי כ״א אדר תשפ״ו",
        dateGregorian: "10 במרץ 2026",
        time: "בשעה 19:30",
        receptionFollow: "ולשמחה שתתקיים לאחר מכן",
        inMemory: "לזכר אמי שחסרה לי...",
        grandparents: "ולסבינו וסבתותינו היקרים.",

        // Ceremonie section
        verse: "אני לדודי ודודי לי",
        verseTranslation: "אני שייך לאהובי ואהובי שייך לי",
        exceptionalVenue: "מקום יוצא דופן",
        venueDescription: "מסגרת קסומה לחגוג את האיחוד שלנו.",
        addToCalendar: "הוספה ליומן",
        goWithWaze: "נווט עם Waze",

        // RSVP section
        rsvpTitle: "אישור הגעה",
        rsvpSubtitle: "נא לאשר בהקדם האפשרי",
        firstName: "שם פרטי",
        lastName: "שם משפחה",
        adults: "מבוגרים",
        children: "ילדים",
        confirmPresence: "אנא אשרו את הגעתכם",
        yesPresent: "כן, אגיע",
        noPresent: "לא, לא אוכל להגיע",
        presentAt: "אהיה נוכח/ת ב:",
        houppaOption: "אהיה נוכח/ת בחופה",
        soireeOption: "אהיה נוכח/ת במסיבה",
        messageLabel: "כמה מילים לזוג",
        submitButton: "אישור תשובה",
        submitting: "שולח...",
        thankYou: "תודה רבה!",
        responseRecorded: "תשובתכם התקבלה.",
        seeYouSoon: "מחכים לראות אתכם.",
        validationError: "אנא בחרו לפחות חופה או מסיבה אם אתם מגיעים.",

        // Footer
        footerDate: "10 . 03 . 2026",

        // Language toggle
        langSwitch: "עב"
    },

    fr: {
        // Hero section
        saveTheDate: "Save the Date",
        viewInvitation: "Voir l'invitation",
        days: "Jours",
        hours: "Heures",
        min: "Min",
        sec: "Sec",

        // Menu
        menu: {
            familles: "Familles",
            ceremonie: "Cérémonie",
            lieu: "Lieu",
            rsvp: "RSVP"
        },

        // Mobile bottom bar
        mobileNav: {
            accueil: "Accueil",
            famille: "Famille",
            lieu: "Lieu",
            rsvp: "RSVP"
        },

        // Date and location
        date: "Mardi 10 Mars 2026",
        venue: "Salle Odeon • Hemek Hefer",

        // Familles section
        hebrewVerse: "קול ששון וקול שמחה קול חתן וקול כלה",
        thankHashem: "Remercient Hachem d'avoir la joie de vous convier au mariage de leurs enfants et petits-enfants",
        houppaInvite: "Et vous prient de bien vouloir assister à la Houppa qui sera célébrée le",
        dateHebrew: "21 Adar 5786",
        dateGregorian: "Mardi 10 Mars 2026",
        time: "19H30 précises",
        receptionFollow: "Ainsi qu'à la réception qui suivra.",
        inMemory: "A ma mère qui me manque…",
        grandparents: "et à nos grands-parents si chers à nos cœurs.",

        // Ceremonie section
        verse: "אֲנִי לְדוֹדִי וְדוֹדִי לִי",
        verseTranslation: "Je suis à mon bien-aimé, et mon bien-aimé est à moi",
        exceptionalVenue: "Lieu d'Exception",
        venueDescription: "Un cadre enchanteur pour célébrer notre union.",
        addToCalendar: "Ajouter à l'agenda",
        goWithWaze: "Y aller avec Waze",

        // RSVP section
        rsvpTitle: "R.S.V.P",
        rsvpSubtitle: "Réponse souhaitée dès réception",
        firstName: "Prénom",
        lastName: "Nom",
        adults: "Adultes",
        children: "Enfants",
        confirmPresence: "Confirmez votre présence",
        yesPresent: "Oui, je serai présent(e)",
        noPresent: "Non, je ne peux pas venir",
        presentAt: "Je serai présent(e) à :",
        houppaOption: "Je serai présent(e) à la Houppa",
        soireeOption: "Je serai présent(e) à la soirée",
        messageLabel: "Un petit mot pour les mariés",
        submitButton: "Confirmer ma réponse",
        submitting: "Envoi en cours...",
        thankYou: "Toda Raba !",
        responseRecorded: "Votre réponse a bien été enregistrée.",
        seeYouSoon: "Nous avons hâte de vous retrouver.",
        validationError: "Veuillez sélectionner au moins la Houppa ou la Soirée si vous êtes présent(e).",

        // Footer
        footerDate: "10 . 03 . 2026",

        // Language toggle
        langSwitch: "FR"
    }
};

// Fonction utilitaire pour obtenir une traduction
export const getTranslation = (lang, key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key; // Retourne la clé si la traduction n'existe pas
        }
    }
    return value;
};
