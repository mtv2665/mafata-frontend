export default function Footer() {
  return (
    <footer className="border-t border-gray-800/40 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <span className="text-sm font-black font-tajawal text-gray-400">مفتاح</span>
          </div>

          {/* Center */}
          <p className="text-[11px] text-gray-700 font-inter text-center">
            © 2026 Miftah. No photos stored. All roasts are ephemeral.
          </p>

          {/* Privacy */}
          <p className="text-[11px] text-gray-700 font-tajawal">
            صُنع  في السودان 🇸🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
