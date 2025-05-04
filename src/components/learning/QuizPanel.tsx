import React, { useState } from 'react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizPanelProps {
  videoId: string;
  currentTime: number;
}

const QuizPanel: React.FC<QuizPanelProps> = ({ videoId, currentTime }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number | null}>({});
  const [showResults, setShowResults] = useState(false);
  
  // Example quiz questions - would be fetched based on videoId in a real app
  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the primary purpose of React\'s useEffect hook?',
      options: [
        'To update component state',
        'To handle side effects in functional components',
        'To create new components dynamically',
        'To replace Redux for state management'
      ],
      correctAnswer: 1
    },
    {
      id: '2',
      text: 'Which of the following is NOT a benefit of Next.js?',
      options: [
        'Server-side rendering',
        'Automatic code splitting',
        'Built-in CSS modules',
        'Direct database access'
      ],
      correctAnswer: 3
    }
  ];
  
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  const handleSubmitQuiz = () => {
    setShowResults(true);
  };
  
  const handleRetryQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };
  
  const getScore = () => {
    let score = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };
  
  const allQuestionsAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="font-medium text-lg mb-4">Quiz</h3>
      
      {showResults ? (
        <div className="mb-4">
          <div className="text-center py-3 mb-4">
            <div className="text-xl font-bold mb-2">
              Your Score: {getScore()} / {questions.length}
            </div>
            <div className={`text-lg ${getScore() === questions.length ? 'text-green-600' : 'text-orange-500'}`}>
              {getScore() === questions.length 
                ? 'Perfect! Great job!' 
                : 'Keep learning and try again!'}
            </div>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="border rounded-lg p-3">
                <div className="font-medium mb-2">{qIndex + 1}. {question.text}</div>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div 
                      key={oIndex}
                      className={`p-2 rounded-md ${
                        selectedAnswers[question.id] === oIndex
                          ? question.correctAnswer === oIndex
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : question.correctAnswer === oIndex && 'bg-green-50 border border-green-200'
                      }`}
                    >
                      {option}
                      {selectedAnswers[question.id] === oIndex && question.correctAnswer === oIndex && (
                        <span className="float-right text-green-600">✓</span>
                      )}
                      {selectedAnswers[question.id] === oIndex && question.correctAnswer !== oIndex && (
                        <span className="float-right text-red-600">✗</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleRetryQuiz}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={question.id} className="border rounded-lg p-3">
                <div className="font-medium mb-3">{qIndex + 1}. {question.text}</div>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswerSelect(question.id, oIndex)}
                      className={`w-full text-left p-2 rounded-md transition ${
                        selectedAnswers[question.id] === oIndex
                          ? 'bg-blue-100 border border-blue-400'
                          : 'hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleSubmitQuiz}
            disabled={!allQuestionsAnswered}
            className={`mt-4 w-full py-2 rounded-lg transition ${
              allQuestionsAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPanel; 