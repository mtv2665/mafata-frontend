import { useRef, useCallback } from 'react';

export default function ResultModal({ result, imageUrl, onBurn }) {
  const canvasRef = useRef(null);
  const { roast, score, title } = result;

  // Score gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (score / 100) * circumference;

  const getScoreColor = (s) => {
    if (s >= 90) return { text: 'text-red-400', stroke: '#f87171', glow: 'rgba(248,113,113,0.4)', label: 'كنياكا مميتة 💀' };
    if (s >= 75) return { text: 'text-orange-400', stroke: '#fb923c', glow: 'rgba(251,146,60,0.4)', label: 'كنياكا حارة 🔥' };
    return { text: 'text-yellow-400', stroke: '#fbbf24', glow: 'rgba(251,191,36,0.4)', label: 'كنياكا خفيفة ❄️' };
  };

  const scoreStyle = getScoreColor(score);

  // Download as image
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = 1080, h = 1920;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0a0a0f');
    grad.addColorStop(0.5, '#111118');
    grad.addColorStop(1, '#0a0a0f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Brand
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔑 MIFTAH', w / 2, 80);

    // Subtitle
    ctx.fillStyle = '#4b5563';
    ctx.font = '24px Inter, sans-serif';
    ctx.fillText('Private Roast Engine', w / 2, 120);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Tajawal, sans-serif';
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';
    ctx.fillText(title, w / 2, 450);

    // Roast text — word wrap
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '36px Reem Kufi Fun, Tajawal, sans-serif';
    ctx.textAlign = 'center';
    const words = roast.split(' ');
    let line = '';
    let y = 550;
    const maxWidth = w - 160;
    for (const word of words) {
      const test = line + word + ' ';
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), w / 2, y);
        line = word + ' ';
        y += 55;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line.trim(), w / 2, y);

    // Score
    const scoreY = y + 120;
    ctx.fillStyle = scoreStyle.stroke;
    ctx.font = 'bold 120px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillText(`${score}%`, w / 2, scoreY);

    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 28px Tajawal, sans-serif';
    ctx.fillText('Shughul Score', w / 2, scoreY + 45);

    // CONFIDENTIAL stamp
    ctx.save();
    ctx.translate(w / 2, scoreY + 180);
    ctx.rotate(-0.2);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 4;
    ctx.strokeRect(-160, -30, 320, 60);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.font = 'bold 36px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CONFIDENTIAL', 0, 12);
    ctx.restore();

    // Footer
    ctx.fillStyle = '#374151';
    ctx.font = '20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillText('miftah.app — Unlock the Roast', w / 2, h - 60);

    // Trigger download
    const link = document.createElement('a');
    link.download = `miftah-roast-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [result, scoreStyle, title, roast]);

  const handleWhatsAppShare = () => {
    const shareText = result.share_text || "خش شوف الشغل ده! ";
    const message = ` *موقع مفتاح - ردم الشغل* \n\n` +
      `*اللقب:* ${title}\n` +
      `*الردم:* ${roast}\n` +
      `*الخلاصة:* ${shareText}\n` +
      `*نسبة الصياعة:* ${score}%\n\n` +
      `ادخل المفتاح وشوف شغلك كيف: https://miftah.app`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <canvas ref={canvasRef} className="hidden" />

      <div className="glass-modal w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-scale-in glow-border">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-[11px] font-bold text-indigo-400 font-inter tracking-wide">ROAST UNLOCKED</span>
          </div>
        </div>

        {/* User Image with Confidential Stamp */}
        <div className="relative mb-6 rounded-2xl overflow-hidden border border-gray-800/60">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-48 sm:h-56 object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent" />
          {/* Confidential Stamp */}
          <div className="stamp top-4 left-4 animate-stamp font-inter">
            CONFIDENTIAL
          </div>
          {/* Title overlay */}
          <div className="absolute bottom-3 right-4">
            <h3 className="text-lg font-black font-tajawal text-white drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>

        {/* Roast Text */}
        <div className="mb-6 p-5 rounded-2xl bg-gray-800/30 border border-gray-700/30">
          <p className="text-base sm:text-lg font-kufi text-gray-200 leading-loose text-center">
            "{roast}"
          </p>
        </div>

        {/* Score Gauge */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-36 h-36 mb-3">
            <svg className="w-full h-full score-ring -rotate-90" viewBox="0 0 120 120" style={{ filter: `drop-shadow(0 0 20px ${scoreStyle.glow})` }}>
              {/* Background ring */}
              <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e1e2e" strokeWidth="8" />
              {/* Score ring */}
              <circle
                cx="60" cy="60" r={radius}
                fill="none"
                stroke={scoreStyle.stroke}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
              />
            </svg>
            {/* Score number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-black font-inter ${scoreStyle.text} animate-count-up`}>
                {score}%
              </span>
            </div>
          </div>
          <span className="text-sm font-bold text-gray-400 font-tajawal">
            {scoreStyle.label}
          </span>
          <span className="text-[11px] text-gray-600 font-inter mt-1">Kanyaka Score™</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Download */}
            <button
              id="download-btn"
              onClick={handleDownload}
              className="btn-primary flex-1 !py-3.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3" />
              </svg>
              <span className="font-tajawal">حمّل الصورة</span>
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 !py-3.5 flex items-center justify-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold hover:bg-green-500/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span className="font-tajawal">شارك للفضائح</span>
            </button>
          </div>

          {/* Burn After Reading */}
          <button
            id="burn-btn"
            onClick={onBurn}
            className="btn-danger w-full !py-3.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
            </svg>
            <span className="font-tajawal">احرق بعد القراءة </span>
          </button>
        </div>

        {/* Privacy Footer */}
        <div className="mt-5 pt-4 border-t border-gray-800/40 text-center">
          <p className="text-[10px] text-gray-600 font-inter flex items-center justify-center gap-1.5">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
            This roast is private. Your photo was not stored.
          </p>
        </div>
      </div>
    </div>
  );
}
