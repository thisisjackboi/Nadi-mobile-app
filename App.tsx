import React, { useState, useEffect } from 'react';
import { 
  Camera, MapPin, User as UserIcon, Home, Plus, ChevronRight, 
  Bell, Settings, CheckCircle, AlertCircle, FileText, 
  ArrowLeft, Loader2, ShieldCheck, Globe, LogOut, TrendingUp,
  Award, PlayCircle, Heart, Clock
} from 'lucide-react';
import { 
  Language, User, Grievance, ScreenName, 
  GrievanceCategory, GrievanceStatus 
} from './types';
import { MOCK_GRIEVANCES, CATEGORY_ICONS, STATUS_COLORS, TRANSLATIONS, MARKETING_UPDATES } from './constants';

// --- Translation Hook Mock ---
const useTranslation = (lang: Language) => {
  return (key: keyof typeof TRANSLATIONS[Language.ENGLISH]) => {
    return TRANSLATIONS[lang][key] || key;
  };
};

// --- Components ---

const PoliticianAvatar: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="95" fill="#FFF7ED" stroke="#FF9933" strokeWidth="4"/>
    {/* Body - Saffron Jacket */}
    <path d="M40 200C40 150 160 150 160 200" fill="#FF9933"/>
    <path d="M100 150V200" stroke="#E07000" strokeWidth="2"/>
    {/* Scarf */}
    <path d="M60 160C60 160 80 190 100 180C120 170 140 160 140 160" stroke="#138808" strokeWidth="8" strokeLinecap="round"/>
    {/* Head */}
    <circle cx="100" cy="100" r="45" fill="#FAD7BD"/>
    {/* Hair/Beard */}
    <path d="M55 100C55 70 80 50 100 50C120 50 145 70 145 100C145 110 140 140 100 140C60 140 55 110 55 100Z" fill="#E2E8F0"/>
    <path d="M55 100C55 70 80 50 100 50C120 50 145 70 145 100" fill="#F1F5F9"/>
    {/* Glasses */}
    <path d="M75 100C75 100 80 110 95 110C110 110 115 100 115 100" stroke="#334155" strokeWidth="2" fill="none"/>
    <circle cx="82" cy="100" r="8" stroke="#334155" strokeWidth="2" fill="none"/>
    <circle cx="118" cy="100" r="8" stroke="#334155" strokeWidth="2" fill="none"/>
    {/* Lotus Pin */}
    <circle cx="140" cy="170" r="10" fill="white"/>
    <path d="M136 172C136 172 140 165 144 172" stroke="#FF9933" strokeWidth="2"/>
    <path d="M140 174V166" stroke="#138808" strokeWidth="1"/>
  </svg>
);

const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', fullWidth = false, className = '', disabled = false }) => {
  const baseStyles = "py-3 px-6 rounded-xl font-bold tracking-wide transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-nadi-orange text-white shadow-lg shadow-orange-200 hover:bg-nadi-orangeDark disabled:opacity-50",
    secondary: "bg-white text-nadi-orange border-2 border-nadi-orange hover:bg-orange-50",
    success: "bg-nadi-green text-white shadow-lg shadow-green-200 hover:bg-green-700",
    outline: "border-2 border-gray-200 text-gray-600 hover:border-nadi-orange hover:text-nadi-orange",
    ghost: "text-nadi-lightText hover:text-nadi-text hover:bg-gray-100"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-semibold text-gray-600 ml-1">{label}</label>}
    <input 
      className={`p-4 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-nadi-orange transition-all ${className}`}
      {...props} 
    />
  </div>
);

const BottomNav: React.FC<{
  activeTab: 'home' | 'submit' | 'profile';
  onTabChange: (tab: 'home' | 'submit' | 'profile') => void;
  lang: Language;
}> = ({ activeTab, onTabChange, lang }) => {
  const t = useTranslation(lang);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-end shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 pb-6">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-nadi-orange' : 'text-gray-400'}`}
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-bold">{t('home')}</span>
      </button>

      <div className="relative -top-6">
        <button 
          onClick={() => onTabChange('submit')}
          className="bg-gradient-to-r from-nadi-orange to-red-500 text-white p-4 rounded-full shadow-xl shadow-orange-300 hover:scale-105 transition-transform active:scale-95 border-4 border-white"
        >
          <Plus size={32} />
        </button>
      </div>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-nadi-orange' : 'text-gray-400'}`}
      >
        <UserIcon size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className="text-[10px] font-bold">{t('profile')}</span>
      </button>
    </div>
  );
};

