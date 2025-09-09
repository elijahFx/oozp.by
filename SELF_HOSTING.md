# Self-Hosting Guide for OOZP.by

This guide will help you self-host the OOZP.by application on your own server.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)
- A server with at least 1GB RAM
- Domain name (optional, but recommended)

## Quick Start

### Option 1: Using the startup script (Recommended)

#### For Linux/macOS:
```bash
chmod +x start.sh
./start.sh
```

#### For Windows:
```cmd
start.bat
```

### Option 2: Manual deployment

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create a `.env` file in the root directory with your configuration:
   ```env
   NODE_ENV=production
   HOSTNAME=0.0.0.0
   PORT=3000
   NEXT_PUBLIC_APP_URL=http://your-domain.com
   ```

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=3000

# Application URL
NEXT_PUBLIC_APP_URL=http://your-domain.com

# Add any other environment variables your application needs
```

## Production Deployment

### Using PM2 (Recommended for production)

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start with PM2:**
   ```bash
   pm2 start server.js --name "oozp-website"
   ```

3. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

### Using systemd (Linux)

1. **Create a systemd service file:**
   ```bash
   sudo nano /etc/systemd/system/oozp-website.service
   ```

2. **Add the following content:**
   ```ini
   [Unit]
   Description=OOZP.by Website
   After=network.target

   [Service]
   Type=simple
   User=www-data
   WorkingDirectory=/path/to/your/app
   Environment=NODE_ENV=production
   ExecStart=/usr/bin/node server.js
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

3. **Enable and start the service:**
   ```bash
   sudo systemctl enable oozp-website
   sudo systemctl start oozp-website
   ```

## Reverse Proxy Setup (Nginx)

If you want to use Nginx as a reverse proxy:

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Create Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/oozp-website
   ```

3. **Add the following configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/oozp-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## SSL Certificate (Let's Encrypt)

To secure your site with HTTPS:

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain SSL certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Monitoring and Logs

### PM2 Monitoring
```bash
pm2 monit
pm2 logs oozp-website
```

### Systemd Logs
```bash
sudo journalctl -u oozp-website -f
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change the PORT in your `.env` file
   - Or kill the process using the port: `sudo lsof -ti:3000 | xargs kill -9`

2. **Permission denied:**
   - Make sure the user has proper permissions
   - For systemd, ensure the user exists and has access to the directory

3. **Build fails:**
   - Check Node.js version (should be 18+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then run `npm install`

### Health Check

Visit `http://your-domain.com` to verify the application is running correctly.

## Security Considerations

1. **Firewall:** Configure your server's firewall to only allow necessary ports
2. **Updates:** Keep your server and dependencies updated
3. **Backups:** Regularly backup your application and data
4. **Monitoring:** Set up monitoring and alerting for your application

## Support

If you encounter any issues, please check the logs and ensure all prerequisites are met.
