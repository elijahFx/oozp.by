const { exec } = require('child_process');
const os = require('os');

const port = process.argv[2] || '3000';

function killPort(port) {
  const platform = os.platform();
  
  let command;
  
  if (platform === 'win32') {
    // Windows command
    command = `netstat -ano | findstr :${port}`;
  } else {
    // Linux/macOS command
    command = `lsof -ti:${port}`;
  }
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`No process found using port ${port}`);
      return;
    }
    
    if (platform === 'win32') {
      // Parse Windows output
      const lines = stdout.trim().split('\n');
      const pids = new Set();
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            pids.add(pid);
          }
        }
      });
      
      if (pids.size === 0) {
        console.log(`No process found using port ${port}`);
        return;
      }
      
      pids.forEach(pid => {
        exec(`taskkill /PID ${pid} /F`, (killError) => {
          if (killError) {
            console.log(`Failed to kill process ${pid}: ${killError.message}`);
          } else {
            console.log(`Killed process ${pid} using port ${port}`);
          }
        });
      });
    } else {
      // Parse Linux/macOS output
      const pids = stdout.trim().split('\n').filter(pid => pid.trim());
      
      if (pids.length === 0) {
        console.log(`No process found using port ${port}`);
        return;
      }
      
      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, (killError) => {
          if (killError) {
            console.log(`Failed to kill process ${pid}: ${killError.message}`);
          } else {
            console.log(`Killed process ${pid} using port ${port}`);
          }
        });
      });
    }
  });
}

console.log(`Looking for processes using port ${port}...`);
killPort(port);
