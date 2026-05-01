import { useState } from 'react';

const colorMap = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-100 dark:border-red-800/50',
    ring: 'ring-red-500/20',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-100 dark:border-orange-800/50',
    ring: 'ring-orange-500/20',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-800/50',
    ring: 'ring-blue-500/20',
  },
};

const avatarColors = [
  'from-red-400 to-pink-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-fuchsia-500',
  'from-rose-400 to-red-500',
];

export default function RoastCard({ roast, index }) {
  const [shared, setShared] = useState(false);
  const colors = colorMap[roast.boldnessColor] || colorMap.blue;
  const avatarGrad = avatarColors[index % avatarColors.length];

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
    if (navigator.share) {
      navigator.share({ title: roast.title, text: roast.roast }).catch(() => {});
    }
  };

  return (
    <article
      id={`roast-card-${roast.id}`}
      className="glass-card p-5 sm:p-6 animate-slide-up group"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="flex gap-4 sm:gap-5">
        {/* Right Side - Avatar (RTL: this appears on the right) */}
        <div className="shrink-0">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${avatarGrad} flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-lg`}>
            {roast.username.charAt(0)}
          </div>
        </div>

        {/* Middle - Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                  {roast.title}
                </h3>
                <span className={`badge ${colors.bg} ${colors.text} border ${colors.border} text-[10px]`}>
                  {roast.boldnessTag}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  {roast.username}
                </span>
                <span className="text-gray-300 dark:text-gray-700">·</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {roast.timeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* Roast Content */}
          <p className="text-sm sm:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-4 font-tajawal">
            {roast.roast}
          </p>

          {/* Tags Row */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="badge bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 text-[10px]">
              {roast.intensity === 'Cold' ? '❄️' : roast.intensity === 'Hot' ? '🔥' : '💀'} {roast.intensity}
            </span>
            <span className="badge bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700 text-[10px]">
              {roast.targetStatus === 'Handsome' ? '😎' : roast.targetStatus === 'Fake' ? '🎭' : '💔'} {roast.targetStatus}
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800/50">
            <div className="flex items-center gap-5">
              {/* Reactions */}
              <button className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors group/btn">
                <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="text-xs font-bold">{roast.reactions}</span>
              </button>
              {/* Shares count */}
              <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span className="text-xs font-bold">{roast.shares}</span>
              </div>
            </div>

            {/* Share / Spread Button (Left side in RTL) */}
            <button
              id={`share-btn-${roast.id}`}
              onClick={handleShare}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                shared
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/40 hover:shadow-md'
              }`}
            >
              {shared ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>تم النشر!</span>
                </>
              ) : (
                <>
                  <span>🔥</span>
                  <span>انشر الكنياكا</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
