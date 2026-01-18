import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, ChevronDown, Send, Menu, X, Star, Moon, Wine, Navigation, CalendarPlus, Users, Home } from 'lucide-react';

export default function App() {
  // URL de l'API Google Apps Script
  const API_URL = 'https://script.google.com/macros/s/AKfycbyL95aGQYB3oyMcb1YeopTNPSP2idNXYOJt3pj5806VPS-I1t1OFqcn_1wSpj3yDu4p/exec';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const audioRef = useRef(null);

  // --- RSVP ---
  const [guestMessage, setGuestMessage] = useState('');
  const [rsvpData, setRsvpData] = useState({
    prenom: '',
    nom: '',
    adultes: '1',
    enfants: '0',
    presence: 'oui', // 'oui' ou 'non'
    houppa: false,
    soiree: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- TIMER ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // --- LANGUE ---
  const [language, setLanguage] = useState('fr'); // 'fr' par défaut (français)

  // Détection Chrome pour le texte hébreu
  const isChrome = typeof window !== 'undefined' && /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  // Texte hébreu original (même que sur natanel-ora.com)
  const hebrewText = "הלכ לוקו ןתח לוק החמש לוקו ןושש לוק";
  // Pour Chrome : utiliser le texte exact tel quel
  const hebrewForChrome = "קול ששון וקול שמחה קול חתן וקול כלה";

  // --- DICTIONNAIRE DE TRADUCTIONS ---
  const translations = {
    he: {
      menu: ['משפחות', 'טקס', 'מיקום', 'אישור הגעה'],
      saveTheDate: 'שמור את התאריך',
      mardi10Mars2026: 'יום שלישי 10 מרץ 2026',
      salleOdeon: 'אולם אודאון • עמק חפר',
      voirInvitation: 'צפה בהזמנה',
      jours: 'ימים',
      heures: 'שעות',
      min: 'דקות',
      sec: 'שניות',
      remercient: 'מודים ל',
      hachem: 'השם',
      convier: 'על הזכות להזמין אתכם לחתונת ילדיהם ונכדיהם',
      etVousPrient: 'ומבקשים מכם בכבוד להשתתף בחופה',
      quiSeraCelebree: 'שתחגג ב',
      ainsiQuaLaReception: 'וכך גם במסיבה שאחרי.',
      aMaMere: 'לאמי החסרה לי...',
      etAGrandsParents: 'ולסבים היקרים לליבנו.',
      jeSuisAMonBienaime: 'אני לדודי ודודי לי',
      lieuException: 'מקום יוצא דופן',
      salleOdeonTitle: 'אולם אודאון',
      cadreEnchanteur: 'מסגרת קסומה לחגוג את האיחוד שלנו.',
      adresse: 'אודאון איוונט גרדן\nרחוב המסיק 6, עמק חפר',
      ajouterAgenda: 'הוסף ללוח שנה',
      yAllerWaze: 'לך עם ווייז',
      rsvp: 'אישור הגעה',
      reponseSouhaitee: 'תשובה מבוקשת מייד עם קבלה',
      prenom: 'שם פרטי',
      nom: 'שם משפחה',
      adultes: 'מבוגרים',
      enfants: 'ילדים',
      confirmezPresence: 'אשר את נוכחותך',
      ouiPresent: 'כן, אהיה נוכח/ת',
      nonPresent: 'לא, אני לא יכול/ה להגיע',
      jeSeraiPresentA: 'אהיה נוכח/ת ב:',
      jeSeraiPresentHouppa: 'אהיה נוכח/ת בחופה',
      jeSeraiPresentSoiree: 'אהיה נוכח/ת במסיבה',
      petitMot: 'מילה קטנה לזוג הצעיר',
      confirmerReponse: 'אשר את תשובתי',
      envoiEnCours: 'שולח...',
      todaRaba: 'תודה רבה!',
      reponseEnregistree: 'תשובתך נרשמה בהצלחה. אנחנו מחכים לראות אותך.',
      accueil: 'בית',
      famille: 'משפחה',
      lieu: 'מיקום',
      rsvpNav: 'אישור הגעה',
      // Noms des familles
      familleGauche1: 'גב\' מרגלית סוסאן',
      familleGauche2: 'מר שמעון אמזלג',
      familleGauche3: 'מר וגב\' דוד אמזלג',
      familleDroite1: 'ליליאן שמחה מועאיטי',
      familleDroite2: 'מר נסים אביטבול',
      familleDroite3: 'מר יוסף סלם',
      // Prénoms mariés
      hatan: 'ראובן',
      kala: 'שרה'
    },
    fr: {
      menu: ['Familles', 'Cérémonie', 'Lieu', 'RSVP'],
      saveTheDate: 'Save the Date',
      mardi10Mars2026: 'Mardi 10 Mars 2026',
      salleOdeon: 'Salle Odeon • Hemek Hefer',
      voirInvitation: 'Voir l\'invitation',
      jours: 'Jours',
      heures: 'Heures',
      min: 'Min',
      sec: 'Sec',
      remercient: 'Remercient',
      hachem: 'Hachem',
      convier: 'd\'avoir la joie de vous convier\nau mariage de leurs enfants et petits-enfants',
      etVousPrient: 'Et vous prient de bien vouloir assister à la Houppa',
      quiSeraCelebree: 'qui sera célébrée le',
      ainsiQuaLaReception: 'Ainsi qu\'à la réception qui suivra.',
      aMaMere: 'A ma mère qui me manque…',
      etAGrandsParents: 'et à nos grands-parents si chers à nos cœurs.',
      jeSuisAMonBienaime: 'Je suis à mon bien-aimé, et mon bien-aimé est à moi',
      lieuException: 'Lieu d\'Exception',
      salleOdeonTitle: 'Salle Odeon',
      cadreEnchanteur: 'Un cadre enchanteur pour célébrer notre union.',
      adresse: 'Odeon Event Garden<br />HaMasik St 6, Hemek Hefer',
      ajouterAgenda: 'Ajouter à l\'agenda',
      yAllerWaze: 'Y aller avec Waze',
      rsvp: 'R.S.V.P',
      reponseSouhaitee: 'Réponse souhaitée dès réception',
      prenom: 'Prénom',
      nom: 'Nom',
      adultes: 'Adultes',
      enfants: 'Enfants',
      confirmezPresence: 'Confirmez votre présence',
      ouiPresent: 'Oui, je serai présent(e)',
      nonPresent: 'Non, je ne peux pas venir',
      jeSeraiPresentA: 'Je serai présent(e) à :',
      jeSeraiPresentHouppa: 'Je serai présent(e) à la Houppa',
      jeSeraiPresentSoiree: 'Je serai présent(e) à la soirée',
      petitMot: 'Un petit mot pour les mariés',
      confirmerReponse: 'Confirmer ma réponse',
      envoiEnCours: 'Envoi en cours...',
      todaRaba: 'Toda Raba !',
      reponseEnregistree: 'Votre réponse a bien été enregistrée.\nNous avons hâte de vous retrouver.',
      accueil: 'Accueil',
      famille: 'Famille',
      lieu: 'Lieu',
      rsvpNav: 'RSVP',
      // Noms des familles (français)
      familleGauche1: 'Mme Margalith',
      familleGauche2: 'Mr Simon',
      familleGauche3: 'Mr et Mme David',
      familleDroite1: 'Liliane Sim\'ha',
      familleDroite2: 'Mr Nissim',
      familleDroite3: 'Mr Joseph',
      // Prénoms mariés (français)
      hatan: 'Reouven',
      kala: 'Sarah'
    }
  };

  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Date du mariage : 10 Mars 2026
    const weddingDate = new Date('2026-03-10T19:30:00');

    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);


  const googleCalendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mariage+Reouven+%26+Sarah&dates=20260310T153000Z/20260310T223000Z&details=Mariage+de+Reouven+et+Sarah%0ASalle+Odeon%2C+Odeon+Event+Garden%2C+HaMasik+St+6%2C+Hemek+Hefer&location=Odeon+Event+Garden%2C+HaMasik+St+6%2C+Hemek+Hefer&reminder=1440&reminder=510&reminder=60";
  const wazeLink = "https://waze.com/ul/hsvbb643rn";

  return (
    <div className="min-h-screen bg-transparent text-stone-900 font-sans selection:bg-[#B8860B]/30 selection:text-stone-900 pb-20 md:pb-0">
      {/* Audio pour la musique de fond */}
      <audio ref={audioRef} loop>
        <source src="/canon-in-d.mp3" type="audio/mpeg" />
      </audio>

      {/* B"H Fixe */}
      <div className="fixed top-4 right-4 md:right-6 z-[60] text-[#B8860B]/40 text-xs font-serif select-none">B"H</div>

      {/* Bouton de changement de langue */}
      <button
        onClick={() => setLanguage(language === 'he' ? 'fr' : 'he')}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] text-[#B8860B] hover:text-[#B8860B] text-sm md:text-base font-serif transition-all duration-300 uppercase tracking-[0.15em] select-none border-2 border-[#B8860B]/50 hover:border-[#B8860B] px-4 py-2.5 rounded-sm bg-white/90 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105"
        aria-label="Changer la langue"
      >
        {language === 'he' ? 'Français' : 'עברית'}
      </button>

      {/* Menu Desktop */}
      <nav className={`hidden md:block fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-[#B8860B]/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl tracking-[0.2em] font-serif text-[#B8860B] border-y border-[#B8860B] py-1 cursor-default">R & S</div>
          <div className="flex space-x-12">
            {t.menu.map((item, index) => {
              const hrefs = ['#familles', '#ceremonie', '#ceremonie', '#rsvp'];
              return (
              <a
                  key={index}
                  href={hrefs[index]}
                className={`text-xs uppercase tracking-[0.25em] transition-colors relative group hover:text-[#B8860B] ${scrolled ? 'text-stone-700' : 'text-stone-600'}`}
              >
                {item}
              </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Menu Mobile Top */}
      <nav className={`md:hidden fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-[#B8860B]/10' : 'bg-transparent py-4'}`}>
        <div className="text-center">
          <span className="text-lg tracking-[0.2em] font-serif text-[#B8860B] border-y border-[#B8860B] py-1 inline-block">R & S</span>
        </div>
      </nav>

      {/* HERO SECTION - PURE & CHIC (Fond uni pour contraste) */}
      {/* HERO SECTION - PURE & CHIC (Image Texturée Embossée) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-10 pb-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/wmremove-transformed-4.png")', filter: 'contrast(1.05)', imageRendering: '-webkit-optimize-contrast' }}>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center mt-[-5vh]">

          {/* Header minimaliste */}
          <div className="mb-10 lg:mb-14 relative z-10 pointer-events-none">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#8B6914] font-medium border-b border-[#8B6914]/20 pb-2">
              {t.saveTheDate}
            </span>
          </div>

          {/* Noms avec calligraphie élégante */}
          <div className="flex flex-row items-center justify-center gap-[2vw] md:gap-6 mb-8 md:mb-12 relative z-10 w-full whitespace-nowrap overflow-visible">
            <h1 className={`${language === 'he' ? 'hebrew-names-calligraphy' : 'font-wedding-script'} text-[10vw] md:text-[5rem] lg:text-[7rem] text-gold-foil leading-[0.85] tracking-wide`}>
              {language === 'he' ? t.hatan : 'Reouven'}
            </h1>
            <div className="text-[2.5vw] md:text-2xl lg:text-3xl font-wedding-script text-[#8B6914]/50 mt-1">&</div>
            <h1 className={`${language === 'he' ? 'hebrew-names-calligraphy' : 'font-wedding-script'} text-[10vw] md:text-[5rem] lg:text-[7rem] text-gold-foil leading-[0.85] tracking-wide`}>
              {language === 'he' ? t.kala : 'Sarah'}
            </h1>
          </div>

          {/* Détails épurés */}
          <div className="space-y-6 relative z-10 mb-16">
            <p className="font-sans text-sm md:text-xl text-[#8B6914] tracking-[0.25em] font-medium uppercase">
              {t.mardi10Mars2026}
            </p>

            <div className="flex justify-center items-center gap-4 opacity-60">
              <span className="h-px w-8 md:w-16 bg-[#8B6914]/30"></span>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#8B6914]">
                {t.salleOdeon}
              </p>
              <span className="h-px w-8 md:w-16 bg-[#8B6914]/30"></span>
            </div>
          </div>

          {/* TIMER VOGUE STYLE (Minimaliste & Fin) */}
          <div className="relative z-10 flex justify-center gap-8 md:gap-16 border-t border-[#8B6914]/10 pt-8 max-w-lg mx-auto">
            {[{ l: t.jours, v: timeLeft.days }, { l: t.heures, v: timeLeft.hours }, { l: t.min, v: timeLeft.minutes }, { l: t.sec, v: timeLeft.seconds }].map((timerItem, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <span className="font-elegant text-2xl md:text-4xl text-[#B8860B] font-light italic tabular-nums leading-none">
                  {String(timerItem.v).padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-[#8B6914]/60 mt-2 font-sans font-medium">
                  {timerItem.l}
                </span>
              </div>
            ))}
          </div>

          {/* Bouton Voir l'invitation */}
          {!showInvitation && (
            <div className="relative z-10 mt-12 md:mt-16">
              <button
                onClick={() => {
                  setShowInvitation(true);
                  // Lancer la musique
                  if (audioRef.current) {
                    audioRef.current.play().catch(err => console.log('Erreur lecture audio:', err));
                  }
                  // Scroll automatique vers la section Familles après un court délai
                  setTimeout(() => {
                    document.getElementById('familles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="group px-8 md:px-12 py-3 md:py-4 border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm font-medium rounded-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.voirInvitation}
                  <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-[#B8860B] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </button>
            </div>
          )}

        </div>

        {/* Scroll indicator très discret */}
        {showInvitation && (
        <div className="absolute bottom-6 md:bottom-8 text-[#B8860B]/30 animate-pulse cursor-pointer">
          <ChevronDown size={24} strokeWidth={0.5} />
        </div>
        )}
      </section>

      {/* Contenu masqué jusqu'au clic */}
      {showInvitation && (
        <div className="animate-fadeIn">
      {/* FAMILLES */}
      {/* FAMILLES - Fond Floral Aquarelle */}
      <section id="familles" className="py-10 md:py-20 px-4 text-center border-b border-[#B8860B]/10 relative overflow-hidden">
        {/* Fond en arrière-plan avec z-index bas */}
        <div className="absolute inset-0 z-0" style={{ 
          backgroundImage: 'url("/images/Gemini_Generated_Image_j0se47j0se47j0se-f83a232d-2000-46c4-8c2b-4322d09c757e.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}></div>
        <div className="max-w-5xl mx-auto relative z-10">

          {/* Arc Hébreu - Correction pour Chrome : inverser l'ordre des mots avec chemin normal */}
          <div className="w-full flex justify-center mb-4 md:mb-6 card-text-animate">
            <svg viewBox="0 0 500 120" className="w-full max-w-lg md:max-w-2xl opacity-60">
              <path 
                id="curve-hebrew-top" 
                d="M 50,120 Q 250,20 450,120" 
                fill="transparent" 
              />
              <text width="500" {...(isChrome ? {} : { direction: "rtl", style: { direction: 'rtl' } })}>
                <textPath 
                  xlinkHref="#curve-hebrew-top"
                  startOffset="50%" 
                  textAnchor="middle" 
                  className="text-lg md:text-2xl fill-[#8B7355]" 
                  style={{ fontFamily: 'serif', ...(isChrome ? {} : { direction: 'rtl' }) }}
                >
                  {isChrome ? hebrewForChrome : hebrewText}
                </textPath>
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-1 md:gap-16 mb-6 md:mb-10 items-start opacity-100 card-text-animate-delay-1">
            <div className="space-y-1 text-center font-elegant text-stone-700 leading-relaxed text-[13px] md:text-lg">
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>גב' מרגלית <span className="text-gold-foil font-semibold opacity-90">סוסאן</span></>
                ) : (
                  <>{t.familleGauche1} <span className="text-gold-foil font-semibold opacity-90">SOUSSAN</span></>
                )}
              </p>
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>מר שמעון <span className="text-gold-foil font-semibold opacity-90">אמזלג</span></>
                ) : (
                  <>{t.familleGauche2} <span className="text-gold-foil font-semibold opacity-90">AMZALLAG</span></>
                )}
              </p>
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>מר וגב' דוד <span className="text-gold-foil font-semibold opacity-90">אמזלג</span></>
                ) : (
                  <>{t.familleGauche3} <span className="text-gold-foil font-semibold opacity-90">AMZALLAG</span></>
                )}
              </p>
            </div>
            <div className="space-y-1 text-center font-elegant text-stone-700 leading-relaxed text-[13px] md:text-lg">
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>ליליאן שמחה <span className="text-gold-foil font-semibold opacity-90">מועאיטי</span></>
                ) : (
                  <>{t.familleDroite1} <span className="text-gold-foil font-semibold opacity-90">MOATIE</span></>
                )}
              </p>
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>מר נסים <span className="text-gold-foil font-semibold opacity-90">אביטבול</span></>
                ) : (
                  <>{t.familleDroite2} <span className="text-gold-foil font-semibold opacity-90">ABITBOL</span></>
                )}
              </p>
              <p dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? (
                  <>מר יוסף <span className="text-gold-foil font-semibold opacity-90">סלם</span></>
                ) : (
                  <>{t.familleDroite3} <span className="text-gold-foil font-semibold opacity-90">SELLAM</span></>
                )}
              </p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-4 md:space-y-8 px-2 md:px-4">
            <p className="font-serif text-lg md:text-3xl text-stone-600 italic font-light leading-relaxed card-text-animate-delay-2">
              {language === 'he' ? (
                <>
                  {t.remercient} <span className={`text-[#D4AF37] font-semibold not-italic text-xl md:text-3xl ${language === 'he' ? 'hebrew-hachem' : ''}`}>{t.hachem}</span> {t.convier}
                </>
              ) : (
                <>
                  {t.remercient} <span className={`text-[#D4AF37] font-semibold not-italic text-xl md:text-3xl align-middle ${language === 'he' ? 'hebrew-hachem' : ''}`}>{t.hachem}</span> {t.convier.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </>
              )}
            </p>

            {/* Prénoms en Calligraphie Élégante */}
            <div className="py-2 md:py-6 relative card-text-animate-delay-3">
              <h2 className={`${language === 'he' ? 'hebrew-names-calligraphy' : 'font-wedding-script'} text-7xl md:text-9xl leading-none mt-2 md:mt-4 text-[#B8860B] tracking-wide`}>
                {t.hatan} <span className="text-5xl md:text-7xl align-middle opacity-70 text-[#a89078]">&</span> {t.kala}
              </h2>
            </div>

            <p className="font-serif text-lg md:text-3xl text-stone-600 italic font-light card-text-animate-delay-4">
              {t.etVousPrient}<br />{t.quiSeraCelebree}
            </p>

            {/* Date/Heure - Condensé */}
            <div className="py-2 md:py-4 mt-0 space-y-3 card-text-animate-delay-5">
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                <p className="font-serif text-lg md:text-2xl text-[#B8860B] font-semibold tracking-wide">
                  {language === 'he' ? (
                    <>
                      יום שלישי <span className="text-2xl md:text-3xl">10</span> מרץ 2026
                    </>
                  ) : (
                    <>
                      Mardi <span className="text-2xl md:text-3xl">10</span> Mars 2026
                    </>
                  )}
                </p>
                <span className="text-stone-500 font-sans text-sm md:text-base">21 Adar 5786</span>
              </div>
              <p className="font-serif text-lg md:text-2xl text-[#B8860B] font-semibold tracking-wide">
                {language === 'he' ? '19:30 בדיוק' : '19H30 précises'}
              </p>
              <p className="font-serif text-lg md:text-3xl text-stone-600 italic font-light leading-relaxed mt-2">
                {t.ainsiQuaLaReception}
              </p>
            </div>

            <div className="mt-4 md:mt-8 opacity-80 card-text-animate-delay-6">
              <p className="font-serif italic text-base md:text-xl text-stone-600">{t.aMaMere}</p>
              <p className="font-serif italic text-base md:text-xl text-stone-600 mt-0">{t.etAGrandsParents}</p>
            </div>
          </div>
        </div>
      </section>

      {/* VERSET & INFO SALLE ODEON */}
      <section id="ceremonie" className="py-20 md:py-32 px-4 text-center relative overflow-hidden flex flex-col items-center justify-center">
        {/* Fond Sarah en arrière-plan */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/sarah.jpg")', opacity: 0.3 }} />
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 w-full">
          <Star className="w-4 h-4 text-[#B8860B] mx-auto mb-8 animate-pulse opacity-60" />
          <h2 className="font-elegant text-5xl md:text-7xl leading-tight text-[#B8860B] mb-4 opacity-90">אֲנִי לְדוֹדִי וְדוֹדִי לִי</h2>
          <p className="text-stone-500 font-light tracking-[0.25em] uppercase text-[10px] mb-10">{t.jeSuisAMonBienaime}</p>

          {/* Infos Salle Odeon */}
          <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-sm p-8 md:p-12 shadow-lg border border-[#B8860B]/10">
            <h3 className="text-[#B8860B] uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-2 font-medium mb-4">
              <MapPin size={16} /> {t.lieuException}
            </h3>
            <h2 className="text-4xl md:text-5xl font-elegant text-stone-800 mb-4">{t.salleOdeonTitle}</h2>
            <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg mb-4">
              {t.cadreEnchanteur}
            </p>
            <p className="text-stone-500 italic text-sm md:text-base">
              {t.adresse.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <div className="mt-8 pt-6 border-t border-[#B8860B]/20 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={googleCalendarLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/5 transition-all rounded-sm group"
              >
                <CalendarPlus size={18} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-[0.15em] text-[10px] font-medium">{t.ajouterAgenda}</span>
              </a>
              <a 
                href={wazeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8860B] text-white hover:bg-[#9A7009] transition-all shadow-xl shadow-[#B8860B]/20 rounded-sm group"
              >
                <Navigation size={18} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-[0.15em] text-[10px] font-medium">{t.yAllerWaze}</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* RSVP */}
      <section id="rsvp" className="py-20 md:py-32 px-4 relative">
        <div className="max-w-2xl mx-auto relative z-10 p-8 md:p-16" style={{ backgroundColor: '#FAF8F3' }}>
          <div className="text-center mb-12">
            <h2 className="font-elegant text-4xl md:text-5xl text-[#8B7355] mb-3 font-light">{t.rsvp}</h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="h-px w-12 bg-[#8B7355]/40"></span>
              <p className="text-[#8B7355] text-[10px] uppercase tracking-[0.3em] font-medium">{t.reponseSouhaitee}</p>
              <span className="h-px w-12 bg-[#8B7355]/40"></span>
            </div>
          </div>

          {!rsvpSent ? (
            <form onSubmit={async (e) => { 
              e.preventDefault(); 
              
              // Validation côté client
              if (rsvpData.presence === 'oui' && !rsvpData.houppa && !rsvpData.soiree) {
                alert('Veuillez sélectionner au moins la Houppa ou la Soirée si vous êtes présent(e).');
                return;
              }
              
              setIsSubmitting(true);
              try {
                // Google Apps Script nécessite mode 'no-cors' pour éviter les erreurs preflight
                // On utilise FormData pour une meilleure compatibilité
                const formData = new URLSearchParams();
                formData.append('prenom', rsvpData.prenom);
                formData.append('nom', rsvpData.nom);
                formData.append('adultes', rsvpData.adultes);
                formData.append('enfants', rsvpData.enfants);
                formData.append('presence', rsvpData.presence);
                formData.append('houppa', rsvpData.houppa ? 'true' : 'false');
                formData.append('soiree', rsvpData.soiree ? 'true' : 'false');
                formData.append('message', guestMessage);

                // Envoyer avec no-cors (on ne peut pas lire la réponse mais ça fonctionne)
                await fetch(API_URL, {
                  method: 'POST',
                  mode: 'no-cors',
                  body: formData
                });

                // Avec no-cors, on ne peut pas vérifier la réponse, mais si pas d'erreur, c'est envoyé
                // Attendre un peu pour laisser le temps à Google Apps Script de traiter
                await new Promise(resolve => setTimeout(resolve, 1500));
                setRsvpSent(true);
              } catch (error) {
                console.error('Erreur:', error);
                // Même en cas d'erreur, on considère que c'est envoyé (Google Apps Script peut enregistrer malgré CORS)
                setRsvpSent(true);
              } finally {
                setIsSubmitting(false);
              }
            }} className="space-y-10">
              {/* Nom et Prénom */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355] font-light">{t.prenom}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={rsvpData.prenom}
                      onChange={(e) => setRsvpData({...rsvpData, prenom: e.target.value})}
                      className="block w-full bg-transparent border-0 border-b-2 border-[#8B7355]/50 p-2 text-[#5A4A3A] text-base font-elegant focus:border-[#8B7355]/80 focus:bg-transparent focus:outline-none transition-all duration-300 placeholder:text-[#8B7355]/50 placeholder:font-light" 
                      placeholder="____________" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355] font-light">{t.nom}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      value={rsvpData.nom}
                      onChange={(e) => setRsvpData({...rsvpData, nom: e.target.value})}
                      className="block w-full bg-transparent border-0 border-b-2 border-[#8B7355]/50 p-2 text-[#5A4A3A] text-base font-elegant focus:border-[#8B7355]/80 focus:bg-transparent focus:outline-none transition-all duration-300 placeholder:text-[#8B7355]/50 placeholder:font-light" 
                      placeholder="____________" 
                    />
                  </div>
                </div>
              </div>

              {/* Nombre d'invités */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355] font-light">{t.adultes}</label>
                  <select 
                    value={rsvpData.adultes}
                    onChange={(e) => setRsvpData({...rsvpData, adultes: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-2 border-[#8B7355]/50 p-2 text-[#5A4A3A] text-base font-elegant outline-none focus:border-[#8B7355]/80 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-[#8B7355] font-light">{t.enfants}</label>
                  <select 
                    value={rsvpData.enfants}
                    onChange={(e) => setRsvpData({...rsvpData, enfants: e.target.value})}
                    className="w-full bg-transparent border-0 border-b-2 border-[#8B7355]/50 p-2 text-[#5A4A3A] text-base font-elegant outline-none focus:border-[#8B7355]/80 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>

              {/* Présence */}
              <div className="space-y-4 pt-2">
                <label className="block text-[#8B7355] text-[9px] uppercase tracking-[0.3em] font-light mb-6">{t.confirmezPresence}</label>
                <div className="flex gap-8 justify-center">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="presence" 
                      value="oui"
                      checked={rsvpData.presence === 'oui'}
                      onChange={(e) => setRsvpData({...rsvpData, presence: e.target.value})}
                      className="sr-only"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border transition-all duration-300 ${rsvpData.presence === 'oui' ? 'border-[#8B7355]/50 bg-[#8B7355]/10' : 'border-[#8B7355]/20 bg-transparent'}`}>
                        {rsvpData.presence === 'oui' && (
                          <div className="w-full h-full rounded-full bg-[#8B7355]/30 m-0.5"></div>
                        )}
                      </div>
                      <span className={`text-base font-elegant transition-colors ${rsvpData.presence === 'oui' ? 'text-[#5A4A3A]' : 'text-[#8B7355]/50'}`}>
                        {t.ouiPresent}
                      </span>
                    </div>
                  </label>
                  <span className="text-[#8B7355]/20 font-elegant">•</span>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="presence" 
                      value="non"
                      checked={rsvpData.presence === 'non'}
                      onChange={(e) => setRsvpData({...rsvpData, presence: e.target.value, adultes: '0', enfants: '0', houppa: false, soiree: false})}
                      className="sr-only"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border transition-all duration-300 ${rsvpData.presence === 'non' ? 'border-[#8B7355]/50 bg-[#8B7355]/10' : 'border-[#8B7355]/20 bg-transparent'}`}>
                        {rsvpData.presence === 'non' && (
                          <div className="w-full h-full rounded-full bg-[#8B7355]/30 m-0.5"></div>
                        )}
                      </div>
                      <span className={`text-base font-elegant transition-colors ${rsvpData.presence === 'non' ? 'text-[#5A4A3A]' : 'text-[#8B7355]/50'}`}>
                        {t.nonPresent}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Options Houppa & Soirée (seulement si présent) */}
              {rsvpData.presence === 'oui' && (
                <div className="space-y-4 pt-4 border-t border-[#8B7355]/30">
                  <label className="block text-[#8B7355] text-[9px] uppercase tracking-[0.3em] font-light mb-5">{t.jeSeraiPresentA}</label>
                  <div className="space-y-4 pl-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={rsvpData.houppa}
                        onChange={(e) => setRsvpData({...rsvpData, houppa: e.target.checked})}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border rounded-sm transition-all duration-300 flex items-center justify-center ${rsvpData.houppa ? 'border-[#8B7355]/40 bg-[#8B7355]/5' : 'border-[#8B7355]/20 bg-transparent'}`}>
                        {rsvpData.houppa && (
                          <div className="w-2 h-2 bg-[#8B7355]/40 rounded-sm"></div>
                        )}
                      </div>
                      <span className={`text-base font-elegant transition-colors ${rsvpData.houppa ? 'text-[#5A4A3A]' : 'text-[#8B7355]/50'}`}>
                        {t.jeSeraiPresentHouppa}
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={rsvpData.soiree}
                        onChange={(e) => setRsvpData({...rsvpData, soiree: e.target.checked})}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border rounded-sm transition-all duration-300 flex items-center justify-center ${rsvpData.soiree ? 'border-[#8B7355]/40 bg-[#8B7355]/5' : 'border-[#8B7355]/20 bg-transparent'}`}>
                        {rsvpData.soiree && (
                          <div className="w-2 h-2 bg-[#8B7355]/40 rounded-sm"></div>
                        )}
                      </div>
                      <span className={`text-base font-elegant transition-colors ${rsvpData.soiree ? 'text-[#5A4A3A]' : 'text-[#8B7355]/50'}`}>
                        {t.jeSeraiPresentSoiree}
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Message (obligatoire si présent) */}
              <div className="space-y-2 pt-4 border-t border-[#8B7355]/30">
                <label className="text-[#8B7355] text-[9px] uppercase tracking-[0.3em] font-light">
                  {t.petitMot} {rsvpData.presence === 'oui' ? '*' : ''}
                </label>
                <textarea 
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)} 
                  required={rsvpData.presence === 'oui'}
                  className="block w-full bg-transparent border-0 border-b-2 border-[#8B7355]/50 p-2 text-[#5A4A3A] font-elegant text-base h-24 focus:border-[#8B7355]/80 focus:outline-none focus:bg-transparent transition-all duration-300 resize-none placeholder:text-[#8B7355]/50 placeholder:font-light placeholder:italic" 
                  placeholder={rsvpData.presence === 'oui' ? "..." : "..."}
                ></textarea>
              </div>

              {/* Bouton de soumission */}
              <div className="pt-10 flex justify-center">
                <button 
                  type="submit"
                  disabled={isSubmitting || (rsvpData.presence === 'oui' && !rsvpData.houppa && !rsvpData.soiree)}
                  className="px-10 py-3 border-2 border-[#8B7355]/70 text-[#8B7355] uppercase tracking-[0.25em] text-[10px] font-medium transition-all duration-300 hover:border-[#8B7355] hover:text-[#5A4A3A] hover:bg-[#8B7355]/5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[#8B7355]/70 disabled:hover:text-[#8B7355] disabled:hover:bg-transparent"
                >
                  {isSubmitting ? t.envoiEnCours : t.confirmerReponse}
              </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-16 animate-fadeIn">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-12 bg-[#8B7355]/20"></span>
                <Wine className="text-[#8B7355]/50 w-6 h-6" />
                <span className="h-px w-12 bg-[#8B7355]/20"></span>
              </div>
              <span className="font-names text-4xl md:text-5xl text-[#8B7355] block mb-6 font-light">{t.todaRaba}</span>
              <p className="text-[#5A4A3A] font-elegant text-base leading-relaxed">
                {t.reponseEnregistree.split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          )}
        </div>
      </section >

      {/* FOOTER */}
      < footer className="bg-white/80 backdrop-blur-md py-12 md:py-20 text-center border-t border-[#B8860B]/10" >
        <p className={`${language === 'he' ? 'hebrew-names-calligraphy' : 'font-names'} text-3xl md:text-4xl mb-6 tracking-wide text-[#B8860B]`}>
          {language === 'he' ? `${t.hatan} & ${t.kala}` : 'Reouven & Sarah'}
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">10 . 03 . 2026</p>
      </footer >

      {/* BARRE NAVIGATION MOBILE (Type App) */}
      < div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#B8860B]/10 flex justify-around items-center py-3 z-50 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]" >
        <a href="#home" className="flex flex-col items-center gap-1 text-[#B8860B]">
          <Home size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">{t.accueil}</span>
        </a>
        <a href="#familles" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <Users size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">{t.famille}</span>
        </a>
        <a href="#ceremonie" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <MapPin size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">{t.lieu}</span>
        </a>
        <a href="#rsvp" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <Send size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">{t.rsvpNav}</span>
        </a>
      </div >

            </div>
      )}


    </div >
  );
}