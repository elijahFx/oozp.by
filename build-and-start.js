const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building and starting OOZP.by application...\n');

// Function to run commands
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.log(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
      console.log(`✅ ${description} completed\n`);
      resolve();
    });
  });
}

// Function to check if build exists
function checkBuild() {
  const buildDir = path.join(__dirname, '.next');
  const buildIdFile = path.join(buildDir, 'BUILD_ID');
  
  if (!fs.existsSync(buildDir)) {
    throw new Error('.next directory not found');
  }
  
  if (!fs.existsSync(buildIdFile)) {
    throw new Error('BUILD_ID file not found in .next directory');
  }
  
  console.log('✅ Build verification passed\n');
}

async function main() {
  try {
    // Check if we need to build
    const buildDir = path.join(__dirname, '.next');
    const buildIdFile = path.join(buildDir, 'BUILD_ID');
    
    if (!fs.existsSync(buildDir) || !fs.existsSync(buildIdFile)) {
      console.log('🔨 No production build found, building application...\n');
      await runCommand('npm run build', 'Building application');
      checkBuild();
    } else {
      console.log('✅ Production build found, skipping build step\n');
    }
    
    // Start the server
    console.log('🚀 Starting server...\n');
    await runCommand('node server.js', 'Starting server');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error.message);
    process.exit(1);
  }
}

main();
