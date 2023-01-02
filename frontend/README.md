# Setup

## NodeJS Installation
Install NVM (Node Version Manager) on your system, might have to change this command to use the latest version
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Update bashrc changes
```
source ~/.bashrc
```

Install the latest stable version of NodeJS
```
nvm install --lts
```

## Initialize Project
Install node dependencies
```
npm install
```

Initialize the amplify project by pulling it down
```
amplify pull --appId <value> --envName <value>
```

If for some reason there is an error that `Cant yada yada`, the right now that is a bug being tracked at https://github.com/aws-amplify/amplify-hosting/issues/3168.
To get around this use this command

```
aws amplify update-branch --app-id <value> --branch-name <value> --framework 'Next.js - SSR'
```
