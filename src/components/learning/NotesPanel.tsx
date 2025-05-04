import React, { useState, useEffect } from 'react';

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
  
  // On mount, load saved notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`learntube-notes-${videoId}`);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse saved notes', e);
      }
    }
  }, [videoId]);
  
  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`learntube-notes-${videoId}`, JSON.stringify(notes));
  }, [notes, videoId]);
  
  // Format timestamp as MM:SS
  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // Add a new note
  const addNote = () => {
    if (noteText.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: noteText,
        timestamp: currentTime,
        createdAt: new Date()
      };
      
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setNoteText('');
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
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-lg mb-3">Notes</h3>
      
      {/* Note input */}
      <div className="mb-4">
        <div className="flex items-start space-x-2">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a note about what you're learning..."
            className="flex-1 border rounded-lg p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={addNote}
            disabled={!noteText.trim()}
            className={`px-4 py-2 rounded-lg ${
              noteText.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Add Note
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Current timestamp: {formatTimestamp(currentTime)}
        </div>
      </div>
      
      {/* Notes list */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No notes yet. Add one to get started!
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="border rounded-lg p-3 relative">
              <div className="flex justify-between items-start">
                <button 
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full hover:bg-blue-200"
                >
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
              <div className="mt-2 text-sm whitespace-pre-wrap">
                {note.content}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesPanel; 