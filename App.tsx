
import React, { useState, useCallback } from 'react';
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

  const hipTags = [
    { label: '비오는 창가', color: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white hover:scale-110' },
    { label: '영국 브릿팝', color: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white hover:scale-110' },
    { label: '일본 시티팝', color: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white hover:scale-110' },
    { label: '뉴욕 재즈 바', color: 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-900 hover:text-white hover:scale-110' },
    { label: '힙합 바이브', color: 'bg-lime-50 text-lime-600 border-lime-100 hover:bg-lime-600 hover:text-white hover:scale-110' },
    { label: '성수동 카페', color: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white hover:scale-110' },
    { label: '한강 산책', color: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:scale-110' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-indigo-50/40 rounded-full blur-[120px] animate-bg-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-rose-50/40 rounded-full blur-[120px] animate-bg-drift" style={{ animationDelay: '-10s' }}></div>
      </div>

      {/* Ultra-Modern Sticky Header */}
      <header className="sticky top-0 z-50 px-4 py-4 md:px-8 md:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-morphism rounded-[2.5rem] px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl shadow-indigo-100/50">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-12 h-12 bg-brand-gradient rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:rotate-[15deg] transition-all duration-500">
                <i className="fa-solid fa-compact-disc text-white text-2xl animate-spin-slow"></i>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-display font-black text-gradient tracking-tighter leading-none">
                  COMMUTEBEAT
                </h1>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 mt-1">Sonic Curation v2.5</p>
              </div>
            </div>

            <form onSubmit={handleRecommendation} className="flex flex-1 max-w-2xl gap-3">
              <div className="relative flex-1">
                <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input
                  type="text"
                  placeholder="당신만의 바이브를 입력하세요..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:border-indigo-400 focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !theme.trim()}
                className="px-10 py-4 bg-brand-gradient text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 disabled:opacity-50 transition-all glow-pulse shadow-xl shadow-indigo-300"
              >
                {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'Discover'}
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pb-20 pt-12">
        {!hasSearched && !loading && (
          <div className="flex flex-col items-center py-12 lg:py-24">
            <div className="relative mb-24 group">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              
              <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-16">
                <div className="text-left flex-1">
                  <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-8">
                    Elevating your transit
                  </div>
                  <h2 className="text-7xl md:text-9xl font-display font-black text-slate-900 mb-10 leading-[0.85] tracking-tighter">
                    THE <br/> 
                    <span className="text-gradient">ELECTRIC</span> <br/>
                    SOUND.
                  </h2>
                  <p className="text-xl font-bold text-slate-400 max-w-md leading-relaxed mb-12 border-l-4 border-indigo-100 pl-6">
                    평범한 이동 시간을 감각적인 페스티벌로. <br/>
                    AI가 설계한 세계 최고의 플레이리스트.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {hipTags.map((tag) => (
                      <button
                        key={tag.label}
                        onClick={() => setTheme(tag.label)}
                        className={`px-6 py-3.5 rounded-2xl border-2 ${tag.color} text-[11px] font-black uppercase tracking-tight transition-all active:scale-90 shadow-sm`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex-1 relative flex justify-center">
                  <div className="w-[320px] h-[450px] md:w-[450px] md:h-[600px] relative">
                    <div className="absolute inset-0 bg-brand-gradient rounded-[4rem] rotate-6 blur-sm opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-slate-900 rounded-[4rem] -rotate-3 translate-x-4 shadow-2xl"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800" 
                      alt="Modern Sound" 
                      className="absolute inset-0 w-full h-full object-cover rounded-[4rem] group-hover:rotate-0 transition-all duration-700 shadow-2xl z-20"
                    />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full flex items-center justify-center p-4 shadow-2xl z-30 animate-spin-slow">
                       <div className="w-full h-full rounded-full border-2 border-dashed border-indigo-600 flex items-center justify-center text-[10px] font-black text-indigo-600 text-center uppercase leading-tight">
                         7 Tracks<br/>Selected<br/>For You
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-16 py-12">
            <div className="flex flex-col gap-4">
              <div className="h-20 w-1/2 bg-slate-50 rounded-[2rem] animate-pulse"></div>
              <div className="h-8 w-1/4 bg-slate-50 rounded-full animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-[480px] bg-slate-50 rounded-[3rem] border-2 border-slate-50 animate-pulse"></div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mt-20 p-16 glass-morphism rounded-[4rem] text-center shadow-3xl">
            <div className="w-24 h-24 bg-rose-100 rounded-[2rem] flex items-center justify-center text-rose-500 text-5xl mx-auto mb-10">
              <i className="fa-solid fa-plug-circle-xmark"></i>
            </div>
            <h3 className="text-4xl font-display font-black text-slate-900 mb-6">CURATION FAILED.</h3>
            <p className="text-slate-500 font-bold mb-12 text-lg">{error}</p>
            <button onClick={() => window.location.reload()} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-brand-gradient hover:scale-105 transition-all shadow-xl">
              Retry Sync
            </button>
          </div>
        )}

        {hasSearched && !loading && songs.length > 0 && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b-2 border-slate-50 pb-16">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-widest border border-indigo-100 mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  Optimized for commute
                </div>
                <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-[0.85] mb-6 uppercase">
                  VIBE: <br/><span className="text-gradient">"{theme}"</span>
                </h2>
                <p className="text-xl font-bold text-slate-400">당신의 공간을 감각으로 채울 7가지 선율입니다.</p>
              </div>
              
              <button
                onClick={() => handleRecommendation()}
                className="group relative px-14 py-7 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-200 overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <i className="fa-solid fa-shuffle group-hover:rotate-180 transition-transform duration-700 text-lg"></i>
                  <span>Refresh Beats</span>
                </div>
                <div className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {songs.map((song, index) => (
                <SongCard key={`${song.title}-${index}`} song={song} index={index} />
              ))}
            </div>

            <footer className="pt-40 pb-20 flex flex-col items-center">
              <div className="text-[11px] text-slate-400 font-black uppercase tracking-[0.8em] mb-10 opacity-50">
                Future Sound Laboratories
              </div>
              <div className="flex gap-12 text-slate-300 text-2xl">
                <i className="fa-brands fa-instagram hover:text-indigo-600 hover:scale-125 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-spotify hover:text-green-500 hover:scale-125 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-soundcloud hover:text-orange-500 hover:scale-125 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-tiktok hover:text-black hover:scale-125 transition-all cursor-pointer"></i>
              </div>
              <div className="mt-16 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                &copy; 2024 COMMUTEBEAT PRO • ALL RHYTHMS RESERVED
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
