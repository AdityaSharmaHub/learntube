import React, { useEffect, useState, useCallback } from 'react';
import { Chapter, videoChapters } from '@/data/chapters';

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
  const [displayTime, setDisplayTime] = useState(currentTime);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Get the chapters for this video, or use default if not found
  const chapters = videoChapters[videoId] || videoChapters.default;
  
  // Handle chapter selection
  const handleChapterClick = useCallback((time: number) => {
    setDisplayTime(time); // Update display immediately for better UX
    onChapterClick(time); // Pass to parent to update the YouTube player
  }, [onChapterClick]);
  
  // Update the display time based on current time from props
  useEffect(() => {
    if (Math.abs(currentTime - displayTime) > 0.5) {
      // If there's a significant jump (e.g., user manually sought),
      // update immediately and stop any simulation
      setDisplayTime(currentTime);
      setIsSimulating(false);
    } else if (currentTime !== displayTime) {
      // Normal update - player is sending regular updates
      setDisplayTime(currentTime);
      setIsSimulating(false);
    }
    
    // Always update the last update time when we get an update from the player
    setLastUpdateTime(Date.now());
  }, [currentTime, displayTime]);
  
  // Set up a simulation for when player updates are too infrequent
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startSimulation = () => {
      // Check if it's been too long since the last real update
      const now = Date.now();
      if (now - lastUpdateTime > 1000) {
        setIsSimulating(true);
        timer = setInterval(() => {
          setDisplayTime(prevTime => {
            // Don't exceed the video duration
            const totalDuration = chapters[chapters.length - 1].timeEnd;
            return Math.min(prevTime + 0.1, totalDuration);
          });
        }, 100); // Update every 100ms for smooth progress
      }
    };
    
    const checkAndPotentiallyStartSimulation = setTimeout(startSimulation, 1200);
    
    return () => {
      clearTimeout(checkAndPotentiallyStartSimulation);
      if (timer) clearInterval(timer);
    };
  }, [lastUpdateTime, chapters]);
  
  // Stop simulation when we get real updates
  useEffect(() => {
    if (!isSimulating) return;
    
    // If we got a real update and simulation is running, stop it
    if (Date.now() - lastUpdateTime < 500) {
      setIsSimulating(false);
    }
  }, [lastUpdateTime, isSimulating]);
  
  // Format time in MM:SS or HH:MM:SS for longer videos
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Calculate which chapter is currently playing
  const getCurrentChapter = () => {
    return chapters.find(chapter => 
      displayTime >= chapter.timeStart && displayTime <= chapter.timeEnd
    );
  };

  const currentChapter = getCurrentChapter();
  const totalDuration = chapters[chapters.length - 1].timeEnd;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-lg">Chapter Markers</h3>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">Current: {formatTime(displayTime)}</span>
          <div 
            className={`w-2 h-2 rounded-full ${
              Date.now() - lastUpdateTime < 1000 
                ? 'bg-green-500 animate-pulse' 
                : isSimulating 
                  ? 'bg-yellow-500 animate-pulse'
                  : 'bg-gray-300'
            }`} 
            title={isSimulating ? "Simulating playback" : "Receiving updates from player"}
          ></div>
        </div>
      </div>

      {/* Timeline visualization */}
      <div className="mb-4 relative h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Overall progress bar */}
        <div 
          className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-100" 
          style={{ width: `${(displayTime / totalDuration) * 100}%` }}
        ></div>
        
        {/* Chapter sections */}
        {chapters.map((chapter, index) => (
          <div
            key={`chapter-section-${chapter.id}`}
            className={`absolute top-0 h-full border-r ${index === chapters.length - 1 ? '' : 'border-gray-400'} transition-opacity opacity-40`}
            style={{ 
              left: `${(chapter.timeStart / totalDuration) * 100}%`,
              width: `${((chapter.timeEnd - chapter.timeStart) / totalDuration) * 100}%`,
              backgroundColor: currentChapter?.id === chapter.id ? 'rgba(239, 68, 68, 0.2)' : 'rgba(229, 231, 235, 0.5)'
            }}
          />
        ))}
        
        {/* Chapter markers */}
        {chapters.map((chapter) => (
          <div
            key={`marker-${chapter.id}`}
            className={`absolute top-0 w-1 h-full ${currentChapter?.id === chapter.id ? 'bg-red-600' : 'bg-gray-400'} cursor-pointer hover:bg-red-500 transition-colors`}
            style={{ left: `${(chapter.timeStart / totalDuration) * 100}%` }}
            onClick={() => handleChapterClick(chapter.timeStart)}
            title={chapter.title}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-black/75 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {chapter.title}
            </div>
          </div>
        ))}
        
        {/* Current time indicator */}
        <div 
          className="absolute top-0 h-full w-0.5 bg-white z-10 transform -translate-x-1/2"
          style={{ left: `${(displayTime / totalDuration) * 100}%` }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-red-600"></div>
        </div>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => handleChapterClick(chapter.timeStart)}
            className={`p-2 rounded transition-colors cursor-pointer group ${
              currentChapter?.id === chapter.id 
                ? 'bg-red-50 border-l-4 border-red-600'
                : 'hover:bg-gray-100 border-l-4 border-transparent hover:border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className={`font-medium text-sm ${currentChapter?.id === chapter.id ? 'text-red-600' : 'group-hover:text-gray-800'}`}>
                {chapter.title}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                currentChapter?.id === chapter.id 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
              }`}>
                {formatTime(chapter.timeStart)}
              </span>
            </div>
            {chapter.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 group-hover:text-gray-700">{chapter.description}</p>
            )}
            {currentChapter?.id === chapter.id && (
              <div className="w-full mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-100" 
                  style={{ 
                    width: `${((displayTime - chapter.timeStart) / (chapter.timeEnd - chapter.timeStart)) * 100}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterMarkers; 