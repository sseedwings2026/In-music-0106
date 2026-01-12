
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

  return (
    <div className="group relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
              {index + 1}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              song.isKorean ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {song.country}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {song.title}
          </h3>
          <p className="text-sm font-medium text-slate-500 mb-3">{song.artist}</p>
          <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-50 relative">
            <i className="fa-solid fa-quote-left absolute -top-2 -left-1 text-[10px] text-slate-200"></i>
            <span className="italic">"{song.reason}"</span>
          </div>
        </div>
      </div>
      
      <a 
        href={youtubeSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 transition-all shadow-sm"
      >
        <i className="fa-brands fa-youtube text-lg"></i>
        <span>YouTube에서 듣기</span>
      </a>
    </div>
  );
};

export default SongCard;
