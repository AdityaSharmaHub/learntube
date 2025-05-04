const fs = require('fs');
const path = require('path');

// Ensure the avatars directory exists
const avatarsDir = path.join(process.cwd(), 'public', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Create placeholder avatars for channels
const channels = [
  { id: 1, name: 'Code With Mosh', color: '#3b82f6' }, // blue
  { id: 2, name: 'The Net Ninja', color: '#22c55e' }, // green
  { id: 3, name: 'Traversy Media', color: '#eab308' }, // yellow
  { id: 4, name: 'freeCodeCamp', color: '#a855f7' }, // purple
  { id: 5, name: 'Academind', color: '#ef4444' }, // red
];

// Generate SVG for each channel
channels.forEach(channel => {
  const initial = channel.name.charAt(0);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${channel.color}" />
    <text x="100" y="120" font-family="Arial, sans-serif" font-size="100" fill="white" text-anchor="middle" dominant-baseline="middle">${initial}</text>
  </svg>`;
  
  fs.writeFileSync(path.join(avatarsDir, `channel${channel.id}.svg`), svg);
  console.log(`Created avatar for ${channel.name}`);
});

// Create a public/thumbnails directory
const thumbnailsDir = path.join(process.cwd(), 'public', 'thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Sample video data for thumbnails
const videoData = [
  {
    id: 'nextjs-tutorial',
    title: 'Complete Next.js Tutorial',
    color1: '#1E40AF', // dark blue
    color2: '#3B82F6', // blue
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="white" />'
  },
  {
    id: 'react-crash-course',
    title: 'React JS Crash Course',
    color1: '#0F766E', // dark teal
    color2: '#14B8A6', // teal
    icon: '<path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85s-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 002.4-.36c.48-.67.99-1.31 1.51-1.9z" fill="white" />'
  },
  {
    id: 'python-course',
    title: 'Learn Python in 6 Hours',
    color1: '#1E3A8A', // dark blue
    color2: '#3B82F6', // blue
    icon: '<path d="M9.8 13.4h1.9V12h-1.9M20 4H4a2 2 0 00-2 2v10a2 2 0 002 2h4l-1 2v1h10v-1l-1-2h4a2 2 0 002-2V6a2 2 0 00-2-2m0 12H4V6h16z" fill="white"/>'
  },
  {
    id: 'ecommerce-app',
    title: 'Build a Full Stack E-Commerce App',
    color1: '#7E22CE', // dark purple
    color2: '#A855F7', // purple
    icon: '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" fill="white"/>'
  },
  {
    id: 'typescript-tutorial',
    title: 'TypeScript Tutorial for Beginners',
    color1: '#0369A1', // dark sky blue
    color2: '#0EA5E9', // sky blue
    icon: '<path d="M3 3h18v18H3V3m10.71 14.29c.18.19.43.3.7.3a1.003 1.003 0 00.7-1.717 1 1 0 00-1.41 1.41M11 14h2v-3h3V9h-3V6h-2v3H8v2h3v3m1-9a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8z" fill="white"/>'
  },
  {
    id: 'nodejs-api',
    title: 'Build a REST API with Node.js',
    color1: '#166534', // dark green
    color2: '#22C55E', // green
    icon: '<path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="white"/>'
  },
  {
    id: 'css-grid',
    title: 'CSS Grid Tutorial',
    color1: '#9D174D', // dark pink
    color2: '#EC4899', // pink
    icon: '<path d="M16.61 15.15c-.46 0-.83-.37-.83-.83v-1.4c0-.46.37-.83.83-.83s.83.37.83.83v1.4c0 .46-.37.83-.83.83m-9.22 0c-.46 0-.83-.37-.83-.83v-1.4c0-.46.37-.83.83-.83s.83.37.83.83v1.4c0 .46-.37.83-.83.83m9.22-9.22c-.46 0-.83-.37-.83-.83v-1.4c0-.46.37-.83.83-.83s.83.37.83.83v1.4c0 .46-.37.83-.83.83M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" fill="white"/>'
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Crash Course',
    color1: '#1E3A8A', // dark blue
    color2: '#3B82F6', // blue
    icon: '<path d="M24 10.8V8l-2.3-.8c-.1-.5-.3-.9-.5-1.3l.9-2.1-2-2-.9.9c-.4-.2-.8-.4-1.3-.5L17 0h-2.8l-.8 2.3c-.5.1-.9.3-1.3.5l-2.1-.9-2 2 .9 2.1c-.2.4-.4.8-.5 1.3L8 8v2.8l2.3.8c.1.5.3.9.5 1.3l-.9 2.1 2 2 2.1-.9c.4.2.8.4 1.3.5l.8 2.3h2.8l.8-2.3c.5-.1.9-.3 1.3-.5l2.1.9 2-2-.9-2.1c.2-.4.4-.8.5-1.3l2.3-.8zm-8 1.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>'
  },
  {
    id: 'tailwind-course',
    title: 'Tailwind CSS Full Course',
    color1: '#0F766E', // dark teal
    color2: '#14B8A6', // teal
    icon: '<path d="M5.12 10L3 17.67l5.5.24-1.1 3.97 7.5-8.1L7.74 6l-2.62 4M15.5 20l-3.9-1.03 8.9-15.97 3 10.44-8 6.56z" fill="white"/>'
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Basics',
    color1: '#6B21A8', // dark purple
    color2: '#A855F7', // purple
    icon: '<path d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9m0 16a7 7 0 01-7-7 7 7 0 017-7 7 7 0 017 7 7 7 0 01-7 7m-3.33-5.94L9 11.63l1.33 1.43L8 16l-1.33-1.33L9 12.34M12 8a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1m4.33 7.73L15 17.06l-1.33-1.43 2.33-2.27L14.67 12 17 14.33l-.67 1.4z" fill="white"/>'
  },
  {
    id: 'docker-kubernetes',
    title: 'Docker & Kubernetes Tutorial',
    color1: '#075985', // dark blue
    color2: '#0EA5E9', // sky blue
    icon: '<path d="M22 15.04c-.63-2.44-2.45-3.91-4.24-4.73.31-1.26.86-2.93.86-3.93 0-1.75-2.03-3.97-2.03-3.97s-1.42 2.15-1.42 3.9c0 1.02.3 2.54.79 3.92-1.86.18-3.39.92-4.93 1.71-.18-.35-.27-.58-.27-.58-2.22 1.13-2.76 5.5-2.76 5.5s2.56-.58 4.64-3.1c.32-.39.65-.83.99-1.3.78 1.39 1.18 3.05 1.23 4.95-.21.32-.44.67-.69 1.07-3.42-.11-6.13 1.03-6.13 1.03 2.64 3.21 8.13 2.12 9.11 1.93.67.14 1.28.2 1.84.2 3.11-.08 4.7-1.88 4.7-1.88-1.66-.3-3.55-.52-4.98-.58.39-.35.75-.69 1.07-1.04 1.23.04 3.77-.3 3.77-.3-.56-1.56-1.33-2.31-1.55-2.47 3.67-2.59.66-5.73.66-5.73-.76 1.68-3.68 4.4-3.68 4.4zm-10.02-2.33c-.16-.19-.34.06-.28.17.29.41.89 1.6 1.67 2.14.39.27 1.13.54 1.89.75-.05-.16-.11-.32-.15-.48-1.69-.46-2.95-2.33-3.13-2.58zm9.92 2.38c-.55.34-1.76.93-3.55.39-1.46-.45-1.88-2.1-1.88-2.1 1.23 1.36 3.37 1.51 3.37 1.51-1.28-1.15-1.6-3.18-1.6-3.18 1.73 1.72 2.71 3.21 3.32 4.28.13.22.35.74.8 1.06-.05-.66.05-1.6-.46-1.96z" fill="white"/>'
  },
  {
    id: 'graphql-api',
    title: 'GraphQL API Development',
    color1: '#BE185D', // dark pink
    color2: '#EC4899', // pink
    icon: '<path d="M12 5.5L5 10l7 4.5 7-4.5-7-4.5m9 4.5a2 2 0 012 2v5a2 2 0 01-2 2h-7v-2h7v-5H8.93l-3-2H3a2 2 0 00-2 2v5a2 2 0 002 2h7v2H3a4 4 0 01-4-4v-5a4 4 0 014-4h18m-9-6a5.51 5.51 0 015.5 5.5h-2a3.5 3.5 0 00-3.5-3.5 3.5 3.5 0 00-3.5 3.5H7A5.51 5.51 0 0112 4z" fill="white"/>'
  }
];

// Generate more realistic SVG thumbnails
videoData.forEach(video => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="grad${video.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${video.color1}" />
        <stop offset="100%" stop-color="${video.color2}" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#grad${video.id})" />
    
    <!-- Background pattern -->
    <g opacity="0.1">
      ${Array.from({ length: 10 }).map((_, i) => 
        `<circle cx="${Math.random() * 1280}" cy="${Math.random() * 720}" r="${20 + Math.random() * 80}" fill="white" />`
      ).join('')}
    </g>
    
    <!-- Title with shadow -->
    <g transform="translate(640, 400)">
      <text x="0" y="0" font-family="Arial, sans-serif" font-size="44" fill="black" text-anchor="middle" opacity="0.3" filter="url(#shadow)" dominant-baseline="middle">${video.title}</text>
      <text x="0" y="0" font-family="Arial, sans-serif" font-size="44" fill="white" text-anchor="middle" dominant-baseline="middle">${video.title}</text>
    </g>
    
    <!-- Play button with shadow -->
    <g transform="translate(640, 280)">
      <circle cx="0" cy="0" r="70" fill="black" opacity="0.3" filter="url(#shadow)" />
      <circle cx="0" cy="0" r="70" fill="rgba(0,0,0,0.5)" />
      ${video.icon}
    </g>
    
    <!-- Watermark/icon in corner -->
    <g transform="translate(50, 50)" opacity="0.7">
      <rect width="40" height="40" rx="5" fill="white" />
      ${video.icon.replace('fill="white"', 'fill="' + video.color1 + '"').replace('transform="translate', 'transform="scale(0.4) translate')}
    </g>
  </svg>`;
  
  fs.writeFileSync(path.join(thumbnailsDir, `${video.id}.svg`), svg);
  console.log(`Created thumbnail for ${video.id}`);
});

console.log('All placeholder images generated successfully!'); 