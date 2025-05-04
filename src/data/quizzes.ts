import { Chapter } from './chapters';

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation?: string;  // Optional explanation for the answer
}

export interface Quiz {
  id: string;
  title: string;
  timeToShow: number; // When to show this quiz (in seconds)
  questions: QuizQuestion[];
}

// Map of video IDs to their quiz data
export const videoQuizzes: Record<string, Quiz[]> = {
  // Video 1: Next.js Tutorial
  "1": [
    {
      id: '1',
      title: 'Understanding Next.js Basics',
      timeToShow: 110, // Show near the end of the first chapter
      questions: [
        {
          id: '1-1',
          text: 'What is Next.js primarily used for?',
          options: [
            'Mobile app development',
            'React-based web applications with server-side rendering',
            'Database management',
            'Backend API development'
          ],
          correctAnswer: 1,
          explanation: 'Next.js is a React framework that enables server-side rendering and generates static websites.'
        },
        {
          id: '1-2',
          text: 'Which company developed Next.js?',
          options: [
            'Facebook',
            'Google',
            'Vercel',
            'Amazon'
          ],
          correctAnswer: 2,
          explanation: 'Next.js was developed by Vercel (formerly Zeit).'
        }
      ]
    },
    {
      id: '2',
      title: 'Next.js Project Structure',
      timeToShow: 340, // Show near the end of the second chapter
      questions: [
        {
          id: '2-1',
          text: 'Which folder contains the pages in a standard Next.js project?',
          options: [
            '/src/pages',
            '/pages',
            '/views',
            'Either /pages or /app depending on the routing approach'
          ],
          correctAnswer: 3,
          explanation: 'Next.js uses either the pages directory (Pages Router) or the app directory (App Router).'
        },
        {
          id: '2-2',
          text: 'How do you create a dynamic route in Next.js?',
          options: [
            'Using a file named [param].js',
            'Using the <Route> component',
            'Creating a route.config.js file',
            'Using Express.js routing'
          ],
          correctAnswer: 0,
          explanation: 'In Next.js, dynamic routes are created using square brackets in the filename, like [id].js.'
        }
      ]
    }
  ],
  
  // Video 2: React JS Crash Course
  "2": [
    {
      id: '1',
      title: 'React Fundamentals Quiz',
      timeToShow: 160,
      questions: [
        {
          id: '1-1',
          text: 'What is JSX?',
          options: [
            'A JavaScript library',
            'A syntax extension for JavaScript that looks similar to HTML',
            'A build tool for React',
            'A state management solution'
          ],
          correctAnswer: 1,
          explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.'
        },
        {
          id: '1-2',
          text: 'Which hook is used to perform side effects in a function component?',
          options: [
            'useState',
            'useContext',
            'useEffect',
            'useReducer'
          ],
          correctAnswer: 2,
          explanation: 'useEffect is used for side effects like data fetching, subscriptions, or manually changing the DOM.'
        }
      ]
    },
    {
      id: '2',
      title: 'Components & Props Quiz',
      timeToShow: 340,
      questions: [
        {
          id: '2-1',
          text: 'How do you pass data from a parent to a child component?',
          options: [
            'Using global state',
            'Using props',
            'Using context API only',
            'Using Redux'
          ],
          correctAnswer: 1,
          explanation: 'Props (short for properties) are used to pass data from parent to child components.'
        },
        {
          id: '2-2',
          text: 'What is the correct way to render a list of items in React?',
          options: [
            'Using a for loop in JSX',
            'Using the map() method and providing a key prop',
            'Using the forEach() method',
            'Using the items.render() method'
          ],
          correctAnswer: 1,
          explanation: 'The map() method is commonly used to render lists in React, and each item should have a unique key prop.'
        }
      ]
    }
  ],
  
  // Video 3: Python Tutorial
  "3": [
    {
      id: '1',
      title: 'Python Basics Quiz',
      timeToShow: 850,
      questions: [
        {
          id: '1-1',
          text: 'Which of the following is NOT a Python data type?',
          options: [
            'List',
            'Dictionary',
            'Tuple',
            'Array'
          ],
          correctAnswer: 3,
          explanation: 'While Python has lists, dictionaries, and tuples, it does not have a built-in array type. The NumPy library provides array functionality.'
        },
        {
          id: '1-2',
          text: 'What is the correct way to comment multiple lines in Python?',
          options: [
            'Using # at the beginning of each line',
            'Using /* and */ to wrap the comments',
            'Using triple quotes (""" or \'\'\')',
            'Using <!-- and --> tags'
          ],
          correctAnswer: 2,
          explanation: 'Triple quotes (""" or \'\'\') are used for multi-line strings and can be used as multi-line comments in Python.'
        }
      ]
    }
  ],
  
  // Default quizzes for videos without specific quizzes
  "default": [
    {
      id: '1',
      title: 'Topic Understanding Check',
      timeToShow: 110,
      questions: [
        {
          id: '1-1',
          text: 'What is the primary purpose of React\'s useEffect hook?',
          options: [
            'To update component state',
            'To handle side effects in functional components',
            'To create new components dynamically',
            'To replace Redux for state management'
          ],
          correctAnswer: 1,
          explanation: 'The useEffect hook is used to perform side effects in functional components, such as data fetching, DOM manipulation, or subscriptions.'
        },
        {
          id: '1-2',
          text: 'Which of the following is NOT a benefit of Next.js?',
          options: [
            'Server-side rendering',
            'Automatic code splitting',
            'Built-in CSS modules',
            'Direct database access'
          ],
          correctAnswer: 3,
          explanation: 'Next.js does not provide direct database access. You still need to set up your own database connections and APIs.'
        }
      ]
    },
    {
      id: '2',
      title: 'Advanced Concepts Quiz',
      timeToShow: 300,
      questions: [
        {
          id: '2-1',
          text: 'What is the virtual DOM in React?',
          options: [
            'A way to directly manipulate the browser DOM',
            'A lightweight copy of the real DOM that React uses for performance optimization',
            'A special browser feature only available in Chrome',
            'A third-party library for DOM manipulation'
          ],
          correctAnswer: 1,
          explanation: 'The virtual DOM is a lightweight JavaScript representation of the real DOM that React uses to optimize updates and improve performance.'
        },
        {
          id: '2-2',
          text: 'Which statement about React hooks is NOT true?',
          options: [
            'Hooks can only be used in functional components',
            'Hooks must be called at the top level, not inside loops or conditions',
            'You can create your own custom hooks',
            'Hooks can be used in class components'
          ],
          correctAnswer: 3,
          explanation: 'Hooks can only be used in functional components, not in class components.'
        }
      ]
    }
  ]
}; 