# Use NVM

## Install NVM

You will need NPM to run this scripts, at the moment we are using node `18.17.0` with npm version `9.6.7`.

I highly recommend that you [install NVM](https://github.com/nvm-sh/nvm) to manage your node versions
and after you have done it install the `lts` version (`nvm install --lts`).

After you have NPM installed, you can run the following commands to setup the project.

```shell
npm install -g ts-node \
  && npm install
```

This will install `ts-node` that we will use to compile & run the scripts and
install all the dependencies.

## Use systemservice

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
Environment=PATH=/home/tedcrypto/.nvm/versions/node/v18.16.1/bin/

[Install]
WantedBy=multi-user.target
```

 - Make sure that the paths are correct. 
 - Make sure that the Environment PATH for the right npm version is correct.
