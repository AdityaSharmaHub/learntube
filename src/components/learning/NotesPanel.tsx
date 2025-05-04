import React, { useState, useEffect, useRef } from 'react';

interface NotesPanelProps {
  videoId: string;
  currentTime: number;
}

interface Note {
  id: string;
  content: string;
  timestamp: number;
  createdAt: Date;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ videoId, currentTime }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'timestamp'>('all');
  const [exportCopied, setExportCopied] = useState(false);
  
  // On mount, load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`learntube-notes-${videoId}`);
    if (savedNotes) {
      try {
        // Parse the JSON string and ensure date objects are reconstructed
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt)
        }));
        setNotes(parsedNotes);
      } catch (e) {
        console.error('Failed to parse saved notes', e);
      }
    }
  }, [videoId]);
  
  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`learntube-notes-${videoId}`, JSON.stringify(notes));
  }, [notes, videoId]);
  
  // Format timestamp as MM:SS or HH:MM:SS for longer videos
  const formatTimestamp = (seconds: number) => {
    if (!seconds && seconds !== 0) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Add a new note
  const addNote = () => {
    if (noteText.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: noteText,
        timestamp: currentTime || 0,
        createdAt: new Date()
      };
      
      setIsSaving(true);
      
      // Simulate save animation
      setTimeout(() => {
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setNoteText('');
        setIsSaving(false);
      }, 300);
    }
  };
  
  // Delete a note
  const deleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };
  
  // Handle enter key to save note
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };
  
  // Insert current timestamp into note text
  const insertTimestamp = () => {
    const timeString = `[${formatTimestamp(currentTime)}] `;
    
    if (textAreaRef.current) {
      const start = textAreaRef.current.selectionStart;
      const end = textAreaRef.current.selectionEnd;
      
      setNoteText(
        noteText.substring(0, start) + 
        timeString + 
        noteText.substring(end)
      );
      
      // Set focus back to textarea after inserting timestamp
      setTimeout(() => {
        if (textAreaRef.current) {
          textAreaRef.current.focus();
          textAreaRef.current.selectionStart = start + timeString.length;
          textAreaRef.current.selectionEnd = start + timeString.length;
        }
      }, 0);
    } else {
      setNoteText(noteText + timeString);
    }
  };
  
  // Export notes as text
  const exportNotes = (format: 'text' | 'html' | 'json') => {
    let content = '';
    
    if (format === 'text') {
      content = notes.map(note => 
        `[${formatTimestamp(note.timestamp)}] ${note.content}\n\n`
      ).join('');
    } else if (format === 'html') {
      content = `
        <html>
        <head>
          <title>Notes for Video: ${videoId}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            .note { border: 1px solid #ddd; padding: 10px; margin-bottom: 15px; border-radius: 5px; }
            .timestamp { color: #c00; font-weight: bold; }
            .content { margin: 10px 0; white-space: pre-wrap; }
            .date { color: #666; font-size: 0.8em; }
          </style>
        </head>
        <body>
          <h1>Notes for Video</h1>
          ${notes.map(note => `
            <div class="note">
              <div class="timestamp">${formatTimestamp(note.timestamp)}</div>
              <div class="content">${note.content}</div>
              <div class="date">${new Date(note.createdAt).toLocaleString()}</div>
            </div>
          `).join('')}
        </body>
        </html>
      `;
    } else {
      content = JSON.stringify(notes, null, 2);
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(content)
      .then(() => {
        setExportCopied(true);
        setTimeout(() => setExportCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
    
    setShowExportOptions(false);
  };
  
  // Download notes as a file
  const downloadNotes = (format: 'text' | 'html' | 'json') => {
    let content = '';
    let mimeType = '';
    let fileExtension = '';
    
    if (format === 'text') {
      content = notes.map(note => 
        `[${formatTimestamp(note.timestamp)}] ${note.content}\n\n`
      ).join('');
      mimeType = 'text/plain';
      fileExtension = 'txt';
    } else if (format === 'html') {
      content = `
        <html>
        <head>
          <title>Notes for Video: ${videoId}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            .note { border: 1px solid #ddd; padding: 10px; margin-bottom: 15px; border-radius: 5px; }
            .timestamp { color: #c00; font-weight: bold; }
            .content { margin: 10px 0; white-space: pre-wrap; }
            .date { color: #666; font-size: 0.8em; }
          </style>
        </head>
        <body>
          <h1>Notes for Video</h1>
          ${notes.map(note => `
            <div class="note">
              <div class="timestamp">${formatTimestamp(note.timestamp)}</div>
              <div class="content">${note.content}</div>
              <div class="date">${new Date(note.createdAt).toLocaleString()}</div>
            </div>
          `).join('')}
        </body>
        </html>
      `;
      mimeType = 'text/html';
      fileExtension = 'html';
    } else {
      content = JSON.stringify(notes, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learntube-notes-${videoId}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setShowExportOptions(false);
  };
  
  // Sort and filter notes
  const sortedNotes = [...notes].sort((a, b) => {
    if (filterMode === 'timestamp') {
      return a.timestamp - b.timestamp;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Group notes by timestamp when in timestamp mode
  const groupedNotes = sortedNotes.reduce<Record<string, Note[]>>((acc, note) => {
    if (filterMode === 'timestamp') {
      const key = formatTimestamp(note.timestamp);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(note);
      return acc;
    }
    return acc;
  }, {});
  
  // Jump to specific timestamp in video
  const jumpToTimestamp = (timestamp: number) => {
    // This function should be passed from the parent component to seek video
    // We'll implement the UI part here; the actual seek happens in VideoPage
    window.dispatchEvent(new CustomEvent('learntube:seek', { detail: { time: timestamp } }));
  };
  
  return (
    <div className="h-full flex flex-col px-2 py-4">
      <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-100">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="font-medium text-base">Notes</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              onClick={() => setShowExportOptions(prev => !prev)}
              className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Export
            </button>
            
            {showExportOptions && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-10">
                <div className="p-2 text-sm border-b border-gray-100">Export Format</div>
                <button 
                  onClick={() => exportNotes('text')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Copy as Text
                </button>
                <button 
                  onClick={() => exportNotes('html')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Copy as HTML
                </button>
                <button 
                  onClick={() => exportNotes('json')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Copy as JSON
                </button>
                <div className="border-t border-gray-100"></div>
                <button 
                  onClick={() => downloadNotes('text')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Download as .txt
                </button>
                <button 
                  onClick={() => downloadNotes('html')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Download as .html
                </button>
                <button 
                  onClick={() => downloadNotes('json')}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition"
                >
                  Download as .json
                </button>
              </div>
            )}
            
            {exportCopied && (
              <div className="absolute right-0 mt-1 bg-black text-white text-xs px-2 py-1 rounded">
                Copied!
              </div>
            )}
          </div>
          
          <select 
            value={filterMode} 
            onChange={(e) => setFilterMode(e.target.value as 'all' | 'timestamp')}
            className="text-xs px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition border-0"
          >
            <option value="all">Latest First</option>
            <option value="timestamp">By Timestamp</option>
          </select>
        </div>
      </div>
      
      {/* Note input */}
      <div className="mb-3">
        <div className="flex items-start space-x-2">
          <div className="flex-1 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-red-500 focus-within:border-transparent">
            <textarea
              ref={textAreaRef}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a note about what you're learning..."
              className="w-full p-2 h-20 focus:outline-none resize-none"
            />
            <div className="px-2 py-1 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <button
                onClick={insertTimestamp}
                className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Insert Timestamp
              </button>
              <div className="text-xs text-gray-500">
                {formatTimestamp(currentTime)}
              </div>
            </div>
          </div>
          <button
            onClick={addNote}
            disabled={!noteText.trim() || isSaving}
            className={`px-3 py-2 rounded-full ${
              noteText.trim() && !isSaving
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSaving ? 'Saving...' : 'Add'}
          </button>
        </div>
      </div>
      
      {/* Notes list */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">No notes yet. Add one to get started!</p>
            <p className="text-xs mt-1 text-gray-400">Your notes will be saved automatically.</p>
          </div>
        ) : filterMode === 'timestamp' ? (
          // Display notes grouped by timestamp
          Object.entries(groupedNotes).map(([timestamp, notes]) => (
            <div key={timestamp} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 font-medium text-sm border-b flex justify-between items-center">
                <span>Timestamp: {timestamp}</span>
                <button 
                  onClick={() => jumpToTimestamp(notes[0].timestamp)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded-full text-gray-700 flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Jump
                </button>
              </div>
              {notes.map(note => (
                <div key={note.id} className="p-3 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleString()}
                    </span>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-1 text-sm whitespace-pre-wrap">
                    {note.content}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          // Display notes in a flat list
          sortedNotes.map(note => (
            <div key={note.id} className="border rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
              <div className="flex justify-between items-center px-3 py-2 bg-gray-50 border-b">
                <button 
                  onClick={() => jumpToTimestamp(note.timestamp)}
                  className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full hover:bg-red-200 flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatTimestamp(note.timestamp)}
                </button>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <div className="text-sm whitespace-pre-wrap">
                  {note.content}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPanel; 