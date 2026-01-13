import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, ChevronDown, Send, Menu, X, Star, Moon, Wine, Navigation, CalendarPlus, Users, Home } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  // --- RSVP ---
  const [guestMessage, setGuestMessage] = useState('');

  // --- TIMER ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Date du mariage : 10 Mars 2026
    const weddingDate = new Date('2026-03-10T17:30:00');

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

      {/* B"H Fixe */}
      <div className="fixed top-4 right-4 md:right-6 z-[60] text-[#B8860B]/40 text-xs font-serif select-none">B"H</div>

      {/* Menu Desktop */}
      <nav className={`hidden md:block fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-[#B8860B]/10' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl tracking-[0.2em] font-serif text-[#B8860B] border-y border-[#B8860B] py-1 cursor-default">R & S</div>
          <div className="flex space-x-12">
            {['Familles', 'Cérémonie', 'Lieu', 'RSVP'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                className={`text-xs uppercase tracking-[0.25em] transition-colors relative group hover:text-[#B8860B] ${scrolled ? 'text-stone-700' : 'text-stone-600'}`}
              >
                {item}
              </a>
            ))}
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
              Save the Date
            </span>
          </div>

          {/* Noms avec effet Solid Gold spectaculaire */}
          <div className="flex flex-row items-center justify-center gap-[2vw] md:gap-8 mb-8 md:mb-12 relative z-10 w-full whitespace-nowrap overflow-visible">
            <h1 className="font-names text-[11vw] md:text-[5.5rem] lg:text-[7.5rem] text-gold-foil leading-[0.8] tracking-normal">
              Reouven
            </h1>
            <div className="text-[3vw] md:text-3xl font-elegant text-[#8B6914]/60 italic font-light mt-1">&</div>
            <h1 className="font-names text-[11vw] md:text-[5.5rem] lg:text-[7.5rem] text-gold-foil leading-[0.8] tracking-normal">
              Sarah
            </h1>
          </div>

          {/* Détails épurés */}
          <div className="space-y-6 relative z-10 mb-16">
            <p className="font-sans text-sm md:text-xl text-[#8B6914] tracking-[0.25em] font-medium uppercase">
              Mardi 10 Mars 2026
            </p>

            <div className="flex justify-center items-center gap-4 opacity-60">
              <span className="h-px w-8 md:w-16 bg-[#8B6914]/30"></span>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#8B6914]">
                Salle Odeon • Hemek Hefer
              </p>
              <span className="h-px w-8 md:w-16 bg-[#8B6914]/30"></span>
            </div>
          </div>

          {/* TIMER VOGUE STYLE (Minimaliste & Fin) */}
          <div className="relative z-10 flex justify-center gap-8 md:gap-16 border-t border-[#8B6914]/10 pt-8 max-w-lg mx-auto">
            {[{ l: 'Jours', v: timeLeft.days }, { l: 'Heures', v: timeLeft.hours }, { l: 'Min', v: timeLeft.minutes }, { l: 'Sec', v: timeLeft.seconds }].map((t, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <span className="font-elegant text-2xl md:text-4xl text-[#B8860B] font-light italic tabular-nums leading-none">
                  {String(t.v).padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-[#8B6914]/60 mt-2 font-sans font-medium">
                  {t.l}
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
                  // Scroll automatique vers la section Familles après un court délai
                  setTimeout(() => {
                    document.getElementById('familles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="group px-8 md:px-12 py-3 md:py-4 border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-all duration-500 uppercase tracking-[0.2em] text-xs md:text-sm font-medium rounded-sm relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Voir l'invitation
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

          {/* Arc Hébreu - Path Standard (Gauche -> Droite) avec texte inversé pour lecture correcte RTL */}
          <div className="w-full flex justify-center mb-4 md:mb-6 card-text-animate">
            <svg viewBox="0 0 500 120" className="w-full max-w-lg md:max-w-2xl opacity-60">
              <path id="curve-hebrew-top" d="M 50,120 Q 250,20 450,120" fill="transparent" />
              <text width="500">
                <textPath xlinkHref="#curve-hebrew-top" startOffset="50%" textAnchor="middle" className="text-lg md:text-2xl fill-[#8B7355]" style={{ fontFamily: 'serif' }}>
                  הלכ לוקו ןתח לוק החמש לוקו ןושש לוק
                </textPath>
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-1 md:gap-16 mb-6 md:mb-10 items-start opacity-100 card-text-animate-delay-1">
            <div className="space-y-1 text-center font-elegant text-stone-700 leading-relaxed text-[13px] md:text-lg">
              <p>Mme Margalith <span className="text-gold-foil font-semibold opacity-90">SOUSSAN</span></p>
              <p>Mr Simon <span className="text-gold-foil font-semibold opacity-90">AMZALLAG</span></p>
              <p>Mr et Mme David <span className="text-gold-foil font-semibold opacity-90">AMZALLAG</span></p>
            </div>
            <div className="space-y-1 text-center font-elegant text-stone-700 leading-relaxed text-[13px] md:text-lg">
              <p>Liliane Sim'ha <span className="text-gold-foil font-semibold opacity-90">MOATIE</span></p>
              <p>Mr Nissim <span className="text-gold-foil font-semibold opacity-90">ABITBOL</span></p>
              <p>Mr Joseph <span className="text-gold-foil font-semibold opacity-90">SELLAM</span></p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-4 md:space-y-8 px-2 md:px-4">
            <p className="font-serif text-lg md:text-3xl text-stone-600 italic font-light leading-relaxed card-text-animate-delay-2">
              Remercient <span className="text-[#D4AF37] font-semibold not-italic text-xl md:text-3xl align-middle">Hachem</span> d'avoir la joie de vous convier<br />au mariage de leurs enfants et petits-enfants
            </p>

            {/* Prénoms en Calligraphie Élégante */}
            <div className="py-2 md:py-6 relative card-text-animate-delay-3">
              <h2 className="font-wedding-script text-7xl md:text-9xl leading-none mt-2 md:mt-4 text-[#B8860B] tracking-wide">
                Ruben <span className="text-5xl md:text-7xl align-middle opacity-70 text-[#a89078]">&</span> Sarah
              </h2>
            </div>

            <p className="font-serif text-lg md:text-3xl text-stone-600 italic font-light card-text-animate-delay-4">
              Et vous prient de bien vouloir assister à la Houppa<br />qui sera célébrée le
            </p>

            {/* Date/Heure - Condensé */}
            <div className="py-2 md:py-4 mt-0 space-y-2 card-text-animate-delay-5">
              <p className="font-sans text-sm md:text-lg tracking-[0.25em] text-[#B8860B] uppercase font-semibold">
                Mardi 10 Mars 2026
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-stone-500 font-sans text-xs md:text-sm tracking-widest uppercase">
                <span>21 Adar 5786</span>
                <span className="hidden md:inline w-1 h-1 rounded-full bg-[#B8860B]/40"></span>
                <span>À 17h30 précises</span>
              </div>
            </div>

            <div className="mt-4 md:mt-8 opacity-80 card-text-animate-delay-6">
              <p className="font-serif italic text-base md:text-xl text-stone-600">A ma mère qui me manque…</p>
              <p className="font-serif italic text-base md:text-xl text-stone-600 mt-0">et à nos grands-parents si chers à nos cœurs.</p>
              <p className="font-serif text-sm md:text-xl text-[#B8860B] mt-2 font-medium">בית נאמן בישראל</p>
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
          <p className="text-stone-500 font-light tracking-[0.25em] uppercase text-[10px] mb-10">Je suis à mon bien-aimé, et mon bien-aimé est à moi</p>

          {/* Infos Salle Odeon */}
          <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-sm p-8 md:p-12 shadow-lg border border-[#B8860B]/10">
            <h3 className="text-[#B8860B] uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-2 font-medium mb-4">
              <MapPin size={16} /> Lieu d'Exception
            </h3>
            <h2 className="text-4xl md:text-5xl font-elegant text-stone-800 mb-4">Salle Odeon</h2>
            <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg mb-4">
              Un cadre enchanteur pour célébrer notre union.
            </p>
            <p className="text-stone-500 italic text-sm md:text-base">
              Odeon Event Garden<br />
              HaMasik St 6, Hemek Hefer
            </p>
            <div className="mt-8 pt-6 border-t border-[#B8860B]/20 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={googleCalendarLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/5 transition-all rounded-sm group"
              >
                <CalendarPlus size={18} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-[0.15em] text-[10px] font-medium">Ajouter à l'agenda</span>
              </a>
              <a 
                href={wazeLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8860B] text-white hover:bg-[#9A7009] transition-all shadow-xl shadow-[#B8860B]/20 rounded-sm group"
              >
                <Navigation size={18} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-[0.15em] text-[10px] font-medium">Y aller avec Waze</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* RSVP */}
      < section id="rsvp" className="py-20 md:py-40 px-4 relative" >
        <div className="max-w-2xl mx-auto relative z-10 card-premium p-8 md:p-16 rounded-sm">
          <div className="text-center mb-10">
            <h2 className="font-elegant text-4xl md:text-5xl text-stone-800 mb-3">R.S.V.P</h2>
            <p className="text-[#B8860B] text-[10px] uppercase tracking-[0.25em]">Réponse souhaitée avant le 1er Juin</p>
          </div>

          {!rsvpSent ? (
            <form onSubmit={(e) => { e.preventDefault(); setRsvpSent(true); }} className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">Prénom</label>
                  <input type="text" required className="block w-full bg-stone-50 border-b border-stone-200 p-3 text-stone-800 text-sm focus:border-[#B8860B] focus:bg-white focus:outline-none transition-colors rounded-t-sm placeholder:text-stone-300" placeholder="Votre prénom" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">Nom</label>
                  <input type="text" required className="block w-full bg-stone-50 border-b border-stone-200 p-3 text-stone-800 text-sm focus:border-[#B8860B] focus:bg-white focus:outline-none transition-colors rounded-t-sm placeholder:text-stone-300" placeholder="Votre nom" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-400 text-[9px] uppercase tracking-widest mb-2 ml-1">Adultes</label>
                  <select className="w-full bg-stone-50 border-b border-stone-200 p-3 text-stone-800 text-sm outline-none focus:border-[#B8860B] rounded-t-sm">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 text-[9px] uppercase tracking-widest mb-2 ml-1">Enfants</label>
                  <select className="w-full bg-stone-50 border-b border-stone-200 p-3 text-stone-800 text-sm outline-none focus:border-[#B8860B] rounded-t-sm">
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-stone-400 text-[9px] uppercase tracking-widest ml-1">Un petit mot pour les mariés ?</label>
                <textarea value={guestMessage} onChange={(e) => setGuestMessage(e.target.value)} className="w-full bg-stone-50 border border-stone-200 p-4 text-stone-800 font-elegant text-lg rounded-sm h-32 focus:border-[#B8860B] focus:outline-none focus:bg-white transition-colors resize-none placeholder:text-stone-300 italic" placeholder="Écrivez vos vœux ici..."></textarea>
              </div>

              <button className="w-full bg-[#1A1A1A] text-[#B8860B] py-4 uppercase tracking-[0.25em] text-xs font-medium rounded-sm shadow-lg hover:bg-black transition-all hover:shadow-xl mt-4">
                Confirmer ma présence
              </button>
            </form>
          ) : (
            <div className="text-center py-20 bg-white/50 rounded-sm animate-in fade-in duration-700">
              <div className="w-16 h-16 bg-[#B8860B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wine className="text-[#B8860B] w-8 h-8" />
              </div>
              <span className="font-names text-5xl text-[#B8860B] block mb-4">Toda Raba !</span>
              <p className="text-stone-600 font-light text-lg">Votre réponse a bien été enregistrée.<br />Nous avons hâte de vous retrouver.</p>
            </div>
          )}
        </div>
      </section >

      {/* FOOTER */}
      < footer className="bg-white/80 backdrop-blur-md py-12 md:py-20 text-center border-t border-[#B8860B]/10" >
        <p className="font-names text-3xl md:text-4xl mb-6 tracking-wide text-[#B8860B]">Reouven & Sarah</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">10 . 03 . 2026</p>
      </footer >

      {/* BARRE NAVIGATION MOBILE (Type App) */}
      < div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#B8860B]/10 flex justify-around items-center py-3 z-50 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]" >
        <a href="#home" className="flex flex-col items-center gap-1 text-[#B8860B]">
          <Home size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">Accueil</span>
        </a>
        <a href="#familles" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <Users size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">Famille</span>
        </a>
        <a href="#ceremonie" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <MapPin size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">Lieu</span>
        </a>
        <a href="#rsvp" className="flex flex-col items-center gap-1 text-stone-400 hover:text-[#B8860B] transition-colors">
          <Send size={18} strokeWidth={1.5} />
          <span className="text-[8px] uppercase tracking-widest font-medium">RSVP</span>
        </a>
      </div >

        </div>
      )}


    </div >
  );
}