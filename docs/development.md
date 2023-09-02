# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creatiprotocolx/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop protocolxcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/protocolxcore-node.git
git clone git@github.com:<yourusername>/protocolxcore-lib.git
```

To develop protocolx or to compile from source:

```bash
git clone git@github.com:<yourusername>/protocolx.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See protocolx documentation for building protocolx on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd bitcore-lib
npm install
cd ../bitcore-node
npm install
```
**Note**: If you get a message about not being able to download protocolx distribution, you'll need to compile protocolxd from source, and setup your configuration to use that version.


We now will setup symlinks in `protocolxcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf protocolxcore-lib
ln -s ~/protocolxcore-lib
rm -rf protocolxd-rpc
ln -s ~/protocolxd-rpc
```

And if you're compiling or developing protocolxcoin:
```bash
cd ../bin
ln -sf ~/protocolx/src/protocolxd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd protocolxcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/protocolxd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/protocolxd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch protocolxcore-node.json
touch package.json
```

Edit `protocolxcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "protocolxd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "protocolxd": {
      "spawn": {
        "datadir": "/home/<youruser>/.protocolx",
        "exec": "/home/<youruser>/protocolx/src/protocolxd"
      }
    }
  }
}
```

**Note**: To install services [protocolx-insight-api](https://github.com/protocol-x-network/insight-api) and [protocolx-explorer](https://github.com/protocol-x-network/protocolx-explorer) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/protocolxcore-lib
ln -s ~/protocolxcore-node
ln -s ~/protocolx-insight-api
ln -s ~/protocolx-explorer
```

Make sure that the `<datadir>/protocolx.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=18332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../protocolxcore-node/bin/protocolxcore-node start
```