const Header: React.FC<{
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, onBack, rightAction }) => (
  <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-4 flex items-center justify-between border-b border-gray-100">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-gray-600">
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="text-xl font-bold text-nadi-text">{title}</h1>
    </div>
    {rightAction}
  </div>
);

// --- Screens ---

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-orange-50 via-white to-green-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* BJP Theme Background Elements */}
      <div className="absolute top-0 right-0 w-full h-1/3 bg-gradient-to-b from-nadi-orange/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-nadi-green/20 to-transparent" />

      <div className="z-10 flex flex-col items-center animate-slide-up text-center">
        <div className="mb-8 relative">
           {/* Animated Rings */}
           <div className="absolute inset-0 rounded-full border-4 border-orange-200 animate-ping opacity-20"></div>
           <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-ping delay-700 opacity-20"></div>
           
           {/* New Image Container */}
           <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl animate-bounce-slight relative z-10">
             <img 
               src="https://i.ibb.co/gFZtW6N/Designer-1.jpg" 
               className="w-full h-full object-cover" 
               alt="Honorable Leader"
             />
           </div>
        </div>
        
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-nadi-orange to-red-600 mb-2 mt-2">Nadi</h1>
        <p className="text-nadi-text font-medium text-lg tracking-wide">Empowering The Nation</p>
        
        <div className="mt-12 flex gap-2">
           <div className="w-3 h-3 rounded-full bg-nadi-orange animate-pulse" />
           <div className="w-3 h-3 rounded-full bg-white border border-gray-300 animate-pulse delay-100" />
           <div className="w-3 h-3 rounded-full bg-nadi-green animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

const LanguageScreen: React.FC<{ onSelect: (lang: Language) => void }> = ({ onSelect }) => (
  <div className="h-screen w-full bg-white p-6 flex flex-col justify-center animate-fade-in relative">
     <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-nadi-orange via-white to-nadi-green" />
    <div className="mb-12 text-center">
      <div className="inline-block p-4 rounded-full bg-orange-50 mb-6">
        <Globe size={40} className="text-nadi-orange" />
      </div>
      <h2 className="text-2xl font-bold text-nadi-text mb-2">Select Language</h2>
      <p className="text-nadi-lightText">Choose your preferred language / আপোনাৰ পছন্দৰ ভাষা বাছক</p>
    </div>
    
    <div className="flex flex-col gap-4">
      <button 
        onClick={() => onSelect(Language.ENGLISH)}
        className="p-6 rounded-2xl border-2 border-gray-100 hover:border-nadi-orange hover:bg-orange-50 transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
      >
        <span className="text-lg font-bold text-gray-700 group-hover:text-nadi-orange">English</span>
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-nadi-orange flex items-center justify-center">
           <div className="w-3 h-3 rounded-full bg-nadi-orange opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
      
      <button 
        onClick={() => onSelect(Language.ASSAMESE)}
        className="p-6 rounded-2xl border-2 border-gray-100 hover:border-nadi-green hover:bg-green-50 transition-all flex justify-between items-center group shadow-sm hover:shadow-md"
      >
        <span className="text-lg font-bold text-gray-700 group-hover:text-nadi-green">অসমীয়া</span>
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-nadi-green flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-nadi-green opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>
    </div>
  </div>
);

