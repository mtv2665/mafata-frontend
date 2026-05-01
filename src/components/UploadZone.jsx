import { useRef, useState } from 'react';

export default function UploadZone({ onUpload }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 noise-overlay">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Key Icon */}
        <div className="mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/20 mb-6">
            <svg className="w-10 h-10 text-indigo-400 key-icon animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-tajawal text-white leading-tight mb-4">
            أرفع صورتك
            <br />
            <span className="gradient-text">وافتح الشغل</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-inter font-medium max-w-md mx-auto leading-relaxed">
            Sudanese roast engine
            <br />
            <span className="font-tajawal text-gray-600 text-sm"> خاص · مشفّر · بدون رحمة</span>
          </p>
        </div>

        {/* Upload Zone */}
        <div className="animate-slide-up stagger-2">
          <div
            id="upload-zone"
            className={`upload-zone p-10 sm:p-16 ${dragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {/* Upload Icon */}
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>

              <div>
                <p className="text-lg font-bold text-white font-tajawal mb-1">
                  أسقط الصورة هنا
                </p>
                <p className="text-sm text-gray-500 font-inter">
                  or <span className="text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300 transition-colors">browse files</span>
                </p>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-gray-600 font-inter">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
                  End-to-end encrypted
                </span>
                <span>·</span>
                <span>JPG, PNG, WebP</span>
                <span>·</span>
                <span>Max 10MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-8 animate-slide-up stagger-3">
          {[
            { text: 'صورتك لا تُحفظ' },
            { text: 'AI سوداني ١٠٠٪' },
            { text: 'بدون فلتر' },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-semibold">
              <span className="font-tajawal">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
