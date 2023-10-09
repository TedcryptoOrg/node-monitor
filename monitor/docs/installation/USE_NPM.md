# Use NPM

## Install NPM

You will need NPM to run this service, if you don't have it installed, you can do it
simply by running:

```bash
sudo apt install npm
```

## Systemctl service

You can use the systemd service to run the script. It will look like more and less like this one

```bash
[Unit]
Description=Ted node monitor daemon
After=network-online.target

[Service]
User=tedcrypto
ExecStart=/usr/local/bin/ts-node src/index.ts
Restart=always
RestartSec=3
LimitNOFILE=4096
WorkingDirectory=/home/tedcrypto/node-monitor

[Install]
WantedBy=multi-user.target
```