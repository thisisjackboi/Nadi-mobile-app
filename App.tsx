import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  MapPin, 
  User as UserIcon, 
  Home, 
  Plus, 
  ChevronRight, 
  Bell, 
  Settings, 
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Globe,
  LogOut
} from 'lucide-react';
import { 
  Language, 
  User, 
  Grievance, 
  ScreenName, 
  GrievanceCategory, 
  GrievanceStatus 
} from './types';
import { MOCK_GRIEVANCES, CATEGORY_ICONS, STATUS_COLORS } from './constants';

// --- Components ---

const Button: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', fullWidth = false, className = '', disabled = false }) => {
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-nadi-orange text-white shadow-lg shadow-orange-200 hover:bg-nadi-orangeDark disabled:opacity-50 disabled:shadow-none",
    secondary: "bg-nadi-blue text-white shadow-lg shadow-blue-200 hover:bg-nadi-blueDark",
    outline: "border-2 border-nadi-orange text-nadi-orangeDark hover:bg-orange-50",
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
    {label && <label className="text-sm font-medium text-nadi-lightText ml-1">{label}</label>}
    <input 
      className={`p-4 rounded-xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-nadi-blue transition-all ${className}`}
      {...props} 
    />
  </div>
);

const BottomNav: React.FC<{
  activeTab: 'home' | 'submit' | 'profile';
  onTabChange: (tab: 'home' | 'submit' | 'profile') => void;
}> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 safe-area-bottom">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-nadi-orange' : 'text-gray-400'}`}
      >
        <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Home</span>
      </button>

      {/* Floating Action Button Effect */}
      <div className="relative -top-8">
        <button 
          onClick={() => onTabChange('submit')}
          className="bg-nadi-orange text-white p-4 rounded-full shadow-xl shadow-orange-200 hover:scale-105 transition-transform active:scale-95"
        >
          <Plus size={32} />
        </button>
      </div>

      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-nadi-orange' : 'text-gray-400'}`}
      >
        <UserIcon size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
};

const Header: React.FC<{
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, onBack, rightAction }) => (
  <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 flex items-center justify-between border-b border-gray-50">
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
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen w-full bg-orange-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-nadi-orange/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-nadi-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="z-10 flex flex-col items-center animate-slide-up text-center">
        {/* Cartoon Neta Illustration Mockup using SVG */}
        <div className="relative w-40 h-40 mb-6 animate-bounce-slight">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" fill="white" stroke="#FFB380" strokeWidth="4"/>
            {/* Face */}
            <circle cx="100" cy="85" r="40" fill="#FFE0BD"/>
            {/* Turban/Hat */}
            <path d="M60 65C60 40 140 40 140 65C140 80 120 75 100 75C80 75 60 80 60 65Z" fill="#F97316"/>
             {/* Namaste Hands */}
            <path d="M80 140L100 120L120 140L120 170L80 170V140Z" fill="#FFE0BD" stroke="#F97316" strokeWidth="2"/>
             {/* Simple Clothes */}
            <path d="M50 180C50 140 150 140 150 180V200H50V180Z" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-nadi-text mb-2">Nadi</h1>
        <p className="text-nadi-lightText text-lg">Your Voice, Your Change.</p>
      </div>
    </div>
  );
};