const LoginScreen: React.FC<{ 
  onLogin: (phone: string) => void; 
  step: 'PHONE' | 'OTP' | 'AADHAAR';
  setStep: (s: 'PHONE' | 'OTP' | 'AADHAAR') => void;
  phone: string;
  setPhone: (s: string) => void;
  lang: Language;
}> = ({ onLogin, step, setStep, phone, setPhone, lang }) => {
  const [otp, setOtp] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslation(lang);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setOtp(val);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAadhaar(val);
  };

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setIsLoading(true);
      setTimeout(() => { setIsLoading(false); setStep('OTP'); }, 1000);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setIsLoading(true);
      setTimeout(() => { setIsLoading(false); setStep('AADHAAR'); }, 1000);
    }
  };

  const handleAadhaarSubmit = () => {
    setIsLoading(true);
    setTimeout(() => { 
      setIsLoading(false); 
      onLogin(phone); 
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col animate-fade-in relative">
      <div className="bg-nadi-orange h-32 w-full rounded-b-[40px] absolute top-0 left-0 z-0 shadow-lg"></div>
      
      <div className="z-10 p-6 pt-12 flex flex-col h-full">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 mt-4">
          <h2 className="text-3xl font-bold text-nadi-text mb-2">
            {step === 'PHONE' && t('welcome')}
            {step === 'OTP' && t('verify')}
            {step === 'AADHAAR' && t('aadhaarTitle')}
          </h2>
          <p className="text-gray-500 mb-8">
            {step === 'PHONE' && t('loginSubtitle')}
            {step === 'OTP' && `${t('otpSent')} +91 ${phone}`}
            {step === 'AADHAAR' && t('aadhaarSubtitle')}
          </p>

          {step === 'PHONE' && (
            <div className="flex items-center border rounded-xl p-1 focus-within:ring-2 ring-nadi-orange transition-all">
              <span className="pl-4 pr-2 text-gray-500 font-bold border-r">+91</span>
              <input 
                type="tel" 
                inputMode="numeric"
                className="w-full p-3 outline-none rounded-r-xl"
                placeholder="98765 43210" 
                value={phone} 
                onChange={handlePhoneChange}
                maxLength={10}
                autoFocus
              />
            </div>
          )}

          {step === 'OTP' && (
             <Input 
                type="tel" 
                inputMode="numeric"
                placeholder="• • • •" 
                className="text-center text-3xl tracking-[1em] font-bold text-nadi-orange"
                value={otp} 
                onChange={handleOtpChange}
                maxLength={4}
                autoFocus
              />
          )}

          {step === 'AADHAAR' && (
            <div className="relative">
               <Input 
                type="tel" 
                inputMode="numeric"
                placeholder="0000 0000 00" 
                value={aadhaar} 
                onChange={handleAadhaarChange}
                maxLength={10}
                className="pl-12"
              />
              <ShieldCheck className="absolute left-4 top-4 text-nadi-green" size={20} />
            </div>
          )}
        </div>

        <div className="mt-auto mb-8 flex flex-col gap-3">
          <Button 
            fullWidth 
            variant={step === 'AADHAAR' ? 'success' : 'primary'}
            onClick={step === 'PHONE' ? handlePhoneSubmit : step === 'OTP' ? handleOtpSubmit : handleAadhaarSubmit}
            disabled={
              isLoading || 
              (step === 'PHONE' && phone.length < 10) || 
              (step === 'OTP' && otp.length < 4) ||
              (step === 'AADHAAR' && aadhaar.length > 0 && aadhaar.length < 10)
            }
          >
            {isLoading ? <Loader2 className="animate-spin" /> : t('continue')}
          </Button>
          
          {step === 'AADHAAR' && (
            <Button variant="ghost" fullWidth onClick={() => onLogin(phone)}>
              {t('skip')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketingCard: React.FC<{ title: string, image: string, date: string }> = ({ title, image, date }) => (
  <div className="min-w-[280px] h-64 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col border border-gray-100 snap-start">
    <div className="h-40 w-full overflow-hidden relative">
      <img src={image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="News" />
      <div className="absolute top-2 right-2 bg-nadi-orange text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
        DEVELOPMENT
      </div>
    </div>
    <div className="p-4 flex flex-col justify-between flex-1">
      <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight">{title}</h3>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
        <Clock size={12} /> {date}
      </div>
    </div>
  </div>
);

const GrievanceListScreen: React.FC<{
  grievances: Grievance[];
  onBack: () => void;
  onGrievanceClick: (g: Grievance) => void;
  lang: Language;
}> = ({ grievances, onBack, onGrievanceClick, lang }) => {
  const t = useTranslation(lang);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-slide-in-right">
      <Header title={t('allGrievances')} onBack={onBack} />
      <div className="p-4 space-y-4 pb-24">
        {grievances.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">{t('noGrievances')}</div>
        ) : (
          grievances.map(g => (
            <div 
              key={g.id}
              onClick={() => onGrievanceClick(g)}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-3xl bg-gray-50 p-3 rounded-xl">{CATEGORY_ICONS[g.category]}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-1 pr-2">{g.title}</h3>
                  <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${g.status === GrievanceStatus.RESOLVED ? 'bg-nadi-green' : 'bg-nadi-orange'}`} />
                </div>
                <p className="text-xs text-gray-500 mb-1 line-clamp-1">{g.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> {g.dateSubmitted}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_COLORS[g.status]}`}>
                    {g.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DashboardScreen: React.FC<{ 
  user: User; 
  grievances: Grievance[];
  onGrievanceClick: (g: Grievance) => void;
  onViewAll: () => void;
  lang: Language;
}> = ({ user, grievances, onGrievanceClick, onViewAll, lang }) => {
  const t = useTranslation(lang);

  return (
    <div className="pb-32 animate-fade-in bg-gray-50 min-h-screen">
      {/* BJP Header Gradient */}
      <div className="bg-gradient-to-b from-nadi-orange via-[#FF9933] to-orange-400 px-6 pt-12 pb-16 rounded-b-[40px] shadow-lg relative overflow-hidden">
        {/* Decorative Lotus Outline (Abstract) */}
        <div className="absolute -right-10 -top-10 opacity-10 text-white">
          <PoliticianAvatar size={300} />
        </div>

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <p className="text-orange-100 text-sm font-medium">{t('namaskar')},</p>
            <h1 className="text-2xl font-bold text-white">{user.name || t('citizen')}</h1>
          </div>
          <div className="flex gap-2">
             <div className="p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 cursor-pointer">
              <Globe size={20} />
            </div>
            <div className="p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 cursor-pointer">
              <Bell size={20} />
            </div>
          </div>
        </div>

        {/* Hero Card - Politician Marketing */}
        <div className="relative z-10 mt-2">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.ibb.co/gFZtW6N/Designer-1.jpg" 
                  className="w-full h-full object-cover" 
                  alt="Minister"
                />
             </div>
             <div>
               <h2 className="text-white font-bold text-lg leading-tight">"Sabka Saath,<br/>Sabka Vikas"</h2>
               <p className="text-orange-100 text-xs mt-1">Hon'ble Minister</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Overlapping Header */}
      <div className="relative z-20 -mt-10 px-4 space-y-8">
        
        {/* Quick Actions Grid */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex justify-around">
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-green-50 text-nadi-green rounded-xl">
               <TrendingUp size={24} />
             </div>
             <span className="text-[10px] font-bold text-gray-600">Progress</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-orange-50 text-nadi-orange rounded-xl">
               <Award size={24} />
             </div>
             <span className="text-[10px] font-bold text-gray-600">Schemes</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
               <PlayCircle size={24} />
             </div>
             <span className="text-[10px] font-bold text-gray-600">Live</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-red-50 text-red-500 rounded-xl">
               <Heart size={24} />
             </div>
             <span className="text-[10px] font-bold text-gray-600">Donate</span>
           </div>
        </div>

        {/* Marketing Horizontal Scroll */}
        <div>
          <div className="flex justify-between items-center mb-4 px-2">
            <h2 className="font-bold text-lg text-nadi-text flex items-center gap-2">
              <span className="w-1 h-6 bg-nadi-orange rounded-full"/> 
              {t('marketingTitle')}
            </h2>
            <ChevronRight className="text-gray-400" size={16} />
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide px-2">
            {MARKETING_UPDATES.map(update => (
              <MarketingCard 
                key={update.id}
                title={lang === Language.ENGLISH ? update.title[Language.ENGLISH] : update.title[Language.ASSAMESE]}
                image={update.image}
                date={update.date}
              />
            ))}
          </div>
        </div>

        {/* Secondary Section: Grievances */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg text-nadi-text">{t('myGrievances')}</h2>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{grievances.length} Active</span>
           </div>

           <div className="space-y-4">
              {grievances.slice(0, 2).map(g => (
                <div 
                  key={g.id}
                  onClick={() => onGrievanceClick(g)}
                  className="flex items-center gap-4 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">{CATEGORY_ICONS[g.category]}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{g.title}</h3>
                    <p className="text-xs text-gray-400">{g.dateSubmitted}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${g.status === GrievanceStatus.RESOLVED ? 'bg-nadi-green' : 'bg-nadi-orange'}`} />
                </div>
              ))}
              <Button variant="outline" fullWidth onClick={onViewAll} className="text-xs py-2 h-10 border-dashed">
                 View All Reports
              </Button>
           </div>
        </div>

      </div>
    </div>
  );
};

// ... (SubmitScreen and GrievanceDetailScreen logic remains largely similar but with updated UI colors and t() usage)

const SubmitScreen: React.FC<{ 
  onClose: () => void; 
  onSubmit: (g: Partial<Grievance>) => void;
  lang: Language;
}> = ({ onClose, onSubmit, lang }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<GrievanceCategory | null>(null);
  const [isAnon, setIsAnon] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState('');
  const t = useTranslation(lang);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation("Dispur, Guwahati");
      setIsLocating(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (!category) return;
    onSubmit({
      title: `${category} Issue`,
      description: desc,
      category: category,
      location: location || "Unknown",
      imageUrl: image || undefined,
      isAnonymous: isAnon
    });
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-up">
      <Header 
        title={step === 1 ? t('evidence') : step === 2 ? "Details" : "Review"} 
        onBack={step === 1 ? onClose : () => setStep(step - 1)}
      />
      
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-nadi-orange' : 'bg-gray-100'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full pb-20">
            <div className="w-full aspect-[4/5] bg-orange-50 rounded-3xl border-2 border-dashed border-orange-200 flex flex-col items-center justify-center relative overflow-hidden group active:scale-95 transition-all">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="bg-white p-6 rounded-full shadow-lg mb-4">
                     <Camera size={32} className="text-nadi-orange" />
                  </div>
                  <p className="text-nadi-orangeDark font-bold">Take Photo</p>
                  <p className="text-xs text-gray-400 mt-1">Tap to capture or upload</p>
                </>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 z-10" onChange={handleImageUpload} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-in-right">
             <div>
              <label className="text-sm font-bold text-gray-600 mb-3 block">{t('category')}</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(GrievanceCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`p-3 rounded-xl flex flex-col items-center gap-2 border-2 transition-all ${
                      category === cat 
                        ? 'bg-orange-50 border-nadi-orange text-nadi-orangeDark shadow-md' 
                        : 'bg-white border-gray-100 text-gray-400'
                    }`}
                  >
                    <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                    <span className="text-[10px] font-bold">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <Input 
              label={t('description')} 
              placeholder="Describe the issue..." 
              value={desc} 
              onChange={e => setDesc(e.target.value)}
            />

            <div>
               <label className="text-sm font-bold text-gray-600 mb-2 block">{t('location')}</label>
               <button 
                onClick={handleLocation}
                className="w-full p-4 rounded-xl bg-gray-50 text-gray-700 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-100 transition-colors font-medium"
               >
                 {isLocating ? <Loader2 className="animate-spin" /> : <MapPin size={20} className="text-nadi-orange" />}
                 {location || "Detect My Location"}
               </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-slide-in-right">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
               {image && <img src={image} className="w-24 h-24 rounded-xl object-cover" />}
               <div className="flex-1">
                 <div className="text-xs font-bold text-nadi-orange uppercase tracking-wider mb-1">{category}</div>
                 <div className="text-sm font-semibold text-gray-800 line-clamp-3">{desc}</div>
               </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
               <div className="flex items-center gap-3">
                 <ShieldCheck className={isAnon ? "text-nadi-green" : "text-gray-400"} />
                 <span className="text-sm font-medium">Submit Anonymously</span>
               </div>
               <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isAnon ? 'bg-nadi-green' : 'bg-gray-300'}`}
                onClick={() => setIsAnon(!isAnon)}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAnon ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-gray-100 bg-white">
        <Button 
          fullWidth 
          variant="primary"
          onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
          disabled={
            (step === 1 && !image) ||
            (step === 2 && (!category || !desc || !location))
          }
        >
          {step === 3 ? t('submit') : "Next"}
        </Button>
      </div>
    </div>
  );
};

// ... GrievanceDetailScreen reused, minor tweaks for theme ...
const GrievanceDetailScreen: React.FC<{ 
  grievance: Grievance; 
  onBack: () => void 
}> = ({ grievance, onBack }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-in-right overflow-y-auto">
      <div className="sticky top-0 z-10">
        <div className="absolute top-4 left-4 z-20">
          <button onClick={onBack} className="p-2 bg-white/80 backdrop-blur rounded-full shadow-md text-gray-700">
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="w-full h-64 bg-gray-200 relative">
          <img src={grievance.imageUrl} className="w-full h-full object-cover" alt="Evidence" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-24">
             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white border border-white/30 inline-block mb-2 ${STATUS_COLORS[grievance.status].replace('bg-gray-100', 'bg-gray-500').replace('text-gray-600', '')}`}>
              {grievance.status}
            </span>
            <h1 className="text-white text-2xl font-bold leading-tight">{grievance.title}</h1>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 bg-white relative -mt-6 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg inline-flex">
           <MapPin size={16} className="text-nadi-orange" />
           {grievance.location}
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-nadi-text mb-2 text-lg">Description</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{grievance.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-nadi-text mb-4 text-lg">Activity</h3>
          <div className="space-y-6 ml-2 border-l-2 border-dashed border-gray-200 pl-6 relative">
            {grievance.updates.map((update, idx) => (
              <div key={idx} className="relative pb-2">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-nadi-green border-2 border-white shadow-md z-10" />
                <div className="flex flex-col gap-1 bg-gray-50 p-3 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-800">{update.title}</span>
                    <span className="text-[10px] text-gray-400">{update.date}</span>
                  </div>
                  <p className="text-xs text-gray-500">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{ user: User; onLogout: () => void; lang: Language }> = ({ user, onLogout, lang }) => {
  const t = useTranslation(lang);
  return (
    <div className="p-6 animate-fade-in pb-24 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center mb-8 pt-8 relative">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-nadi-orange mb-4 border-4 border-nadi-orange shadow-lg z-10">
          <UserIcon size={40} />
        </div>
        <div className="w-full h-32 bg-nadi-orange absolute top-[-50px] left-0 rounded-b-[40px] z-0 opacity-20"></div>
        <h2 className="text-xl font-bold text-nadi-text">{user.name || "Citizen"}</h2>
        <p className="text-gray-400 text-sm">+91 {user.phoneNumber}</p>
      </div>

      <div className="space-y-3">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-nadi-green rounded-lg"><CheckCircle size={20} /></div>
            <span className="font-bold text-gray-700">Identity Status</span>
          </div>
          <span className="text-xs font-bold text-white bg-nadi-green px-2 py-1 rounded">Verified</span>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-nadi-orange rounded-lg"><Globe size={20} /></div>
            <span className="font-bold text-gray-700">Language</span>
          </div>
          <span className="text-sm text-gray-500 font-medium">{lang}</span>
        </div>
      </div>

      <div className="mt-8">
        <Button variant="outline" fullWidth onClick={onLogout} className="text-red-500 border-red-200 hover:bg-red-50">
          <LogOut size={20} /> Sign Out
        </Button>
      </div>
    </div>
  );
};

// --- Main App Logic ---

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('SPLASH');
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [loginPhone, setLoginPhone] = useState('');
  const [loginStep, setLoginStep] = useState<'PHONE'|'OTP'|'AADHAAR'>('PHONE');
  const [grievances, setGrievances] = useState<Grievance[]>(MOCK_GRIEVANCES);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'submit' | 'profile'>('home');

  const handleLogin = (phone: string) => {
    setUser({ phoneNumber: phone, isVerified: true, name: "Arunav Das" });
    setScreen('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setLoginPhone('');
    setLoginStep('PHONE');
    setScreen('LOGIN_LANG');
    setActiveTab('home');
    setGrievances(MOCK_GRIEVANCES);
  };

  const handleTabChange = (tab: 'home' | 'submit' | 'profile') => {
    if (tab === 'submit') {
      setScreen('SUBMIT_STEP_1'); 
    } else {
      setActiveTab(tab);
      if (tab === 'home') setScreen('DASHBOARD');
      if (tab === 'profile') setScreen('PROFILE');
    }
  };

  const handleGrievanceSubmit = (g: Partial<Grievance>) => {
    const newGrievance: Grievance = {
      id: `GR-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      title: g.title!,
      description: g.description!,
      category: g.category!,
      location: g.location!,
      status: GrievanceStatus.SUBMITTED,
      dateSubmitted: new Date().toLocaleDateString(),
      imageUrl: g.imageUrl || 'https://picsum.photos/400/300',
      isAnonymous: g.isAnonymous || false,
      updates: [{ date: new Date().toLocaleDateString(), title: 'Submitted', description: 'Received by system', author: 'System' }]
    };
    setGrievances([newGrievance, ...grievances]);
    setActiveTab('home');
    setScreen('DASHBOARD');
  };

  return (
    <div className="min-h-screen bg-nadi-bg font-sans text-nadi-text max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {screen === 'SPLASH' && (
        <SplashScreen onComplete={() => setScreen('LOGIN_LANG')} />
      )}

      {screen === 'LOGIN_LANG' && (
        <LanguageScreen onSelect={(l) => { setLanguage(l); setScreen('LOGIN_PHONE'); }} />
      )}

      {(screen === 'LOGIN_PHONE' || screen === 'LOGIN_OTP' || screen === 'LOGIN_AADHAAR') && (
        <LoginScreen 
          step={loginStep} 
          setStep={setLoginStep}
          phone={loginPhone}
          setPhone={setLoginPhone}
          onLogin={handleLogin}
          lang={language}
        />
      )}

      {user && (
        <>
          {screen === 'DASHBOARD' && (
            <DashboardScreen 
              user={user} 
              grievances={grievances} 
              onGrievanceClick={(g) => { setSelectedGrievance(g); setScreen('GRIEVANCE_DETAIL'); }}
              onViewAll={() => setScreen('ALL_GRIEVANCES')}
              lang={language}
            />
          )}

          {screen === 'ALL_GRIEVANCES' && (
            <GrievanceListScreen
              grievances={grievances}
              onBack={() => setScreen('DASHBOARD')}
              onGrievanceClick={(g) => { setSelectedGrievance(g); setScreen('GRIEVANCE_DETAIL'); }}
              lang={language}
            />
          )}

          {screen.startsWith('SUBMIT') && (
            <SubmitScreen 
              onClose={() => setScreen('DASHBOARD')} 
              onSubmit={handleGrievanceSubmit} 
              lang={language}
            />
          )}

          {screen === 'GRIEVANCE_DETAIL' && selectedGrievance && (
            <GrievanceDetailScreen 
              grievance={selectedGrievance} 
              onBack={() => setScreen(activeTab === 'home' ? 'DASHBOARD' : 'ALL_GRIEVANCES')} 
            />
          )}

          {screen === 'PROFILE' && (
            <ProfileScreen user={user} onLogout={handleLogout} lang={language} />
          )}

          {(screen === 'DASHBOARD' || screen === 'PROFILE' || screen === 'ALL_GRIEVANCES') && (
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} lang={language} />
          )}
        </>
      )}
    </div>
  );
}