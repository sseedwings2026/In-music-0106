
import React, { useState, useCallback, useEffect } from 'react';
import { Song } from './types';
import { fetchMusicRecommendations } from './services/geminiService';
import SongCard from './components/SongCard';

const App: React.FC = () => {
  const [theme, setTheme] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommendation = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!theme.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const results = await fetchMusicRecommendations(theme);
      setSongs(results);
      setHasSearched(true);
    } catch (err) {
      setError('음악을 추천받는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 md:py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-earth-americas text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-indigo-600 bg-clip-text text-transparent">
                Commute Beat
              </h1>
              <p className="text-xs text-slate-400 font-medium">전 세계의 소리로 채우는 출퇴근길</p>
            </div>
          </div>

          <form onSubmit={handleRecommendation} className="flex flex-1 md:max-w-md gap-2">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                placeholder="어떤 분위기의 음악을 전 세계에서 찾아볼까요?"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !theme.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-100 whitespace-nowrap"
            >
              {loading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : '추천받기'}
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {!hasSearched && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-48 h-48 mb-8 relative">
               <img 
                src="https://images.unsplash.com/photo-1514525253361-bee243870eb2?auto=format&fit=crop&q=80&w=400&h=400" 
                alt="Global Music illustration" 
                className="rounded-3xl shadow-2xl object-cover"
              />
              <div className="absolute inset-0 bg-indigo-600/10 rounded-3xl"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">전 세계의 명곡들을 만나보세요.</h2>
            <p className="text-slate-500 max-w-sm">
              한국 음악은 물론, 전 세계 다양한 국가의 숨겨진 보석 같은 음악들을 7곡씩 추천해 드립니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {['프랑스 샹송', '영국 브릿팝', '일본 시티팝', '브라질 보사노바', '미국 로파이'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setTheme(tag);
                  }}
                  className="px-4 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-2xl border border-slate-100"></div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center font-medium">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            {error}
          </div>
        )}

        {hasSearched && !loading && songs.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">"{theme}" 글로벌 추천</h2>
                <p className="text-sm text-slate-400 mt-1">세계 각국에서 선정한 오늘의 플레이리스트입니다.</p>
              </div>
              <button
                onClick={() => handleRecommendation()}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <i className="fa-solid fa-rotate-right"></i>
                재추천
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <SongCard key={`${song.title}-${index}`} song={song} index={index} />
              ))}
            </div>

            <footer className="pt-12 pb-8 text-center text-slate-300 text-xs font-medium uppercase tracking-widest">
              &copy; 2024 Commute Beat • World Music Discovery
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
