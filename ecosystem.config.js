module.exports = {
  apps: [{
    name: 'oozp-website',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/your/app', // Замените на реальный путь на сервере
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