const LanguageScreen: React.FC<{ onSelect: (lang: Language) => void }> = ({ onSelect }) => (
  <div className="h-screen w-full bg-white p-6 flex flex-col justify-center animate-fade-in">
    <div className="mb-12 text-center">
      <Globe size={48} className="text-nadi-blue mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-nadi-text mb-2">Choose Language</h2>
      <p className="text-nadi-lightText">Select your preferred language to continue</p>
    </div>
    
    <div className="flex flex-col gap-4">
      <button 
        onClick={() => onSelect(Language.ENGLISH)}
        className="p-6 rounded-2xl border-2 border-gray-100 hover:border-nadi-blue hover:bg-blue-50 transition-all flex justify-between items-center group"
      >
        <span className="text-lg font-semibold text-gray-700 group-hover:text-nadi-blue">English</span>
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-nadi-blue" />
      </button>
      
      <button 
        onClick={() => onSelect(Language.ASSAMESE)}
        className="p-6 rounded-2xl border-2 border-gray-100 hover:border-nadi-orange hover:bg-orange-50 transition-all flex justify-between items-center group"
      >
        <span className="text-lg font-semibold text-gray-700 group-hover:text-nadi-orange">অসমীয়া</span>
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-nadi-orange" />
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
}> = ({ onLogin, step, setStep, phone, setPhone }) => {
  const [otp, setOtp] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Strict input handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setOtp(val);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10); // Limited to 10 as requested
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
    <div className="h-screen w-full bg-white p-6 flex flex-col animate-fade-in pt-20">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-nadi-text mb-2">
          {step === 'PHONE' && "Welcome Back"}
          {step === 'OTP' && "Verify OTP"}
          {step === 'AADHAAR' && "Verify Identity"}
        </h2>
        <p className="text-nadi-lightText mb-8">
          {step === 'PHONE' && "Enter your mobile number to get started."}
          {step === 'OTP' && `Code sent to +91 ${phone}`}
          {step === 'AADHAAR' && "Link your Aadhaar (10 digits) for verified submissions."}
        </p>

        {step === 'PHONE' && (
          <Input 
            type="tel" 
            inputMode="numeric"
            placeholder="98765 43210" 
            value={phone} 
            onChange={handlePhoneChange}
            maxLength={10}
            autoFocus
          />
        )}

        {step === 'OTP' && (
          <Input 
            type="tel" 
            inputMode="numeric"
            placeholder="• • • •" 
            className="text-center text-2xl tracking-widest"
            value={otp} 
            onChange={handleOtpChange}
            maxLength={4}
            autoFocus
          />
        )}

        {step === 'AADHAAR' && (
          <Input 
            type="tel" 
            inputMode="numeric"
            placeholder="0000 0000 00" 
            value={aadhaar} 
            onChange={handleAadhaarChange}
            maxLength={10}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <Button 
          fullWidth 
          onClick={step === 'PHONE' ? handlePhoneSubmit : step === 'OTP' ? handleOtpSubmit : handleAadhaarSubmit}
          disabled={
            isLoading || 
            (step === 'PHONE' && phone.length < 10) || 
            (step === 'OTP' && otp.length < 4) ||
            (step === 'AADHAAR' && aadhaar.length > 0 && aadhaar.length < 10) // Require full length if typing
          }
        >
          {isLoading ? <Loader2 className="animate-spin" /> : (step === 'AADHAAR' ? 'Verify & Continue' : 'Continue')}
        </Button>
        
        {step === 'AADHAAR' && (
          <Button variant="ghost" fullWidth onClick={() => onLogin(phone)}>
            Skip Verification
          </Button>
        )}
      </div>
    </div>
  );
};

