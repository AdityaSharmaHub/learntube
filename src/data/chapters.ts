// Define the chapter data structure
export interface Chapter {
  id: string;
  title: string;
  timeStart: number; // in seconds
  timeEnd: number; // in seconds
  description?: string;
}

// Map of video IDs to their chapters
export const videoChapters: Record<string, Chapter[]> = {
  // Video 1: Next.js Tutorial
  "1": [
    { id: '1', title: 'Introduction to Next.js', timeStart: 0, timeEnd: 120, description: 'What is Next.js and why should you use it?' },
    { id: '2', title: 'Setting up a Next.js Project', timeStart: 121, timeEnd: 360, description: 'Installation and project structure explained' },
    { id: '3', title: 'Routing in Next.js', timeStart: 361, timeEnd: 600, description: 'File-based routing system and how to use it' },
    { id: '4', title: 'Data Fetching', timeStart: 601, timeEnd: 840, description: 'Various methods to fetch data in Next.js applications' },
    { id: '5', title: 'Deployment & Optimization', timeStart: 841, timeEnd: 960, description: 'How to deploy your Next.js app and performance tips' }
  ],
  
  // Video 2: React JS Crash Course
  "2": [
    { id: '1', title: 'React Basics', timeStart: 0, timeEnd: 180, description: 'Introduction to React concepts and JSX' },
    { id: '2', title: 'Components & Props', timeStart: 181, timeEnd: 360, description: 'Creating and styling React components' },
    { id: '3', title: 'State & Hooks', timeStart: 361, timeEnd: 540, description: 'Using useState and useEffect hooks' },
    { id: '4', title: 'Project 1: Todo App', timeStart: 541, timeEnd: 720, description: 'Building a complete todo application' },
    { id: '5', title: 'Context API', timeStart: 721, timeEnd: 900, description: 'Managing global state with Context' },
    { id: '6', title: 'Project 2: Shopping Cart', timeStart: 901, timeEnd: 1080, description: 'Building a shopping cart with context API' },
    { id: '7', title: 'Deployment', timeStart: 1081, timeEnd: 1200, description: 'Deploying React apps to Vercel and Netlify' },
  ],
  
  // Video 3: Python Tutorial
  "3": [
    { id: '1', title: 'Python Basics', timeStart: 0, timeEnd: 900, description: 'Variables, data types, and basic operations' },
    { id: '2', title: 'Control Flow', timeStart: 901, timeEnd: 1800, description: 'If statements, loops, and conditional logic' },
    { id: '3', title: 'Functions & Modules', timeStart: 1801, timeEnd: 3600, description: 'Creating and using functions and modules' },
    { id: '4', title: 'Data Structures', timeStart: 3601, timeEnd: 5400, description: 'Lists, dictionaries, tuples, and sets' },
    { id: '5', title: 'File Handling & Exceptions', timeStart: 5401, timeEnd: 7200, description: 'Reading/writing files and exception handling' },
    { id: '6', title: 'Object-Oriented Python', timeStart: 7201, timeEnd: 9000, description: 'Classes, objects, inheritance, and polymorphism' },
    { id: '7', title: 'Project: CLI App', timeStart: 9001, timeEnd: 10800, description: 'Building a command-line application' },
    { id: '8', title: 'Next Steps', timeStart: 10801, timeEnd: 11567, description: 'Resources and further learning paths' },
  ],
  
  // Video 4: E-Commerce App
  "4": [
    { id: '1', title: 'Project Overview', timeStart: 0, timeEnd: 180, description: 'Application architecture and technologies' },
    { id: '2', title: 'Backend Setup', timeStart: 181, timeEnd: 600, description: 'Setting up Node.js, Express, and MongoDB' },
    { id: '3', title: 'User Authentication', timeStart: 601, timeEnd: 1200, description: 'JWT authentication and protected routes' },
    { id: '4', title: 'Product Management', timeStart: 1201, timeEnd: 1800, description: 'Creating the product catalog and admin interface' },
    { id: '5', title: 'Shopping Cart', timeStart: 1801, timeEnd: 2400, description: 'Building the cart functionality with Redux' },
    { id: '6', title: 'Checkout Process', timeStart: 2401, timeEnd: 3000, description: 'Creating the checkout flow with Stripe integration' },
    { id: '7', title: 'Order Management', timeStart: 3001, timeEnd: 3600, description: 'Order processing and fulfillment features' },
    { id: '8', title: 'Deployment', timeStart: 3601, timeEnd: 3858, description: 'Deploying the full-stack application' },
  ],
  
  // Video 5: TypeScript Tutorial
  "5": [
    { id: '1', title: 'TypeScript Introduction', timeStart: 0, timeEnd: 300, description: 'What is TypeScript and why use it?' },
    { id: '2', title: 'Basic Types', timeStart: 301, timeEnd: 600, description: 'Number, string, boolean, array, tuple, and enum types' },
    { id: '3', title: 'Interfaces & Types', timeStart: 601, timeEnd: 900, description: 'Defining and using interfaces and custom types' },
    { id: '4', title: 'Functions', timeStart: 901, timeEnd: 1200, description: 'Function types, parameters, and return types' },
    { id: '5', title: 'Classes & OOP', timeStart: 1201, timeEnd: 1500, description: 'Object-oriented programming with TypeScript' },
    { id: '6', title: 'Generics', timeStart: 1501, timeEnd: 1800, description: 'Creating reusable components with generics' },
    { id: '7', title: 'TypeScript with React', timeStart: 1801, timeEnd: 2100, description: 'Using TypeScript in React projects' },
    { id: '8', title: 'Advanced Types', timeStart: 2101, timeEnd: 2400, description: 'Union types, intersection types, and type guards' },
    { id: '9', title: 'Project: TypeScript App', timeStart: 2401, timeEnd: 2652, description: 'Building a complete application with TypeScript' },
  ],
  
  // Default chapters for other videos
  "default": [
    { id: '1', title: 'Introduction', timeStart: 0, timeEnd: 120, description: 'Overview of the course and what to expect' },
    { id: '2', title: 'Key Concepts', timeStart: 121, timeEnd: 360, description: 'Fundamentals and core principles explained' },
    { id: '3', title: 'Practical Examples', timeStart: 361, timeEnd: 600, description: 'Real-world application and demonstrations' },
    { id: '4', title: 'Advanced Techniques', timeStart: 601, timeEnd: 840, description: 'In-depth analysis and advanced concepts' },
    { id: '5', title: 'Summary & Conclusion', timeStart: 841, timeEnd: 960, description: 'Recap and next steps' }
  ]
}; 