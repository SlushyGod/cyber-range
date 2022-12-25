# Setup

Initialize nodejs project

```
npm init -y
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
