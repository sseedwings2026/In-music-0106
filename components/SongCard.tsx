
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
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold">
              {index + 1}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              song.isKorean ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
            }`}>
              {song.isKorean ? 'K-MUSIC' : 'GLOBAL'}
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {song.title}
          </h3>
          <p className="text-sm font-medium text-slate-500 mb-3">{song.artist}</p>
          <p className="text-xs text-slate-400 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-50 italic">
            "{song.reason}"
          </p>
        </div>
      </div>
      
      <a 
        href={youtubeSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-indigo-600 transition-colors shadow-sm"
      >
        <i className="fa-brands fa-youtube text-lg"></i>
        <span>YouTube에서 듣기</span>
      </a>
    </div>
  );
};

export default SongCard;
