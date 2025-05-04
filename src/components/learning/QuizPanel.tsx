import React, { useState, useEffect } from 'react';
import { videoQuizzes, Quiz, QuizQuestion } from '@/data/quizzes';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizPanelProps {
  videoId: string;
  currentTime: number;
}

const QuizPanel: React.FC<QuizPanelProps> = ({ videoId, currentTime }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number | null}>({});
  const [showResults, setShowResults] = useState<{[key: string]: boolean}>({});
  const [score, setScore] = useState<{[key: string]: number}>({});
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showQuizNotification, setShowQuizNotification] = useState(false);
  const [dismissedQuizzes, setDismissedQuizzes] = useState<Set<string>>(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  
  // Get the quizzes for this video, or use default if not found
  const quizzes = videoQuizzes[videoId] || videoQuizzes.default;
  
  // Check for quizzes that should be shown based on current time
  useEffect(() => {
    const checkForQuizzes = () => {
      // Find any quiz that should be shown now based on the currentTime
      // that hasn't been dismissed or completed yet
      const quizToShow = quizzes.find(quiz => {
        // Show quiz if we're within 5 seconds of its timeToShow
        const shouldShowAtCurrentTime = Math.abs(currentTime - quiz.timeToShow) < 5;
        const isNotDismissed = !dismissedQuizzes.has(quiz.id);
        const isNotCompleted = !completedQuizzes.has(quiz.id);
        
        return shouldShowAtCurrentTime && isNotDismissed && isNotCompleted;
      });
      
      if (quizToShow && (!activeQuiz || activeQuiz.id !== quizToShow.id)) {
        setActiveQuiz(quizToShow);
        setShowQuizNotification(true);
        
        // Auto-hide notification after 5 seconds if not clicked
        const timer = setTimeout(() => {
          setShowQuizNotification(false);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    };
    
    checkForQuizzes();
  }, [currentTime, quizzes, dismissedQuizzes, completedQuizzes, activeQuiz]);
  
  const handleAnswerSelect = (quizId: string, questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${quizId}-${questionId}`]: answerIndex
    }));
  };
  
  const handleSubmitQuiz = (quizId: string) => {
    // Calculate score for this quiz
    let quizScore = 0;
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (quiz) {
      quiz.questions.forEach(question => {
        const answerKey = `${quizId}-${question.id}`;
        if (selectedAnswers[answerKey] === question.correctAnswer) {
          quizScore++;
        }
      });
      
      // Update score and show results
      setScore(prev => ({
        ...prev,
        [quizId]: quizScore
      }));
      
      setShowResults(prev => ({
        ...prev,
        [quizId]: true
      }));
      
      // Mark as completed
      setCompletedQuizzes(prev => new Set([...prev, quizId]));
    }
  };
  
  const handleRetryQuiz = (quizId: string) => {
    // Clear answers for this quiz
    const newSelectedAnswers = { ...selectedAnswers };
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (quiz) {
      quiz.questions.forEach(question => {
        const answerKey = `${quizId}-${question.id}`;
        delete newSelectedAnswers[answerKey];
      });
      
      setSelectedAnswers(newSelectedAnswers);
      
      // Hide results
      setShowResults(prev => ({
        ...prev,
        [quizId]: false
      }));
      
      // Remove from completed quizzes
      const updatedCompletedQuizzes = new Set(completedQuizzes);
      updatedCompletedQuizzes.delete(quizId);
      setCompletedQuizzes(updatedCompletedQuizzes);
    }
  };
  
  const dismissQuiz = (quizId: string) => {
    setDismissedQuizzes(prev => new Set([...prev, quizId]));
    if (activeQuiz && activeQuiz.id === quizId) {
      setActiveQuiz(null);
    }
    setShowQuizNotification(false);
  };
  
  const openQuiz = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setActiveQuiz(quiz);
      setShowQuizNotification(false);
    }
  };
  
  const closeActiveQuiz = () => {
    if (activeQuiz) {
      // If the quiz has not been completed or dismissed, mark it as dismissed
      if (!completedQuizzes.has(activeQuiz.id)) {
        setDismissedQuizzes(prev => new Set([...prev, activeQuiz.id]));
      }
      setActiveQuiz(null);
    }
  };
  
  const allQuestionsAnswered = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return false;
    
    return quiz.questions.every(question => {
      const answerKey = `${quizId}-${question.id}`;
      return selectedAnswers[answerKey] !== undefined;
    });
  };
  
  const getScoreForQuiz = (quizId: string) => {
    return score[quizId] || 0;
  };
  
  const getQuestionsCount = (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    return quiz ? quiz.questions.length : 0;
  };
  
  // Find all available quizzes for this video
  const availableQuizzes = quizzes.filter(quiz => 
    currentTime >= quiz.timeToShow || 
    dismissedQuizzes.has(quiz.id) || 
    completedQuizzes.has(quiz.id)
  );
  
  return (
    <>
      {/* Quiz notification */}
      <AnimatePresence>
        {showQuizNotification && activeQuiz && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-red-600 z-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg text-gray-800">Quiz Available!</h4>
                <p className="text-sm text-gray-600">{activeQuiz.title}</p>
              </div>
              <button 
                onClick={() => setShowQuizNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => openQuiz(activeQuiz.id)}
                className="flex-1 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-red-700 transition"
              >
                Take Quiz
              </button>
              <button
                onClick={() => dismissQuiz(activeQuiz.id)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="h-full flex flex-col px-2 py-4">
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-100">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="font-medium text-base">Quizzes</h3>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
            {completedQuizzes.size}/{quizzes.length} completed
          </div>
        </div>
        
        {/* Active quiz panel */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {activeQuiz ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-3 py-2 bg-gray-100 border-b">
                <h4 className="font-medium text-base">{activeQuiz.title}</h4>
                <button 
                  onClick={closeActiveQuiz}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              {showResults[activeQuiz.id] ? (
                <div className="p-4">
                  <div className="text-center py-3 mb-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xl font-bold mb-2">
                      Your Score: {getScoreForQuiz(activeQuiz.id)} / {getQuestionsCount(activeQuiz.id)}
                    </div>
                    <div className={`text-lg ${
                      getScoreForQuiz(activeQuiz.id) === getQuestionsCount(activeQuiz.id) 
                        ? 'text-green-600' 
                        : getScoreForQuiz(activeQuiz.id) > getQuestionsCount(activeQuiz.id) / 2
                          ? 'text-black'
                          : 'text-red-600'
                    }`}>
                      {getScoreForQuiz(activeQuiz.id) === getQuestionsCount(activeQuiz.id) 
                        ? 'Perfect! Great job!' 
                        : getScoreForQuiz(activeQuiz.id) > getQuestionsCount(activeQuiz.id) / 2
                          ? 'Well done! Keep it up!'
                          : 'Keep learning and try again!'}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {activeQuiz.questions.map((question, qIndex) => {
                      const answerKey = `${activeQuiz.id}-${question.id}`;
                      const selectedAnswer = selectedAnswers[answerKey];
                      const isCorrect = selectedAnswer === question.correctAnswer;
                      
                      return (
                        <div key={question.id} className="border rounded-lg overflow-hidden">
                          <div className="font-medium p-3 border-b bg-gray-50">{qIndex + 1}. {question.text}</div>
                          
                          <div className="p-3">
                            {question.options.map((option, oIndex) => (
                              <div 
                                key={oIndex}
                                className={`p-2 mb-2 rounded ${
                                  selectedAnswer === oIndex
                                    ? question.correctAnswer === oIndex
                                      ? 'bg-green-50 border-l-4 border-green-500'
                                      : 'bg-red-50 border-l-4 border-red-500'
                                    : question.correctAnswer === oIndex 
                                      ? 'bg-green-50 border-l-4 border-green-500'
                                      : 'bg-white border border-gray-200'
                                }`}
                              >
                                <div className="flex justify-between">
                                  <div>
                                    <span className="inline-block w-6 h-6 rounded-full bg-gray-200 text-center text-sm mr-2">
                                      {String.fromCharCode(65 + oIndex)}
                                    </span>
                                    {option}
                                  </div>
                                  {selectedAnswer === oIndex && question.correctAnswer === oIndex && (
                                    <span className="text-green-600">✓</span>
                                  )}
                                  {selectedAnswer === oIndex && question.correctAnswer !== oIndex && (
                                    <span className="text-red-600">✗</span>
                                  )}
                                  {selectedAnswer !== oIndex && question.correctAnswer === oIndex && (
                                    <span className="text-green-600">✓</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {question.explanation && isCorrect === false && (
                            <div className="px-3 py-2 text-sm text-gray-700 bg-gray-50 border-t">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => handleRetryQuiz(activeQuiz.id)}
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="p-4">
                  <div className="space-y-4">
                    {activeQuiz.questions.map((question, qIndex) => {
                      const answerKey = `${activeQuiz.id}-${question.id}`;
                      
                      return (
                        <div key={question.id} className="border rounded-lg overflow-hidden">
                          <div className="font-medium p-3 border-b bg-gray-50">{qIndex + 1}. {question.text}</div>
                          <div className="p-3">
                            {question.options.map((option, oIndex) => (
                              <button
                                key={oIndex}
                                onClick={() => handleAnswerSelect(activeQuiz.id, question.id, oIndex)}
                                className={`w-full text-left p-2 mb-2 rounded flex items-center ${
                                  selectedAnswers[answerKey] === oIndex
                                    ? 'bg-red-50 border-l-4 border-red-500'
                                    : 'hover:bg-gray-50 border border-gray-200'
                                }`}
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-sm mr-2 flex-shrink-0">
                                  {String.fromCharCode(65 + oIndex)}
                                </span>
                                <span>{option}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => handleSubmitQuiz(activeQuiz.id)}
                    disabled={!allQuestionsAnswered(activeQuiz.id)}
                    className={`mt-4 w-full py-2 rounded-full transition ${
                      allQuestionsAnswered(activeQuiz.id)
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Answers
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Quiz list when no active quiz
            availableQuizzes.length > 0 ? (
              <div className="space-y-2">
                {availableQuizzes.map(quiz => (
                  <div 
                    key={quiz.id}
                    className={`p-3 rounded-lg border cursor-pointer transition hover:bg-gray-50 ${
                      completedQuizzes.has(quiz.id)
                        ? 'border-l-4 border-green-500'
                        : dismissedQuizzes.has(quiz.id)
                          ? 'border-gray-200'
                          : 'border-l-4 border-red-500 animate-pulse'
                    }`}
                    onClick={() => openQuiz(quiz.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{quiz.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {quiz.questions.length} questions
                          {completedQuizzes.has(quiz.id) && ` • Score: ${getScoreForQuiz(quiz.id)}/${quiz.questions.length}`}
                        </p>
                      </div>
                      {completedQuizzes.has(quiz.id) ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      ) : dismissedQuizzes.has(quiz.id) ? (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                          Dismissed
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-10 h-10 mx-auto text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                <p className="text-sm">Quizzes will appear as you watch the video</p>
                <p className="text-xs mt-1 text-gray-400">Keep watching to unlock interactive quizzes</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPanel; 