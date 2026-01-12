
import React from 'react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${song.artist} ${song.title}`
  )}`;

  const getBadgeColors = () => {
    if (song.isKorean) return 'bg-slate-900 text-white';
    return 'bg-brand-gradient text-white';
  };

  return (
    <div className="group relative bg-white border-2 border-slate-50 rounded-[3rem] p-8 transition-all duration-700 hover:border-indigo-200 hover:shadow-[30px_30px_80px_-15px_rgba(99,102,241,0.15)] transform hover:-translate-y-4">
      {/* Dynamic Aura background */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-full ${song.isKorean ? 'bg-indigo-600' : 'bg-pink-600'}`}></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-black font-display italic group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
            {String(index + 1).padStart(2, '0')}
          </div>
          <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-md ${getBadgeColors()}`}>
            {song.country}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-3xl font-black text-slate-900 leading-[1.1] mb-2 group-hover:text-indigo-600 transition-colors tracking-tighter">
            {song.title}
          </h3>
          <p className="text-lg font-bold text-slate-400 mb-8 border-b-2 border-slate-50 pb-4 inline-block">{song.artist}</p>
          
          <div className="relative py-6 px-6 bg-slate-50 rounded-[2rem] border border-slate-50 group-hover:bg-white group-hover:border-slate-100 transition-all duration-500">
            <i className="fa-solid fa-bolt absolute -top-3 -left-2 text-indigo-500 text-xl group-hover:scale-125 transition-transform"></i>
            <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
              {song.reason}
            </p>
          </div>
        </div>
        
        <a 
          href={youtubeSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center justify-between px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-gradient transition-all duration-500 shadow-2xl shadow-slate-200 group/btn overflow-hidden"
        >
          <span className="relative z-10">Stream Beat</span>
          <i className="fa-brands fa-youtube text-2xl relative z-10 group-hover/btn:rotate-[360deg] transition-transform duration-700"></i>
        </a>
      </div>
    </div>
  );
};

export default SongCard;
