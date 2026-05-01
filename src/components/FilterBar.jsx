import { intensityOptions, targetStatusOptions } from '../data';

export default function FilterBar({ activeIntensity, setActiveIntensity, activeStatus, setActiveStatus, searchQuery, setSearchQuery }) {
  return (
    <section id="filters" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-8">
      <div className="glass-card p-5 sm:p-6">
        {/* Search Input */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كنياكا... أو اكتب اسم الزول"
            className="w-full pr-12 pl-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300 dark:focus:border-red-700 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-5">
          {/* Roast Intensity Filter */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 font-inter">
              🌶️ Roast Intensity
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                id="filter-intensity-all"
                onClick={() => setActiveIntensity(null)}
                className={`badge border cursor-pointer ${!activeIntensity ? 'filter-pill-active' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                الكل
              </button>
              {intensityOptions.map((opt) => (
                <button
                  key={opt.id}
                  id={`filter-intensity-${opt.id}`}
                  onClick={() => setActiveIntensity(activeIntensity === opt.label ? null : opt.label)}
                  className={`badge border cursor-pointer ${activeIntensity === opt.label ? 'filter-pill-active' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.labelAr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px bg-gray-100 dark:bg-gray-800" />

          {/* Target Status Filter */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 font-inter">
              🎯 Target Status
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                id="filter-status-all"
                onClick={() => setActiveStatus(null)}
                className={`badge border cursor-pointer ${!activeStatus ? 'filter-pill-active' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                الكل
              </button>
              {targetStatusOptions.map((opt) => (
                <button
                  key={opt.id}
                  id={`filter-status-${opt.id}`}
                  onClick={() => setActiveStatus(activeStatus === opt.label ? null : opt.label)}
                  className={`badge border cursor-pointer ${activeStatus === opt.label ? 'filter-pill-active' : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.labelAr}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filter count */}
        {(activeIntensity || activeStatus) && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
              {[activeIntensity, activeStatus].filter(Boolean).length} فلتر نشط
            </span>
            <button
              id="clear-filters-btn"
              onClick={() => { setActiveIntensity(null); setActiveStatus(null); setSearchQuery(''); }}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
            >
              مسح الكل ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
