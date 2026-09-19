const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[32m%s\x1b[0m', '==================================================');
console.log('\x1b[36m%s\x1b[0m', '  🚀 Starting Parkar Education Alliance (Fullstack)');
console.log('\x1b[32m%s\x1b[0m', '==================================================\n');

// 1. Start Backend Server (Port 5000)
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend Vite Dev Server (Port 5173)
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
