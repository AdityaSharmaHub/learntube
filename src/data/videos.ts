export interface Video {
  id: string;
  title: string;
  description: string;
  channelName: string;
  channelImageUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: string;
  likes: string;
  uploadTime: string;
  duration: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Complete Next.js Tutorial for Beginners - Learn Next.js in 2024",
    description: "Master Next.js from the basics to advanced concepts in this comprehensive tutorial. Learn routing, data fetching, server components, and more.",
    channelName: "Code with Mosh",
    channelImageUrl: "/avatars/channel1.jpg",
    thumbnailUrl: "/thumbnails/nextjs-tutorial.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ZVnjOPwW4ZA",
    views: "1.2M",
    likes: "85K",
    uploadTime: "2 months ago",
    duration: "1:24:36"
  },
  {
    id: "2",
    title: "React JS Crash Course 2024 - Build 5 Projects in a Week",
    description: "Learn React JS through building 5 practical projects. Perfect for beginners and intermediate developers looking to improve their React skills.",
    channelName: "The Net Ninja",
    channelImageUrl: "/avatars/channel2.jpg",
    thumbnailUrl: "/thumbnails/react-crash-course.jpg",
    videoUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
    views: "845K",
    likes: "42K",
    uploadTime: "3 weeks ago",
    duration: "48:22"
  },
  {
    id: "3",
    title: "Learn Python in 6 Hours - Full Course for Beginners [2024]",
    description: "A complete Python tutorial covering all the fundamentals. Learn variables, data types, functions, OOP, file handling, and more in this comprehensive course.",
    channelName: "freeCodeCamp",
    channelImageUrl: "/avatars/channel4.jpg",
    thumbnailUrl: "/thumbnails/python-course.jpg",
    videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    views: "3.4M",
    likes: "125K",
    uploadTime: "5 months ago",
    duration: "6:12:47"
  },
  {
    id: "4",
    title: "Build a Full Stack E-Commerce Application with Stripe Payments",
    description: "Learn how to build a complete e-commerce store with user authentication, product catalog, shopping cart, and Stripe payment integration.",
    channelName: "Traversy Media",
    channelImageUrl: "/avatars/channel3.jpg",
    thumbnailUrl: "/thumbnails/ecommerce-app.jpg",
    videoUrl: "https://www.youtube.com/watch?v=mI_-1tbIXQI",
    views: "567K",
    likes: "38K",
    uploadTime: "1 month ago",
    duration: "2:34:18"
  },
  {
    id: "5",
    title: "TypeScript Tutorial for Beginners: Your Complete Guide",
    description: "Learn TypeScript from scratch. This tutorial covers types, interfaces, generics, and how to integrate TypeScript with React, Node, and other frameworks.",
    channelName: "Academind",
    channelImageUrl: "/avatars/channel5.jpg",
    thumbnailUrl: "/thumbnails/typescript-tutorial.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
    views: "721K",
    likes: "45K",
    uploadTime: "2 months ago",
    duration: "1:54:12"
  },
  {
    id: "6",
    title: "How to Build a REST API with Node.js and Express",
    description: "Create a complete REST API using Node.js and Express. Learn about routes, controllers, middleware, MongoDB integration, and authentication.",
    channelName: "Code with Mosh",
    channelImageUrl: "/avatars/channel1.jpg",
    thumbnailUrl: "/thumbnails/nodejs-api.jpg",
    videoUrl: "https://www.youtube.com/watch?v=pKd0Rpw7O48",
    views: "982K",
    likes: "56K",
    uploadTime: "4 months ago",
    duration: "1:12:45"
  },
  {
    id: "7",
    title: "CSS Grid Tutorial: Responsive Design Made Easy",
    description: "Master CSS Grid layout to create modern, responsive websites. Learn grid templates, areas, gaps, and how to create complex layouts with clean code.",
    channelName: "The Net Ninja",
    channelImageUrl: "/avatars/channel2.jpg",
    thumbnailUrl: "/thumbnails/css-grid.jpg",
    videoUrl: "https://www.youtube.com/watch?v=jV8B24rSN5o",
    views: "432K",
    likes: "31K",
    uploadTime: "6 weeks ago",
    duration: "42:18"
  },
  {
    id: "8",
    title: "MERN Stack Crash Course with Authentication",
    description: "Build a full-stack application with MongoDB, Express, React, and Node.js. Implement JWT authentication, protected routes, and CRUD operations.",
    channelName: "Traversy Media",
    channelImageUrl: "/avatars/channel3.jpg",
    thumbnailUrl: "/thumbnails/mern-stack.jpg",
    videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
    views: "1.1M",
    likes: "62K",
    uploadTime: "3 months ago",
    duration: "1:48:36"
  },
  {
    id: "9",
    title: "Tailwind CSS Full Course - Build Modern Websites",
    description: "Learn how to use Tailwind CSS to build beautiful, responsive websites without writing custom CSS. Perfect for beginners and experienced developers.",
    channelName: "freeCodeCamp",
    channelImageUrl: "/avatars/channel4.jpg",
    thumbnailUrl: "/thumbnails/tailwind-course.jpg",
    videoUrl: "https://www.youtube.com/watch?v=dFgzHOX84xQ",
    views: "2.3M",
    likes: "98K",
    uploadTime: "7 months ago",
    duration: "3:16:24"
  },
  {
    id: "10",
    title: "Machine Learning Basics: Practical Introduction with Python",
    description: "Get started with machine learning using Python. Learn about supervised and unsupervised learning, data preprocessing, model evaluation, and more.",
    channelName: "Academind",
    channelImageUrl: "/avatars/channel5.jpg",
    thumbnailUrl: "/thumbnails/machine-learning.jpg",
    videoUrl: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    views: "1.5M",
    likes: "75K",
    uploadTime: "2 months ago",
    duration: "2:21:08"
  },
  {
    id: "11",
    title: "Docker & Kubernetes Tutorial for Beginners",
    description: "Learn container technology with Docker and how to orchestrate them with Kubernetes. Perfect for DevOps engineers and full-stack developers.",
    channelName: "freeCodeCamp",
    channelImageUrl: "/avatars/channel4.jpg",
    thumbnailUrl: "/thumbnails/docker-kubernetes.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Wf2eSG3owoA",
    views: "875K",
    likes: "48K",
    uploadTime: "3 months ago",
    duration: "1:58:42"
  },
  {
    id: "12",
    title: "GraphQL API Development from Scratch",
    description: "Build modern APIs with GraphQL. Learn about schemas, resolvers, mutations, and how to integrate GraphQL with your frontend applications.",
    channelName: "The Net Ninja",
    channelImageUrl: "/avatars/channel2.jpg",
    thumbnailUrl: "/thumbnails/graphql-api.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5199E50O7SI",
    views: "645K",
    likes: "37K",
    uploadTime: "1 month ago",
    duration: "1:32:16"
  }
]; 