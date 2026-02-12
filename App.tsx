
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Heart, Stars, Sparkles, Send, User, MapPin } from 'lucide-react';

// --- KONFIGURASI ---
// Ganti link di bawah ini dengan link foto kamu dan istri kamu!
// Saya telah memperbarui ini ke direct link dari link ImgBB yang kamu berikan.
const FOTO_AKHIR_URL = "https://i.ibb.co.com/RWZvg0p/image.jpg"; 

// --- Helper Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          size: Math.random() * (30 - 10) + 10,
          duration: Math.random() * (10 - 5) + 5
        }
      ]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart text-pink-400 opacity-60"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            animationDuration: `${heart.duration}s`
          }}
        >
          <Heart fill="currentColor" size={heart.size} />
        </div>
      ))}
    </div>
  );
};

const TypewriterText = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [index, text, delay]);

  return <p className="leading-relaxed whitespace-pre-wrap">{displayedText}</p>;
};

// --- Main App ---

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0: Start, 1: Message, 2: Final Question, 3: Success
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [moveCount, setMoveCount] = useState(0);
  
  const mainMessage = "sayaaangg maaffff yaaaaa plissss aku benerann kepikirannn terussss soal tadiii maafff kalo aku keliatan kaya nggak jagaa perasaan kamuuu, padahal niat aku nggak kemanaa-manaa sumpahhh 🥺 itu cuma duduk doanggg tapi aku tauu tetep aja bisa bikin kamu overthink dikittt aku harusnya lebih awareee, lebih peka lagiii, bukan malah bikin istrikuuu kepikiran kaya gituuu kamuuu tuh berharga bangett sampe aku nggak mau hal sekecil apapun bikin kamu ngerasaa anehhh makasiiihh yaaa udah nggak meledakk langsunggg dan masii mau ngertiin akuuu next time aku bakal lebih jagaa sikapp dan posisiii biar nggak kejadian lagiii maaffff yaaa sayanggg, aku cuma maunya kamu tenangg dan ngerasaa aman sama akuuu 🤍🤍🤍";

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });
    setMoveCount(prev => prev + 1);
  };

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative bg-gradient-to-br from-pink-50 to-white overflow-hidden">
      <FloatingHearts />

      {/* Main Container */}
      <div className="max-w-md w-full z-10">
        
        {/* Step 0: Welcome Screen */}
        {step === 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100 text-center animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="text-pink-500 animate-pulse" size={48} fill="#ec4899" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Halo Sayang...</h1>
            <p className="text-gray-600 mb-8">Aku ada sesuatu mau aku bilang ke kamu. Bisa luangin waktu bentar?</p>
            <button 
              onClick={nextStep}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-pink-200 hover:-translate-y-1"
            >
              Boleh, apa itu?
            </button>
          </div>
        )}

        {/* Step 1: The Heartfelt Message */}
        {step === 1 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100 animate-in slide-in-from-bottom duration-1000">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <div>
                <h2 className="font-bold text-gray-800">Suami Kamu</h2>
                <p className="text-xs text-gray-400">Sedang mengetik...</p>
              </div>
            </div>
            
            <div className="text-gray-700 text-lg italic bg-pink-50/50 p-6 rounded-2xl border border-pink-100 mb-8 font-medium">
              <TypewriterText text={mainMessage} delay={40} />
            </div>

            <button 
              onClick={nextStep}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:-translate-y-1"
            >
              Lanjut <Stars size={20} className="text-yellow-400" />
            </button>
          </div>
        )}

        {/* Step 2: The Question */}
        {step === 2 && (
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-pink-100 text-center animate-in zoom-in duration-500">
            <Sparkles className="mx-auto text-pink-400 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Maafin aku ya sayang? 🥺</h2>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={nextStep}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg text-lg flex items-center justify-center gap-2"
              >
                Iya, aku maafin ❤️
              </button>
              
              <div className="relative">
                <button 
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{
                    transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                    transition: 'all 0.15s ease-out'
                  }}
                  className="px-8 py-3 bg-gray-200 text-gray-500 font-semibold rounded-xl text-sm"
                >
                  {moveCount > 5 ? 'Dih kok susah?' : 'Enggak mau'}
                </button>
              </div>
            </div>

            {moveCount > 10 && (
              <p className="mt-6 text-pink-400 text-xs italic animate-bounce">
                Tombol "Enggak" emang sengaja aku buat lari-lari, karena aku cuma mau dimaafin hehehe
              </p>
            )}
          </div>
        )}

        {/* Step 3: Success Celebration */}
        {step === 3 && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-2 border-pink-200 text-center animate-in slide-in-from-top duration-700">
            <div className="relative inline-block mb-6">
              <img 
                src={FOTO_AKHIR_URL} 
                alt="Foto Kita" 
                className="w-48 h-48 rounded-full object-cover border-4 border-pink-300 mx-auto shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-pink-500 p-3 rounded-full shadow-lg border-2 border-white">
                <Heart fill="white" className="text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-romantic text-pink-600 mb-2">Makasih Sayang!</h1>
            <p className="text-gray-600 mb-8 font-medium">
              Janji deh kedepannya aku bakal lebih jaga perasaan kamu lagi. I love you so much, istriku yang paling cantik sedunia! 🤍
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-2xl mb-1">🌹</span>
                <span className="text-xs text-pink-500 font-bold uppercase tracking-widest">Satu Bunga</span>
              </div>
              <div className="bg-pink-50 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-2xl mb-1">🍦</span>
                <span className="text-xs text-pink-500 font-bold uppercase tracking-widest">Es Krim Nanti</span>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="mt-10 text-gray-400 hover:text-pink-500 text-xs flex items-center justify-center gap-1 mx-auto underline transition-colors"
            >
              Lihat pesan lagi
            </button>
          </div>
        )}

      </div>

      {/* Footer Branding */}
      <footer className="fixed bottom-6 w-full text-center text-gray-400 text-xs pointer-events-none">
        <p>Dibuat dengan segenap rasa penyesalan & cinta ✨</p>
      </footer>
    </div>
  );
};

export default App;
