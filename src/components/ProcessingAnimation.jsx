import { useState, useEffect } from 'react';

const loadingTexts = [
  'جاري فتح الشغل...',
  'جاري فحص العفشة...',
  'الـ AI بيتأمل في وجهك...',
  'جاري تحضير المفتاح...',
  'بنحلل الملامح... الله يعينك...',
];

export default function ProcessingAnimation() {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((i) => (i + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(textTimer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 95));
    }, 400);
    return () => clearInterval(progressTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-xl">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" />
      </div>

      <div className="relative z-10 text-center">
        {/* Rotating Key */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full animate-glow-pulse">
            <svg
              className="w-16 h-16 text-indigo-400 animate-rotate-key key-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-2xl font-black font-tajawal text-white mb-3 animate-pulse">
          {loadingTexts[textIndex]}
        </p>
        <p className="text-sm text-gray-500 font-inter mb-8">
          Analyzing with zero mercy...
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 font-inter font-semibold mt-2 tabular-nums">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Lock icons */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-lg bg-gray-800/50 flex items-center justify-center animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
