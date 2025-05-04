import React from 'react';

// Sample chapter data - in a real app, this would come from an API
interface Chapter {
  id: string;
  title: string;
  timeStart: number; // in seconds
  timeEnd: number; // in seconds
}

interface ChapterMarkersProps {
  videoId: string;
  currentTime: number;
  onChapterClick: (time: number) => void;
}

const ChapterMarkers: React.FC<ChapterMarkersProps> = ({ 
  videoId, 
  currentTime, 
  onChapterClick 
}) => {
  // Example chapters - would be fetched based on videoId in a real app
  const chapters: Chapter[] = [
    { id: '1', title: 'Introduction', timeStart: 0, timeEnd: 120 },
    { id: '2', title: 'Key Concepts', timeStart: 121, timeEnd: 360 },
    { id: '3', title: 'Practical Examples', timeStart: 361, timeEnd: 600 },
    { id: '4', title: 'Advanced Techniques', timeStart: 601, timeEnd: 840 },
    { id: '5', title: 'Summary & Conclusion', timeStart: 841, timeEnd: 960 }
  ];

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Calculate which chapter is currently playing
  const getCurrentChapter = () => {
    return chapters.find(chapter => 
      currentTime >= chapter.timeStart && currentTime <= chapter.timeEnd
    );
  };

  const currentChapter = getCurrentChapter();

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="font-medium text-lg mb-3">Chapter Markers</h3>
      <div className="space-y-2">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onChapterClick(chapter.timeStart)}
            className={`w-full text-left p-2 rounded flex justify-between items-center transition-colors ${
              currentChapter?.id === chapter.id 
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="font-medium text-sm">{chapter.title}</span>
            <span className="text-xs text-gray-500">{formatTime(chapter.timeStart)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChapterMarkers; 