const GrievanceCardComponent: React.FC<{ 
  data: Grievance; 
  onClick: () => void 
}> = ({ data, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 active:scale-[0.98] transition-transform"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{CATEGORY_ICONS[data.category]}</span>
        <div>
          <h3 className="font-semibold text-nadi-text line-clamp-1">{data.title}</h3>
          <p className="text-xs text-nadi-lightText">{data.location}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[data.status]}`}>
        {data.status}
      </span>
    </div>
    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden mt-1">
       {/* Mock progress bar based on status */}
       <div 
        className="h-full bg-nadi-blue transition-all duration-1000" 
        style={{ 
          width: data.status === GrievanceStatus.SUBMITTED ? '25%' : 
                 data.status === GrievanceStatus.IN_REVIEW ? '50%' : 
                 data.status === GrievanceStatus.ASSIGNED ? '75%' : '100%' 
        }} 
       />
    </div>
    <div className="flex justify-between items-center text-xs text-nadi-lightText mt-1">
      <span>{data.dateSubmitted}</span>
      <span>{data.id}</span>
    </div>
  </div>
);

const DashboardScreen: React.FC<{ 
  user: User; 
  grievances: Grievance[];
  onGrievanceClick: (g: Grievance) => void;
}> = ({ user, grievances, onGrievanceClick }) => {
  const [filter, setFilter] = useState<GrievanceStatus | 'All'>('All');

  const filtered = filter === 'All' 
    ? grievances 
    : grievances.filter(g => g.status === filter);

  return (
    <div className="pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-white px-6 pt-12 pb-6 rounded-b-3xl shadow-sm border-b border-orange-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-nadi-lightText text-sm">Namaskar,</p>
            <h1 className="text-2xl font-bold text-nadi-text">Citizen</h1>
          </div>
          <div className="p-2 bg-white rounded-full shadow-sm">
            <Bell className="text-nadi-orange" size={20} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {Object.values(GrievanceStatus).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status === filter ? 'All' : status)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filter === status 
                  ? 'bg-nadi-text text-white border-nadi-text shadow-md' 
                  : 'bg-white text-nadi-lightText border-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-6 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-bold text-lg text-nadi-text">My Grievances</h2>
          <span className="text-xs text-nadi-lightText">{filtered.length} Reports</span>
        </div>
        
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No grievances found.</p>
          </div>
        ) : (
          filtered.map(g => (
            <GrievanceCardComponent key={g.id} data={g} onClick={() => onGrievanceClick(g)} />
          ))
        )}
      </div>
    </div>
  );
};

const SubmitScreen: React.FC<{ 
  onClose: () => void; 
  onSubmit: (g: Partial<Grievance>) => void 
}> = ({ onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState<GrievanceCategory | null>(null);
  const [isAnon, setIsAnon] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock creating a URL
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation("Fancy Bazaar, Guwahati, Assam");
      setIsLocating(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (!category) return;
    onSubmit({
      title: `${category} Issue`, // Simplified for prototype
      description: desc,
      category: category,
      location: location || "Unknown Location",
      imageUrl: image || undefined,
      isAnonymous: isAnon
    });
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide-up">
      <Header 
        title={step === 1 ? "Evidence" : step === 2 ? "Details" : "Review"} 
        onBack={step === 1 ? onClose : () => setStep(step - 1)}
      />
      
      <div className="flex-1 overflow-y-auto p-6 pb-24">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-nadi-orange' : 'bg-gray-100'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="flex flex-col items-center justify-center h-full pb-20">
            <div className="w-full aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-nadi-orange transition-colors">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-400 font-medium">Tap to capture or upload</p>
                </>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 z-10" onChange={handleImageUpload} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-slide-in-right">
            <div>
              <label className="text-sm font-medium text-gray-500 mb-3 block">Select Category</label>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(GrievanceCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 border transition-all ${
                      category === cat 
                        ? 'bg-orange-50 border-nadi-orange text-nadi-orangeDark' 
                        : 'bg-white border-gray-100 text-gray-500'
                    }`}
                  >
                    <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                    <span className="text-[10px] font-medium">{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <Input 
              label="Description" 
              placeholder="Describe the issue..." 
              value={desc} 
              onChange={e => setDesc(e.target.value)}
            />

            <div>
               <label className="text-sm font-medium text-gray-500 mb-2 block">Location</label>
               <button 
                onClick={handleLocation}
                className="w-full p-4 rounded-xl bg-blue-50 text-nadi-blueDark flex items-center justify-center gap-2 border border-blue-100 hover:bg-blue-100 transition-colors"
               >
                 {isLocating ? <Loader2 className="animate-spin" /> : <MapPin size={20} />}
                 {location || "Get Current Location"}
               </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-slide-in-right">
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start gap-4">
               {image && <img src={image} className="w-20 h-20 rounded-lg object-cover bg-white" />}
               <div>
                 <div className="font-bold text-nadi-text">{category}</div>
                 <div className="text-sm text-gray-500 line-clamp-2 mt-1">{desc}</div>
                 <div className="text-xs text-nadi-blue mt-2 flex items-center gap-1">
                   <MapPin size={12} /> {location}
                 </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isAnon ? 'bg-nadi-text text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="font-medium text-sm">Submit Anonymously</div>
                  <div className="text-xs text-gray-400">Hide your identity from public view</div>
                </div>
              </div>
              <div 
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isAnon ? 'bg-nadi-orange' : 'bg-gray-200'}`}
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
          onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
          disabled={
            (step === 1 && !image) ||
            (step === 2 && (!category || !desc || !location))
          }
        >
          {step === 3 ? "Submit Grievance" : "Next Step"}
        </Button>
      </div>
    </div>
  );
};

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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
             <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur text-white border border-white/30`}>
              {grievance.status}
            </span>
            <h1 className="text-white text-2xl font-bold mt-2 leading-tight">{grievance.title}</h1>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 bg-white relative -mt-4 rounded-t-3xl">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
           <MapPin size={16} className="text-nadi-orange" />
           {grievance.location}
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-nadi-text mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{grievance.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-nadi-text mb-4">Timeline</h3>
          <div className="space-y-6 ml-2">
            {grievance.updates.map((update, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-2">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-nadi-blue border-4 border-white shadow-sm" />
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-800">{update.title}</span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{update.date}</span>
                  </div>
                  <p className="text-xs text-gray-500">{update.description}</p>
                  <span className="text-[10px] font-medium text-nadi-blue mt-1 flex items-center gap-1">
                    <UserIcon size={10} /> {update.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {grievance.status !== GrievanceStatus.RESOLVED && (
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-8">
            <h4 className="text-orange-800 font-semibold text-sm flex items-center gap-2 mb-1">
              <AlertCircle size={16} /> Assigned Authority
            </h4>
            <p className="text-xs text-orange-600">
              Guwahati Municipal Corporation, Zone 3 Engineer.
              <br/>Expected resolution: 3 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileScreen: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => (
  <div className="p-6 animate-fade-in pb-24">
    <div className="flex flex-col items-center mb-8 pt-8">
      <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-400 mb-4 border-4 border-white shadow-lg">
        <UserIcon size={40} />
      </div>
      <h2 className="text-xl font-bold text-nadi-text">{user.name || "Nadi Citizen"}</h2>
      <p className="text-gray-400 text-sm">+91 {user.phoneNumber}</p>
    </div>

    <div className="space-y-3">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-nadi-blue rounded-lg"><CheckCircle size={20} /></div>
          <span className="font-medium text-gray-700">Identity Status</span>
        </div>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Verified</span>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-50 text-nadi-orange rounded-lg"><Globe size={20} /></div>
          <span className="font-medium text-gray-700">Language</span>
        </div>
        <span className="text-sm text-gray-500">English</span>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
         <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 text-gray-500 rounded-lg"><Settings size={20} /></div>
          <span className="font-medium text-gray-700">Settings</span>
        </div>
        <ChevronRight size={16} className="text-gray-400" />
      </div>
    </div>

    <div className="mt-8">
      <Button variant="outline" fullWidth onClick={onLogout} className="text-red-500 border-red-200 hover:bg-red-50">
        <LogOut size={20} /> Sign Out
      </Button>
    </div>
  </div>
);

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

  // Navigation Logic
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
      setScreen('SUBMIT_STEP_1'); // Or overlay
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

  // Render
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
        />
      )}

      {/* Authenticated Views */}
      {user && (
        <>
          {screen === 'DASHBOARD' && (
            <DashboardScreen 
              user={user} 
              grievances={grievances} 
              onGrievanceClick={(g) => { setSelectedGrievance(g); setScreen('GRIEVANCE_DETAIL'); }}
            />
          )}

          {screen.startsWith('SUBMIT') && (
            <SubmitScreen 
              onClose={() => setScreen('DASHBOARD')} 
              onSubmit={handleGrievanceSubmit} 
            />
          )}

          {screen === 'GRIEVANCE_DETAIL' && selectedGrievance && (
            <GrievanceDetailScreen 
              grievance={selectedGrievance} 
              onBack={() => setScreen('DASHBOARD')} 
            />
          )}

          {screen === 'PROFILE' && (
            <ProfileScreen user={user} onLogout={handleLogout} />
          )}

          {/* Bottom Nav shows on specific screens */}
          {(screen === 'DASHBOARD' || screen === 'PROFILE') && (
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </>
      )}
    </div>
  );
}