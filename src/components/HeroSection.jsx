import { stats } from '../data';

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden noise-overlay">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-red-500/3 to-orange-500/3 dark:from-red-500/5 dark:to-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* Top Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-600 dark:text-red-400 tracking-wide">
              🔥 أول محرك كنياكا سوداني بالذكاء الاصطناعي
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-tajawal leading-tight mb-6 animate-slide-up text-gray-900 dark:text-white">
            أرفع صورتك
            <br />
            <span className="gradient-text">وشوف شغلك</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-inter font-medium max-w-2xl mx-auto mb-10 animate-slide-up stagger-2 leading-relaxed">
            The first AI-powered Sudanese roast engine.
            <br />
            <span className="font-tajawal text-gray-400 dark:text-gray-500">لا رحمة، لا فلتر، بس كنياكا صافية ١٠٠٪</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-3">
            <button id="hero-upload-btn" className="btn-primary text-base !px-8 !py-4 w-full sm:w-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span>أرفع صورتك الحين</span>
            </button>
            <button id="hero-browse-btn" className="btn-ghost text-base !px-8 !py-4 w-full sm:w-auto">
              <span>شوف الكنياكات</span>
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 sm:mt-20 animate-slide-up stagger-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
                <div className="text-2xl sm:text-3xl font-black font-tajawal text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-3 mt-10 animate-slide-up stagger-5">
          <div className="flex -space-x-2 rtl:space-x-reverse">
            {['😂', '🤣', '😭', '💀', '🔥'].map((emoji, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-950 flex items-center justify-center text-sm">
                {emoji}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
            +٣,٢٠٠ زول اتكنيك هذا الشهر
          </span>
        </div>
      </div>
    </section>
  );
}
