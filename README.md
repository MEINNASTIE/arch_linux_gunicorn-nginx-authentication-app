## Repo information 

- /dist - serving application /
- /vite - contains project source code without the bundle
- /docu - additional sources for developer

## Additional information for developer meinna

### file serving a gunicorn via nginx for authentication
this environment has been specifically set up for arch linux to run on systemd as a service, the config is set based on distro

current /dist is not entirely optimised // current development going on 

#### nginx example config

```
worker_processes 3;

user meinna meinna;
error_log /var/log/nginx/error.log warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;
    accept_mutex off;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # HTTP to HTTPS redirection
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        
        root /home/meinna/mpcapp/web;
        index index.html index.htm;
        server_name _;

        # Redirect all HTTP to HTTPS
        return 301 https://$host$request_uri;

	location /api {
            proxy_pass http://localhost:8005/api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
	    proxy_set_header Cookie $http_cookie;
        }
    }

    # HTTPS server block
    server {
        listen 443 ssl;
        server_name 192.168.10.129;

        # SSL configuration
        ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
        ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Serve static files (for app) will be different for actual
        location / {
            root /home/meinna/mpcapp/web/dist/;
            try_files $uri /index.html;
        }

	error_log /home/meinna/error.log; 
	access_log /home/meinna/access.log; 

	location /token {
	    proxy_pass http://localhost:8006;
	    # proxy_pass http://unix:/home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/gunicorn.sock;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Proxy all other /api requests to the Mono server
        location /api {
            proxy_pass http://localhost:8005;  
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Error page for server errors
        error_page 500 502 503 504 /404.html;
        location = /404.html {
            root /home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/;
            internal;
        }
    }
}
```

// path to nginx configuration file
/etc/nginx/nginx.conf

#### gunicorn.service config

```
[Unit]
Description=Gunicorn service to serve Flask app
After=network.target

[Service]
User=meinna
Group=meinna
WorkingDirectory=/home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/
Environment="PATH=/home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/venv/bin/"
ExecStart=/home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8006 app:app

[Install]
WantedBy=multi-user.target

```

// local path to gunicorn.service file
/etc/systemd/system/gunicorn.service

*notes:
`python app.py` - start python backend server
`npm run dev` - current start until migration

#### regarding vite config

berry template integrated with regular react functionalities

- npm run build // dist present for development testing but ready for production 

#### regarding gunicorn

`gunicorn --workers 3 app:app` have at least 3 workers working for efficiency 
`sudo gunicorn --workers 3 --bind unix:/home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/gunicorn.sock app:app` to run a socket for gunicorn 

to check unix user: id -un // group:  id -gn

- security 
gunicorn --certfile=path/to/cert.pem --keyfile=path/to/key.pem -w 4 -b 0.0.0.0:443 app:app

#### self certificate ssl for local testing
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

#### SSL certificate 
sudo certbot --nginx -d yourdomain.com

mono storageApi.exe - to run local web config 

example for permitting rights to the nginx conf: sudo chmod 666 /home/meinna/VCS_Projects/arch_linux_authelia-nginx-authentication-app/server/*.sock

folder spec conf file:

nginx - /etc/nginx/nginx.conf
gunicorn/login service - /etc/systemd/system/gunicorn.service - login.service 
ssl key - /etc/ssl/private/nginx-selfsigned.key
